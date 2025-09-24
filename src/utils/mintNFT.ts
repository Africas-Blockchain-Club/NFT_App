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
const SCROLL_RPC = process.env.NEXT_PUBLIC_SCROLL_RPC!;

const contractAddress = "0x5b9DF92f3F9cAFa7d804f81FA9A5db68cc0AE52a";
const contractABI = parseAbi([
  "function safeMint(address _to) public",
  "function balanceOf(address owner) external view returns (uint256 balance)",
]);

const chain = scrollSepolia;

const publicClient = createPublicClient({
  transport: http(SCROLL_RPC),
  chain,
});

const entryPoint = getEntryPoint("0.7");

export const mintNFT = async (privateKey: `0x${string}`) => {
  try {
    console.log("🔧 Starting mintNFT function...");
    console.log("📡 Using ZeroDev RPC:", ZERODEV_RPC);
    console.log("📡 Using Scroll RPC:", SCROLL_RPC);
    
    const userSigner = privateKeyToAccount(privateKey);
    console.log("✅ EOA address:", userSigner.address);

    const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
      signer: userSigner,
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

    console.log("✅ Smart account address:", account.address);

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
          console.log("🔄 Getting paymaster data...");
          return zerodevPaymaster.sponsorUserOperation({ userOperation });
        },
      },
    });

    const currentBalance = await publicClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "balanceOf",
      args: [account.address],
    });
    console.log("📊 Current NFT balance:", currentBalance);

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
    console.log("✅ UserOp submitted:", userOpHash);

    const receipt = await kernelClient.waitForUserOperationReceipt({
      hash: userOpHash,
    });
    console.log("✅ Transaction confirmed:", receipt.receipt.transactionHash);

    const newBalance = await publicClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "balanceOf",
      args: [account.address],
    });
    console.log("📊 New NFT balance:", newBalance);

    return { 
      success: true, 
      transactionHash: receipt.receipt.transactionHash,
      newBalance: Number(newBalance)
    };
    
  } catch (error) {
    console.error("❌ Detailed minting error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return { 
      success: false, 
      error: errorMessage,
      transactionHash: null,
      newBalance: null
    };
  }
};