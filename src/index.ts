import "dotenv/config";
import * as readline from 'readline';
import { handleNewUser } from "./newUser";
import { handleReturningUser } from "./returningUser";

// Check environment variables
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
    console.log("🎨 NFT Minting System");
    console.log("1. New User (Generate new wallet)");
    console.log("2. Returning User (Use existing private key)");
    
    const choice = await askQuestion("Choose option (1 or 2): ");
    
    if (choice === '1') {
      await handleNewUser();
    } else if (choice === '2') {
      await handleReturningUser();
    } else {
      throw new Error("Invalid choice. Please enter 1 or 2");
    }
    
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
  } finally {
    rl.close();
    process.exit(0);
  }
};

main();0x1ec07d0bc7846d43ed70a7bc498ddb87857a36890358f0244bb25959b034d6bd