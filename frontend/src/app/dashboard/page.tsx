'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  ownedNFTs?: number[]; // Array of NFT IDs that the user owns
}

export default function Dashboard() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [userNfts, setUserNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Your IPFS CID and metadata
  const CID = 'QmdnHnBXSe9okMiGYJCPMfLevi6rrsFfd6bNJ3HEchPHZU';
  const BASE_URL = `https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/${CID}`;
  const IMAGE_BASE_URL = 'https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmZ8antBrQPFjCW3nY7aSpLWZCSeam7cmXBjXkXNqnQCnx';

  // Function to fetch users data
  const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  // Function to update user data (add NFT ownership)
  const updateUserNFTs = async (username: string, nftId: number): Promise<boolean> => {
    try {
      const response = await fetch('/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          nftId,
        }),
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error updating user NFTs:', error);
      return false;
    }
  };

  // Function to mint an NFT
  const mintNFT = async (tokenId: number) => {
    if (!user) return;
    
    setMinting(true);
    setMintStatus('Processing your purchase...');
    
    try {
      // Simulate purchase process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user's owned NFTs in the JSON file
      const success = await updateUserNFTs(user.username, tokenId);
      
      if (success) {
        setMintStatus(`Successfully purchased NFT #${tokenId}!`);
        
        // Update local state
        const mintedNft = nfts.find(nft => nft.id === tokenId);
        if (mintedNft) {
          setUserNfts(prev => [...prev, mintedNft]);
          
          // Update the user object
          setUser(prev => prev ? {
            ...prev,
            ownedNFTs: [...(prev.ownedNFTs || []), tokenId]
          } : null);
        }
        
        // Refresh users data
        const updatedUsers = await fetchUsers();
        setAllUsers(updatedUsers);
      } else {
        setMintStatus('Purchase failed. Please try again.');
      }
      
    } catch (error) {
      console.error('Minting failed:', error);
      setMintStatus('Purchase failed. Please try again.');
    } finally {
      setMinting(false);
    }
  };

  useEffect(() => {
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
        
        // Fetch users data and set the current user
        const users = await fetchUsers();
        setAllUsers(users);
        
        // For demo purposes, let's assume the first user is logged in
        // In a real app, you'd get this from authentication
        const currentUser = users[0] || null;
        setUser(currentUser);
        
        if (currentUser && currentUser.ownedNFTs) {
          // Get the NFTs that the user owns
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
  }, [BASE_URL, IMAGE_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading your NFTs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">🎨 Your NFT Dashboard</h1>
          <div className="text-white">
            <p>Welcome, <span className="font-bold">{user?.username}</span></p>
            <p>{userNfts.length} NFTs owned</p>
            <p className="text-sm opacity-80 truncate max-w-xs">{user?.smartAccountAddress}</p>
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
                        {isOwned ? 'Owned' : 'Purchase NFT'}
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
                {minting ? 'Purchasing...' : 'Purchase Your First NFT'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}