export interface User {
  username: string;
  password: string; // In production, store hashed passwords!
  privateKey: string;
  smartAccountAddress: string;
  createdAt: Date;
}

export interface NFT {
  tokenId: number;
  imageUrl: string;
  name: string;
  description: string;
}