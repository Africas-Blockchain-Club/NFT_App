'use client';

import { useState, useEffect } from 'react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onLogin, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 fixed w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
            <span className="text-white">❤️</span>
          </div>
          <span className="text-white text-xl font-bold">CharityNFT</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#HowItWorks" className="text-white hover:text-pink-300 transition">How It Works</a>
          <a href="#tech" className="text-white hover:text-pink-300 transition">Technology</a>
          <a href="#charities" className="text-white hover:text-pink-300 transition">Charities</a>
          <a href="#faq" className="text-white hover:text-pink-300 transition">FAQ</a>
        </div>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <button 
              onClick={onLogout}
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
                onClick={() => window.location.href = '/login'}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}