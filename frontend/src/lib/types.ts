export interface User {
  username: string;
  password: string;
  privateKey: string;
  smartAccountAddress: string;
  createdAt: Date;
  ownedNFTs?: number[];
}

export interface NFT {
  tokenId: number;
  imageUrl: string;
  name: string;
  description: string;
}