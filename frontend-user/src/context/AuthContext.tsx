import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';

interface AuthContextType {
  auth: AuthState;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    // Check for stored token and user data
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuth({
        user: JSON.parse(user),
        isAuthenticated: true,
        loading: false
      });
    } else {
      setAuth(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({
      user,
      isAuthenticated: true,
      loading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({
      user: null,
      isAuthenticated: false,
      loading: false
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
