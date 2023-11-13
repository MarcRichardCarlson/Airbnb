import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

// Define the type of your context value
interface AuthContextProps {
  user: string | null; // Update this with the actual type of your user object
  register: (userData: any) => void; // Update this with the type of your user registration data
  login: (userData: any) => void; // Update this with the type of your user login data
  logout: () => void;
}

// Create the context with the specified type argument
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const register = async (userData: any) => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/register', userData);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (userData: any) => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', userData);
      setUser(response.data);
      console.log(user)
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
