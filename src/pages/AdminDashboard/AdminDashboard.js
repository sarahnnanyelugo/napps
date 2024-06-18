import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./admin-dashboard.scss";
export const AdminDashboard = () => {
  return (
    <>
      <div className="Admin-dashboard">
        <div className="d-flex">
          <h1 style={{ flexGrow: 1 }}>Welcome, Peter</h1>
          <input placeholder="Search" className="col-md-3" />
        </div>
        <div className=" row row-cols-1 row-cols-lg-3 g-2 g-lg-2 mt">
          <div className="col">
            <div className="summary">
              <p>Total Registered Schools</p>
              <div className="d-flex">
                <div className="col-md-6">
                  <h1>530</h1>
                  <p>vs last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
