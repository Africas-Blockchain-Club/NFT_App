import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { generatePrivateKey } from 'viem/accounts'; // Import the proper function
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
    // Generate a new private key using viem's built-in function
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);
    
    const user: User = {
      username,
      password,
      privateKey: privateKey,
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

// Remove the custom generatePrivateKey function since we're using viem's built-in one

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