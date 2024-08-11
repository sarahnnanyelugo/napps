import React, { useEffect, useState } from "react";
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
import Icon3 from "../../assets/images/reset.svg";
import "./zone-dashboard.scss";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
const customLabels = ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Jos"];
const customData = [80, 40, 50, 60, 90, 20];

const wardLabels = [
  [
    "Agila council ward",
    "Igumale council ward",
    "Ulayi council ward",
    "Ijigbancouncil ward",
    "Utonkon council ward",
  ],
  [
    "EGBA",
    "ENUNGBA",
    "OBAGAJI",
    "ODUGBEHO",
    "OGBAULU",
    "OGWULE-KADUNA",
    "OGWULE OGBAULU",
    "OKOKOLO",
    "OSHIGBUDU",
    "USHA",
  ],
  [
    "Akpete/ojantelle",
    "Auke",
    "Edikwu I",
    "Edikwu Ii",
    "Igah-okpaya",
    "Igoro",
    "Ikobi",
    "Oba",
    "Ofoke",
    "Oiji",
    "Ugbokpo",
  ],
  [
    "BINEV WARD",
    " ETULO WARD",
    "MBAADE WARD",
    "MBAAKURA WARD",
    "MBAAPEN WARD",
    "MBAATIRKYAA WARD",
    " MBAAZAGEE WARD",
    "MBAIKYONGO/NYIFON WARD",
    "MBAITYOUGH WARD",
    "MBAKYAAN WARD",
    "MBAYA WARD",
    "MBAYAKA WARD",
    "SHOROV WARD",
  ],
  [
    "Gbk/central Market",
    "Gboko East",
    "Gboko North West",
    "Gboko South",
    "Igyorov",
    "Mbaa Varakaa",
    "Mbaanku",
    "Mbadam",
    "Mbadim",
    "Mbatser",
    "Yandev South",
    "Mbaa Varakaa",
    "Mbakper",
    "Mbatyu",
    "Gboko North West",
    "Mbaanku",
    "Mbakwen",
    "Mbatan",
    "Yandev South",
    "Mbatyu",
    "Ukpekpe",
    "Yandev North",
  ],
  ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
];
const wardData = [
  [54, 56, 76, 19, 90, 50, 85], // ado ward
  [93, 67, 55, 92, 48, 47, 66, 90, 100, 30], // agatu ward
  [55, 44, 63, 74, 81, 97, 33, 67, 10, 90, 55], // apa
  [65, 70, 59, 88, 49, 67, 98, 20, 56, 77, 99, 19, 59], // buruku
  [78, 51, 68, 84, 73, 99, 66, 12, 89, 57, 59, 77], //guma
  [50, 72, 91, 60, 83, 66, 77, 50, 40, 100, 90, 59, 88, 40, 79, 44, 88], // gboko
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
      case 1:
        return lgaLabels[drillIndex];
      case 2:
        return wardLabels[drillIndex];
      default:
        return customLabels;
    }
  };
  const parseData = () => {
    if (!drilled) return customData;
    console.log("drill level: " + drillLevel);
    switch (drillLevel) {
      case 1:
        return lgaData[drillIndex];
      case 2:
        return wardData[drillIndex];
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
                  : drillLevel == 1
                  ? "LGAs"
                  : "Wards"}
              </h6>
              {drilled && (
                <button className="more-btn" onClick={pegLevel}>
                  <img src={Icon3} height="15px" /> Reset
                </button>
              )}
            </div>
            <ZoneChartOld
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
