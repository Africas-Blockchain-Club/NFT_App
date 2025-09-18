// Configuration
const SCROLL_RPC_URL = "https://sepolia-rpc.scroll.io/";
const SCROLL_CHAIN_ID = "0x8274F";
const BUNDLER_URL = "https://bundler.zerodev.app/api/v2/aa/3752311b-fb60-4900-ac94-66d92b19b675";
const ENTRY_POINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const FACTORY = "0x9406Cc6185a346906296840746125a0E44976454";

// DOM elements
const setupAABtn = document.getElementById('setupAABtn');
const nextStepBtn = document.getElementById('nextStepBtn');
const setupAAStatus = document.getElementById('setupAAStatus');
const aaDetails = document.getElementById('aaDetails');
const smartAccountAddress = document.getElementById('smartAccountAddress');
const bundlerStatus = document.getElementById('bundlerStatus');
const paymasterStatus = document.getElementById('paymasterStatus');

// Event listeners
setupAABtn.addEventListener('click', setupAccountAbstraction);

// Account Abstraction Setup
async function setupAccountAbstraction() {
    try {
        updateStatus(setupAAStatus, "Initializing Account Abstraction...", "pending");
        setupAABtn.disabled = true;
        
        // Simulate AA setup process
        await simulateAASetup();
        
        // Update UI
        updateStatus(setupAAStatus, "Account Abstraction setup complete! Ready for gasless transactions.", "connected");
        aaDetails.style.display = 'block';
        nextStepBtn.disabled = false;
        
    } catch (error) {
        console.error("AA Setup error:", error);
        updateStatus(setupAAStatus, "Error: " + error.message, "error");
        setupAABtn.disabled = false;
    }
}

// Simulate AA Setup process
async function simulateAASetup() {
    // This would be replaced with actual AA setup code
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate different steps in the process
            setTimeout(() => {
                updateStatus(setupAAStatus, "Connecting to ZeroDev...", "pending");
            }, 1000);
            
            setTimeout(() => {
                updateStatus(setupAAStatus, "Creating smart account...", "pending");
            }, 2000);
            
            setTimeout(() => {
                updateStatus(setupAAStatus, "Configuring paymaster...", "pending");
            }, 3000);
            
            setTimeout(() => {
                // Set mock smart account address (in a real app, this would come from the AA SDK)
                const mockAddress = "0x" + Math.random().toString(16).substr(2, 40);
                smartAccountAddress.textContent = `${mockAddress.substring(0, 6)}...${mockAddress.substring(mockAddress.length - 4)}`;
                resolve();
            }, 4000);
        }, 500);
    });
}

// Helper function to update status
function updateStatus(element, message, type) {
    element.textContent = message;
    element.className = "status";
    if (type) element.classList.add(type);
}

// Next step button handler
nextStepBtn.addEventListener('click', () => {
    alert("This would proceed to Step 3: Mint NFT. In a real application, you would navigate to the next page or load the next module.");
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Simulate already being connected from Step 1
    updateStatus(setupAAStatus, "Ready to set up Account Abstraction", "pending");
});
