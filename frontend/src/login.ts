import * as readline from 'readline';
import { verifyUser } from './database';
import { mintNFTForUser, getUserNFTBalance } from './blockchain';
import { User } from './types';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

export const handleLogin = async () => {
  try {
    console.log('\n🔐 Login to Your Account\n');
    
    const username = await askQuestion('Username: ');
    const password = await askQuestion('Password: ');
    
    const user = verifyUser(username, password);
    
    if (!user) {
      throw new Error('Invalid username or password');
    }
    
    console.log('\n✅ Login successful!');
    console.log(`👋 Welcome back, ${username}!`);
    console.log(`📋 Your smart account: ${user.smartAccountAddress}`);
    
    // Show current balance
    const balance = await getUserNFTBalance(user);
    console.log(`📊 Your current NFT balance: ${balance}`);
    
    // Offer to mint another NFT
    const mintAnother = await askQuestion('\n🎨 Would you like to mint another NFT? (y/n): ');
    
    if (mintAnother.toLowerCase() === 'y') {
      console.log('⏳ Minting your NFT...');
      const txHash = await mintNFTForUser(user);
      console.log(`✅ NFT minted! Transaction: ${txHash}`);
      
      const newBalance = await getUserNFTBalance(user);
      console.log(`📊 Your new NFT balance: ${newBalance}`);
    }
    
    console.log('\n✨ Thank you for using our platform!');
    
  } catch (error) {
    console.error('❌ Login failed:', error instanceof Error ? error.message : error);
  } finally {
    rl.close();
  }
};