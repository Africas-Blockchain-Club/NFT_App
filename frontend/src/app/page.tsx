'use client';

import { useState, useEffect } from 'react';

export default function CharityNFTLanding() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock user data - replace with actual authentication logic
  useEffect(() => {
    // Check if user is logged in (this would come from your auth system)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    // Simulate login
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Simulate logout
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-purple-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
              <span className="text-white">❤️</span>
            </div>
            <span className="text-white text-xl font-bold">CharityNFT</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#how" className="text-white hover:text-pink-300 transition">How It Works</a>
            <a href="#tech" className="text-white hover:text-pink-300 transition">Technology</a>
            <a href="#charities" className="text-white hover:text-pink-300 transition">Charities</a>
            <a href="#faq" className="text-white hover:text-pink-300 transition">FAQ</a>
          </div>
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button 
                  onClick={() => window.location.href = '/signup'}
                  className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Sign Up
                </button>
                <button 
                  onClick={handleLogin}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Support Charities with <span className="text-pink-400">Zero-Friction</span> NFT Purchases
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Buy beautiful digital art NFTs while supporting your favorite causes. We cover gas fees so you can donate seamlessly.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition flex items-center">
                <span className="mr-2">💎</span> Explore NFTs
              </button>
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition flex items-center">
                <span className="mr-2">❤️</span> Support Causes
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute top-0 left-0 w-full h-full bg-purple-500 rounded-2xl shadow-2xl transform rotate-6"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-pink-500 rounded-2xl shadow-2xl transform -rotate-6"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center p-4">
                <div className="text-center text-white">
                  <span className="text-5xl mb-4">❤️</span>
                  <h3 className="text-2xl font-bold mb-2">Hope for Children</h3>
                  <p className="text-sm">100% of proceeds go to support education initiatives</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Support your favorite charities in three simple steps without worrying about gas fees or seed phrases.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-2xl p-6 transition hover:shadow-xl hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Easy Sign Up</h3>
              <p className="text-gray-600">Create an account with social login. No crypto wallet setup needed - we handle everything for you.</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-2xl p-6 transition hover:shadow-xl hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Choose NFT & Charity</h3>
              <p className="text-gray-600">Browse our collection of exclusive NFTs and select which charity you want to support.</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-700 to-pink-600rounded-2xl p-6 transition hover:shadow-xl hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💝</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Purchase & Support</h3>
              <p className="text-gray-600">Complete your purchase with traditional payment methods. 100% of proceeds go to your chosen charity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="tech" className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Powered by Cutting-Edge Technology</h2>
          <p className="text-xl text-gray-100 text-center max-w-3xl mx-auto mb-16">
            We use the latest blockchain innovations to make charitable giving seamless and secure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center text-white transition hover:shadow-xl hover:-translate-y-1">
              <div className="text-4xl mb-4">⚒️</div>
              <h3 className="text-2xl font-bold mb-4">Foundry</h3>
              <p>Smart contract development framework for secure, tested, and gas-efficient contracts.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center text-white transition hover:shadow-xl hover:-translate-y-1">
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="text-2xl font-bold mb-4">ZeroDev</h3>
              <p>Account abstraction powered by ZeroDev for gasless transactions and social logins.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center text-white transition hover:shadow-xl hover:-translate-y-1">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="text-2xl font-bold mb-4">IPFS/Pinata</h3>
              <p>Decentralized storage for NFT metadata and assets, ensuring permanence and accessibility.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center text-white transition hover:shadow-xl hover:-translate-y-1">
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-2xl font-bold mb-4">Scroll Sepolia</h3>
              <p>Ethereum Layer 2 solution for scalable, low-cost transactions with Ethereum-level security.</p>
            </div>
          </div>
          
          <div className="mt-16 bg-purple-800/30 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">How Account Abstraction Helps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full p-3 mr-4">
                  <span className="text-white">⛽</span>
                </div>
                <div>
                  <h4 className="text-white text-lg font-bold mb-2">Gasless Transactions</h4>
                  <p className="text-gray-200">We cover all transaction fees so you can focus on supporting causes.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full p-3 mr-4">
                  <span className="text-white">👤</span>
                </div>
                <div>
                  <h4 className="text-white text-lg font-bold mb-2">Social Logins</h4>
                  <p className="text-gray-200">Sign in with familiar methods - no seed phrases or private keys to manage.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full p-3 mr-4">
                  <span className="text-white">🛡️</span>
                </div>
                <div>
                  <h4 className="text-white text-lg font-bold mb-2">Enhanced Security</h4>
                  <p className="text-gray-200">Multi-factor authentication and transaction security built into the protocol.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full p-3 mr-4">
                  <span className="text-white">⚡</span>
                </div>
                <div>
                  <h4 className="text-white text-lg font-bold mb-2">Batch Transactions</h4>
                  <p className="text-gray-200">Multiple actions combined into one transaction for efficiency and simplicity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charity Partners */}
      <section id="charities" className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Support Amazing Causes</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
            100% of proceeds from NFT sales go directly to these verified charitable organizations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 transition hover:shadow-xl hover:-translate-y-1 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-500 text-3xl">❤️</span>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Medical Research</h3>
              <p className="text-gray-600 text-center">Funding cutting-edge research for diseases affecting millions worldwide.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 transition hover:shadow-xl hover:-translate-y-1 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-500 text-3xl">🌿</span>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Environmental Protection</h3>
              <p className="text-gray-600 text-center">Preserving natural habitats and combating climate change through conservation efforts.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 transition hover:shadow-xl hover:-translate-y-1 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-500 text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Education Access</h3>
              <p className="text-gray-600 text-center">Providing educational resources and opportunities to underserved communities globally.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition">
              View All Charities
            </button>
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
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition hover:shadow-xl hover:-translate-y-1">
              <div className="h-48 bg-purple-500 flex items-center justify-center">
                <span className="text-white text-6xl">🕊️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Peace Doves</h3>
                <p className="text-gray-200 mb-4">Symbolizing hope and harmony across nations</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">0.1 ETH</span>
                  <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">View Details</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition hover:shadow-xl hover:-translate-y-1">
              <div className="h-48 bg-blue-500 flex items-center justify-center">
                <span className="text-white text-6xl">🌊</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Ocean Guardians</h3>
                <p className="text-gray-200 mb-4">Protecting marine life and ecosystems</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">0.2 ETH</span>
                  <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">View Details</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition hover:shadow-xl hover:-translate-y-1">
              <div className="h-48 bg-green-500 flex items-center justify-center">
                <span className="text-white text-6xl">🌱</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Future Growth</h3>
                <p className="text-gray-200 mb-4">Representing sustainable development and reforestation</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">0.15 ETH</span>
                  <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-10">
            Join us in supporting meaningful causes through the power of blockchain technology and digital art.
          </p>
          <button className="bg-white text-purple-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition mx-2">
            Create Account
          </button>
          <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition mx-2">
            View NFT Collection
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                  <span className="text-white">❤️</span>
                </div>
                <span className="text-white text-xl font-bold">CharityNFT</span>
              </div>
              <p className="mt-2">Making charitable giving accessible through technology</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">Discord</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
            <p>© 2023 CharityNFT. All rights reserved. Built with ❤️ for a better world. We Fake</p>
          </div>
        </div>
      </footer>
    </div>
  );
}