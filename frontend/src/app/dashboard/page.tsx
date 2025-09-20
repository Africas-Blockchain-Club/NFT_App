'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/hooks/useAuth';
import { mintNFT } from '@/utils/mintNFT';

interface Charity {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  price: string;
}

interface NFT {
  id: number;
  name: string;
  description: string;
  image: string;
  charity?: string;
  charityId?: number;
  price?: string;
  emoji?: string;
  color?: string;
}

export default function Dashboard() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [charities, setCharities] = useState<Charity[]>([]);
  const [userNfts, setUserNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'owned'>('available');
  const [mintingStatus, setMintingStatus] = useState<{ [key: number]: string }>({});
  const { currentUser, logout, updateUserNFTs } = useUser();
  
  useAuth();

  const fetchCharities = async () => {
    try {
      const response = await fetch('/nft_metadata.json');
      const charityData = await response.json();
      setCharities(charityData.charities);
      return charityData.charities;
    } catch (error) {
      console.error('Error fetching charities:', error);
      return [];
    }
  };

  const fetchNFTs = async () => {
    if (!currentUser) return;

    try {
      // Fetch charities first
      const charityData = await fetchCharities();
      
      // Fetch NFTs
      const response = await fetch('/nft_metadata.json');
      const nftData: NFT[] = await response.json();
      
      // Assign charity information to each NFT
      const nftsWithCharity = nftData.map((nft, index) => {
        const charityIndex = index % charityData.length;
        const charity = charityData[charityIndex];
        
        return {
          ...nft,
          charity: charity.name,
          charityId: charity.id,
          price: charity.price,
          emoji: charity.emoji,
          color: charity.color,
          name: `${charity.name} NFT #${nft.id}`
        };
      });
      
      setNfts(nftsWithCharity);
      
      if (currentUser.ownedNFTs) {
        const ownedNfts = nftsWithCharity.filter(nft => 
          currentUser.ownedNFTs?.includes(nft.id)
        );
        setUserNfts(ownedNfts);
      }
      
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      // Fallback to charity-based NFTs if metadata fails
      const charityData = await fetchCharities();
      const fallbackNfts: NFT[] = [];
      
      for (let i = 0; i < 10; i++) {
        const charityIndex = i % charityData.length;
        const charity = charityData[charityIndex];
        
        fallbackNfts.push({
          id: i,
          name: `${charity.name} NFT #${i}`,
          description: `This NFT supports ${charity.name}. ${charity.description}`,
          image: '', // Will use emoji as fallback
          charity: charity.name,
          charityId: charity.id,
          price: charity.price,
          emoji: charity.emoji,
          color: charity.color
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
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [currentUser]);

  const handleMint = async (nftId: number) => {
    if (!currentUser?.privateKey) {
      console.log('User not authenticated or private key missing');
      return;
    }

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
          console.log(`NFT #${nftId} minted successfully! Transaction: ${result.transactionHash}`);
        }
      } else {
        setMintingStatus(prev => ({ ...prev, [nftId]: 'error' }));
        console.log('Minting failed');
      }
    } catch (error) {
      console.error('Minting error:', error);
      setMintingStatus(prev => ({ ...prev, [nftId]: 'error' }));
      console.log('Minting failed: ' + (error as Error).message);
    } finally {
      // Clear status after 3 seconds
      setTimeout(() => {
        setMintingStatus(prev => ({ ...prev, [nftId]: '' }));
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading your NFTs...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-purple-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">🎨 Your NFT Dashboard</h1>
            <p className="text-purple-200 mt-1">Support charities through digital collectibles</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="text-white text-right">
              <p className="font-semibold">{currentUser.username}</p>
              <p className="text-sm text-purple-200">{userNfts.length} NFTs owned</p>
              <p className="text-xs opacity-80 truncate max-w-xs mt-1">{currentUser.smartAccountAddress}</p>
              <div className="flex gap-2 mt-3 justify-end">
                <button 
                  onClick={logout}
                  className="px-3 py-1 bg-red-500/80 text-white rounded-lg text-sm hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Link 
            href="/"
            className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition inline-flex items-center border border-white/20"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-8 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20 w-fit">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'available' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Available NFTs
          </button>
          <button
            onClick={() => setActiveTab('owned')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'owned' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Your Collection ({userNfts.length})
          </button>
        </div>

        {/* Available NFTs */}
        {activeTab === 'available' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              Available NFT Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nfts.map((nft) => {
                const isOwned = userNfts.some(owned => owned.id === nft.id);
                const status = mintingStatus[nft.id];
                
                return (
                  <div key={nft.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden transition hover:scale-105 hover:shadow-2xl">
                    <div className={`h-48 ${nft.color || 'bg-purple-500'} flex items-center justify-center`}>
                      <span className="text-white text-6xl">{nft.emoji || '🎨'}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white text-lg mb-2">{nft.name}</h3>
                      <p className="text-purple-200 text-sm mb-3 line-clamp-2">{nft.description}</p>
                      
                      <div className="mb-4">
                        <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded">
                          Supports: {nft.charity}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-purple-200">ID: #{nft.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          isOwned ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-white/10 text-white/70 border border-white/20'
                        }`}>
                          {isOwned ? 'Owned' : 'Available'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white font-bold">{nft.price}</span>
                      </div>
                      
                      {!isOwned && (
                        <button
                          onClick={() => handleMint(nft.id)}
                          disabled={status === 'minting' || status === 'success'}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                        >
                          {status === 'minting' ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Minting...
                            </>
                          ) : status === 'success' ? (
                            'Minted!'
                          ) : status === 'error' ? (
                            'Try Again'
                          ) : (
                            'Mint NFT'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* User's NFT Collection */}
        {activeTab === 'owned' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
              Your NFT Collection
            </h2>
            {userNfts.length > 0 ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <p className="text-center text-purple-200 mb-6 text-lg">
                  You own {userNfts.length} charity NFT{userNfts.length !== 1 ? 's' : ''}!
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {userNfts.map((nft) => (
                    <div key={nft.id} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center transition hover:scale-105">
                      <div className={`h-32 w-full mb-3 rounded-lg flex items-center justify-center ${nft.color || 'bg-purple-500'}`}>
                        <span className="text-4xl">{nft.emoji || '🎨'}</span>
                      </div>
                      <h4 className="font-semibold text-white text-sm truncate">{nft.name}</h4>
                      <p className="text-xs text-purple-200 mt-1">ID: #{nft.id}</p>
                      <p className="text-xs text-white/60 mt-2 truncate">Supports: {nft.charity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🎨</div>
                <p className="text-purple-200 text-lg mb-4">You don&apos;t own any NFTs yet.</p>
                <p className="text-white/70 mb-6">Mint your first NFT to support a charitable cause!</p>
                <button
                  onClick={() => setActiveTab('available')}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-6 rounded-lg hover:from-purple-700 hover:to-pink-600 transition"
                >
                  Browse NFTs
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}