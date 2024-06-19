import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { AdminDashboard } from "../AdminDashboard/AdminDashboard";
import { SchoolManagement } from "../SchoolManagement/SchoolManagement";

export default function DashboardLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="col-md-2">
          <DashboardNav />
        </div>
        <div className="col-md-10" style={{ padding: "0px 20px" }}>
          {/* <DashboardTop /> */}
          <Routes>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />{" "}
            <Route path="/school-management" element={<SchoolManagement />} />{" "}
          </Routes>
        </div>
      </div>
    </>
  );
}
