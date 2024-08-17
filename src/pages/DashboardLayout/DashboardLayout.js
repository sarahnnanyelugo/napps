import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import { AdminDashboard } from "../AdminDashboard/AdminDashboard";
import { Cordinators } from "../Cordinators/Cordinators";
import MySchools from "../MySchools/MySchools";
import { DisplayedSchool } from "../SchoolManagement/DisplayedSchool";
import { SchoolManagement } from "../SchoolManagement/SchoolManagement";
import { SchShowcase } from "../SchoolManagement/SchShowcase";
import { Subscription } from "../Subscription/Subscription";
import { ShowSubs } from "../Subscription/ShowSubs";
import { Proprietors } from "../Proprietors/Proprietors";

export default function DashboardLayout() {
  return (
    <>
      <div className="d-md-flex">
        <div className="col-md-2">
          <DashboardNav />
        </div>
        <div className="col-md-10 all-dash">
          <Routes>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />{" "}
            <Route path="/school-management" element={<SchoolManagement />} />
            <Route path="/my-schools" element={<MySchools />} />
            <Route path="/Subscription" element={<Subscription />} />
            <Route path="/coordinators" element={<Cordinators />} />
            <Route path="/proprietors" element={<Proprietors />} />
            <Route
              path="/displayed-school/:blog_id"
              element={<DisplayedSchool />}
            />{" "}
            <Route path="/sch-showcase/:blog_id" element={<SchShowcase />} />{" "}
            {/* <Route path="/sub-showcase/:blog_id" element={<SubShowcase />} />{" "} */}
            <Route path="/show-Subs/:blog_id" element={<ShowSubs />} />{" "}
          </Routes>
        </div>
      </div>
    </>
  );
}
