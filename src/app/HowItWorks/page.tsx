'use client';

import React, { useState, useEffect } from 'react';
import { Charity, VotingPeriod } from '../types/charity';
import Navbar from '@/components/Navbar';



const HowItWorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nomination' | 'voting' | 'purchase' | 'tracking'>('nomination');
  const [charities, setCharities] = useState<Charity[]>([]);
  const [currentVotingPeriod, setCurrentVotingPeriod] = useState<VotingPeriod | null>(null);

  useEffect(() => {
    const mockCharities: Charity[] = [
      {
        id: '1',
        name: 'Ocean Cleanup Initiative',
        description: 'Dedicated to removing plastic from oceans',
        website: 'https://oceancleanup.org',
        votes: 1250,
        status: 'approved',
        nftCollection: 'ocean-cleanup-nft'
      },
      {
        id: '2',
        name: 'Education for All',
        description: 'Providing education to underprivileged children',
        website: 'https://educationforall.org',
        votes: 980,
        status: 'approved',
        nftCollection: 'education-nft'
      }
    ];

    const mockVotingPeriod: VotingPeriod = {
      id: 'current',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      status: 'active',
      nominatedCharities: mockCharities
    };

    setCharities(mockCharities);
    setCurrentVotingPeriod(mockVotingPeriod);
  }, []);

  const processSteps = [
    {
      id: 'nomination',
      title: '1. Charity Nomination',
      description: 'How charities are selected for consideration',
      icon: '🏆'
    },
    {
      id: 'voting',
      title: '2. Community Voting',
      description: 'Token holders decide which charities to support',
      icon: '🗳️'
    },
    {
      id: 'purchase',
      title: '3. NFT Purchase',
      description: 'Buy NFTs to fund the selected charities',
      icon: '🖼️'
    },
    {
      id: 'tracking',
      title: '4. Fund Tracking',
      description: 'Monitor how donations are being used',
      icon: '📊'
    }
  ];

  const renderNominationContent = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-green-800 mb-4">Nomination Process</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">Who Can Nominate?</h4>
            <ul className="list-disc list-inside space-y-2 text-green-600">
              <li>Token holders with minimum 100 tokens</li>
              <li>Verified charity representatives</li>
              <li>Community members with proven track record</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">Requirements</h4>
            <ul className="list-disc list-inside space-y-2 text-green-600">
              <li>Valid charity registration documents</li>
              <li>Clear mission statement and goals</li>
              <li>Transparent financial reporting history</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Nomination Timeline</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
            <span className="font-medium">Monthly nomination window (1st-7th)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
            <span className="font-medium">Verification period (8th-14th)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
            <span className="font-medium">Voting preparation (15th-21st)</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVotingContent = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 ">
        <h3 className="text-xl font-semibold text-purple-800 mb-4">Voting Mechanism</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">1 Token = 1 Vote</div>
            <p className="text-sm text-purple-500 mt-2">Each token gives you one voting power</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">Quadratic Voting</div>
            <p className="text-sm text-purple-800 mt-2">Prevent whale dominance in voting</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">Snapshot Voting</div>
            <p className="text-sm text-purple-500 mt-2">Vote without gas fees using signatures</p>
          </div>
        </div>
      </div>

      {currentVotingPeriod && (
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-800 mb-4">Current Voting Period</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-orange-600">
                Ends: {currentVotingPeriod.endDate.toLocaleDateString()}
              </p>
              <p className="text-sm text-orange-500">
                {charities.length} charities nominated
              </p>
            </div>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Vote Now
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPurchaseContent = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-indigo-800 mb-4">NFT Collection & Funding</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-indigo-700 mb-3">Funding Distribution</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-indigo-600">Charity Donation</span>
                <span className="font-semibold">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-600">Platform Maintenance</span>
                <span className="font-semibold">10%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-600">Artist Royalties</span>
                <span className="font-semibold">5%</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-700 mb-3">Smart Contract Security</h4>
            <ul className="list-disc list-inside space-y-2 text-indigo-600">
              <li>Funds locked in multi-sig wallet</li>
              <li>Automatic monthly disbursements</li>
              <li>Transparent on-chain tracking</li>
              <li>Regular security audits</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-teal-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-teal-800 mb-4">Available NFT Collections</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {charities.map(charity => (
            <div key={charity.id} className="bg-white p-4 rounded-lg border border-teal-200">
              <h5 className="font-semibold text-teal-700">{charity.name}</h5>
              <p className="text-sm text-teal-600 mt-2">{charity.description}</p>
              <button className="w-full mt-3 bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition-colors">
                View Collection
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

const renderTrackingContent = () => (
  <div className="space-y-8">
    {/* Real-time Fund Tracking Section */}
    <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl border border-red-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="bg-red-100 p-3 rounded-lg mr-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-red-900">Real-time Fund Tracking</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-5 rounded-lg border border-red-100">
          <h4 className="font-bold text-red-800 mb-4 text-lg flex items-center">
            <span className="bg-red-200 w-2 h-2 rounded-full mr-3"></span>
            On-chain Transparency
          </h4>
          <ul className="space-y-3 text-red-700">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              All transactions recorded on blockchain
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Real-time balance tracking
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Monthly disbursement reports
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Charity spending verification
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-red-100">
          <h4 className="font-bold text-red-800 mb-4 text-lg flex items-center">
            <span className="bg-red-200 w-2 h-2 rounded-full mr-3"></span>
            Progress Monitoring
          </h4>
          <ul className="space-y-3 text-red-700">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Impact metrics and KPIs
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Photo/video evidence of work
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Quarterly impact reports
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Community feedback system
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Example Fund Allocation Section */}
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="bg-gray-100 p-3 rounded-lg mr-4">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Example Fund Allocation</h3>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-800 text-lg">Ocean Cleanup Initiative</span>
            <span className="font-bold text-green-600 text-xl">$47,500</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full shadow-sm" 
              style={{ width: '95%' }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-green-600 font-medium">95% of target reached</span>
            <span className="text-gray-500">15 tons of plastic removed</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-800 text-lg">Education for All</span>
            <span className="font-bold text-blue-600 text-xl">$32,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" 
              style={{ width: '64%' }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-600 font-medium">64% of target reached</span>
            <span className="text-gray-500">250 children supported</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
  const renderContent = () => {
    switch (activeTab) {
      case 'nomination':
        return renderNominationContent();
      case 'voting':
        return renderVotingContent();
      case 'purchase':
        return renderPurchaseContent();
      case 'tracking':
        return renderTrackingContent();
      default:
        return renderNominationContent();
    }
  };
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How Our Charity NFT Platform Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming NFT purchases into real-world impact through transparent, 
            community-driven charitable giving
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {processSteps.map(step => (
            <button
              key={step.id}
              onClick={() => setActiveTab(step.id as any)}
              className={`p-6 rounded-lg text-center transition-all duration-300 ${
                activeTab === step.id
                  ? 'bg-white shadow-lg border-2 border-blue-500 transform scale-105'
                  : 'bg-gray-100 border-2 border-transparent hover:bg-white hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;