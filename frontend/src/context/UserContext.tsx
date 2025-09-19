// context/UserContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number; // Added ID for better identification
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
      const response = await fetch('/users.json');
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

  // NEW: Function to update user's NFTs (simulated write)
  const updateUserNFTs = async (nftId: number): Promise<boolean> => {
    if (!currentUser) return false;

    try {
      // 1. Update local state immediately for better UX
      const updatedUser = {
        ...currentUser,
        ownedNFTs: [...(currentUser.ownedNFTs || []), nftId]
      };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // 2. Update the users array
      const updatedUsers = users.map(user => 
        user.id === currentUser.id 
          ? { ...user, ownedNFTs: [...(user.ownedNFTs || []), nftId] }
          : user
      );
      setUsers(updatedUsers);

      // 3. In a real app, you would send this to your backend API
      // For now, we'll simulate persistence by storing in localStorage
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
      updateUserNFTs, // Expose the new function
      refreshUsers    // Expose refresh function
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