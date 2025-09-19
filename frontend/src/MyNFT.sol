// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    
    Counters.Counter private _tokenIdCounter;
    
    // Base URI for metadata (your IPFS CID)
    string private _baseTokenURI = "https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmdnHnBXSe9okMiGYJCPMfLevi6rrsFfd6bNJ3HEchPHZU/";

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // Override base URI function to use your IPFS metadata
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    // Function to update base URI if needed (only owner)
    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    // Get the current base URI
    function baseURI() public view returns (string memory) {
        return _baseTokenURI;
    }

    // Get token URI for a specific token ID
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 
            ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
            : "";
    }

    // Get total supply
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    // Get current token ID (next available ID)
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}