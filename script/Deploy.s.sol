// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "../lib/forge-std/src/Script.sol";
import {MyNFT} from "../src/MyNFT.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy with your actual collection name and symbol
        MyNFT nft = new MyNFT("Urban Snap Collection", "USNAP");
        
        vm.stopBroadcast();
        
        console.log("MyNFT deployed at:", address(nft));
        console.log("Collection Name: Urban Snap Collection");
        console.log("Collection Symbol: USNAP");
        console.log("Base URI:", nft.baseURI()); // This will show your IPFS URL
    }
}