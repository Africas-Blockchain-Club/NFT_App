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
import { User } from './types';

const ZERODEV_RPC = process.env.ZERODEV_RPC!;

// NFT contract setup
const contractAddress = "0xC9FEefAe44ddbA865e57209b6139a114662F4C81";
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

// Create new blockchain account for user
export const createUserAccount = async (): Promise<{ privateKey: string; smartAccountAddress: string }> => {
  const privateKey = generatePrivateKey();
  const signer = privateKeyToAccount(privateKey);

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer,
    entryPoint,
    kernelVersion: KERNEL_V3_1,
  });

  const account = await createKernelAccount(publicClient, {
    entryPoint,
    plugins: {
      sudo: ecdsaValidator,
    },
    kernelVersion: KERNEL_V3_1,
  });

  return {
    privateKey,
    smartAccountAddress: account.address
  };
};

// Mint NFT for user
export const mintNFTForUser = async (user: User) => {
  const signer = privateKeyToAccount(user.privateKey as `0x${string}`);

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer,
    entryPoint,
    kernelVersion: KERNEL_V3_1,
  });

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

  const userOpHash = await kernelClient.sendUserOperation({
    callData: await kernelClient.account.encodeCalls([
      {
        to: contractAddress,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: contractABI,
          functionName: "safeMint",
          args: [account.address],
        }),
      },
    ]),
  });

  const receipt = await kernelClient.waitForUserOperationReceipt({
    hash: userOpHash,
  });

  return receipt.receipt.transactionHash;
};

// Get user's NFT balance
export const getUserNFTBalance = async (user: User): Promise<number> => {
  const balance = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: contractABI,
    functionName: "balanceOf",
    args: [user.smartAccountAddress as `0x${string}`], // <- Add type assertion here
  });

  return Number(balance);
};