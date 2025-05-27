import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('agroww_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock implementation, in a real app this would call an API
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just check if email contains "@"
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create a mock user
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=0D9488&color=fff`
      };
      
      setUser(mockUser);
      localStorage.setItem('agroww_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // This is a mock implementation, in a real app this would call an API
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validation
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (name.length < 2) {
        throw new Error('Name must be at least 2 characters');
      }
      
      // Create a new user
      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=0D9488&color=fff`
      };
      
      setUser(newUser);
      localStorage.setItem('agroww_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agroww_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};