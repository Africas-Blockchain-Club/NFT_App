'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/hooks/useAuth';
import { mintNFT } from '@/utils/mintNFT';


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
      return charityData.charities;
    } catch (error) {
      console.error('Error fetching charities:', error);
      return [];
    }
  };

const fetchNFTs = async () => {
    if (!currentUser) return;

    try {
      // Fetch the metadata file once
      const response = await fetch('/nft_metadata.json');
      const data = await response.json();
      
      // Extract charities - this exists in your file
      const charityData = data.charities || [];
      
      // Since there's no NFTs array in your file, we'll generate them dynamically
      const generatedNfts: NFT[] = [];
      
      // Generate 21 NFTs (one for each charity) or more if you want
      for (let i = 0; i < charityData.length; i++) {
        const charity = charityData[i];
        
        generatedNfts.push({
          id: i + 1,
          name: `${charity.name} NFT #${i + 1}`,
          description: `This exclusive NFT supports ${charity.name}. ${charity.description}`,
          image: '', // You can add image URLs later
          charity: charity.name,
          charityId: charity.id,
          price: charity.price,
          emoji: charity.emoji,
          color: charity.color.replace('bg-', '') // Remove Tailwind classes for color
        });
      }
      
      // If you want more NFTs than charities, you can duplicate/cycle through charities
      const totalNfts = 50; // Or whatever number you want
      const nftsWithCharity = [];
      
      for (let i = 0; i < totalNfts; i++) {
        const charityIndex = i % charityData.length;
        const charity = charityData[charityIndex];
        
        nftsWithCharity.push({
          id: i + 1,
          name: `${charity.name} NFT #${i + 1}`,
          description: `This exclusive NFT supports ${charity.name}. ${charity.description}`,
          image: '',
          charity: charity.name,
          charityId: charity.id,
          price: charity.price,
          emoji: charity.emoji,
          color: charity.color.replace('bg-', '') // Remove Tailwind prefix for CSS use
        });
      }
      
      setNfts(nftsWithCharity);
      
      if (currentUser.ownedNFTs) {
        const ownedNfts = nftsWithCharity.filter(nft => 
          currentUser.ownedNFTs?.includes(nft.id)
        );
        setUserNfts(ownedNfts);
      }
      
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      
      // Fallback with basic NFT generation
      const fallbackNfts: NFT[] = [];
      const fallbackCharities = [
        { id: 1, name: "Default Charity", description: "Supporting good causes", price: "0.1 ETH", emoji: "❤️", color: "#ff0000" }
      ];
      
      for (let i = 0; i < 10; i++) {
        const charityIndex = i % fallbackCharities.length;
        const charity = fallbackCharities[charityIndex];
        
        fallbackNfts.push({
          id: i,
          name: `${charity.name} NFT #${i}`,
          description: `This NFT supports ${charity.name}.`,
          image: '',
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 "></path>
      </svg>
      Available NFT Collection
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => {
        const isOwned = userNfts.some(owned => owned.id === nft.id);
        const status = mintingStatus[nft.id];
        
        return (
          <div key={nft.id} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-white/10 h-[400px] relative">
            {/* Image Container - Takes majority of space */}
            <div className={`h-4/4 ${nft.color || 'bg-gradient-to-br from-purple-600 to-indigo-700'} relative overflow-hidden flex items-center justify-center`}>
              <span className="text-white text-7xl transition-all duration-500 group-hover:scale-110">{nft.emoji || '🎨'}</span>
              
              {/* Overlay with essential info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-bold text-white text-xl mb-1">{nft.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  isOwned ? 'bg-green-500/30 text-green-300 border border-green-500/50' : 'bg-white/20 text-white/90 border border-white/30'
                }`}>
                  {isOwned ? 'Owned' : 'Available'}
                </span>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-4">
                <p className="text-purple-100 text-sm mb-2 line-clamp-3">{nft.description}</p>
                
                <div className="mb-2">
                  <span className="text-xs text-white/80 bg-white/10 px-2 py-1 rounded">
                    Supports: {nft.charity}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-purple-200">ID: #{nft.id}</span>
                  <span className="text-white font-bold">{nft.price}</span>
                </div>
                
                {!isOwned && (
                  <button
                    onClick={() => handleMint(nft.id)}
                    disabled={status === 'minting' || status === 'success'}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
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
            
            {/* Bottom section with additional info (visible when not hovered) */}
            <div className="p-3 transition-opacity duration-300 group-hover:opacity-0">
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-200">ID: #{nft.id}</span>
                <span className="text-white font-bold">{nft.price}</span>
              </div>
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