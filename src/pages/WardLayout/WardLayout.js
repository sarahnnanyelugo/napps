import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { SchoolSUb } from "../SchoolSub/SchoolSub";

import { LGAManagement } from "../LGAManagement/LGAManagement";
import { WardDashboard } from "../WardDashboard/WardDashboard";
import WardNav from "../../components/WardNav/WardNav";
import { WardManagement } from "../WardManagement/WardManagement";
import { WardSUb } from "../WardSub/WardSub";

export default function WardLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="col-md-2">
          <WardNav />
        </div>
        <div className="col-md-10" style={{ padding: "0px 20px" }}>
          <Routes>
            <Route path="/ward-dashboard" element={<WardDashboard />} />{" "}
            <Route path="/ward-sub" element={<WardSUb />} />{" "}
            <Route path="/ward-management" element={<WardManagement />} />{" "}
          </Routes>
        </div>
      </div>
    </>
  );
}
