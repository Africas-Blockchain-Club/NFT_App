'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { createUserAccount, mintNFTForUser, getUserNFTBalance } from '@/lib/blockchain';

export default function Signup() {
  const router = useRouter();
  const { login, refreshUsers } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [accountDetails, setAccountDetails] = useState<{
    username: string;
    smartAccountAddress: string;
    transactionHash?: string;
    balance?: number;
  } | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setAccountDetails(null);

    try {
      console.log('\n🎉 Creating Your Account\n');
      
      console.log('\n⏳ Creating your blockchain account...');
      setSuccess('⏳ Creating your blockchain account...');
      
      // Create blockchain account using your existing function
      const { privateKey, smartAccountAddress } = await createUserAccount();
      
      // Create user object matching your database structure
      const user = {
        username: formData.username,
        password: formData.password,
        privateKey,
        smartAccountAddress,
        createdAt: new Date(),
        ownedNFTs: [] as number[]
      };
      
      // Save user to database via API
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          createdAt: user.createdAt.toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }

      const { user: savedUser } = await response.json();
      
      setSuccess('✅ Account created successfully!');
      setAccountDetails({
        username: savedUser.username,
        smartAccountAddress: savedUser.smartAccountAddress
      });
      
      console.log('\n✅ Account created successfully!');
      console.log('📋 Your account details:');
      console.log(`   Username: ${savedUser.username}`);
      console.log(`   Smart Account: ${savedUser.smartAccountAddress}`);
      
      // Auto-login the user using your context
      const loginSuccess = await login(savedUser.username, savedUser.password);
      if (!loginSuccess) {
        throw new Error('Failed to auto-login after signup');
      }

      // Refresh users list in context
      await refreshUsers();

      // Auto-mint welcome NFT using your existing function
      console.log('\n🎨 Minting your welcome NFT...');
      setSuccess('🎨 Minting your welcome NFT...');
      
      const txHash = await mintNFTForUser(savedUser);
      console.log(`✅ NFT minted! Transaction: ${txHash}`);
      
      // Update user with owned NFT (ID 0 for welcome NFT)
      const updateResponse = await fetch('/api/users/update-nfts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: savedUser.username,
          nftId: 0
        }),
      });

      if (!updateResponse.ok) {
        console.warn('Failed to update user NFTs, but account was created');
      }

      // Get NFT balance using your existing function
      const balance = await getUserNFTBalance({ ...savedUser, ownedNFTs: [0] });
      console.log(`📊 Your NFT balance: ${balance}`);
      
      setSuccess('✅ NFT minted successfully!');
      setAccountDetails(prev => ({
        ...prev!,
        transactionHash: txHash,
        balance
      }));
      
      console.log('\n🔐 Please save your password securely!');
      console.log('   You will need it to access your account and NFTs.');
      
      // Refresh users again to get updated NFT data
      await refreshUsers();
      
      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
      
    } catch (err: any) {
      console.error('❌ Signup failed:', err.message);
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">🎉 Create Your Account</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            ❌ {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
        {!success && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                minLength={3}
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
        )}
        
        {accountDetails && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold mb-3">📋 Account Details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Username:</strong> {accountDetails.username}</p>
              <p><strong>Smart Account:</strong> 
                <span className="font-mono text-xs block truncate">{accountDetails.smartAccountAddress}</span>
              </p>
              {accountDetails.transactionHash && (
                <p><strong>NFT Transaction:</strong> 
                  <span className="font-mono text-xs block truncate">{accountDetails.transactionHash}</span>
                </p>
              )}
              {accountDetails.balance !== undefined && (
                <p><strong>NFT Balance:</strong> {accountDetails.balance}</p>
              )}
            </div>
            
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
              <p className="text-sm text-yellow-800">
                🔐 <strong>Important:</strong> Please save your password securely! 
                You will need it to access your account and NFTs.
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <h4 className="text-sm font-semibold mb-1">ℹ️ How it works:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Creates a new Ethereum wallet using ZeroDev</li>
            <li>• Mints a welcome NFT on Scroll Sepolia</li>
            <li>• Saves your account to the database</li>
            <li>• Logs you in automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
}