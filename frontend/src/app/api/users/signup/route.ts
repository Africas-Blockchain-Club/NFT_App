// app/api/users/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { saveUser } from '@/database';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    // Validate required fields
    if (!userData.username || !userData.password || !userData.privateKey || !userData.smartAccountAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create user object
    const user = {
      username: userData.username,
      password: userData.password, // You should hash this in production!
      privateKey: userData.privateKey,
      smartAccountAddress: userData.smartAccountAddress,
      createdAt: new Date(userData.createdAt || new Date()),
      ownedNFTs: userData.ownedNFTs || []
    };
    
    // Save to database
    saveUser(user);
    
    return NextResponse.json({ 
      message: 'User created successfully',
      user: {
        username: user.username,
        smartAccountAddress: user.smartAccountAddress,
        createdAt: user.createdAt
      }
    });
    
} catch (error: unknown) {
  console.error('Signup API error:', error);
  const errorMessage = error instanceof Error ? error.message : 'Internal server error';
  return NextResponse.json(
    { error: errorMessage },
    { status: 500 }
  );
}
}