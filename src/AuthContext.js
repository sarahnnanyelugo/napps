// AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import api, { setAuthToken } from "./utility/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLocalStorage, getLocalStorage } from "./utility/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize state from localStorage
    const savedIsLoggedIn = getLocalStorage('isLoggedIn');
    return savedIsLoggedIn || false;
  });
  const [authToken, setAuthTokenState] = useState(() => {
    return getLocalStorage('authToken') || '';
  });
  const [userState, setAuthUserState] = useState(() => {
    return getLocalStorage('user') || {};
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Save state to localStorage whenever it changes
    setLocalStorage('isLoggedIn', isLoggedIn);
    setLocalStorage('authToken', authToken);
    setAuthToken(authToken);
    setLocalStorage('user', userState);
  }, [isLoggedIn, authToken, userState]);


  const login = async (credentials) => {
    setError(null)
    setLoading(true)
    try {
      const response = await api.post(apiUrl + '/login', credentials); // Replace with your login endpoint
      setIsLoggedIn(true);
      setAuthTokenState(response.data.token);
      setAuthUserState(response.data.user);
      setLoading(false)
    } catch (resp) {

      setLoading(false)
      setError(resp.response?.data||resp.response)
    }
  };

  const logout = async () => {
    try {
      await api.post(apiUrl + '/logout'); // Replace with your logout endpoint
      setIsLoggedIn(false);
      setAuthTokenState(''); // Clear the token
      setAuthUserState({})
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading, error,authToken,userState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
