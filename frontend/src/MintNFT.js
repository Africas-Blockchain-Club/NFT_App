// TODO: Replace with your deployed NFT contract address
const NFT_CONTRACT_ADDRESS = "0x1966dc8ff30Bc4AeDEd27178642253b3cCC9AA3f";
// TODO: Replace with your actual ZeroDev Project ID from the ZeroDev dashboard
const ZERODEV_PROJECT_ID = "3752311b-fb60-4900-ac94-66d92b19b675";


// TODO: Add the ABI of your NFT contract
const NFT_CONTRACT_ABI = [
    // The safeMint function ABI
    "function safeMint(address to)"
];

// DOM elements for the minting step
const mintBtn = document.getElementById('mintBtn');
const mintStatus = document.getElementById('mintStatus');

// Event listener for the mint button
mintBtn.addEventListener('click', mintNFT);

// The mintNFT function will be called when the user clicks the "Mint NFT" button
async function mintNFT() {
    if (NFT_CONTRACT_ADDRESS === "YOUR_NFT_CONTRACT_ADDRESS") {
        updateMintStatus("Please set your NFT Contract Address in MintNFT.js", "error");
        return;
    }
    if (ZERODEV_PROJECT_ID === "YOUR_ZERODEV_PROJECT_ID" || ZERODEV_PROJECT_ID === "b5c2c784-1415-482b-a202-482d0456a344") {
        updateMintStatus("Please set your ZeroDev Project ID in MintNFT.js", "error");
        return;
    }

    try {
        updateMintStatus("Initializing ZeroDev provider...", "pending");
        mintBtn.disabled = true;

        // 1. Initialize the ZeroDev ECDSA provider
        const ecdsaProvider = await zerodevEcdsaProvider.ECDSAProvider.init({
            projectId: ZERODEV_PROJECT_ID,
            owner: zerodevEcdsaProvider.getRPCProviderOwner(window.ethereum),
        });

        // 2. Create an ethers.js provider from the ZeroDev provider
        const provider = new ethers.BrowserProvider(ecdsaProvider, "any");
        const signer = await provider.getSigner();
        const smartAccountAddress = await signer.getAddress();

        // 3. Create a contract instance
        const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);

        updateMintStatus("Minting NFT... Please approve the transaction in your wallet.", "pending");

        // 4. Call the safeMint function
        const tx = await nftContract.safeMint(smartAccountAddress);

        updateMintStatus("Transaction sent! Waiting for confirmation...", "pending");

        // 5. Wait for the transaction to be mined
        await tx.wait();

        updateMintStatus(`NFT minted successfully! Transaction hash: ${tx.hash}`, "connected");

    } catch (error) {
        console.error("Minting error:", error);
        updateMintStatus(`Error: ${error.message}`, "error");
    } finally {
        mintBtn.disabled = false;
    }
}

function updateMintStatus(message, type) {
    mintStatus.textContent = message;
    mintStatus.className = "status";
    if (type) mintStatus.classList.add(type);
}
