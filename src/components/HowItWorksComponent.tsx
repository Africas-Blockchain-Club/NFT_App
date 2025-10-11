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

type TabType = 'nomination' | 'voting' | 'purchase' | 'tracking';

interface VotingPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  nominatedCharities: Charity[];
}

interface ProcessStep {
  id: TabType;
  title: string;
  description: string;
  icon: string;
}

const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('nomination');

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

  const processSteps: ProcessStep[] = [
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
      <div className="bg-white/60 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-4 rounded-xl mr-4 shadow-lg">
            <div className="text-2xl text-white">🏆</div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Nomination Process</h3>
            <p className="text-gray-600 mt-1">How charities become eligible for funding</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
              <span className="bg-gradient-to-r from-pink-600 to-pink-700 w-3 h-3 rounded-full mr-3 shadow-sm"></span>
              Who Can Nominate?
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start bg-gradient-to-r from-white to-pink-50 p-4 rounded-lg border border-pink-100">
                <span className="text-pink-600 font-bold mr-3 text-lg">✓</span>
                Token holders with minimum 100 tokens
              </li>
              <li className="flex items-start bg-gradient-to-r from-white to-pink-50 p-4 rounded-lg border border-pink-100">
                <span className="text-pink-600 font-bold mr-3 text-lg">✓</span>
                Verified charity representatives
              </li>
              <li className="flex items-start bg-gradient-to-r from-white to-pink-50 p-4 rounded-lg border border-pink-100">
                <span className="text-pink-600 font-bold mr-3 text-lg">✓</span>
                Community members with proven track record
              </li>
            </ul>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
              <span className="bg-gradient-to-r from-pink-600 to-pink-700 w-3 h-3 rounded-full mr-3 shadow-sm"></span>
              Requirements
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start bg-gradient-to-r from-white to-pink-50 p-4 rounded-lg border border-pink-100">
                <span className="text-pink-600 font-bold mr-3 text-lg">📋</span>
                Valid charity registration documents
              </li>
              <li className="flex items-start bg-gradient-to-r from-white to-pink-50 p-4 rounded-lg border border-pink-100">
                <span className="text-pink-600 font-bold mr-3 text-lg">🎯</span>
                Clear mission statement and goals
              </li>
              <li className="flex items-start bg-gradient-to-r from-white to-pink-50 p-4 rounded-lg border border-pink-100">
                <span className="text-pink-600 font-bold mr-3 text-lg">💫</span>
                Transparent financial reporting history
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nomination Timeline Section */}
      <div className="bg-white/60 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-4 rounded-xl mr-4 shadow-lg">
            <div className="text-2xl text-white">📅</div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Nomination Timeline</h3>
            <p className="text-gray-600 mt-1">Monthly process for charity selection</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-600/50 to-pink-700/50 ml-0.5"></div>
          
          <div className="space-y-6 relative z-10">
            {[
              { step: 1, title: "Monthly nomination window (1st-7th)", desc: "Submit charity nominations during this period" },
              { step: 2, title: "Verification period (8th-14th)", desc: "Documents review and eligibility check" },
              { step: 3, title: "Voting preparation (15th-21st)", desc: "Finalize candidates for community voting" }
            ].map((item) => (
              <div key={item.step} className="flex items-center group">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full mr-6 flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">{item.step}</span>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-5 rounded-xl border border-white/20 flex-1 shadow-sm group-hover:shadow-md transition-all">
                  <span className="font-semibold text-gray-800 text-lg">{item.title}</span>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVotingContent = () => (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-4 rounded-xl mr-4 shadow-lg">
            <div className="text-2xl text-white">🗳️</div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Voting Mechanism</h3>
            <p className="text-gray-600 mt-1">Fair and transparent community voting</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "1 Token = 1 Vote", desc: "Each token gives you one voting power", icon: "⚖️" },
            { title: "Quadratic Voting", desc: "Prevent whale dominance in voting", icon: "🐋" },
            { title: "Snapshot Voting", desc: "Vote without gas fees using signatures", icon: "📸" }
          ].map((item, index) => (
            <div key={index} className="text-center p-6 bg-white/80 rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-xl font-bold text-gray-800 mb-2">{item.title}</div>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {currentVotingPeriod && (
        <div className="bg-gradient-to-r from-pink-600/20 to-pink-700/20 backdrop-blur-md p-8 rounded-2xl border border-pink-600/30 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Current Voting Period</h3>
              <p className="text-gray-700 text-lg">
                Ends: {currentVotingPeriod.endDate.toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                {charities.length} charities nominated for funding
              </p>
            </div>
            <button className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-10 py-4 rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all shadow-lg hover:shadow-xl font-semibold text-lg">
              Vote Now
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPurchaseContent = () => (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-4 rounded-xl mr-4 shadow-lg">
            <div className="text-2xl text-white">🖼️</div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">NFT Collection & Funding</h3>
            <p className="text-gray-600 mt-1">Transparent fund distribution system</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 p-6 rounded-xl border border-white/20 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-6 text-lg text-center">Funding Distribution</h4>
            <div className="space-y-4">
              {[
                { label: "Charity Donation", percent: "85%", color: "from-green-500 to-green-600" },
                { label: "Platform Maintenance", percent: "10%", color: "from-blue-500 to-blue-600" },
                { label: "Artist Royalties", percent: "5%", color: "from-purple-500 to-purple-600" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <span className={`font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent text-lg`}>
                    {item.percent}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/80 p-6 rounded-xl border border-white/20 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-6 text-lg text-center">Smart Contract Security</h4>
            <ul className="space-y-4 text-gray-700">
              {[
                "Funds locked in multi-sig wallet",
                "Automatic monthly disbursements",
                "Transparent on-chain tracking",
                "Regular security audits"
              ].map((item, index) => (
                <li key={index} className="flex items-center p-3 bg-gradient-to-r from-white to-pink-50 rounded-lg border border-pink-100">
                  <span className="text-pink-600 mr-3 text-lg">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-4 rounded-xl mr-4 shadow-lg">
            <div className="text-2xl text-white">✨</div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Available NFT Collections</h3>
            <p className="text-gray-600 mt-1">Support causes through exclusive digital art</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charities.map(charity => (
            <div key={charity.id} className="bg-white/80 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-sm hover:shadow-lg hover:border-pink-200 transition-all duration-300">
              <h5 className="font-bold text-gray-800 mb-3 text-lg">{charity.name}</h5>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{charity.description}</p>
              <button className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-3 rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all shadow-md hover:shadow-lg font-medium">
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
      <div className="bg-white/60 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-4 rounded-xl mr-4 shadow-lg">
            <div className="text-2xl text-white">📊</div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Real-time Fund Tracking</h3>
            <p className="text-gray-600 mt-1">Complete transparency from donation to impact</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 p-6 rounded-xl border border-white/20 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-6 text-lg flex items-center justify-center">
              <span className="bg-gradient-to-r from-pink-600 to-pink-700 w-2 h-2 rounded-full mr-3"></span>
              On-chain Transparency
            </h4>
            <ul className="space-y-4 text-gray-700">
              {[
                "All transactions recorded on blockchain",
                "Real-time balance tracking",
                "Monthly disbursement reports",
                "Charity spending verification"
              ].map((item, index) => (
                <li key={index} className="flex items-center p-3 bg-gradient-to-r from-white to-blue-50 rounded-lg border border-blue-100">
                  <span className="text-blue-600 mr-3 font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white/80 p-6 rounded-xl border border-white/20 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-6 text-lg flex items-center justify-center">
              <span className="bg-gradient-to-r from-pink-600 to-pink-700 w-2 h-2 rounded-full mr-3"></span>
              Progress Monitoring
            </h4>
            <ul className="space-y-4 text-gray-700">
              {[
                "Impact metrics and KPIs",
                "Photo/video evidence of work",
                "Quarterly impact reports",
                "Community feedback system"
              ].map((item, index) => (
                <li key={index} className="flex items-center p-3 bg-gradient-to-r from-white to-green-50 rounded-lg border border-green-100">
                  <span className="text-green-600 mr-3 font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-4 rounded-xl mr-4 shadow-lg">
            <div className="text-2xl text-white">📈</div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Live Fund Allocation</h3>
            <p className="text-gray-600 mt-1">Real-time tracking of fundraising progress</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {[
            { name: "Ocean Cleanup Initiative", raised: "$47,500", target: "$50,000", progress: 95, impact: "15 tons of plastic removed" },
            { name: "Education for All", raised: "$32,000", target: "$50,000", progress: 64, impact: "250 children supported" }
          ].map((project, index) => (
            <div key={index} className="bg-white/80 p-6 rounded-xl border border-white/20 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-4">
                <span className="font-bold text-gray-800 text-lg">{project.name}</span>
                <div className="text-right">
                  <span className="font-bold text-pink-600 text-xl">{project.raised}</span>
                  <span className="text-gray-600 ml-2">of ${project.target}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-pink-600 to-pink-700 h-3 rounded-full shadow-lg transition-all duration-1000" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between text-sm gap-2">
                <span className="text-pink-600 font-medium">{project.progress}% of target reached</span>
                <span className="text-gray-600">{project.impact}</span>
              </div>
            </div>
          ))}
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
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-pink-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming NFT purchases into real-world impact through transparent, 
            community-driven charitable giving
          </p>
        </div>

        {/* Process Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {processSteps.map(step => (
            <button
              key={step.id}
              onClick={() => setActiveTab(step.id)}
              className={`p-6 rounded-2xl text-center transition-all duration-300 backdrop-blur-md border-2 ${
                activeTab === step.id
                  ? 'bg-white/80 border-pink-500 transform scale-105 shadow-xl'
                  : 'bg-white/60 border-white/20 hover:bg-white/70 hover:border-pink-300 hover:shadow-lg'
              }`}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-bold text-gray-800 mb-3 text-lg">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8 shadow-xl">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;