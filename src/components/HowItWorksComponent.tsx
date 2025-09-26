'use client';

import React, { useState } from 'react';

interface Charity {
  id: string;
  name: string;
  description: string;
  website: string;
  votes: number;
  status: string;
  nftCollection: string;
}

interface VotingPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  nominatedCharities: Charity[];
}

const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nomination' | 'voting' | 'purchase' | 'tracking'>('nomination');

  const charities: Charity[] = [
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

  const currentVotingPeriod: VotingPeriod = {
    id: 'current',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    status: 'active',
    nominatedCharities: charities
  };

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
    <div className="space-y-8">
      {/* Nomination Process Section */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <div className="flex items-center mb-6">
          <div className="bg-purple-500/20 p-3 rounded-xl mr-4">
            <div className="text-2xl">🏆</div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nomination Process
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-4 text-lg flex items-center">
              <span className="bg-purple-400 w-3 h-3 rounded-full mr-3 shadow-lg"></span>
              Who Can Nominate?
            </h4>
            <ul className="space-y-3 text-purple-200">
              <li className="flex items-start bg-white/5 p-3 rounded-lg">
                <span className="text-green-400 font-bold mr-3">✓</span>
                Token holders with minimum 100 tokens
              </li>
              <li className="flex items-start bg-white/5 p-3 rounded-lg">
                <span className="text-green-400 font-bold mr-3">✓</span>
                Verified charity representatives
              </li>
              <li className="flex items-start bg-white/5 p-3 rounded-lg">
                <span className="text-green-400 font-bold mr-3">✓</span>
                Community members with proven track record
              </li>
            </ul>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-4 text-lg flex items-center">
              <span className="bg-purple-400 w-3 h-3 rounded-full mr-3 shadow-lg"></span>
              Requirements
            </h4>
            <ul className="space-y-3 text-purple-200">
              <li className="flex items-start bg-white/5 p-3 rounded-lg">
                <span className="text-blue-400 font-bold mr-3">📋</span>
                Valid charity registration documents
              </li>
              <li className="flex items-start bg-white/5 p-3 rounded-lg">
                <span className="text-blue-400 font-bold mr-3">🎯</span>
                Clear mission statement and goals
              </li>
              <li className="flex items-start bg-white/5 p-3 rounded-lg">
                <span className="text-blue-400 font-bold mr-3">💫</span>
                Transparent financial reporting history
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nomination Timeline Section */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <div className="flex items-center mb-6">
          <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
            <div className="text-2xl">📅</div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Nomination Timeline
          </h3>
        </div>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-400/30 ml-0.5"></div>
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mr-6 flex items-center justify-center shadow-lg border-2 border-purple-900">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex-1">
                <span className="font-semibold text-white text-lg">Monthly nomination window (1st-7th)</span>
                <p className="text-purple-300 text-sm mt-1">Submit charity nominations during this period</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mr-6 flex items-center justify-center shadow-lg border-2 border-blue-900">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex-1">
                <span className="font-semibold text-white text-lg">Verification period (8th-14th)</span>
                <p className="text-blue-300 text-sm mt-1">Documents review and eligibility check</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mr-6 flex items-center justify-center shadow-lg border-2 border-green-900">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex-1">
                <span className="font-semibold text-white text-lg">Voting preparation (15th-21st)</span>
                <p className="text-green-300 text-sm mt-1">Finalize candidates for community voting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVotingContent = () => (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <div className="flex items-center mb-6">
          <div className="bg-pink-500/20 p-3 rounded-xl mr-4">
            <div className="text-2xl">🗳️</div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
            Voting Mechanism
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">1 Token = 1 Vote</div>
            <p className="text-purple-300 mt-2">Each token gives you one voting power</p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Quadratic Voting</div>
            <p className="text-blue-300 mt-2">Prevent whale dominance in voting</p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">Snapshot Voting</div>
            <p className="text-green-300 mt-2">Vote without gas fees using signatures</p>
          </div>
        </div>
      </div>

      {currentVotingPeriod && (
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md p-8 rounded-2xl border border-orange-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Current Voting Period</h3>
              <p className="text-orange-300">
                Ends: {currentVotingPeriod.endDate.toLocaleDateString()}
              </p>
              <p className="text-sm text-orange-200">
                {charities.length} charities nominated
              </p>
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg">
              Vote Now
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPurchaseContent = () => (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <div className="flex items-center mb-6">
          <div className="bg-indigo-500/20 p-3 rounded-xl mr-4">
            <div className="text-2xl">🖼️</div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            NFT Collection & Funding
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-4 text-lg">Funding Distribution</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-purple-300">Charity Donation</span>
                <span className="font-bold text-green-400">85%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-purple-300">Platform Maintenance</span>
                <span className="font-bold text-blue-400">10%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-purple-300">Artist Royalties</span>
                <span className="font-bold text-yellow-400">5%</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-4 text-lg">Smart Contract Security</h4>
            <ul className="space-y-3 text-purple-200">
              <li className="flex items-center p-2">
                <span className="text-green-400 mr-3">✓</span>
                Funds locked in multi-sig wallet
              </li>
              <li className="flex items-center p-2">
                <span className="text-green-400 mr-3">✓</span>
                Automatic monthly disbursements
              </li>
              <li className="flex items-center p-2">
                <span className="text-green-400 mr-3">✓</span>
                Transparent on-chain tracking
              </li>
              <li className="flex items-center p-2">
                <span className="text-green-400 mr-3">✓</span>
                Regular security audits
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <div className="flex items-center mb-6">
          <div className="bg-teal-500/20 p-3 rounded-xl mr-4">
            <div className="text-2xl">✨</div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Available NFT Collections
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charities.map(charity => (
            <div key={charity.id} className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <h5 className="font-bold text-white mb-2">{charity.name}</h5>
              <p className="text-purple-300 text-sm mb-4">{charity.description}</p>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all">
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
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <div className="flex items-center mb-6">
          <div className="bg-red-500/20 p-3 rounded-xl mr-4">
            <div className="text-2xl">📊</div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Real-time Fund Tracking
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-4 text-lg flex items-center">
              <span className="bg-red-400 w-2 h-2 rounded-full mr-3"></span>
              On-chain Transparency
            </h4>
            <ul className="space-y-3 text-red-200">
              <li className="flex items-center p-2">
                <span className="text-red-400 mr-3">•</span>
                All transactions recorded on blockchain
              </li>
              <li className="flex items-center p-2">
                <span className="text-red-400 mr-3">•</span>
                Real-time balance tracking
              </li>
              <li className="flex items-center p-2">
                <span className="text-red-400 mr-3">•</span>
                Monthly disbursement reports
              </li>
              <li className="flex items-center p-2">
                <span className="text-red-400 mr-3">•</span>
                Charity spending verification
              </li>
            </ul>
          </div>
          
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-4 text-lg flex items-center">
              <span className="bg-red-400 w-2 h-2 rounded-full mr-3"></span>
              Progress Monitoring
            </h4>
            <ul className="space-y-3 text-red-200">
              <li className="flex items-center p-2">
                <span className="text-red-400 mr-3">•</span>
                Impact metrics and KPIs
              </li>
              <li className="flex items-center p-2">
                <span className="text-red-400 mr-3">•</span>
                Photo/video evidence of work
              </li>
              <li className="flex items-center p-2">
                <span className="text-red-400 mr-3">•</span>
                Quarterly impact reports
              </li>
              <li className="flex items-center p-2">
                <span className="text-red-400 mr-3">•</span>
                Community feedback system
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <div className="flex items-center mb-6">
          <div className="bg-gray-500/20 p-3 rounded-xl mr-4">
            <div className="text-2xl">📈</div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-400 to-blue-400 bg-clip-text text-transparent">
            Example Fund Allocation
          </h3>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-white text-lg">Ocean Cleanup Initiative</span>
              <span className="font-bold text-green-400 text-xl">$47,500</span>
            </div>
            <div className="w-full bg-gray-600/50 rounded-full h-3 mb-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-teal-400 h-3 rounded-full shadow-lg" 
                style={{ width: '95%' }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-400 font-medium">95% of target reached</span>
              <span className="text-purple-300">15 tons of plastic removed</span>
            </div>
          </div>
          
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-white text-lg">Education for All</span>
              <span className="font-bold text-blue-400 text-xl">$32,000</span>
            </div>
            <div className="w-full bg-gray-600/50 rounded-full h-3 mb-3">
              <div 
                className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full shadow-lg" 
                style={{ width: '64%' }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-400 font-medium">64% of target reached</span>
              <span className="text-purple-300">250 children supported</span>
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

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            How It Works
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Transforming NFT purchases into real-world impact through transparent, 
            community-driven charitable giving
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {processSteps.map(step => (
            <button
              key={step.id}
              onClick={() => setActiveTab(step.id as any)}
              className={`p-6 rounded-2xl text-center transition-all duration-300 backdrop-blur-md border-2 ${
                activeTab === step.id
                  ? 'bg-white/10 border-purple-500 transform scale-105 shadow-xl'
                  : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-bold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-purple-300">{step.description}</p>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;