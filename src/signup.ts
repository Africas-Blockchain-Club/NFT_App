import * as readline from 'readline';
import { saveUser } from './database';
import { createUserAccount, mintNFTForUser, getUserNFTBalance } from './lib/blockchain'; 

interface User {
  username: string;
  password: string;
  privateKey: string;
  smartAccountAddress: string;
  createdAt: Date;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

export const handleSignup = async () => {
  try {
    console.log('\n🎉 Create Your Account\n');
    
    const username = await askQuestion('Choose a username: ');
    const password = await askQuestion('Choose a password: ');
    
    console.log('\n⏳ Creating your blockchain account...');
    
    // Create blockchain account
    const { privateKey, smartAccountAddress } = await createUserAccount();
    
    // Save user to database
    const user: User = {
      username,
      password,
      privateKey,
      smartAccountAddress,
      createdAt: new Date()
    };
    
    saveUser(user);
    
    console.log('\n✅ Account created successfully!');
    console.log('📋 Your account details:');
    console.log(`   Username: ${username}`);
    console.log(`   Smart Account: ${smartAccountAddress}`);
    console.log('\n🔐 Please save your password securely!');
    console.log('   You will need it to access your account and NFTs.');
    
    // Auto-mint welcome NFT
    console.log('\n🎨 Minting your welcome NFT...');
    const txHash = await mintNFTForUser(user);
    console.log(`✅ NFT minted! Transaction: ${txHash}`);
    
    const balance = await getUserNFTBalance(user);
    console.log(`📊 Your NFT balance: ${balance}`);
    
  } catch (error) {
    console.error('❌ Signup failed:', error instanceof Error ? error.message : error);
  } finally {
    rl.close();
  }
};