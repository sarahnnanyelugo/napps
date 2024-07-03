import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { AdminDashboard } from "../AdminDashboard/AdminDashboard";
import MySchools from "../MySchools/MySchools";
import { DisplayedSchool } from "../SchoolManagement/DisplayedSchool";
import { SchoolManagement } from "../SchoolManagement/SchoolManagement";
import { SchShowcase } from "../SchoolManagement/SchShowcase";
import { Subscription } from "../Subscription/Subscription";
import { SubShowcase } from "../Subscription/SubShowcase";

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
            <Route path="/school-management" element={<SchoolManagement />} />
            <Route path="/my-schools" element={<MySchools />} />
            <Route path="/Subscription" element={<Subscription />} />
            <Route
              path="/displayed-school/:blog_id"
              element={<DisplayedSchool />}
            />{" "}
            <Route path="/sch-showcase/:blog_id" element={<SchShowcase />} />{" "}
            <Route path="/sub-showcase/:blog_id" element={<SubShowcase />} />{" "}
          </Routes>
        </div>
      </div>
    </>
  );
}
