// public/js/diy-bundler.js
class DIYBundlerClient {
    constructor(bundlerUrl, chainId) {
        this.bundlerUrl = bundlerUrl;
        this.chainId = chainId;
    }
    
    async sendUserOp(userOp, entryPoint) {
        // Convert BigInt values to strings for JSON serialization
        const serializableUserOp = {
            ...userOp,
            nonce: userOp.nonce.toString(),
            callGasLimit: userOp.callGasLimit.toString(),
            verificationGasLimit: userOp.verificationGasLimit.toString(),
            preVerificationGas: userOp.preVerificationGas.toString(),
            maxFeePerGas: userOp.maxFeePerGas.toString(),
            maxPriorityFeePerGas: userOp.maxPriorityFeePerGas.toString()
        };
        
        // Send to professional bundler
        const response = await fetch(this.bundlerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_sendUserOperation',
                params: [serializableUserOp, entryPoint]
            })
        });
        
        const result = await response.json();
        return result.result; // Returns userOpHash
    }
    async getUserOpReceipt(userOpHash) {
        // Check UserOperation status
        const response = await fetch(this.bundlerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_getUserOperationReceipt',
                params: [userOpHash]
            })
        });
        
        return await response.json();
    }
}