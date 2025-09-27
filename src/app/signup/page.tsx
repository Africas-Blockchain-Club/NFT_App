'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { createUserAccount } from '@/lib/blockchain';

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
    privateKey?: string;
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
      
      console.log('🔑 Generated Private Key:', privateKey);
      console.log('📬 Generated Smart Account Address:', smartAccountAddress);
      
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
        smartAccountAddress: savedUser.smartAccountAddress,
        privateKey: privateKey
      });
      
      console.log('\n✅ Account created successfully!');
      console.log('📋 Your account details:');
      console.log(`   Username: ${savedUser.username}`);
      console.log(`   Smart Account: ${savedUser.smartAccountAddress}`);
      console.log(`   Private Key: ${privateKey}`);
      
      console.log('Refreshing users data...');
      await refreshUsers();

      // Add a small delay to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 100));

      await refreshUsers();
            
      // Redirect to login after a delay
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (err: unknown) {
      console.error('❌ Signup failed:', err instanceof Error ? err.message : 'Unknown error');
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-[#F7C6D9] to-[#FFEFF3] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-pink-500 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
        
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header section with gradient */}
          <div className="bg-gradient-to-r from-pink-600 to-pink-800 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-gray-700 text-2xl">🎉</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-700">Create Your Account</h1>
            <p className="text-gray-700/90 mt-2">Join us in supporting charitable causes</p>
          </div>
          
          <div className="p-8">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-500/20 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </div>
            )}
            
            {!success && (
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="bg-white/80 border border-white/20 text-gray-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent block w-full pl-10 p-3"
                      placeholder="Choose a username"
                      required
                      minLength={3}
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="bg-white/80 border border-white/20 text-gray-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-pint-400 focus:border-transparent block w-full pl-10 p-3"
                      placeholder="Create a password"
                      required
                      minLength={6}
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
className="w-full bg-pink-500 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-900 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </form>
            )}
            
            {accountDetails && (
              <div className="mt-6 p-6 bg-gray-700 border border-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                  </svg>
                  Account Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-700 font-medium">Username:</p>
                    <p className="text-gray-900">{accountDetails.username}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Smart Account:</p>
                    <p className="font-mono text-xs text-gray-900 truncate bg-white/5 p-2 rounded">
                      {accountDetails.smartAccountAddress}
                    </p>
                  </div>
                  {accountDetails.privateKey && (
                    <div>
                      <p className="text-gray-700 font-medium">Private Key:</p>
                      <p className="font-mono text-xs text-red-200 bg-red-500/10 p-2 rounded border border-red-500/20">
                        {accountDetails.privateKey}
                      </p>
                      <p className="text-red-300 text-xs mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Warning: Never share your private key!
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                  <p className="text-yellow-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <strong>Important:</strong> Please save your password securely! You will need it to access your account.
                  </p>
                </div>
              </div>
            )}
            
            <div className="mt-8 text-center">
             
              <p className="mt-4">
                <Link href="/" className="text-gray-700 hover:text-gray-900 transition flex items-center justify-center text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Home
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-gray-700/10 border border-blue-500/20 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                How it works:
              </h4>
              <ul className="text-xs text-pink-600 space-y-1">
                <li className="flex items-center">• Creates a new Ethereum wallet using ZeroDev</li>
                <li className="flex items-center">• Saves your account to the database</li>
                <li className="flex items-center">• Redirects you to login after creation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}