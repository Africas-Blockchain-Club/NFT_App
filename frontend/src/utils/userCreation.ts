import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

export interface User {
  username: string;
  password: string;
  privateKey: string;
  smartAccountAddress: string;
  createdAt: string;
  ownedNFTs: number[];
}

export async function createUserAccount(username: string, password: string): Promise<User> {
  try {
    // Generate a new private key
    const account = privateKeyToAccount(`0x${generatePrivateKey()}`);
    
    const user: User = {
      username,
      password,
      privateKey: account.privateKey,
      smartAccountAddress: account.address,
      createdAt: new Date().toISOString(),
      ownedNFTs: []
    };

    return user;
  } catch (error) {
    console.error('Error creating user account:', error);
    throw new Error('Failed to create user account');
  }
}

function generatePrivateKey(): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function saveUserToFile(user: User): Promise<void> {
  try {
    // This would typically call an API endpoint to save the user
    // For now, we'll handle this in the signup component
    console.log('User created:', user);
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Failed to save user');
  }
}