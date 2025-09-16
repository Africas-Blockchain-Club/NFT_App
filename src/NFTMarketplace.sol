// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract NFTMarketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public listingCounter;
    uint256 public platformFee = 25; // 2.5%

    event Listed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event Sold(uint256 indexed listingId, address indexed buyer, uint256 price);
    event Canceled(uint256 indexed listingId);

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not owner");
        require(price > 0, "Price must be > 0");

        listingCounter++;
        listings[listingCounter] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            active: true
        });

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        
        emit Listed(listingCounter, msg.sender, nftContract, tokenId, price);
    }

    function buyNFT(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Not active");
        require(msg.value >= listing.price, "Insufficient funds");

        listing.active = false;
        
        uint256 fee = (listing.price * platformFee) / 1000;
        uint256 sellerProceeds = listing.price - fee;
        
        payable(listing.seller).transfer(sellerProceeds);
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);
        
        emit Sold(listingId, msg.sender, listing.price);
    }

    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not seller");
        require(listing.active, "Not active");

        listing.active = false;
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);
        
        emit Canceled(listingId);
    }

    function withdrawFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}