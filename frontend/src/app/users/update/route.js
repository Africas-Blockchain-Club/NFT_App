import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, nftId } = req.body;

    if (!username || nftId === undefined) {
      return res.status(400).json({ error: 'Username and NFT ID are required' });
    }

    // Initialize database if it doesn't exist
    if (!fs.existsSync(path.dirname(DB_PATH))) {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([]));
    }

    // Read users from database
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const users = JSON.parse(data);

    // Find the user and update their owned NFTs
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Initialize ownedNFTs array if it doesn't exist
    if (!users[userIndex].ownedNFTs) {
      users[userIndex].ownedNFTs = [];
    }

    // Add the NFT ID if it's not already there
    if (!users[userIndex].ownedNFTs.includes(nftId)) {
      users[userIndex].ownedNFTs.push(nftId);
    }

    // Save updated users to database
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}