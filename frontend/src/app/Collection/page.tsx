'use client';

import { useState, useEffect } from 'react';

interface CharityNFT {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  price: string;
}

const CharityNFTCollection = () => {
  const [nfts, setNfts] = useState<CharityNFT[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedNft, setSelectedNft] = useState<CharityNFT | null>(null);

  useEffect(() => {
    // Simulate API call to fetch NFT data
    const fetchNFTs = async () => {
      // In a real app, this would be an API call
      const mockData: CharityNFT[] = [
        {
          id: 1,
          name: "Ocean Guardians",
          description: "Protecting marine life and ecosystems from pollution and overfishing",
          emoji: "🌊",
          color: "bg-blue-500",
          price: "0.2 ETH"
        },
        {
          id: 2,
          name: "Forest Preservation",
          description: "Conserving rainforests and preventing deforestation worldwide",
          emoji: "🌳",
          color: "bg-green-600",
          price: "0.15 ETH"
        },
        {
          id: 3,
          name: "Clean Water Initiative",
          description: "Providing access to clean drinking water in developing nations",
          emoji: "💧",
          color: "bg-blue-400",
          price: "0.18 ETH"
        },
        {
          id: 4,
          name: "Wildlife Rescue",
          description: "Rescuing and rehabilitating endangered species around the world",
          emoji: "🐾",
          color: "bg-amber-600",
          price: "0.25 ETH"
        },
        {
          id: 5,
          name: "Climate Action",
          description: "Funding research and initiatives to combat climate change",
          emoji: "🌎",
          color: "bg-teal-500",
          price: "0.22 ETH"
        },
        {
          id: 6,
          name: "Disaster Relief",
          description: "Providing immediate aid to communities affected by natural disasters",
          emoji: "🚑",
          color: "bg-red-500",
          price: "0.3 ETH"
        },
        {
          id: 7,
          name: "Education Equality",
          description: "Ensuring all children have access to quality education regardless of location",
          emoji: "📚",
          color: "bg-indigo-500",
          price: "0.16 ETH"
        },
        {
          id: 8,
          name: "Medical Research",
          description: "Funding cutting-edge research for diseases affecting millions worldwide",
          emoji: "❤️",
          color: "bg-red-400",
          price: "0.28 ETH"
        },
        {
          id: 9,
          name: "Hunger Relief",
          description: "Providing meals and food security to communities in need",
          emoji: "🍲",
          color: "bg-orange-500",
          price: "0.12 ETH"
        },
        {
          id: 10,
          name: "Refugee Support",
          description: "Assisting refugees with shelter, food, and integration services",
          emoji: "🕊️",
          color: "bg-gray-400",
          price: "0.2 ETH"
        }
      ];
      setNfts(mockData);
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

      {/* NFT Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="nft-card bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
              onClick={() => handleNftClick(nft)}
            >
              <div className={`${nft.color} h-32 flex items-center justify-center`}>
                <span className="emoji text-5xl transition-transform duration-300 hover:scale-110">
                  {nft.emoji}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{nft.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{nft.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-bold">{nft.price}</span>
                  <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

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
                <div className={`${selectedNft.color} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-2xl">{selectedNft.emoji}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{selectedNft.name}</h4>
                  <p className="text-sm text-gray-500">{selectedNft.price}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors">
                <i className="fab fa-ethereum"></i>
                <span>Connect with MetaMask</span>
              </button>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors">
                <i className="fab fa-google"></i>
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