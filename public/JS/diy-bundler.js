// public/js/diy-bundler.js
class DIYBundlerClient {
    constructor(bundlerUrl, chainId) {
        this.bundlerUrl = bundlerUrl;
        this.chainId = chainId;
    }
    
    async sendUserOp(userOp, entryPoint) {
        // Send to professional bundler (free tier)
        const response = await fetch(this.bundlerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_sendUserOperation',
                params: [userOp, entryPoint]
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