import { generatePrivateKey } from "viem/accounts";
import { mintNFT } from "./mintNFT";

export const handleNewUser = async () => {
  // Generate new private key
  const privateKey = generatePrivateKey();
  
  console.log("\n🎉 NEW USER CREATED!");
  console.log("Save this private key for future use:");
  console.log("PRIVATE_KEY=" + privateKey);
  console.log("------------------------------------");
  
  // Mint NFT for the new user
  const result = await mintNFT(privateKey as `0x${string}`);
  
  return result;
};