// CharityNFTCollection.jsx
'use client';

import { useState, useEffect } from 'react';

interface CharityNFT {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  price: string;
  featured?: boolean;
  longDescription?: string;
  artist?: string;
}

const CharityNFTCollection = () => {
  const [nfts, setNfts] = useState<CharityNFT[]>([]);
  const [featuredNfts, setFeaturedNfts] = useState<CharityNFT[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedNft, setSelectedNft] = useState<CharityNFT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        // Fetch NFT data from external file
        const response = await fetch('/nft_metadata.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch NFT data: ${response.status}`);
        }
        
        const text = await response.text();
        
        // Extract the array from the file (this is a simple approach)
        // For a more robust solution, consider using a JSON file instead
        const arrayMatch = text.match(/\[[\s\S]*\]/);
        
        if (arrayMatch) {
          try {
            // This is a simplified approach - in production, use proper JSON
            const nftData = eval(`(${arrayMatch[0]})`);
            setNfts(nftData);
            setFeaturedNfts(nftData.filter((nft: CharityNFT) => nft.featured));
          } catch (e) {
            console.error("Error parsing NFT data:", e);
            setError("Failed to parse NFT data");
          }
        } else {
          setError("No valid NFT data found");
        }
      } catch (err) {
        console.error("Error loading NFT data:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const handleNftClick = (nft: CharityNFT) => {
    setSelectedNft(nft);
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    setSelectedNft(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading NFT data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-indigo-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
              C
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Charity NFTs</h1>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-indigo-700 transition-all">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Support Causes You Care About</h2>
          <p className="text-xl text-gray-600 mb-8">Each NFT represents a donation to a charitable cause. Collect them all to make a difference.</p>
          <div className="bg-white rounded-2xl p-6 shadow-lg inline-block">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-600 font-medium">{nfts.length} charities supported</span>
            </div>
          </div>
        </div>
      </section>

      {/* NFT Showcase */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Featured NFT Collections</h2>
          <p className="text-xl text-gray-100 text-center max-w-3xl mx-auto mb-16">
            Exclusive digital art created by talented artists who support our charitable mission.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredNfts.map((nft) => (
              <div 
                key={nft.id} 
                className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onClick={() => handleNftClick(nft)}
              >
                <div className={`h-48 bg-gradient-to-br ${nft.color} flex items-center justify-center relative`}>
                  <span className="text-white text-6xl">{nft.emoji}</span>
                  {/* Hover overlay for description */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center p-4 transition-all duration-300">
                    <p className="text-white text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {nft.longDescription}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
                  <p className="text-gray-200 mb-4">{nft.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">{nft.price}</span>
                    <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All NFTs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">All Charity NFTs</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                onClick={() => handleNftClick(nft)}
              >
                <div className={`h-32 bg-gradient-to-br ${nft.color} flex items-center justify-center relative`}>
                  <span className="text-white text-4xl">
                    {nft.emoji}
                  </span>
                  {/* Hover overlay for description */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center p-3 transition-all duration-300">
                    <p className="text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {nft.longDescription}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{nft.name}</h3>
                  <p className="text-gray-600 text-xs mb-2">{nft.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-bold text-sm">{nft.price}</span>
                    <span className="text-xs text-gray-500">View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 transform transition-transform duration-300 scale-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h3>
              <p className="text-gray-600">Please connect your wallet to view this NFT</p>
            </div>
            
            {selectedNft && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg flex items-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-gradient-to-br ${selectedNft.color}`}>
                  <span className="text-2xl text-white">{selectedNft.emoji}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{selectedNft.name}</h4>
                  <p className="text-sm text-gray-500">{selectedNft.price}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors">
                <span>Connect with MetaMask</span>
              </button>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors">
                <span>Sign in with Google</span>
              </button>
              <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Use Email Instead
              </button>
            </div>
            
            <button 
              onClick={handleCloseLogin}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 CharityNFTs. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-purple-600 hover:text-purple-800">Terms</a>
            <a href="#" className="text-purple-600 hover:text-purple-800">Privacy</a>
            <a href="#" className="text-purple-600 hover:text-purple-800">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CharityNFTCollection;