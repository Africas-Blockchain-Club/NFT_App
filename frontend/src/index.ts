import "dotenv/config";
import * as readline from 'readline';
import { handleSignup } from './signup';
import { handleLogin } from './login';

if (!process.env.ZERODEV_RPC) {
  throw new Error("ZERODEV_RPC is not set");
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

const main = async () => {
  try {
    console.log('🌈 Welcome to NFT Charity Platform!');
    console.log('====================================');
    console.log('1. Sign Up (New User)');
    console.log('2. Login (Returning User)');
    console.log('3. Exit');
    
    const choice = await askQuestion('\nChoose an option (1-3): ');
    
    switch (choice) {
      case '1':
        await handleSignup();
        break;
      case '2':
        await handleLogin();
        break;
      case '3':
        console.log('👋 Goodbye!');
        break;
      default:
        console.log('❌ Invalid option');
    }
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
  } finally {
    rl.close();
    process.exit(0);
  }
};

main();