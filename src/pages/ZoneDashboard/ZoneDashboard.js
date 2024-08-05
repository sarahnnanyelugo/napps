import React, { useEffect, useState } from "react";
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
import Icon3 from "../../assets/images/reset.svg";
import "./zone-dashboard.scss";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
const customLabels = ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Jos"];
const customData = [80, 40, 50, 60, 90, 20];

// const stateLabels = [
//   [
//     "Benue",
//     "Kogi",
//     "Kwara",
//     "Nasarawa",
//     "Niger",
//     "Plateau",
//     "Federal Capital Territory (FCT)",
//   ],
//   ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
//   ["Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Zamfara"],
//   ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"],
//   ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
//   ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
// ];
// const stateData = [
//   [34, 56, 76, 89, 90, 100, 45], // North Central
//   [23, 67, 85, 92, 48, 77], // North East
//   [55, 44, 63, 74, 81, 97, 33], // North West
//   [65, 70, 59, 88, 49], // South East
//   [50, 72, 91, 60, 83, 66], // South South
//   [78, 51, 68, 84, 73, 99], // South West
// ];
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
export const ZoneDashboard = () => {
  const [state, setState] = useState({
    query: "",
    list: recentActs,
  });
  const [drilled, setDrilled] = useState(false);
  const [drillIndex, setDrillIndex] = useState(0);
  const [lastDrillIndex, setLastDrillIndex] = useState(0);
  const [drillLevel, setDrillLevel] = useState(0);

  const [dLabel, setLabel] = useState([]);
  const [dData, setData] = useState([]);

  const checkDrills = (elementIndex) => {
    setDrilled(true);
    setDrillIndex(elementIndex);
    setLastDrillIndex(elementIndex);
    if (drillLevel < 2) setDrillLevel(drillLevel + 1);
  };

  const parseLabels = () => {
    if (!drilled) return customLabels;
    switch (drillLevel) {
      // case 1:
      //   return stateLabels[drillIndex];
      case 1:
        return lgaLabels[drillIndex];
      default:
        return customLabels;
    }
  };
  const parseData = () => {
    if (!drilled) return customData;
    console.log("drill level: " + drillLevel);
    switch (drillLevel) {
      // case 1:
      //   return stateData[drillIndex];
      case 1:
        return lgaData[drillIndex];
      default:
        return customData;
    }
  };

  const pegLevel = () => {
    setDrillLevel(0);
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
            <div className="d-flex">
              <h6 style={{ flexGrow: 1 }}>
                Schools by{" "}
                {drillLevel == 0
                  ? "States"
                  : // : drillLevel == 1
                    // ? "States"
                    "LGAs"}
              </h6>
              {drilled && (
                <button className="more-btn" onClick={pegLevel}>
                  <img src={Icon3} height="15px" /> Reset
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
