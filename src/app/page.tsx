'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import TechnologyStack from '@/components/TechnologyStack';
import Footer from '@/components/Footer';
import HowItWorksComponent from '@/components/HowItWorksComponent'

export default function CharityNFTLanding() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <Hero />
              {/* Stats Bar */}
<div className="bg-white/5 backdrop-blur-md border-b border-white/10">
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">₿15.2</div>
        <div className="text-sm text-purple-300 mt-1">Total Raised</div>
      </div>
      <div>
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">42</div>
        <div className="text-sm text-purple-300 mt-1">Causes Supported</div>
      </div>
      <div>
        <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">1.2K</div>
        <div className="text-sm text-purple-300 mt-1">NFTs Collected</div>
      </div>
      <div>
        <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">95%</div>
        <div className="text-sm text-purple-300 mt-1">Direct to Charity</div>
      </div>
    </div>
  </div>
</div>
      <HowItWorksComponent />
      <TechnologyStack />
      <Footer />
    </div>
  );
}