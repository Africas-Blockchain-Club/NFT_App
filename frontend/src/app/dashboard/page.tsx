'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// NFT data structure based on your CID metadata
interface NFT {
  id: number;
  name: string;
  description: string;
  image: string;
}

export default function Dashboard() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ username: 'DemoUser', nftCount: 3 }); // Mock user data

  // Your IPFS CID and metadata
  const CID = 'QmdnHnBXSe9okMiGYJCPMfLevi6rrsFfd6bNJ3HEchPHZU';
  const BASE_URL = `https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/${CID}`;
  const IMAGE_BASE_URL = 'https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmZ8antBrQPFjCW3nY7aSpLWZCSeam7cmXBjXkXNqnQCnx';

  useEffect(() => {
    // Fetch all NFT metadata from your CID
    const fetchNFTs = async () => {
      try {
        const nftData: NFT[] = [];
        
        // Fetch metadata for NFTs 0 through 9 (based on your CID)
        for (let i = 0; i < 10; i++) {
          try {
            const response = await fetch(`${BASE_URL}/${i}.json`);
            if (response.ok) {
              const metadata = await response.json();
              nftData.push({
                id: i,
                name: metadata.name,
                description: metadata.description,
                image: `${IMAGE_BASE_URL}/${i}.jpg`
              });
            }
          } catch (error) {
            console.log(`Metadata for NFT ${i} not available`);
          }
        }
        
        setNfts(nftData);
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
            <p>Welcome, <span className="font-bold">{user.username}</span></p>
            <p>{user.nftCount} NFTs owned</p>
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
            {nfts.map((nft) => (
              <div key={nft.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-nft.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{nft.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{nft.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">ID: #{nft.id}</span>
                    <button className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600">
                      Mint NFT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User's Owned NFTs Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Your NFT Collection</h2>
          {user.nftCount > 0 ? (
            <div className="bg-white rounded-lg p-6">
              <p className="text-center text-gray-600">
                You own {user.nftCount} NFTs from this collection!
              </p>
              <div className="flex justify-center mt-4 space-x-4">
                {[...Array(user.nftCount)].map((_, index) => (
                  <div key={index} className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold">#{index}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-gray-600">You don't own any NFTs yet.</p>
              <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Mint Your First NFT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}