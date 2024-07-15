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

import "./zone-dashboard.scss";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
const customLabels = ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau"];
const customData = [80, 40, 50, 60, 90, 20];
export const ZoneDashboard = () => {
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
              <p style={{ fontFamily: "montM" }}>Total Registered Schools</p>
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
              <p style={{ fontFamily: "montM" }}>Total Active Subscriptions</p>
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
              <p style={{ fontFamily: "montM" }}>Overall Revenue</p>
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
            <h5>States in your Zone</h5>
            <ZoneChart labels={customLabels} dataset={customData} />
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
