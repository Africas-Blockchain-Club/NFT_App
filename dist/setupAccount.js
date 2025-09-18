"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const ecdsa_validator_1 = require("@zerodev/ecdsa-validator");
const sdk_1 = require("@zerodev/sdk");
const constants_1 = require("@zerodev/sdk/constants");
if (!process.env.ZERODEV_RPC) {
    throw new Error("ZERODEV_RPC is not set");
}
const ZERODEV_RPC = process.env.ZERODEV_RPC;
// The NFT contract we will be interacting with
const contractAddress = "0xC9FEefAe44ddbA865e57209b6139a114662F4C81";
const contractABI = (0, viem_1.parseAbi)([
    "function mint(address _to) public",
    "function balanceOf(address owner) external view returns (uint256 balance)",
]);
// Construct a public client
const chain = chains_1.scrollSepolia;
const publicClient = (0, viem_1.createPublicClient)({
    transport: (0, viem_1.http)(ZERODEV_RPC),
    chain,
});
const entryPoint = (0, constants_1.getEntryPoint)("0.7");
const main = async () => {
    // Construct a signer
    const privateKey = (0, accounts_1.generatePrivateKey)();
    const signer = (0, accounts_1.privateKeyToAccount)(privateKey);
    // Construct a validator
    const ecdsaValidator = await (0, ecdsa_validator_1.signerToEcdsaValidator)(publicClient, {
        signer,
        entryPoint,
        kernelVersion: constants_1.KERNEL_V3_1,
    });
    // Construct a Kernel account
    const account = await (0, sdk_1.createKernelAccount)(publicClient, {
        entryPoint,
        plugins: {
            sudo: ecdsaValidator,
        },
        kernelVersion: constants_1.KERNEL_V3_1,
    });
    const zerodevPaymaster = (0, sdk_1.createZeroDevPaymasterClient)({
        chain,
        transport: (0, viem_1.http)(ZERODEV_RPC),
    });
    // Construct a Kernel account client
    const kernelClient = (0, sdk_1.createKernelAccountClient)({
        account,
        chain,
        bundlerTransport: (0, viem_1.http)(ZERODEV_RPC),
        paymaster: {
            getPaymasterData(userOperation) {
                return zerodevPaymaster.sponsorUserOperation({ userOperation });
            },
        },
    });
    const accountAddress = kernelClient.account.address;
    console.log("My account:", accountAddress);
    // Send a UserOp
    const userOpHash = await kernelClient.sendUserOperation({
        callData: await kernelClient.account.encodeCalls([
            {
                to: contractAddress,
                value: BigInt(0),
                data: (0, viem_1.encodeFunctionData)({
                    abi: contractABI,
                    functionName: "mint",
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
    // Print NFT balance
    const nftBalance = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "balanceOf",
        args: [accountAddress],
    });
    console.log(`NFT balance: ${nftBalance}`);
    process.exit(0);
};
main();
