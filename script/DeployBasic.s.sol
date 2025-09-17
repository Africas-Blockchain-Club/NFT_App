// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../lib/forge-std/src/Script.sol";
import "../src/MyNFT.sol";

contract DeployLocal is Script {
    function run() external {
        // Use the first account from Anvil for deployment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy NFT contract
        MyNFT nft = new MyNFT("LocalNFT", "LNFT");
        
        vm.stopBroadcast();
        console.log("MyNFT deployed at:", address(nft));
    }
}