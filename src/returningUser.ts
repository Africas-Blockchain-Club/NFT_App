import * as readline from 'readline';
import { mintNFT } from "./mintNFT";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

export const handleReturningUser = async () => {
  try {
    // RETURNING USER: Enter existing private key
    const inputKey = await askQuestion("Enter your private key (0x...): ");
    
    // Validate private key format
    if (!inputKey.startsWith('0x') || inputKey.length !== 66) {
      throw new Error("Invalid private key format. Must start with 0x and be 66 characters long");
    }
    
    console.log("\n👋 WELCOME BACK!");
    
    // Mint NFT for the returning user
    const result = await mintNFT(inputKey as `0x${string}`);
    
    rl.close();
    return result;
    
  } catch (error) {
    rl.close();
    throw error;
  }
};