"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_1 = require("@zerodev/sdk");
var constants_1 = require("@zerodev/sdk/constants");
var ecdsa_validator_1 = require("@zerodev/ecdsa-validator");
var viem_1 = require("viem");
var accounts_1 = require("viem/accounts");
var chains_1 = require("viem/chains");
var ZERODEV_RPC = 'https://rpc.zerodev.app/api/v3/61016d2a-e0df-4350-929c-d5f2110700d1/chain/84532';
var chain = chains_1.baseSepolia;
var entryPoint = (0, constants_1.getEntryPoint)("0.7");
var kernelVersion = constants_1.KERNEL_V3_1;
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var privateKey, signer, publicClient, ecdsaValidator, account, zerodevPaymaster, kernelClient, accountAddress, userOpHash, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                privateKey = (0, accounts_1.generatePrivateKey)();
                signer = (0, accounts_1.privateKeyToAccount)(privateKey);
                publicClient = (0, viem_1.createPublicClient)({
                    // Use your own RPC provider in production (e.g. Infura/Alchemy).
                    transport: (0, viem_1.http)(ZERODEV_RPC),
                    chain: chain
                });
                return [4 /*yield*/, (0, ecdsa_validator_1.signerToEcdsaValidator)(publicClient, {
                        signer: signer,
                        entryPoint: entryPoint,
                        kernelVersion: kernelVersion
                    })
                    // Construct a Kernel account
                ];
            case 1:
                ecdsaValidator = _d.sent();
                return [4 /*yield*/, (0, sdk_1.createKernelAccount)(publicClient, {
                        plugins: {
                            sudo: ecdsaValidator,
                        },
                        entryPoint: entryPoint,
                        kernelVersion: kernelVersion
                    })];
            case 2:
                account = _d.sent();
                zerodevPaymaster = (0, sdk_1.createZeroDevPaymasterClient)({
                    chain: chain,
                    transport: (0, viem_1.http)(ZERODEV_RPC),
                });
                kernelClient = (0, sdk_1.createKernelAccountClient)({
                    account: account,
                    chain: chain,
                    bundlerTransport: (0, viem_1.http)(ZERODEV_RPC),
                    // Required - the public client
                    client: publicClient,
                    paymaster: {
                        getPaymasterData: function (userOperation) {
                            return zerodevPaymaster.sponsorUserOperation({ userOperation: userOperation });
                        }
                    },
                });
                accountAddress = kernelClient.account.address;
                console.log("My account:", accountAddress);
                _b = (_a = kernelClient).sendUserOperation;
                _c = {};
                return [4 /*yield*/, kernelClient.account.encodeCalls([{
                            to: viem_1.zeroAddress,
                            value: BigInt(0),
                            data: "0x",
                        }])];
            case 3: return [4 /*yield*/, _b.apply(_a, [(_c.callData = _d.sent(),
                        _c)])];
            case 4:
                userOpHash = _d.sent();
                console.log("UserOp hash:", userOpHash);
                console.log("Waiting for UserOp to complete...");
                return [4 /*yield*/, kernelClient.waitForUserOperationReceipt({
                        hash: userOpHash,
                        timeout: 1000 * 15,
                    })];
            case 5:
                _d.sent();
                console.log("UserOp completed: https://base-sepolia.blockscout.com/op/" + userOpHash);
                process.exit();
                return [2 /*return*/];
        }
    });
}); };
main();
