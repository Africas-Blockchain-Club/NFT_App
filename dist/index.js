"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@zerodev/sdk");
const constants_1 = require("@zerodev/sdk/constants");
const ecdsa_validator_1 = require("@zerodev/ecdsa-validator");
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const ZERODEV_RPC = 'https://rpc.zerodev.app/api/v3/61016d2a-e0df-4350-929c-d5f2110700d1/chain/84532';
const chain = chains_1.baseSepolia;
const entryPoint = (0, constants_1.getEntryPoint)("0.7");
const kernelVersion = constants_1.KERNEL_V3_1;
const main = async () => {
    // Construct a signer
    const privateKey = (0, accounts_1.generatePrivateKey)();
    const signer = (0, accounts_1.privateKeyToAccount)(privateKey);
    // Construct a public client
    const publicClient = (0, viem_1.createPublicClient)({
        // Use your own RPC provider in production (e.g. Infura/Alchemy).
        transport: (0, viem_1.http)(ZERODEV_RPC),
        chain
    });
    // Construct a validator
    const ecdsaValidator = await (0, ecdsa_validator_1.signerToEcdsaValidator)(publicClient, {
        signer,
        entryPoint,
        kernelVersion
    });
    // Construct a Kernel account
    const account = await (0, sdk_1.createKernelAccount)(publicClient, {
        plugins: {
            sudo: ecdsaValidator,
        },
        entryPoint,
        kernelVersion
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
        // Required - the public client
        client: publicClient,
        paymaster: {
            getPaymasterData(userOperation) {
                return zerodevPaymaster.sponsorUserOperation({ userOperation });
            }
        },
    });
    const accountAddress = kernelClient.account.address;
    console.log("My account:", accountAddress);
    // Send a UserOp
    const userOpHash = await kernelClient.sendUserOperation({
        callData: await kernelClient.account.encodeCalls([{
                to: viem_1.zeroAddress,
                value: BigInt(0),
                data: "0x",
            }]),
    });
    console.log("UserOp hash:", userOpHash);
    console.log("Waiting for UserOp to complete...");
    await kernelClient.waitForUserOperationReceipt({
        hash: userOpHash,
        timeout: 1000 * 15,
    });
    console.log("UserOp completed: https://base-sepolia.blockscout.com/op/" + userOpHash);
    process.exit();
};
main();
