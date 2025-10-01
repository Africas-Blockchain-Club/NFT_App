'use client';

import Navbar from '@/components/Navbar';


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Remove the id field from the User interface
interface User {
  username: string;
  password: string;
  privateKey: string;
  smartAccountAddress: string;
  createdAt: string;
  ownedNFTs: number[];
}


interface UserContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  users: User[];
  updateUserNFTs: (nftId: number) => Promise<boolean>; 
  refreshUsers: () => Promise<void>; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Load users and current user from localStorage on mount
  useEffect(() => {
    loadUsersData();
  }, []);

const loadUsersData = async () => {
  try {
    // First, try to get users from localStorage (your updated data)
    const localUserData = localStorage.getItem('userData');
    
    if (localUserData) {
      // Use localStorage data if available (most recent)
      const usersData = JSON.parse(localUserData);
      setUsers(usersData);
    } else {
      // Fallback to the initial JSON file (first load)
      const response = await fetch('data/users.json');
      const usersData = await response.json();
      setUsers(usersData);
      // Save initial data to localStorage
      localStorage.setItem('userData', JSON.stringify(usersData));
    }
    
    // Check if there's a logged-in user in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      
      // IMPORTANT: Sync with the latest user data from localStorage
      if (localUserData) {
        const currentUsers = JSON.parse(localUserData);
        const latestUserData = currentUsers.find((u: User) => u.username === parsedUser.username);
        if (latestUserData) {
          setCurrentUser(latestUserData);
          localStorage.setItem('currentUser', JSON.stringify(latestUserData));
        } else {
          setCurrentUser(parsedUser);
        }
      } else {
        setCurrentUser(parsedUser);
      }
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
};
  // NEW: Function to refresh users data
  const refreshUsers = async () => {
    await loadUsersData();
  };

const updateUserNFTs = async (nftId: number): Promise<boolean> => {
  console.log("Got into UserContext.tsx");
  console.log("Current username: ", currentUser?.username);
  console.log("Current user nfts:", currentUser?.ownedNFTs);
  
  if (!currentUser) return false;

  try {
    if (currentUser.ownedNFTs.includes(nftId)) {
      console.log("NFT already owned by user");
      return true;
    }

    console.log("Updating NFTs for user:", currentUser.username);
    
    // 1. Update currentUser
    const updatedUser = {
      ...currentUser,
      ownedNFTs: [...currentUser.ownedNFTs, nftId]
    };
    
    console.log("Updated user:", updatedUser);
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // 2. Update the users array
    const updatedUsers = users.map(user => 
      user.username === currentUser.username
        ? { ...user, ownedNFTs: [...user.ownedNFTs, nftId] }
        : user
    );

    setUsers(updatedUsers);
    
    // 3. Store updated users in localStorage (this is your main data source now)
    localStorage.setItem('userData', JSON.stringify(updatedUsers));

    console.log("Successfully updated user NFTs in localStorage");
    return true;
  } catch (error) {
    console.error('Error updating NFTs:', error);
    return false;
  }
};

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const user = users.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      users,
      updateUserNFTs,
      refreshUsers   
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}