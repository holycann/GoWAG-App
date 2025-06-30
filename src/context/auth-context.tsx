"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService, { User } from "@/services/auth-service";

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
        // Check if user is authenticated
        if (authService.isAuthenticated()) {
          // Get current user data
          const userData = await authService.getCurrentUser();
          if (userData) {
            setUser(userData);
          } else {
            // If token exists but no user data, try to refresh token
            const newToken = await authService.refreshToken();
            if (newToken) {
              const userData = await authService.getCurrentUser();
              if (userData) {
                setUser(userData);
              } else {
                // If still no user data after token refresh, logout
                await authService.logout();
              }
            }
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        // Handle initialization errors
        setError("Failed to initialize authentication");
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
      const userData = await authService.login({ email, password });
      setUser(userData);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, fullname?: string, phoneNumber?: string, username?: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.register(
        { email, password },
        username,
        fullname,
        phoneNumber
      );
      setUser(userData);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Failed to register");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.logout();
      setUser(null);
      router.push("/auth/login");
    } catch (err: any) {
      console.error("Logout error:", err);
      setError(err.message || "Failed to logout");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext; 