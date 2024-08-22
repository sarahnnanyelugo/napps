import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MySchoolNav from "../../components/MySchoolNav/MySchoolNav";
import MySchools from "../MySchools/MySchools";
import { SchoolSUb } from "../SchoolSub/SchoolSub";
import { SchShowcase } from "../SchoolManagement/SchShowcase";
import MyPerks from "../MyPerks/MyPerks";

export default function MySchoolLayout() {
  return (
    <>
      <div className="d-md-flex">
        <div className="col-md-2">
          <MySchoolNav />
        </div>
        <div className="col-md-10" style={{ padding: "0px 20px" }}>
          <Routes>
            <Route path="/my-schools" element={<MySchools />} />{" "}
            <Route
              path="/my-schools/sch-showcase/:school_id"
              element={<SchShowcase />}
            />{" "}
            <Route path="/sch-sub" element={<SchoolSUb />} />{" "}
            <Route path="/sch-perks" element={<MyPerks />} />{" "}
          </Routes>
        </div>
      </div>
    </>
  );
}
