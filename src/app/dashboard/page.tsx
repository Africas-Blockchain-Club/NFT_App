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
          image: '', 
          charity: charity.name,
          charityId: charity.id,
          price: charity.price,
          emoji: charity.emoji,
          color: charity.color.replace('bg-', '') // Remove Tailwind classes for color
        });
      }
      
      const totalNfts = 50; 
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
          color: charity.color.replace('bg-', '') 
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
        <div className="text-gray-700 text-xl flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24">
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
    <div className="min-h-screen screen bg-gradient-to-br from-[#F7C6D9] to-[#FFEFF3]">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-700">🎨 Your NFT Dashboard</h1>
            <p className="text-purple-200 mt-1">Support charities through digital collectibles</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-white/90">
            <div className="text-gray-700 text-right">
              <p className="font-semibold">{currentUser.username}</p>
              <p className="text-sm text-gray-900">{userNfts.length} NFTs owned</p>
              <p className="text-xs opacity-80 truncate max-w-xs mt-1">{currentUser.smartAccountAddress}</p>
              <div className="flex gap-2 mt-3 justify-end">
                <button 
                  onClick={logout}
                  className="px-3 py-1 bg-red-500/80 text-gray-700 rounded-lg text-sm hover:bg-red-600 transition"
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
            className="bg-pink-500 text-gray-700 px-4 py-2 rounded-lg hover:bg-white/20 transition inline-flex items-center border border-white/20"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-8 bg-pink-500 backdrop-blur-md rounded-xl p-1 border border-white/20 w-fit">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'available' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-gray-700' 
                : 'text-gray-700/70 hover:text-gray-700'
            }`}
          >
            Available NFTs
          </button>
          <button
            onClick={() => setActiveTab('owned')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'owned' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-gray-700' 
                : 'text-gray-700/70 hover:text-gray-700'
            }`}
          >
            Your Collection ({userNfts.length})
          </button>
        </div>

{/* Available NFTs */}
{activeTab === 'available' && (
  <div className="mb-8">
<h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 14 14" 
    fill="none" 
    stroke="currentColor"
    className="mr-3" 
  >
    <rect x="1" y="4" width="12" height="8" rx="1" />
    <path d="M4 4V2C4 1 5 0 6 0H8C9 0 10 1 10 2V4" />
    <path d="M1 6H13" />
  </svg>
  Available NFT Collection
</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => {
        const isOwned = userNfts.some(owned => owned.id === nft.id);
        const status = mintingStatus[nft.id];
        
return (
  <div key={nft.id} className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-white/15 h-[400px] relative">
    {/* Glow effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
    
    {/* Image/Emoji Container */}
    <div className={`h-3/4 ${nft.color || 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'} relative overflow-hidden flex items-center justify-center`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      {/* Main emoji/content */}
      <div className="relative z-10">
        <span className="text-6xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 filter drop-shadow-lg">
          {nft.emoji || '🎨'}
        </span>
      </div>
      
      {/* Status badge - positioned top right */}
      <div className="absolute top-3 right-3 z-20">
        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
          isOwned 
            ? 'bg-green-500/30 text-green-100 border border-green-500/50' 
            : 'bg-white/20 text-white/90 border border-white/30'
        }`}>
          {isOwned ? 'Owned' : 'Available'}
        </span>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 flex flex-col justify-end p-5">
        <h3 className="font-bold text-white text-xl mb-2">{nft.name}</h3>
        <p className="text-white/80 text-sm mb-3 line-clamp-2">{nft.description}</p>
        
        <div className="mb-3">
          <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded-md">
            Supports: {nft.charity}
          </span>
        </div>
        
        {!isOwned && (
          <button
            onClick={() => handleMint(nft.id)}
            disabled={status === 'minting' || status === 'success'}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-purple-500/25"
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
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Minted!
              </>
            ) : status === 'error' ? (
              'Try Again'
            ) : (
              'Mint NFT'
            )}
          </button>
        )}
      </div>
    </div>
    
    {/* Bottom info section */}
    <div className="p-4 bg-white/5 backdrop-blur-sm h-1/4 flex flex-col justify-center">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-bold text-white text-lg truncate">{nft.name}</h3>
        <span className="text-white font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {nft.price}
        </span>
      </div>
      
      <div className="flex justify-between items-center text-sm text-white/70">
        <span>ID: #{nft.id}</span>
        <div className="flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd"></path>
          </svg>
          Supports {nft.charity}
        </div>
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
            <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
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
                      <h4 className="font-semibold text-gray-700 text-sm truncate">{nft.name}</h4>
                      <p className="text-xs text-purple-200 mt-1">ID: #{nft.id}</p>
                      <p className="text-xs text-gray-700/60 mt-2 truncate">Supports: {nft.charity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🎨</div>
                <p className="text-purple-200 text-lg mb-4">You don&apos;t own any NFTs yet.</p>
                <p className="text-gray-700/70 mb-6">Mint your first NFT to support a charitable cause!</p>
                <button
                  onClick={() => setActiveTab('available')}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-gray-700 py-2 px-6 rounded-lg hover:from-purple-700 hover:to-pink-600 transition"
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