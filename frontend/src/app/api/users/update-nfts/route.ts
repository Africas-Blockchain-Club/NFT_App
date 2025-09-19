import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface User {
  username: string;
  password: string;
  privateKey: string;
  smartAccountAddress: string;
  createdAt: string;
  ownedNFTs?: number[];
}

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

// Initialize database
const initializeDB = () => {
  if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
};

// Read users from database
const getUsers = (): User[] => {
  initializeDB();
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export async function POST(request: NextRequest) {
  try {
    const { username, nftId } = await request.json();

    const users = getUsers();
    
    // Find user and update NFTs
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Initialize ownedNFTs array if it doesn't exist
    if (!users[userIndex].ownedNFTs) {
      users[userIndex].ownedNFTs = [];
    }

    // Add NFT if not already owned
    if (!users[userIndex].ownedNFTs!.includes(nftId)) {
      users[userIndex].ownedNFTs!.push(nftId);
    }

    // Write back to file
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));

    return NextResponse.json(
      { message: 'NFT added successfully', user: users[userIndex] },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating NFTs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}