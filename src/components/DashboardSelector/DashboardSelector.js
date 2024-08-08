import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../ApiContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadingGif from '../../assets/images/loader.gif'; // Adjust the path as needed
import { setAuthToken } from '../../utility/api';
import { getLocalStorage } from '../../utility/localStorage';
import { ToastContainer, toast } from "react-toastify";

const DashboardSelector = () => {
  const [dashboardId, setDashboardId] = useState(null);
  const [roles, setRoles] = useState([]);
  const { data, loading, error, fetchData, postData } = useContext(ApiContext);
  const [authToken, setAuthTokenState] = useState(() => {
    return getLocalStorage('authToken') || '';
  });

  const dashboards = {
    1: "dashboard-layout/admin-dashboard",
    2: "dashboard-layout/admin-dashboard",
    3: "zone-layout/zone-dashboard",
    4: "state-layout/lga-dashboard",
    5: "lga-layout/lga-dashboard",
    6: "ward-layout/my-schools",
    7: "my-school-layout/my-schools",
    // Add more dashboard mappings here as needed
  };

  useEffect(() => {
    if (!authToken) {
      toast.error('You must be logged in');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000)
      return;
    }

    const fetchRoleInfo = async () => {
      setAuthToken(authToken);
      try {
        await postData("/dashboard-intent", {}); // the postData call
      } catch (errorResponse) {
        console.error('Error fetching role information:', errorResponse);
      }
    };

    fetchRoleInfo();
  }, []); // Ensures this useEffect runs only once


  useEffect(() => {
    if (!data) return;
    const { dashboard_id, roles } = data;

    setDashboardId(dashboard_id);
    setRoles(roles);

    if (roles?.length === 1) {
      // If user has only one role, redirect immediately
      setInterval(() => {
        window.location = dashboards[dashboard_id];
      }, 2000)
    }

  }, [data])

  useEffect(() => {
    if (dashboardId && roles?.length > 1) {
      window.location = dashboards[dashboardId];
    }
  }, [dashboardId, roles]);

  const handleDashboardSelect = (id) => {
    setDashboardId(id);
  };

  if (loading) {
    return (
      <center className="d-flex justify-content-center align-items-center vh-100">
        <img src={loadingGif} alt="Loading..." />
      </center>
    );
  }

  if (error) {
    return <div>Error loading roles.</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg border-0 rounded" style={{ width: '24rem' }}>
        <div className="card-body text-center">
          {roles?.length > 1 && <h6 className="card-title">Select Dashboard</h6>}
          {roles?.length === 1 && <h5 className="card-title">Loading Default dashboard</h5>}
          {roles?.map(role => (
            <button
              key={role.id}
              className="btn btn-info mb-2"
              onClick={() => handleDashboardSelect(role.id)}
            >
              {role.name}
            </button>
          ))}
          {roles?.length === 1 && <h6 className="card-body">If not redirected automatically, Click the button above</h6>}
          <center><img style={{ width: "45%" }} src={loadingGif} alt="Loading..." /></center>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector;
