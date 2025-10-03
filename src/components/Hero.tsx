'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
  const router = useRouter();
  const [currentCharity, setCurrentCharity] = useState(0);

  const charities = [
    { name: "Hope for Children", emoji: "❤️", description: "100% of proceeds go to support education initiatives" },
    { name: "Ocean Cleanup", emoji: "🌊", description: "Funding marine conservation efforts worldwide" },
    { name: "Wildlife Protection", emoji: "🐯", description: "Preserving endangered species habitats" },
    { name: "Medical Research", emoji: "⚕️", description: "Advancing treatments for critical diseases" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCharity((prev) => (prev + 1) % charities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
     
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
              variants={itemVariants}
            >
              Support Charities with{' '}
              <span className="text-white bg-gradient-to-r from-pink-600 to-pink-800 px-2 rounded-lg shadow-lg relative">
                Zero-Friction
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-pink-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </span>{' '}
              NFT Purchases
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-gray-900 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Buy beautiful digital art NFTs while supporting your favorite causes. 
              <span className="font-semibold text-pink-600"> We cover all gas fees</span> so 100% of your purchase goes to charity.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              variants={itemVariants}
            >
              <motion.button 
                onClick={() => router.push('/Collection')}
                className="group bg-gradient-to-r from-pink-600 to-pink-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-700 hover:to-pink-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 cursor-pointer relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Explore NFTs</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="relative z-10"
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.button>

            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-8 justify-center lg:justify-start text-center lg:text-left"
              variants={itemVariants}
            >
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">$2.4M+</span>
                <span className="text-gray-600">Raised for Charity</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">15K+</span>
                <span className="text-gray-600">NFTs Sold</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">50+</span>
                <span className="text-gray-600">Charities Supported</span>
              </div>
            </motion.div>
          </div>

          {/* NFT Card */}
          <div className="lg:w-1/2 flex justify-center">
            <motion.div 
              className="relative w-80 h-96"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Card Background Layers */}
              <div className="absolute top-0 left-0 w-full h-full bg-white rounded-3xl shadow-2xl transform rotate-3 transition-transform duration-300 hover:rotate-6"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-white to-pink-600 rounded-3xl shadow-2xl transform -rotate-3 transition-transform duration-300 hover:-rotate-6"></div>
              
              {/* Main Card */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 rounded-3xl shadow-2xl border-2 border-white/20 backdrop-blur-sm flex flex-col items-center justify-center p-8"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  key={currentCharity}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <span className="text-6xl mb-4 block">{charities[currentCharity].emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{charities[currentCharity].name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{charities[currentCharity].description}</p>
                </motion.div>
                
                {/* Progress Indicator */}
                <div className="flex gap-2 mt-6">
                  {charities.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentCharity ? 'bg-pink-600 w-6' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentCharity(index)}
                    />
                  ))}
                </div>

                {/* NFT Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                  LIMITED NFT
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}