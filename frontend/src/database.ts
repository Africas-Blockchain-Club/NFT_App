import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');
interface User {
  username: string;
  password: string;
  privateKey: string;
  smartAccountAddress: string;
  createdAt: Date;
}

interface NFT {
  tokenId: number;
  imageUrl: string;
  name: string;
  description: string;
}

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
export const getUsers = (): User[] => {
  initializeDB();
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Save user to database
export const saveUser = (user: User): void => {
  const users = getUsers();
  // Check if username already exists
  if (users.find(u => u.username === user.username)) {
    throw new Error('Username already exists');
  }
  
  users.push(user);
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
};

// Find user by username
export const findUserByUsername = (username: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.username === username);
};

// Verify user credentials
export const verifyUser = (username: string, password: string): User | undefined => {
  const user = findUserByUsername(username);
  return user && user.password === password ? user : undefined;
};