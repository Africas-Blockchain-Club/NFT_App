// Configuration
const SCROLL_RPC_URL = "https://sepolia-rpc.scroll.io/";
const SCROLL_CHAIN_ID = "0x8274F"; // Scroll Sepolia in hexadecimal
const SCROLL_CHAIN_ID_DECIMAL = 534351; // Scroll Sepolia in decimal
const SCROLL_CHAIN_NAME = "Scroll Sepolia";

// DOM elements
const connectBtn = document.getElementById('connectBtn');
const networkStatus = document.getElementById('networkStatus');
const networkIndicator = document.getElementById('networkIndicator');
const connectionStatus = document.getElementById('connectionStatus');
const accountInfo = document.getElementById('accountInfo');
const accountAddress = document.getElementById('accountAddress');
const accountBalance = document.getElementById('accountBalance');

// Event listeners
connectBtn.addEventListener('click', connectWallet);

// Connect Wallet function
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        updateStatus(connectionStatus, "Please install MetaMask to continue!", "error");
        return;
    }

    try {
        updateStatus(connectionStatus, "Connecting to your wallet...", "pending");
        connectBtn.disabled = true;
        
        // Request account access with a timeout
        const accounts = await Promise.race([
            window.ethereum.request({ method: 'eth_requestAccounts' }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 10000))
        ]);
        
        // Check and switch to Scroll Sepolia
        await switchToScrollSepolia();
        
        // Initialize provider with a fallback
        let provider;
        try {
            provider = new ethers.BrowserProvider(window.ethereum);
        } catch (error) {
            console.error("Provider error:", error);
            throw new Error("Failed to initialize provider. Please refresh and try again.");
        }
        
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        // Format the address for display
        const formattedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
        
        // Try to get balance with error handling
        let balanceText = "Balance: N/A";
        try {
            const balance = await provider.getBalance(address);
            balanceText = `Balance: ${ethers.formatEther(balance)} ETH`;
        } catch (error) {
            console.warn("Could not fetch balance:", error);
            balanceText = "Balance: Could not fetch (network issue)";
        }
        
        // Display account info
        accountAddress.textContent = `Address: ${formattedAddress}`;
        accountBalance.textContent = balanceText;
        accountInfo.style.display = 'block';
        
        // Update UI
        updateStatus(connectionStatus, "Successfully connected to Scroll Sepolia!", "connected");
        networkStatus.textContent = "Connected to Scroll Sepolia";
        networkIndicator.className = "network-indicator network-connected";
        
    } catch (error) {
        console.error("Connection error:", error);
        
        if (error.message.includes('Request timeout')) {
            updateStatus(connectionStatus, "Connection timeout. Please check MetaMask and try again.", "error");
        } else if (error.message.includes('User rejected')) {
            updateStatus(connectionStatus, "Connection cancelled. Please try again and approve the connection.", "error");
        } else {
            updateStatus(connectionStatus, "Error: " + error.message, "error");
        }
        
        networkStatus.textContent = "Not connected to Scroll Sepolia";
        networkIndicator.className = "network-indicator network-disconnected";
    } finally {
        connectBtn.disabled = false;
    }
}

// Switch to Scroll Sepolia
async function switchToScrollSepolia() {
    try {
        // Check current chain
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        if (currentChainId !== SCROLL_CHAIN_ID) {
            // Try to switch to Scroll Sepolia
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: SCROLL_CHAIN_ID }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: SCROLL_CHAIN_ID,
                                chainName: SCROLL_CHAIN_NAME,
                                rpcUrls: [SCROLL_RPC_URL],
                                nativeCurrency: {
                                    name: 'Ether',
                                    symbol: 'ETH',
                                    decimals: 18
                                },
                                blockExplorerUrls: ['https://sepolia.scroll.io/']
                            }]
                        });
                    } catch (addError) {
                        throw new Error("Failed to add Scroll Sepolia network to MetaMask. Please add it manually.");
                    }
                } else if (switchError.code === 4001) {
                    throw new Error("You rejected the network switch. Please switch to Scroll Sepolia manually.");
                } else {
                    throw switchError;
                }
            }
        }
    } catch (error) {
        console.error("Network switch error:", error);
        throw error;
    }
}

// Helper function to update status
function updateStatus(element, message, type) {
    element.textContent = message;
    element.className = "status";
    if (type) element.classList.add(type);
}

// Initialize network check
if (typeof window.ethereum !== 'undefined') {
    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            updateStatus(connectionStatus, "Wallet disconnected", "error");
            networkStatus.textContent = "Not connected to Scroll Sepolia";
            networkIndicator.className = "network-indicator network-disconnected";
            accountInfo.style.display = 'none';
        } else {
            connectWallet(); // Reconnect if accounts change
        }
    });
    
    // Listen for chain changes
    window.ethereum.on('chainChanged', (chainId) => {
        if (chainId === SCROLL_CHAIN_ID) {
            networkStatus.textContent = "Connected to Scroll Sepolia";
            networkIndicator.className = "network-indicator network-connected";
            updateStatus(connectionStatus, "Connected to Scroll Sepolia", "connected");
            // Refresh account info
            if (accountInfo.style.display === 'block') {
                connectWallet();
            }
        } else {
            networkStatus.textContent = "Please switch to Scroll Sepolia";
            networkIndicator.className = "network-indicator network-disconnected";
            updateStatus(connectionStatus, "Wrong network detected", "error");
        }
    });
    
    // Try to auto-connect if already connected
    window.addEventListener('load', async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                if (chainId === SCROLL_CHAIN_ID) {
                    connectWallet();
                }
            }
        } catch (error) {
            console.log("No auto-connection possible:", error);
        }
    });
}