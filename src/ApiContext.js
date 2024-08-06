import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import api, { setAuthToken } from "./utility/api";
import { getLocalStorage } from "./utility/localStorage";

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [authToken, setAuthTokenState] = useState(() => {
    return getLocalStorage('authToken') || '';
  });

  const fetchData = async (endpoint) => {
    setAuthToken(authToken);
    setLoading(true);
    try {
      const response = await api.get(apiUrl + endpoint);
      setData(response.data);
      console.log(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const postData = async (endpoint, data) => {
    setAuthToken(authToken);
    setLoading(true);
    try {
      const response = await api.post(apiUrl + endpoint, data);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{ data, loading, error, fetchData,postData }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
