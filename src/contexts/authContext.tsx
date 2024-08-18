import React, { createContext, useState, useContext } from 'react';
import { CredentialResponse } from '@react-oauth/google';

interface User {
  username: string;
  password?: string; 
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password?: string) => void;
  logout: () => void;
  register: (username: string, password: string) => boolean;
  loginWithGoogle: (response: CredentialResponse) => void; 
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const initialUsers: User[] = [
  { username: 'homer', password: 'simpson' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, password?: string) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const loginWithGoogle = (response: CredentialResponse) => {
    if (response.credential) {
      setIsAuthenticated(true);
    } else {
      alert('Google login failed');
    }
  };

  const register = (username: string, password: string): boolean => {
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert('Username already exists');
      return false;
    } else {
      setUsers([...users, { username, password }]);
      return true;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within the AuthProvider');
  }
  return context;
};
