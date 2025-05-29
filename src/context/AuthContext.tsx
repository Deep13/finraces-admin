import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

// Create the context with default values
export const AuthContext = createContext<any>(false);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, showModal, setShowModal }}>
      {children}
    </AuthContext.Provider>
  );
};
