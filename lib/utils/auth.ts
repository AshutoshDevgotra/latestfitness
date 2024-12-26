'use client';

import { auth } from '@/lib/firebase-client';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';

export const handleGoogleSignIn = async (fallbackToRedirect = true) => {
  if (!auth) throw new Error('Auth is not initialized');
  
  const provider = new GoogleAuthProvider();
  
  try {
    // Try popup first
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: any) {
    // If popup is blocked and fallback is enabled, use redirect
    if (error.code === 'auth/popup-blocked' && fallbackToRedirect) {
      await signInWithRedirect(auth, provider);
      return null; // User will be redirected, so return null
    }
    throw error;
  }
};