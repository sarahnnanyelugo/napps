import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DataChart } from "../../components/Chart/DataChart";
import { RecentActivity } from "../../components/RecentActivity/RecentActivity";
import SchoolsTable from "../../components/SchoolsTable/SchoolsTable";
import { SubChart } from "../../components/SubChart/SubChart";
import { ZoneChart } from "../../components/ZoneChart/ZoneChart";
import { recentActs } from "../../Data/recentActivities";
import { schools } from "../../Data/schoolsData";
import "./admin-dashboard.scss";
export const AdminDashboard = () => {
  const [state, setState] = useState({
    query: "",
    list: recentActs,
  });
  return (
    <>
      <div className="Admin-dashboard">
        <div className="d-flex">
          <h1 style={{ flexGrow: 1 }}>Welcome, Peter</h1>
          <input placeholder="Search" className="col-md-3" />
        </div>
        <div className=" row row-cols-1 row-cols-lg-3 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary">
              <p>Total Registered Schools</p>
              <div className="d-flex">
                <div className="col-md-5">
                  <h1>530</h1>
                  <p>vs last month</p>
                </div>{" "}
                <div className="col-md-7">
                  <DataChart />
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary">
              <p>Total Registered Schools</p>
              <div className="d-flex">
                <div className="col-md-5">
                  <h1>530</h1>
                  <p>vs last month</p>
                </div>{" "}
                <div className="col-md-7">
                  <SubChart />
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary">
              <p>Total Registered Schools</p>
              <div className="d-flex">
                <div className="col-md-5">
                  <h1>530</h1>
                  <p>vs last month</p>
                </div>{" "}
                <div className="col-md-7">
                  <DataChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-md-flex">
          <div className="col-md-8 zone-div">
            <h6>Schools by Zones</h6>
            <ZoneChart />
          </div>
          <div className="col-md-4 acts-div">
            {" "}
            <div className=" recent-acts">
              <h6>Recent Activities</h6>
              <br />
              <hr />

              {state.list.map((data, index) => (
                <RecentActivity data={data} />
              ))}
            </div>
          </div>
        </div>
        <div className="registered-sch">
          <SchoolsTable data={schools} initialDisplayCount={4} />
        </div>
      </div>
    </>
  );
};
