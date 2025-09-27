'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechnologyStack from '@/components/TechnologyStack';
import Footer from '@/components/Footer';
import HowItWorksComponent from '@/components/HowItWorksComponent';
import StarBar from '@/components/StatsBar';

export default function CharityNFTLanding() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7C6D9] to-[#FFEFF3]">
      <Navbar />
      <Hero/>
      <StarBar/>
      <HowItWorksComponent/>
      <TechnologyStack/>
      <Footer/>
    </div>
  );
}