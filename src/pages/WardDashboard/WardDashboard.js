import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DataChart } from "../../components/Chart/DataChart";
import { RecentActivity } from "../../components/RecentActivity/RecentActivity";
import SchoolsTable from "../../components/SchoolsTable/SchoolsTable";
import { SubChart } from "../../components/SubChart/SubChart";
import { ZoneChartOld } from "../../components/ZoneChart/ZoneChartOld";
import { recentActs } from "../../Data/recentActivities";
import { schools } from "../../Data/schoolsData";
import CountUp from "react-countup";
import Icon1 from "../../assets/images/up.svg";
import Icon2 from "../../assets/images/down.svg";

import "./admin-dashboard.scss";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
const customData = [50, 100, 80, 90, 70, 80];
const customLabels = [
  "Victoria Island 1",
  "Victoria Island 11",
  "Ikoyi",
  "Ikoyi 11",
  "Lekki/Ikate",
  "Obalende",

  ,
];
export const WardDashboard = () => {
  const [state, setState] = useState({
    query: "",
    list: recentActs,
  });
  return (
    <>
      <DashboardTop title="Welcome, Peter" />
      <div className="Admin-dashboard">
        <div className=" row row-cols-2 row-cols-lg-3 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary">
              <p>Total Registered Schools</p>
              <div className="d-flex">
                <div className="col-md-5">
                  <h1 className="stats">
                    {" "}
                    <CountUp
                      start={0}
                      end={53}
                      duration={2}
                      decimal=""
                      prefix=" "
                      suffix=""
                      enableScrollSpy={true}
                    />
                  </h1>
                  <p>
                    <img src={Icon1} height="11px" />
                    <span className="up">12%</span>vs last month
                  </p>
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
                  <h1 className="stats">
                    {" "}
                    <CountUp
                      start={0}
                      end={49}
                      duration={2}
                      decimal=""
                      prefix=" "
                      suffix=""
                      enableScrollSpy={true}
                    />
                  </h1>
                  <p>
                    <img src={Icon2} height="11px" />
                    <span className="down">5%</span>vs last month
                  </p>
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
                  <h1 className="stats">
                    {" "}
                    <CountUp
                      start={0}
                      end={800}
                      duration={2}
                      decimal={true}
                      prefix=" "
                      suffix="K"
                      enableScrollSpy={true}
                    />
                  </h1>
                  <p>
                    <img src={Icon1} width="11px" />
                    <span className="up">12%</span>vs last month
                  </p>
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
            <h5>Schools by Wards</h5>
            <ZoneChartOld labels={customLabels} dataset={customData} />
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
