import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DataChart } from "../../components/Chart/DataChart";
import { RecentActivity } from "../../components/RecentActivity/RecentActivity";
import SchoolsTable from "../../components/SchoolsTable/SchoolsTable";
import { SubChart } from "../../components/SubChart/SubChart";
import { ZoneChart } from "../../components/ZoneChart/ZoneChart";
import { recentActs } from "../../Data/recentActivities";
import { schools } from "../../Data/schoolsData";
import CountUp from "react-countup";
import Icon1 from "../../assets/images/up.svg";
import Icon2 from "../../assets/images/down.svg";

import "./admin-dashboard.scss";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
const customData = [50, 100, 80, 90, 70, 80];
const customLabels = [
  "North Central (NC)",
  "North East (NE)",
  "North West (NW)",
  "South West (SW)",
  "South East (SE)",
  "South South (SS)",
  ,
];
export const AdminDashboard = () => {
  const [state, setState] = useState({
    query: "",
    list: recentActs,
  });
  return (
    <>
      <DashboardTop title="Welcome, Peter" />
      <div className="Admin-dashboard">
        <div className=" row row-cols-3 row-cols-lg-3 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary">
              <p>Total Registered Schools</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h1 className="stats">
                    {" "}
                    <CountUp
                      start={0}
                      end={530}
                      duration={2}
                      decimal=""
                      prefix=" "
                      suffix=""
                      enableScrollSpy={true}
                    />
                  </h1>
                  <small>
                    <img src={Icon1} height="11px" />
                    <span className="up">12%</span>vs last month
                  </small>
                </div>{" "}
                <div className="col-md-6">
                  <DataChart />
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary">
              <p>Total Registered Schools</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h1 className="stats">
                    {" "}
                    <CountUp
                      start={0}
                      end={490}
                      duration={2}
                      decimal=""
                      prefix=" "
                      suffix=""
                      enableScrollSpy={true}
                    />
                  </h1>
                  <small>
                    <img src={Icon2} height="11px" />
                    <span className="down">5%</span>vs last month
                  </small>
                </div>{" "}
                <div className="col-md-6">
                  <SubChart />
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary">
              <p>Total Registered Schools</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h1 className="stats">
                    {" "}
                    <CountUp
                      start={0}
                      end={100000}
                      duration={2}
                      decimal={false}
                      prefix=" "
                      suffix="m"
                      enableScrollSpy={true}
                    />
                  </h1>
                  <small>
                    <img src={Icon1} width="11px" />
                    <span className="up">12%</span>vs last month
                  </small>
                </div>{" "}
                <div className="col-md-6">
                  <DataChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-md-flex">
          <div className="col-md-8 zone-div2">
            <div className="d-flex">
              <h6 style={{ flexGrow: 1 }}>Schools by Zones</h6>
              <button className="more-btn">See all</button>
            </div>
            <ZoneChart labels={customLabels} dataset={customData} />
          </div>
          <div className="col-md-4 acts-div">
            {" "}
            <div className=" recent-acts2">
              <div className="act-head">
                {" "}
                <h6>Recent Activities</h6>
                <br />
                <hr />
              </div>

              <div className="act-body">
                {" "}
                {state.list.map((data, index) => (
                  <RecentActivity data={data} />
                ))}
              </div>
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
