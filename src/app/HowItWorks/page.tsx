'use client';

import React, { useState, useEffect } from 'react';
import { Charity, VotingPeriod, FundAllocation } from '../types/charity';

const HowItWorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nomination' | 'voting' | 'purchase' | 'tracking'>('nomination');
  const [charities, setCharities] = useState<Charity[]>([]);
  const [currentVotingPeriod, setCurrentVotingPeriod] = useState<VotingPeriod | null>(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate fetching data
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
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-purple-800 mb-4">Voting Mechanism</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">1 Token = 1 Vote</div>
            <p className="text-sm text-purple-500 mt-2">Each token gives you one voting power</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">Quadratic Voting</div>
            <p className="text-sm text-purple-500 mt-2">Prevent whale dominance in voting</p>
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
    <div className="space-y-6">
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-red-800 mb-4">Real-time Fund Tracking</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-red-700 mb-3">On-chain Transparency</h4>
            <ul className="list-disc list-inside space-y-2 text-red-600">
              <li>All transactions recorded on blockchain</li>
              <li>Real-time balance tracking</li>
              <li>Monthly disbursement reports</li>
              <li>Charity spending verification</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-3">Progress Monitoring</h4>
            <ul className="list-disc list-inside space-y-2 text-red-600">
              <li>Impact metrics and KPIs</li>
              <li>Photo/video evidence of work</li>
              <li>Quarterly impact reports</li>
              <li>Community feedback system</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Example Fund Allocation</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">Ocean Cleanup Initiative</span>
              <span className="font-semibold">$47,500</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">95% of target reached - 15 tons of plastic removed</p>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">Education for All</span>
              <span className="font-semibold">$32,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '64%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">64% of target reached - 250 children supported</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
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

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderContent()}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community of changemakers and start supporting causes you believe in
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Explore NFT Collections
            </button>
            <button className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Learn About Voting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;