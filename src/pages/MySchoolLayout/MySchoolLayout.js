import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import MySchoolNav from "../../components/MySchoolNav/MySchoolNav";
import { AdminDashboard } from "../AdminDashboard/AdminDashboard";
import MySchools from "../MySchools/MySchools";
import { SchoolSUb } from "../SchoolSub/SchoolSub";

export default function MySchoolLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="col-md-2">
          <MySchoolNav />
        </div>
        <div className="col-md-10" style={{ padding: "0px 20px" }}>
          {/* <DashboardTop /> */}
          <Routes>
            <Route path="/my-schools" element={<MySchools />} />{" "}
            <Route path="/sch-sub" element={<SchoolSUb />} />{" "}
          </Routes>
        </div>
      </div>
    </>
  );
}
