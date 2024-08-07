import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { SchoolSUb } from "../SchoolSub/SchoolSub";

import { LGAManagement } from "../LGAManagement/LGAManagement";
import { WardDashboard } from "../WardDashboard/WardDashboard";
import WardNav from "../../components/WardNav/WardNav";

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
            <Route path="/sch-sub" element={<SchoolSUb />} />{" "}
            <Route path="/lga-management" element={<LGAManagement />} />{" "}
          </Routes>
        </div>
      </div>
    </>
  );
}
