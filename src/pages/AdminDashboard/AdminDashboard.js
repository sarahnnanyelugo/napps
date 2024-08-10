import React, {useContext, useEffect, useState} from "react";
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
import Icon3 from "../../assets/images/reset.svg";
import Icon4 from "../../assets/images/active.png";
import { ToastContainer, toast } from "react-toastify";

import "./admin-dashboard.scss";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import {useAuth} from "../../AuthContext";
import {ApiContext} from "../../ApiContext";
import {setAuthToken} from "../../utility/api";
import formatNumber from "../../utility/utils";
const customData = [45, 100, 80, 90, 70, 80];
const customLabels = [
  "North Central (NC)",
  "North East (NE)",
  "North West (NW)",
  "South West (SW)",
  "South East (SE)",
  "South South (SS)",
];

const stateLabels = [
  [
    "Benue",
    "Kogi",
    "Kwara",
    "Nasarawa",
    "Niger",
    "Plateau",
    "Federal Capital Territory (FCT)",
  ],
  ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
  ["Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Zamfara"],
  ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"],
  ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
  ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
];
const stateData = [
  [34, 56, 76, 89, 90, 100, 45], // North Central
  [23, 67, 85, 92, 48, 77], // North East
  [55, 44, 63, 74, 81, 97, 33], // North West
  [65, 70, 59, 88, 49], // South East
  [50, 72, 91, 60, 83, 66], // South South
  [78, 51, 68, 84, 73, 99], // South West
];
const lgaLabels = [
  [
    "Ado",
    "Agatu",
    "Apa",
    "Buruku",
    "Gboko",
    "Guma",
    "Gwer East",
    "Gwer West",
    "Katsina-Ala",
    "Konshisha",
    "Kwande",
    "Logo",
    "Makurdi",
    "Obi",
    "Ogbadibo",
    "Oju",
    "Okpokwu",
    "Otukpo",
    "Tarka",
    "Ukum",
    "Ushongo",
    "Vandeikya",
  ],
  [
    "Adavi",
    "Ajaokuta",
    "Ankpa",
    "Bassa",
    "Dekina",
    "Ibaji",
    "Idah",
    "Igalamela Odolu",
    "Ijumu",
    "Kabba Bunu",
    "Kogi",
    "Lokoja",
    "Mopa Muro",
    "Ofu",
    "Ogori Magongo",
    "Okehi",
    "Okene",
    "Olamaboro",
    "Omala",
    "Yagba East",
    "Yagba West",
  ],
  [
    "Asa",
    "Baruten",
    "Edu",
    "Ekiti",
    "Ifelodun",
    "Ilorin East",
    "Ilorin South",
    "Ilorin West",
    "Irepodun",
    "Isin",
    "Kaiama",
    "Moro",
    "Offa",
    "Oke Ero",
    "Oyun",
    "Pategi",
  ],
  [
    "Akwanga",
    "Awe",
    "Doma",
    "Karu",
    "Keana",
    "Keffi",
    "Kokona",
    "Lafia",
    "Nasarawa",
    "Nasarawa Egon",
    "Obi",
    "Toto",
    "Wamba",
  ],
  [
    "Agaie",
    "Agwara",
    "Bida",
    "Borgu",
    "Bosso",
    "Chanchaga",
    "Edati",
    "Gbako",
    "Gurara",
    "Katcha",
    "Kontagora",
    "Lapai",
    "Lavun",
    "Magama",
    "Mariga",
    "Mashegu",
    "Mokwa",
    "Muya",
    "Pailoro",
    "Rafi",
    "Rijau",
    "Shiroro",
    "Suleja",
    "Tafa",
    "Wushishi",
  ],
  [
    "Barkin Ladi",
    "Bassa",
    "Bokkos",
    "Jos East",
    "Jos North",
    "Jos South",
    "Kanam",
    "Kanke",
    "Langtang North",
    "Langtang South",
    "Mangu",
    "Mikang",
    "Pankshin",
    "Qua’an Pan",
    "Riyom",
    "Shendam",
    "Wase",
  ],
  ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
];
const lgaData = [
  [
    34, 56, 78, 23, 45, 67, 89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56,
    78, 90, 23,
  ],
  [
    45, 67, 89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90, 23, 45,
    67, 89, 12,
  ],
  [
    56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56,
    78,
  ],
  [67, 89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78],
  [
    78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78,
    90, 23, 45, 67, 89, 12,
  ],
  [89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90, 23, 45],
  [90, 23, 45, 67, 89, 12],
];
export const AdminDashboard = () => {
  const [state, setState] = useState({
    query: "",
    list: recentActs,
  });
  const [drilled, setDrilled] = useState(false);
  const [drillIndex, setDrillIndex] = useState(0);
  const [lastDrillIndex, setLastDrillIndex] = useState(0);
  const [drillLevel, setDrillLevel] = useState(0); //Max drill level = 2
  const [isLoading, setIsLoading] = useState(true);

  const [dLabel, setLabel] = useState([]);
  const [dData, setData] = useState([]);

  const { login, isLoggedIn,authToken,userState} = useAuth();
  const { data, loading, error, fetchData, postData } = useContext(ApiContext);
  const [authError,setAuthError]=useState(false)


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 2 seconds delay
    if(!authToken)return
    const fetchSubInfo = async () => {
      setAuthToken(authToken);
      try {
        await postData("/admin/index", {}); // the postData call
      } catch (errorResponse) {
        console.error('Error fetching role information:', errorResponse);
      }
    };

    fetchSubInfo();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(!data)return;
  }, [data]);

  useEffect(() => {
    setAuthError(false)
    if (!error) return;

    // Display the error message
    toast.error(error.response?.data?.message || 'You may not have access to this page!');

    // Check if the message contains "Unauthorized" and navigate back
    if (error.response?.data?.message?.includes('Unauthorized')) {
      setAuthError(true)
      // setTimeout(() => {
      //   window.history.back();
      // }, 2000); // 2-second delay
    }
  }, [error]);


  const checkDrills = (elementIndex) => {
    setDrilled(true);
    setDrillIndex(elementIndex);
    setLastDrillIndex(elementIndex);
    if (drillLevel < 2) setDrillLevel(drillLevel + 1);
  };

  const parseLabels = () => {
    if (!drilled) return customLabels;
    switch (drillLevel) {
      case 1:
        return stateLabels[drillIndex];
      case 2:
        return lgaLabels[drillIndex];
      default:
        return customLabels;
    }
  };
  const parseData = () => {
    if (!drilled) return customData;
    console.log("drill level: " + drillLevel);
    switch (drillLevel) {
      case 1:
        return stateData[drillIndex];
      case 2:
        return lgaData[drillIndex];
      default:
        return customData;
    }
  };

  const pegLevel = () => {
    // let lvl=drillLevel -1;
    // if(lvl<0)return;
    setDrillLevel(0);
    // setDrillIndex(lastDrillIndex)
    // setLastDrillIndex(lastDrillIndex -1);
  };

  useEffect(() => {
    setLabel(parseLabels());
    setData(parseData());
  });
  useEffect(() => {
    setLabel(parseLabels());
    setData(parseData());
    console.log("level: " + drillLevel, "index: " + drillIndex);
  }, [drillIndex]);

  return (
    <>
      <ToastContainer />
      <DashboardTop title={`Welcome, ${userState?.name||""}`} />
      {authError &&
      <div className="Admin-dashboard">
        <div className=" row row-cols-1 row-cols-lg-1 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary">
              <p className={"text-danger"}>Unauthorized Access</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h3 className="stats">
                    You do not have access to this page
                  </h3>
                </div>
                {" "}
                <div className="col-md-6">
                  <DataChart backGroundColor={"#ff0000"} borderColor={"#fff000"} labelSet={[".", ".",""]} dataSet={[0, 14, 3,0]}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {!authError&&<div className="Admin-dashboard">
        <div className=" row row-cols-3 row-cols-lg-3 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary">
              <p>This Year's Registered Schools</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h1 className="stats">
                    {" "}
                    <CountUp
                        start={0}
                        end={data?.schoolsThisYear}
                        duration={2}
                        decimal=""
                        prefix=" "
                        suffix=""
                        enableScrollSpy={true}
                    />
                  </h1>
                  <small>
                    <img src={data?.yearlyPercentageChange>0?Icon1:Icon2} height="11px"/>
                    <span className={data?.yearlyPercentageChange>0?"up":"down"}>{Math.abs(data?.yearlyPercentageChange||0)}%</span>vs last year
                  </small>
                </div>
                {" "}
                <div className="col-md-6">
                  {data?.yearlyPercentageChange>0?<DataChart/>:<SubChart/>}
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col">
            <div className="summary">
              <p>This month's Registered Schools</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h1 className="stats">
                    {" "}
                    <CountUp
                        start={0}
                        end={data?.schoolsThisMonth}
                        duration={2}
                        decimal=""
                        prefix=" "
                        suffix=""
                        enableScrollSpy={true}
                    />
                  </h1>
                  <small>
                    <img src={data?.monthlyPercentageChange>0?Icon1:Icon2} height="11px"/>
                    <span className={data?.monthlyPercentageChange>0?"up":"down"}>{Math.abs(data?.monthlyPercentageChange||0)}%</span>vs last month
                  </small>
                </div>
                {" "}
                <div className="col-md-6">
                  {data?.monthlyPercentageChange>0?<DataChart/>:<SubChart/>}
                </div>
              </div>
            </div>
          </div>
          {" "}
          <div className="col">
            <div className="summary">
              <p>Total Registered Schools</p>
              <div className="d-md-flex">
                <div className="col-md-6">
                  <h1 className="stats">
                    {" "}
                    <CountUp
                        start={0}
                        end={data?.totalSchools}
                        duration={2}
                        decimal={false}
                        prefix=" "
                        suffix=""
                        enableScrollSpy={true}
                    />
                  </h1>
                  <small>
                    <img src={Icon4} width="11px"/>
                    <span className="up"> {formatNumber(data?.activeSchools,0)}</span> Active Schools
                  </small>
                </div>
                {" "}
                <div className="col-md-6">
                  <DataChart/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-md-flex">
          <div className="col-md-8 zone-div2 col-12">
            <div className="d-flex">
              <h6 style={{flexGrow: 1}}>
                Schools by{" "}
                {drillLevel == 0
                    ? "Zones"
                    : drillLevel == 1
                        ? "States"
                        : "LGAs"}
              </h6>
              {drilled && (
                  <button className="more-btn" onClick={pegLevel}>
                    <img src={Icon3} height="15px"/> Reset
                  </button>
              )}
            </div>
            <ZoneChart
                labels={dLabel}
                dataset={dData}
                drillPage={checkDrills}
            />
          </div>
          <div className="col-md-4 acts-div">
            {" "}
            <div className=" recent-acts2">
              <div className="act-head">
                {" "}
                <h6>Recent Activities</h6>
                <br/>
                <hr/>
              </div>

              <div className="act-body">
                {" "}
                {data?.audits?.data?.map((data, index) => (
                    <RecentActivity data={data}/>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="registered-sch">
          <SchoolsTable data={data?.newSchools} initialDisplayCount={5}/>
        </div>
      </div>}
    </>
  );
};
