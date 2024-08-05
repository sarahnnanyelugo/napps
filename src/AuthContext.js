// AuthContext.js
import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (credentials) => {
    try {
      // Replace with your actual login API call
      const response = await loginApi(credentials);
      if (response.success) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      // Replace with your actual logout API call
      await logoutApi();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

// Fake API calls for demonstration
const loginApi = async (credentials) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

const logoutApi = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};
