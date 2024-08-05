import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async (endpoint) => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl+endpoint);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("/api/default-endpoint");
  }, []);

  return (
    <ApiContext.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
