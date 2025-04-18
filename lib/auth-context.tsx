"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  signupWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to validate the session/token
        const isAuth = localStorage.getItem("isAuthenticated") === "true";

        if (isAuth) {
          // Mock user data - in a real app, this would come from an API
          setUser({
            id: "user-1",
            name: "テストユーザー",
            email: "test@example.com",
            avatar:
              "https://ui-avatars.com/api/?name=テスト+ユーザー&background=random",
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      console.log("Logging in with:", email, password);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      setUser({
        id: "user-1",
        name: "テストユーザー",
        email,
        avatar:
          "https://ui-avatars.com/api/?name=テスト+ユーザー&background=random",
      });
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // This would initiate Google OAuth flow in a real app
      console.log("Logging in with Google");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      setUser({
        id: "google-user-1",
        name: "Google User",
        email: "google-user@example.com",
        avatar:
          "https://ui-avatars.com/api/?name=Google+User&background=random",
      });
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      console.log("Signing up with:", name, email, password);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful signup
      setUser({
        id: "new-user-1",
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=random`,
      });
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithGoogle = async () => {
    setIsLoading(true);
    try {
      // This would initiate Google OAuth flow in a real app
      console.log("Signing up with Google");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful signup
      setUser({
        id: "google-user-1",
        name: "Google User",
        email: "google-user@example.com",
        avatar:
          "https://ui-avatars.com/api/?name=Google+User&background=random",
      });
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.error("Google signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      console.log("Logging out");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Clear auth state
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");

      // Redirect to login page
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      console.log("Requesting password reset for:", email);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would send a reset email
    } catch (error) {
      console.error("Password reset request failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      console.log("Resetting password with token:", token);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would update the password in the database
    } catch (error) {
      console.error("Password reset failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    loginWithGoogle,
    signup,
    signupWithGoogle,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
