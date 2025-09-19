// utils/mintNFT.ts
'use client';

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

const ZERODEV_RPC = process.env.NEXT_PUBLIC_ZERODEV_RPC!;
const contractAddress = "0x5b9DF92f3F9cAFa7d804f81FA9A5db68cc0AE52a";
const contractABI = parseAbi([
  "function safeMint(address _to) public",
  "function balanceOf(address owner) external view returns (uint256 balance)",
]);

const chain = scrollSepolia;
const publicClient = createPublicClient({
  transport: http(ZERODEV_RPC),
  chain,
});
const entryPoint = getEntryPoint("0.7");

export const mintNFT = async (privateKey: `0x${string}`) => {
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

  return { 
    success: true, 
    transactionHash: receipt.receipt.transactionHash,
    newBalance: Number(newBalance)
  };
};