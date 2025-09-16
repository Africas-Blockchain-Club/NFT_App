// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../lib/forge-std/src/Script.sol";
import "../src/MyNFT.sol";
import "../src/NFTMarketplace.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        MyNFT nft = new MyNFT();
        NFTMarketplace marketplace = new NFTMarketplace();
        
        vm.stopBroadcast();
        
        // console.log("MyNFT deployed at:", address(nft));
        // console.log("NFTMarketplace deployed at:", address(marketplace));
    }
}