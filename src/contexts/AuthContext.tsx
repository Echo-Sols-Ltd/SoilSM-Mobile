import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {storage} from '@utils/storage';

const AUTH_TOKEN_KEY = '@soilsmart:auth_token';
const USER_DATA_KEY = '@soilsmart:user_data';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  signUp: (name: string, email: string, password: string) => Promise<{success: boolean; error?: string}>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = await storage.getItem(AUTH_TOKEN_KEY);
      const userData = await storage.getItem(USER_DATA_KEY);

      if (token && userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{success: boolean; error?: string}> => {
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, accept any email/password
      // In production, this would call your API
      const userData: User = {
        id: '1',
        name: email.split('@')[0],
        email: email,
      };

      await storage.setItem(AUTH_TOKEN_KEY, 'demo_token_' + Date.now());
      await storage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      setUser(userData);

      return {success: true};
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<{success: boolean; error?: string}> => {
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userData: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
      };

      await storage.setItem(AUTH_TOKEN_KEY, 'demo_token_' + Date.now());
      await storage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      setUser(userData);

      return {success: true};
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sign up failed',
      };
    }
  };

  const logout = async () => {
    try {
      await storage.removeItem(AUTH_TOKEN_KEY);
      await storage.removeItem(USER_DATA_KEY);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signUp,
        logout,
        checkAuth,
      }}>
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

