'use client';

import { useState, useEffect } from 'react';

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

export default function NFTExplorePage() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNFTs = async () => {
    try {
      // In a real app, this would fetch from your API
      const mockNFTs: NFT[] = [
        {
          id: 1,
          name: "Ocean Guardians",
          description: "This NFT represents a commitment to protecting marine life and ecosystems from pollution and overfishing.",
          image: "",
          charity: "Ocean Conservation",
          price: "0.2 ETH",
          emoji: "🌊",
          color: "from-blue-400 to-blue-700"
        },
        {
          id: 2,
          name: "Forest Preservation",
          description: "By acquiring this NFT, you're supporting efforts to conserve rainforests and prevent deforestation.",
          image: "",
          charity: "Rainforest Alliance",
          price: "0.15 ETH",
          emoji: "🌳",
          color: "from-green-500 to-green-800"
        },
        {
          id: 3,
          name: "Clean Water Initiative",
          description: "This NFT supports initiatives that provide access to clean drinking water in developing nations.",
          image: "",
          charity: "Water.org",
          price: "0.18 ETH",
          emoji: "💧",
          color: "from-blue-300 to-blue-600"
        },
        {
          id: 4,
          name: "Wildlife Rescue",
          description: "Your purchase directly contributes to rescuing and rehabilitating endangered species worldwide.",
          image: "",
          charity: "WWF",
          price: "0.25 ETH",
          emoji: "🐾",
          color: "from-amber-500 to-amber-800"
        },
        {
          id: 5,
          name: "Climate Action",
          description: "This NFT funds research and initiatives to combat climate change and create a sustainable future.",
          image: "",
          charity: "Climate Reality Project",
          price: "0.22 ETH",
          emoji: "🌎",
          color: "from-teal-400 to-teal-700"
        },
        {
          id: 6,
          name: "Education Equality",
          description: "This NFT helps ensure all children have access to quality education regardless of location.",
          image: "",
          charity: "Room to Read",
          price: "0.16 ETH",
          emoji: "📚",
          color: "from-indigo-400 to-indigo-700"
        }
      ];

      setNfts(mockNFTs);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchNFTs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
          Loading NFT collection...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <header className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 text-center border border-white/20">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">🌊 NFT Charity Collection</h1>
          <p className="text-purple-200 text-lg">Explore and support charitable causes through digital collectibles</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-[400px] flex flex-col"
            >
              <div className={`h-3/5 bg-gradient-to-br ${nft.color} flex items-center justify-center`}>
                <span className="text-6xl">{nft.emoji}</span>
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
                <p className="text-purple-200 text-sm mb-4 flex-grow">{nft.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">{nft.price}</span>
                  <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">
                    {nft.charity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}