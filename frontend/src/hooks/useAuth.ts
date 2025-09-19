// src/hooks/useAuth.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export function useAuth(redirectTo: string = '/login') {
  const { currentUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push(redirectTo);
    }
  }, [currentUser, router, redirectTo]);

  return currentUser;
}