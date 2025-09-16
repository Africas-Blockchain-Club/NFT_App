// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SimplePaymaster is Ownable {
    // Track which addresses can use gasless transactions
    mapping(address => bool) public whitelisted;
    
    // Allow the owner to deposit ETH to pay for gas
    receive() external payable {}
    
    // Whitelist an address for gasless transactions
    function whitelistAddress(address _user) external onlyOwner {
        whitelisted[_user] = true;
    }
    
    // Check if an address is whitelisted
    function isWhitelisted(address _user) external view returns (bool) {
        return whitelisted[_user];
    }
    
    // Withdraw funds (only owner)
    function withdraw(uint256 amount) external onlyOwner {
        payable(owner()).transfer(amount);
    }
}