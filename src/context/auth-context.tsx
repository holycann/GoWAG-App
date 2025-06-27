"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthService, { User } from '../services/auth-service';
import { initializeFirebase } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullname?: string, phoneNumber?: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        const firebaseApp = initializeFirebase();
        AuthService.initializeAuth(firebaseApp);
        
        // Check if user is already authenticated
        if (AuthService.isAuthenticated()) {
          const currentUser = await AuthService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            await AuthService.logout();
            router.push('/auth/login');
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await AuthService.login({ email, password });
      setUser(loggedInUser);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string, phoneNumber?: string, profilePicture?: string) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await AuthService.register({ email, password }, name, phoneNumber, profilePicture);
      setUser(newUser);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await AuthService.logout();
      setUser(null);
      router.push('/auth/login');
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message || 'Failed to logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return AuthService.isAuthenticated();
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, isAuthenticated: isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 