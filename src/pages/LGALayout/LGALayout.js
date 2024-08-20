import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardNav from "../../components/ZoneNav/ZoneNav";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { AdminDashboard } from "../AdminDashboard/AdminDashboard";
import { SchoolSUb } from "../SchoolSub/SchoolSub";
import { LGADashboard } from "../LGADashboard/LGADashboard";
import LGANav from "../../components/LGANav/LGANav";
import { LGAManagement } from "../LGAManagement/LGAManagement";

export default function LGALayout() {
  return (
    <>
      <div className="d-md-flex">
        <div className="col-md-2">
          <LGANav />
        </div>
        <div className="col-md-10" style={{ padding: "0px 20px" }}>
          <Routes>
            <Route path="/lga-dashboard" element={<LGADashboard />} />{" "}
            <Route path="/sch-sub" element={<SchoolSUb />} />{" "}
            <Route path="/lga-management" element={<LGAManagement />} />{" "}
          </Routes>
        </div>
      </div>
    </>
  );
}
