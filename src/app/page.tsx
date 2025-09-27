'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechnologyStack from '@/components/TechnologyStack';
import Footer from '@/components/Footer';
import HowItWorksComponent from '@/components/HowItWorksComponent'

export default function CharityNFTLanding() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7C6D9] to-[#FFEFF3]">
      <Navbar />
      <Hero />
              {/* Stats Bar */}
<div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl mx-4 md:mx-auto max-w-2xl">
  <div className="container mx-auto px-6 py-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div>
        <div className="text-2xl md:text-2xl font-bold text-pink-800">₿15.2</div>
        <div className="text-xs text-pink-900/70 mt-1 font-medium">Total Raised</div>
      </div>
      <div>
        <div className="text-2xl md:text-2xl font-bold text-purple-800">42</div>
        <div className="text-xs text-purple-900/70 mt-1 font-medium">Causes Supported</div>
      </div>
      <div>
        <div className="text-2xl md:text-2xl font-bold text-rose-800">1.2K</div>
        <div className="text-xs text-rose-900/70 mt-1 font-medium">NFTs Collected</div>
      </div>
      <div>
        <div className="text-2xl md:text-2xl font-bold text-fuchsia-800">95%</div>
        <div className="text-xs text-fuchsia-900/70 mt-1 font-medium">Direct to Charity</div>
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