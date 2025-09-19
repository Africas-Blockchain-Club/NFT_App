'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// NFT data structure based on your CID metadata
interface NFT {
  id: number;
  name: string;
  description: string;
  image: string;
}

// User data structure
interface User {
  username: string;
  password: string;
  privateKey: string;
  smartAccountAddress: string;
  createdAt: string;
  ownedNFTs?: number[];
}

// Your existing user data
const userData = [
  {
    "username": "SANDILE",
    "password": "NARUTO",
    "privateKey": "0x89136ff124691c9ba24501575f854fd3fbcfac792f5ca57d7a14c569c4caac94",
    "smartAccountAddress": "0x2c85F380B26E4c82ff510FE5C33cF158DA50a438",
    "createdAt": "2025-09-19T03:34:57.056Z",
    "ownedNFTs": [0, 2, 5]
  },
  {
    "username": "n",
    "password": "nat",
    "privateKey": "0xd26f7a94ed51c024ad5623a48cf359a8d05e6f5fe12a6e17ed184b677d9b1934",
    "smartAccountAddress": "0xE16C153C3F64870c014b9C26c33532f43F04cA6D",
    "createdAt": "2025-09-19T03:51:41.697Z",
    "ownedNFTs": [1, 3]
  }
];

export default function Dashboard() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [userNfts, setUserNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [transactionHash, setTransactionHash] = useState('');
  const router = useRouter();

  // Your IPFS CID and metadata
  const CID = 'QmdnHnBXSe9okMiGYJCPMfLevi6rrsFfd6bNJ3HEchPHZU';
  const BASE_URL = `https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/${CID}`;
  const IMAGE_BASE_URL = 'https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmZ8antBrQPFjCW3nY7aSpLWZCSeam7cmXBjXkXNqnQCnx';

  // Simulate verifyUser function (replace with your actual import)
  const verifyUser = (username: string, password: string): User | undefined => {
    return userData.find(u => u.username === username && u.password === password);
  };

  // Function to get the current authenticated user from URL params or localStorage
  const getCurrentUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      // Try to get from URL params first (for demo purposes)
      const urlParams = new URLSearchParams(window.location.search);
      const username = urlParams.get('username');
      const password = urlParams.get('password');
      
      if (username && password) {
        const user = verifyUser(username, password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          // Clean up URL
          window.history.replaceState({}, '', '/dashboard');
          return user;
        }
      }
      
      // Fall back to localStorage
      const userData = localStorage.getItem('currentUser');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  };

  // Function to mint an NFT using the direct blockchain function
  const mintNFT = async (tokenId: number) => {
    if (!user) return;
    
    setMinting(true);
    setMintStatus('Preparing transaction...');
    
    try {
      // Import the blockchain functions directly
      const { mintNFTForUser } = await import('@/lib/blockchain');
      
      setMintStatus('Connecting to blockchain...');
      
      // Call the blockchain minting function directly
      const txHash = await mintNFTForUser(user);
      
      setMintStatus('Transaction confirmed!');
      setTransactionHash(txHash);
      
      // Update user's owned NFTs
      const updatedUser = {
        ...user,
        ownedNFTs: [...(user.ownedNFTs || []), tokenId]
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Update local state
      const mintedNft = nfts.find(nft => nft.id === tokenId);
      if (mintedNft) {
        setUserNfts(prev => [...prev, mintedNft]);
      }
      
      setMintStatus(`Successfully minted NFT #${tokenId}!`);
      
    } catch (error) {
      console.error('Minting failed:', error);
      setMintStatus(error instanceof Error ? error.message : 'Minting failed. Please try again.');
    } finally {
      setMinting(false);
    }
  };

  // Function to logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  useEffect(() => {
    // Check if user is authenticated
    const currentUser = getCurrentUser();
    if (!currentUser) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }
    
    setUser(currentUser);
    
    // Fetch all NFT metadata from your CID
    const fetchNFTs = async () => {
      try {
        const nftData: NFT[] = [];
        
        // Fetch metadata for NFTs 0 through 9 (based on your CID)
        for (let i = 0; i < 10; i++) {
          try {
            const response = await fetch(`${BASE_URL}/${i}`);
            if (response.ok) {
              const metadata = await response.json();
              nftData.push({
                id: i,
                name: metadata.name,
                description: metadata.description,
                image: `${IMAGE_BASE_URL}/${i}.jpg`
              });
            } else {
              // If metadata not found, create a placeholder NFT
              nftData.push({
                id: i,
                name: `Urban Snap ${i}`,
                description: `This is a captivating piece of street photography, n.o ${i} of street photography, capturing the essence of urban life.`,
                image: `${IMAGE_BASE_URL}/${i}.jpg`
              });
            }
          } catch (error) {
            console.log(`Metadata for NFT ${i} not available, using placeholder`);
            // Create a placeholder if metadata fetch fails
            nftData.push({
              id: i,
              name: `Urban Snap ${i}`,
              description: `This is a captivating piece of street photography, n.o ${i} of street photography, capturing the essence of urban life.`,
              image: `${IMAGE_BASE_URL}/${i}.jpg`
            });
          }
        }
        
        setNfts(nftData);
        
        // Get the NFTs that the user owns
        if (currentUser.ownedNFTs) {
          const ownedNfts = nftData.filter(nft => 
            currentUser.ownedNFTs?.includes(nft.id)
          );
          setUserNfts(ownedNfts);
        }
        
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [BASE_URL, IMAGE_BASE_URL, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading your NFTs...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <div className="text-white text-xl">Not authenticated. Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">🎨 Your NFT Dashboard</h1>
          <div className="text-white text-right">
            <p>Welcome, <span className="font-bold">{user.username}</span></p>
            <p>{userNfts.length} NFTs owned</p>
            <p className="text-sm opacity-80 truncate max-w-xs">{user.smartAccountAddress}</p>
            <button 
              onClick={handleLogout}
              className="mt-2 text-sm text-red-300 hover:text-red-100"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/"
            className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Mint Status */}
        {mintStatus && (
          <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
            {mintStatus}
            {transactionHash && (
              <div className="mt-2">
                <a 
                  href={`https://sepolia.scrollscan.com/tx/${transactionHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View transaction on Scrollscan
                </a>
              </div>
            )}
          </div>
        )}

        {/* NFT Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Available NFT Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => {
              const isOwned = userNfts.some(owned => owned.id === nft.id);
              
              return (
                <div key={nft.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-48 w-full">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="object-cover w-full h-48"
                      onError={(e) => {
                        e.target.src = 'https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmZ8antBrQPFjCW3nY7aSpLWZCSeam7cmXBjXkXNqnQCnx/2.jpg';
                      }}
                    />
                    {isOwned && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                        OWNED
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{nft.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{nft.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">ID: #{nft.id}</span>
                      <button 
                        onClick={() => mintNFT(nft.id)}
                        disabled={minting || isOwned}
                        className={`px-3 py-1 rounded text-sm ${
                          isOwned
                            ? 'bg-green-500 text-white cursor-default'
                            : minting
                              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                              : 'bg-purple-500 text-white hover:bg-purple-600'
                        }`}
                      >
                        {isOwned ? 'Owned' : 'Mint NFT'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User's Owned NFTs Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Your NFT Collection</h2>
          {userNfts.length > 0 ? (
            <div className="bg-white rounded-lg p-6">
              <p className="text-center text-gray-600 mb-4">
                You own {userNfts.length} NFTs from this collection!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {userNfts.map((nft) => (
                  <div key={nft.id} className="border rounded-lg p-3 text-center">
                    <div className="relative h-32 w-full mb-2">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="object-cover rounded w-full h-32"
                        onError={(e) => {
                          e.target.src = 'https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmZ8antBrQPFjCW3nY7aSpLWZCSeam7cmXBjXkXNqnQCnx/2.jpg';
                        }}
                      />
                    </div>
                    <h4 className="font-semibold text-sm truncate">{nft.name}</h4>
                    <p className="text-xs text-gray-500">ID: #{nft.id}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-gray-600">You don&apos;t own any NFTs yet.</p>
              <button 
                onClick={() => mintNFT(0)} 
                disabled={minting}
                className={`mt-4 px-4 py-2 rounded ${
                  minting 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
              >
                {minting ? 'Minting...' : 'Mint Your First NFT'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}