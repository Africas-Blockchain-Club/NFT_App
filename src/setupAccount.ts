import "dotenv/config";
import { createPublicClient, encodeFunctionData, http, parseAbi } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { scrollSepolia } from "viem/chains";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import {
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import { getEntryPoint, KERNEL_V3_1 } from "@zerodev/sdk/constants";

// Check environment variables
if (!process.env.ZERODEV_RPC) {
  throw new Error("ZERODEV_RPC is not set");
}

if (!process.env.APP_PRIVATE_KEY) {
  throw new Error("APP_PRIVATE_KEY is not set. Add your private key to .env file");
}

const ZERODEV_RPC = process.env.ZERODEV_RPC;
const APP_PRIVATE_KEY = process.env.APP_PRIVATE_KEY;

// Validate private key format
if (!APP_PRIVATE_KEY.startsWith('0x') || APP_PRIVATE_KEY.length !== 66) {
  throw new Error("Invalid private key format. Must start with 0x and be 66 characters long");
}

// The NFT contract we will be interacting with
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

const main = async () => {
  // Use the PERSISTENT private key from environment variables
  const signer = privateKeyToAccount(APP_PRIVATE_KEY as `0x${string}`);
  console.log("Using persistent signer address:", signer.address);

  // Construct a validator
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer,
    entryPoint,
    kernelVersion: KERNEL_V3_1,
  });

  // Construct a Kernel account (SAME address every time)
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

  // Construct a Kernel account client
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
  console.log("My smart account:", accountAddress);

  // Check current NFT balance first
  const currentBalance = await publicClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
    args: [accountAddress],
  });

  console.log(`Current NFT balance: ${currentBalance}`);

  // Send a UserOp to mint NFT
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

  // Print new NFT balance
  const newBalance = await publicClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
    args: [accountAddress],
  });
  console.log(`New NFT balance: ${newBalance}`);

  process.exit(0);
};

main();