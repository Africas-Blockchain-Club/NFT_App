'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/hooks/useAuth';
import { mintNFT } from '@/utils/mintNFT';

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
  const [refreshing, setRefreshing] = useState(false);
  const [purchasing, setPurchasing] = useState<number | null>(null);
  const [mintingStatus, setMintingStatus] = useState<{ [key: number]: string }>({});
  const { currentUser, logout, updateUserNFTs, refreshUsers } = useUser();
  
  useAuth();

  const fetchNFTs = async () => {
    if (!currentUser) return;

    setRefreshing(true);
    try {
      const response = await fetch('/nft_metadata.json');
      const nftData: NFT[] = await response.json();
      
      setNfts(nftData);
      
      if (currentUser.ownedNFTs) {
        const ownedNfts = nftData.filter(nft => 
          currentUser.ownedNFTs?.includes(nft.id)
        );
        setUserNfts(ownedNfts);
      }
      
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      const fallbackNfts: NFT[] = [];
      for (let i = 0; i < 10; i++) {
        fallbackNfts.push({
          id: i,
          name: `Urban Snap ${i}`,
          description: `This is a captivating piece of street photography, n.o ${i} of street photography, capturing the essence of urban life.`,
          image: `https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmZ8antBrQPFjCW3nY7aSpLWZCSeam7cmXBjXkXNqnQCnx/${i}.jpg`
        });
      }
      setNfts(fallbackNfts);
      
      if (currentUser.ownedNFTs) {
        const ownedNfts = fallbackNfts.filter(nft => 
          currentUser.ownedNFTs?.includes(nft.id)
        );
        setUserNfts(ownedNfts);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [currentUser]);

  const handleRefresh = async () => {
    await refreshUsers();
    await fetchNFTs();
  };

  const handleMint = async (nftId: number) => {
    if (!currentUser?.privateKey) {
      alert('User not authenticated or private key missing');
      return;
    }

    setPurchasing(nftId);
    setMintingStatus(prev => ({ ...prev, [nftId]: 'minting' }));

    try {
      const result = await mintNFT(currentUser.privateKey as `0x${string}`);
      
      if (result.success) {
        setMintingStatus(prev => ({ ...prev, [nftId]: 'success' }));
        
        // Update user's owned NFTs in context
        const success = await updateUserNFTs(nftId);
        
        if (success) {
          // Update local UI state
          const mintedNft = nfts.find(nft => nft.id === nftId);
          if (mintedNft) {
            setUserNfts(prev => [...prev, mintedNft]);
          }
          alert(`NFT #${nftId} minted successfully! Transaction: ${result.transactionHash}`);
        }
      } else {
        setMintingStatus(prev => ({ ...prev, [nftId]: 'error' }));
        alert('Minting failed');
      }
    } catch (error) {
      console.error('Minting error:', error);
      setMintingStatus(prev => ({ ...prev, [nftId]: 'error' }));
      alert('Minting failed: ' + (error as Error).message);
    } finally {
      setPurchasing(null);
      // Clear status after 3 seconds
      setTimeout(() => {
        setMintingStatus(prev => ({ ...prev, [nftId]: '' }));
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading your NFTs...</div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">🎨 Your NFT Dashboard</h1>
          <div className="text-white text-right">
            <p>Welcome, <span className="font-bold">{currentUser.username}</span></p>
            <p>{userNfts.length} NFTs owned</p>
            <p className="text-sm opacity-80 truncate max-w-xs">{currentUser.smartAccountAddress}</p>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {refreshing ? 'Refreshing...' : '🔄 Refresh'}
              </button>
              <button 
                onClick={logout}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <Link 
            href="/"
            className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            ← Back to Home
          </Link>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {refreshing ? (
              <>
                <span className="animate-spin">⏳</span>
                Refreshing...
              </>
            ) : (
              <>
                🔄 Refresh Data
              </>
            )}
          </button>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Available NFT Collection</h2>
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-white text-sm bg-purple-500 px-3 py-1 rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => {
              const isOwned = userNfts.some(owned => owned.id === nft.id);
              const isPurchasing = purchasing === nft.id;
              const status = mintingStatus[nft.id];
              
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
                    {status === 'success' && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                        MINTED!
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{nft.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{nft.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500">ID: #{nft.id}</span>
                      <span className={`px-3 py-1 rounded text-sm ${
                        isOwned ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {isOwned ? 'Owned' : 'Not Owned'}
                      </span>
                    </div>
                    {!isOwned && (
                      <button
                        onClick={() => handleMint(nft.id)}
                        disabled={isPurchasing || purchasing !== null || status === 'success'}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === 'minting' ? 'Minting...' : 
                         status === 'success' ? 'Minted!' :
                         status === 'error' ? 'Try Again' :
                         'Mint NFT'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Your NFT Collection</h2>
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-white text-sm bg-purple-500 px-3 py-1 rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
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