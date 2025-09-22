'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import TechnologyStack from '@/components/TechnologyStack';
import Footer from '@/components/Footer';

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
        <div className="bg-white border-b border-teal-100">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-teal-600">₿15.2</div>
                <div className="text-sm text-teal-500">Total Raised</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600">42</div>
                <div className="text-sm text-teal-500">Causes Supported</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600">1.2K</div>
                <div className="text-sm text-teal-500">NFTs Collected</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600">95%</div>
                <div className="text-sm text-teal-500">Direct to Charity</div>
              </div>
            </div>
          </div>
        </div>
      <HowItWorks />
      <TechnologyStack />
      <Footer />
    </div>
  );
}