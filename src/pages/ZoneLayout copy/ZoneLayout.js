import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardNav from "../../components/ZoneNav/ZoneNav";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { AdminDashboard } from "../AdminDashboard/AdminDashboard";
import MySchools from "../MySchools/MySchools";
import { SchoolSUb } from "../SchoolSub/SchoolSub";
import { ZoneDashboard } from "../ZoneDashboard/ZoneDashboard";
import ZoneNav from "../../components/ZoneNav/ZoneNav";

export default function ZoneLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="col-md-2">
          <ZoneNav />
        </div>
        <div className="col-md-10" style={{ padding: "0px 20px" }}>
          <Routes>
            <Route path="/zone-dashboard" element={<ZoneDashboard />} />{" "}
            <Route path="/sch-sub" element={<SchoolSUb />} />{" "}
          </Routes>
        </div>
      </div>
    </>
  );
}
