'use client';

import { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          🌈 NFT Charity Platform
        </h1>
        
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
            <div className="space-y-4">
              <button 
                onClick={() => window.location.href = '/signup'}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Sign Up
              </button>
              <button 
                onClick={() => window.location.href = '/frontend/src/login.ts'}
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your NFTs</h2>
            <p className="text-gray-600">Welcome back, user!</p>
            <button className="mt-4 w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
              Mint New NFT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}