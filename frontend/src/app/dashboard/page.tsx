'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/hooks/useAuth';

interface NFT {
  id: number;
  name: string;
  description: string;
  image: string;
}

export default function Dashboard() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [userNfts, setUserNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useUser();
  
  // Use the auth hook to protect this page
  useAuth();

  // Your IPFS CID and metadata
  const CID = 'QmdnHnBXSe9okMiGYJCPMfLevi6rrsFfd6bNJ3HEchPHZU';
  const BASE_URL = `https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/${CID}`;
  const IMAGE_BASE_URL = 'https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmZ8antBrQPFjCW3nY7aSpLWZCSeam7cmXBjXkXNqnQCnx';

  useEffect(() => {
    if (!currentUser) return;

    // Fetch all NFT metadata from your CID
    const fetchNFTs = async () => {
      try {
        const nftData: NFT[] = [];
        
        // Fetch metadata for NFTs 0 through 9
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
  }, [currentUser, BASE_URL, IMAGE_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading your NFTs...</div>
      </div>
    );
  }

  if (!currentUser) {
    return null; // useAuth hook will handle redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">🎨 Your NFT Dashboard</h1>
          <div className="text-white text-right">
            <p>Welcome, <span className="font-bold">{currentUser.username}</span></p>
            <p>{userNfts.length} NFTs owned</p>
            <p className="text-sm opacity-80 truncate max-w-xs">{currentUser.smartAccountAddress}</p>
            <button 
              onClick={logout}
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
                      <span className={`px-3 py-1 rounded text-sm ${
                        isOwned ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {isOwned ? 'Owned' : 'Not Owned'}
                      </span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}