// context/UserContext.tsx
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
  updateUserNFTs: (nftId: number) => Promise<boolean>; // NEW: Function to update NFTs
  refreshUsers: () => Promise<void>; // NEW: Refresh users data
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Load users and current user from localStorage on mount
  useEffect(() => {
    loadUsersData();
  }, []);

  // NEW: Function to load users data
  const loadUsersData = async () => {
    try {
      const response = await fetch('data/users.json');
      const usersData = await response.json();
      setUsers(usersData);
      
      // Check if there's a logged-in user in localStorage
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
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
  if (!currentUser) return false;

  try {
    // 1. Update local state immediately
    const updatedUser = {
      ...currentUser,
      ownedNFTs: [...currentUser.ownedNFTs, nftId] // Add the new NFT ID
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // 2. Update the users array - match by username
    const updatedUsers = users.map(user => 
      user.username === currentUser.username
        ? { ...user, ownedNFTs: [...user.ownedNFTs, nftId] } // Add the new NFT ID
        : user
    );
    
    setUsers(updatedUsers);

    // 3. Store updated users in localStorage
    localStorage.setItem('userData', JSON.stringify(updatedUsers));

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