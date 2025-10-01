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
  const [showScrollDemo, setShowScrollDemo] = useState(false);
  const { currentUser, logout, updateUserNFTs } = useUser();
  
  useAuth();

  const fetchNFTs = async () => {
    if (!currentUser) return;

    try {
      const response = await fetch('/nft_metadata.json');
      const data = await response.json();
      const charityData = data.charities || [];
      
      const nftsWithCharity = [];
      const totalNfts = charityData.length;
      
      for (let i = 0; i < totalNfts; i++) {
        const charity = charityData[i];
        
        nftsWithCharity.push({
          id: i + 1,
          name: `${charity.name} NFT #${i + 1}`,
          description: `This exclusive NFT supports ${charity.name}. ${charity.description}`,
          image: '',
          charity: charity.name,
          charityId: charity.id,
          price: charity.price,
          emoji: charity.emoji,
          color: charity.color
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
      const fallbackNfts: NFT[] = [];
      const fallbackCharities = [
        { id: 1, name: "Default Charity", description: "Supporting good causes", price: "0.1 ETH", emoji: "❤️", color: "bg-red-500" }
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
        const success = await updateUserNFTs(nftId);
        
        if (success) {
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
      setTimeout(() => {
        setMintingStatus(prev => ({ ...prev, [nftId]: '' }));
      }, 3000);
    }
  };

  const viewOnScroll = () => {
    if (userNfts.length === 0) {
      alert("You don't have any NFTs to view on Scroll yet. Mint one first!");
      return;
    }
    setShowScrollDemo(true);
  };

  const openScrollExplorer = () => {
    // This would open the actual Scroll explorer with the user's address
    if (currentUser?.smartAccountAddress) {
      const explorerUrl = `https://sepolia.scrollscan.com/address/${currentUser.smartAccountAddress}`;
      window.open(explorerUrl, '_blank');
    }
    setShowScrollDemo(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7C6D9] to-[#FFEFF3] flex items-center justify-center">
        <div className="text-gray-700 text-xl flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500 mr-3"></div>
          Loading your NFTs...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7C6D9] to-[#FFEFF3]">
      {/* Scroll Demo Modal */}
      {showScrollDemo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-white/30">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">View Your NFTs on Scroll</h3>
              <p className="text-gray-600 mb-4">
                Follow these steps to view your NFTs on the Scroll blockchain explorer:
              </p>
              
              <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <span className="text-gray-700">Click &quot;Open Scroll Explorer&quot; below</span>
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <span className="text-gray-700">Find your transaction history</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <span className="text-gray-700">Look for NFT mint transactions</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowScrollDemo(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={openScrollExplorer}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Open Scroll Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-700">🎨 Your NFT Dashboard</h1>
            <p className="text-purple-800 mt-1">Support charities through digital collectibles</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-white/30">
            <div className="text-gray-700 text-right">
              <p className="font-semibold">{currentUser.username}</p>
              <p className="text-sm text-gray-600">{userNfts.length} NFTs owned</p>
              <p className="text-xs opacity-80 truncate max-w-xs mt-1">{currentUser.smartAccountAddress}</p>
              <div className="flex gap-2 mt-3 justify-end">
                <button 
                  onClick={viewOnScroll}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition flex items-center"
                  title="View your NFTs on Scroll blockchain"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  View on Scroll
                </button>
                <button 
                  onClick={logout}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
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
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition inline-flex items-center border border-white/20"
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
                ? 'bg-white text-pink-600' 
                : 'text-white hover:text-white/90'
            }`}
          >
            Available NFTs
          </button>
          <button
            onClick={() => setActiveTab('owned')}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === 'owned' 
                ? 'bg-white text-pink-600' 
                : 'text-white hover:text-white/90'
            }`}
          >
            Your Collection ({userNfts.length})
          </button>
        </div>

        {/* Available NFTs */}
        {activeTab === 'available' && (
          <div className="mb-8">
            <header className="bg-pink-500 backdrop-blur-md rounded-xl p-6 mb-8 text-center border border-white/20">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">🌊 NFT Charity Collection</h1>
              <p className="text-pink-100 text-lg">Explore and support charitable causes through digital collectibles</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nfts.map((nft) => {
                const isOwned = userNfts.some(owned => owned.id === nft.id);
                const status = mintingStatus[nft.id];
                
                return (
                  <div
                    key={nft.id}
                    className="bg-white/50 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-[400px] flex flex-col group"
                  >
                    <div className={`h-3/5 bg-gradient-to-br ${nft.color} flex items-center justify-center`}>
                      <span className="text-6xl">{nft.emoji}</span>
                    </div>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-700 mb-2">{nft.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">{nft.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold">{nft.price}</span>
                        <span className="bg-white/90 text-gray-700 text-xs px-3 py-1 rounded-full">
                          {nft.charity}
                        </span>
                      </div>

                      {/* Mint Button */}
                      {!isOwned && (
                        <button
                          onClick={() => handleMint(nft.id)}
                          disabled={status === 'minting' || status === 'success'}
                          className={`w-full mt-3 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                            status === 'minting' 
                              ? 'bg-gray-400 text-white cursor-not-allowed' 
                              : status === 'success'
                              ? 'bg-green-500 text-white'
                              : status === 'error'
                              ? 'bg-red-500 text-white'
                              : 'bg-pink-500 text-white hover:bg-pink-600'
                          }`}
                        >
                          {status === 'minting' ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Minting...
                            </div>
                          ) : status === 'success' ? (
                            '✓ Minted!'
                          ) : status === 'error' ? (
                            'Try Again'
                          ) : (
                            'Mint NFT'
                          )}
                        </button>
                      )}

                      {/* Owned Badge */}
                      {isOwned && (
                        <div className="w-full mt-3 py-2 px-4 bg-green-500 text-white rounded-lg text-center font-semibold">
                          ✓ Owned
                        </div>
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
            <header className="bg-pink-500 backdrop-blur-md rounded-xl p-6 mb-8 text-center border border-white/20">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">🌟 Your NFT Collection</h1>
              <p className="text-pink-100 text-lg">Your charitable digital collectibles</p>
            </header>

            {userNfts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userNfts.map((nft) => (
                  <div
                    key={nft.id}
                    className="bg-white/50 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-[400px] flex flex-col group"
                  >
                    <div className={`h-3/5 bg-gradient-to-br ${nft.color} flex items-center justify-center`}>
                      <span className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                        {nft.emoji}
                      </span>
                    </div>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-700 mb-2">{nft.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">{nft.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold">{nft.price}</span>
                        <span className="bg-white/90 text-gray-700 text-xs px-3 py-1 rounded-full">
                          {nft.charity}
                        </span>
                      </div>
                      
                      <div className="w-full mt-3 py-2 px-4 bg-green-500 text-white rounded-lg text-center font-semibold">
                        ✓ Owned
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-gray-700 text-lg mb-4">You don&apos;t own any NFTs yet.</p>
                <p className="text-gray-600 mb-6">Mint your first NFT to support a charitable cause!</p>
                <button
                  onClick={() => setActiveTab('available')}
                  className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition"
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