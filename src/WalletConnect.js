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
        
        // Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        // Check and switch to Scroll Sepolia
        await switchToScrollSepolia();
        
        // Initialize provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        
        // Format the address for display
        const formattedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
        
        // Display account info
        accountAddress.textContent = `Address: ${formattedAddress}`;
        accountBalance.textContent = `Balance: ${ethers.formatEther(balance)} ETH`;
        accountInfo.style.display = 'block';
        
        // Update UI
        updateStatus(connectionStatus, "Successfully connected to Scroll Sepolia!", "connected");
        networkStatus.textContent = "Connected to Scroll Sepolia";
        networkIndicator.className = "network-indicator network-connected";
        
    } catch (error) {
        console.error("Connection error:", error);
        updateStatus(connectionStatus, "Error: " + error.message, "error");
    }
}

// Switch to Scroll Sepolia
async function switchToScrollSepolia() {
    try {
        // Check current chain
        const currentChainId = await window.ethereum.request({ 
            method: 'eth_chainId' 
        });
        
        if (currentChainId !== SCROLL_CHAIN_ID) {
            // Try to switch to Scroll Sepolia
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: SCROLL_CHAIN_ID }],
            });
        }
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
                throw new Error("Failed to add Scroll Sepolia network to MetaMask");
            }
        } else {
            throw switchError;
        }
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
        } else {
            networkStatus.textContent = "Please switch to Scroll Sepolia";
            networkIndicator.className = "network-indicator network-disconnected";
            updateStatus(connectionStatus, "Wrong network detected", "error");
        }
    });
}