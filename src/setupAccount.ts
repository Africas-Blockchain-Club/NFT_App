import "dotenv/config";
import { createPublicClient, encodeFunctionData, http, parseAbi } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { scrollSepolia } from "viem/chains";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import {
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import { getEntryPoint, KERNEL_V3_1 } from "@zerodev/sdk/constants";
import * as readline from 'readline';

// Check environment variables
if (!process.env.ZERODEV_RPC) {
  throw new Error("ZERODEV_RPC is not set");
}

const ZERODEV_RPC = process.env.ZERODEV_RPC;

// The NFT contract we will be interacting with (SAME FOR ALL USERS)
const contractAddress = "0xC9FEefAe44ddbA865e57209b6139a114662F4C81";
const contractABI = parseAbi([
  "function safeMint(address _to) public",
  "function balanceOf(address owner) external view returns (uint256 balance)",
]);

// Construct a public client
const chain = scrollSepolia;
const publicClient = createPublicClient({
  transport: http(ZERODEV_RPC),
  chain,
});
const entryPoint = getEntryPoint("0.7");

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask user question
const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

const mintNFT = async (privateKey: `0x${string}`) => {
  const userSigner = privateKeyToAccount(privateKey);
  
  console.log("====================================");
  console.log("🧑‍💼 USER SESSION");
  console.log("User EOA address:", userSigner.address);

  // Construct a validator for THIS user
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: userSigner,
    entryPoint,
    kernelVersion: KERNEL_V3_1,
  });

  // Construct a Kernel account for THIS user
  const account = await createKernelAccount(publicClient, {
    entryPoint,
    plugins: {
      sudo: ecdsaValidator,
    },
    kernelVersion: KERNEL_V3_1,
  });

  const zerodevPaymaster = createZeroDevPaymasterClient({
    chain,
    transport: http(ZERODEV_RPC),
  });

  // Construct a Kernel account client for THIS user
  const kernelClient = createKernelAccountClient({
    account,
    chain,
    bundlerTransport: http(ZERODEV_RPC),
    paymaster: {
      getPaymasterData(userOperation) {
        return zerodevPaymaster.sponsorUserOperation({ userOperation });
      },
    },
  });

  const accountAddress = kernelClient.account.address;
  console.log("User's smart account:", accountAddress);

  // Check current NFT balance for THIS user
  const currentBalance = await publicClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
    args: [accountAddress],
  });

  console.log(`User's current NFT balance: ${currentBalance}`);

  // Send a UserOp to mint NFT for THIS user
  const userOpHash = await kernelClient.sendUserOperation({
    callData: await kernelClient.account.encodeCalls([
      {
        to: contractAddress,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: contractABI,
          functionName: "safeMint",
          args: [accountAddress],
        }),
      },
    ]),
  });
  console.log("Submitted UserOp:", userOpHash);

  // Wait for the UserOp to be included on-chain
  const receipt = await kernelClient.waitForUserOperationReceipt({
    hash: userOpHash,
  });
  console.log("UserOp confirmed:", receipt.userOpHash);
  console.log("TxHash:", receipt.receipt.transactionHash);

  // Print new NFT balance for THIS user
  const newBalance = await publicClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
    args: [accountAddress],
  });
  console.log(`User's new NFT balance: ${newBalance}`);
  console.log("====================================");
};

const main = async () => {
  try {
    console.log("🎨 NFT Minting System");
    console.log("1. New User (Generate new wallet)");
    console.log("2. Returning User (Use existing private key)");
    
    const choice = await askQuestion("Choose option (1 or 2): ");
    
    let privateKey: `0x${string}`;
    
    if (choice === '1') {
      // NEW USER: Generate new private key
      privateKey = generatePrivateKey();
      console.log("\n🎉 NEW USER CREATED!");
      console.log("Save this private key for future use:");
      console.log("PRIVATE_KEY=" + privateKey);
      console.log("------------------------------------");
    } else if (choice === '2') {
      // RETURNING USER: Enter existing private key
      const inputKey = await askQuestion("Enter your private key (0x...): ");
      
      // Validate private key format
      if (!inputKey.startsWith('0x') || inputKey.length !== 66) {
        throw new Error("Invalid private key format. Must start with 0x and be 66 characters long");
      }
      
      privateKey = inputKey as `0x${string}`;
      console.log("\n👋 WELCOME BACK!");
    } else {
      throw new Error("Invalid choice. Please enter 1 or 2");
    }
    
    // Mint NFT for the user
    await mintNFT(privateKey);
    
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
  } finally {
    rl.close();
    process.exit(0);
  }
};

main();