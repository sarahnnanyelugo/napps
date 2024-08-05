import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useFetcher } from "react-router-dom";
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
const customData = [45, 100, 80, 90, 70, 80];
const customLabels = [
  "North Central (NC)",
  "North East (NE)",
  "North West (NW)",
  "South West (SW)",
  "South East (SE)",
  "South South (SS)",
  ,
];

const stateLabels = [
  ['Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau', 'Federal Capital Territory (FCT)'],
  ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
  ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
  ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
  ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'],
  ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
];
const stateData = [
  [34, 56, 76, 89, 90, 100, 45], // North Central
  [23, 67, 85, 92, 48, 77],      // North East
  [55, 44, 63, 74, 81, 97, 33],  // North West
  [65, 70, 59, 88, 49],          // South East
  [50, 72, 91, 60, 83, 66],      // South South
  [78, 51, 68, 84, 73, 99]       // South West
];
export const AdminDashboard = () => {
  const [state, setState] = useState({
    query: "",
    list: recentActs,
  });
  const [drilled, setDrilled]=useState(0);
  const [drillIndex, setDrillIndex]=useState(0);

  const checkDrills = (elementIndex, datasetIndex) => {
    setDrilled(!drilled);
    setDrillIndex(elementIndex);
    // console.log(`Clicked on element at index: ${elementIndex} in dataset: ${datasetIndex}`);
    // // Add your custom logic here
    // // For example, navigate to another page or update state
    // alert(`You clicked on ${customLabels[elementIndex]} with value ${customData[elementIndex]}`);
  };

  useEffect(() => {

  if(drilled) {

  }
  },[drilled,drillIndex]);
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
          <div className="col-md-8 zone-div2 col-12">
            <div className="d-flex">
              <h6 style={{ flexGrow: 1 }}>Schools by Zones</h6>
              <button className="more-btn" onClick={()=>{setDrilled(false)}}>See all</button>
            </div>
            <ZoneChart labels={!drilled?customLabels:stateLabels[drillIndex]} dataset={!drilled?customData:stateData[drillIndex]} drillPage={!drilled&&checkDrills} />
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
