'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from './types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (email?: string, password?: string, name?: string) => Promise<void>;
  signIn: (email?: string, password?: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = useCallback(async (email?: string, password?: string, name?: string) => {
    setIsLoading(true);
    try {
      // Immediate login for guest
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUser: User = {
        id: 'guest_' + Math.random().toString(36).substr(2, 9),
        email: email || 'guest@pulsar.health',
        name: name || 'Guest User',
        createdAt: new Date(),
      };
      
      setUser(newUser);
      localStorage.setItem('pulsar-user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email?: string, password?: string) => {
    setIsLoading(true);
    try {
      // Immediate login for guest
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const emailToUse = email || 'guest@pulsar.health';
      const newUser: User = {
        id: 'guest_' + Math.random().toString(36).substr(2, 9),
        email: emailToUse,
        name: emailToUse.split('@')[0],
        createdAt: new Date(),
      };
      
      setUser(newUser);
      localStorage.setItem('pulsar-user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('pulsar-user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
