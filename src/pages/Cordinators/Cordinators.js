import React, { useEffect, useState } from "react";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import CountUp from "react-countup";
import Icon1 from "../../assets/images/user1.svg";
import Icon2 from "../../assets/images/user2.svg";
import Icon3 from "../../assets/images/exp.svg";
import "./school-management.scss";
import SchoolsTable from "../../components/SchoolsTable/SchoolsTable";
import { schools } from "../../Data/schoolsData";
import CordinatorsTable from "./CordinatorsTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import NavDropdown from "react-bootstrap/NavDropdown";
import WOW from "wowjs";
import { RiBankFill } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";
import Percentile from "./Percentile";

import { Link } from "react-router-dom";
import AddCoordinators from "./AddCoordinators";
import AddAccount from "./AddAccount";

export const Cordinators = () => {
  const [category, setCategory] = useState("*");
  const [filteredSchools, setfilteredSchools] = useState(schools);
  function setCat(cat) {
    setCategory(cat);
  }
  useEffect(() => {
    if (category === "*") {
      setfilteredSchools(schools);
    } else {
      setfilteredSchools(
        schools.filter((prd) => prd.category.indexOf(category) !== -1)
      );
    }
  }, [category]);
  const [state, setState] = useState({
    query: "",
    list: schools,
  });
  function reducer(dt) {
    setfilteredSchools(dt.list);
  }
  useEffect(() => {
    new WOW.WOW({
      live: true,
    }).init();
  }, [category]);

  const [activeIndex, setActiveIndex2] = useState(1);
  const handleClick2 = (index) => setActiveIndex2(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";
  const checkActive2 = (index, className) =>
    activeIndex === index ? className : "";
  return (
    <>
      <DashboardTop title="Coordinators" />
      <div className="Admin-dashboard">
        <div className=" row row-cols-2 row-cols-lg-2 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                {" "}
                <SlPeople />
                <p>Number of Coordinators</p>
              </div>
              <h1 className="stats">
                {" "}
                <CountUp
                  start={0}
                  end={50}
                  duration={2}
                  decimal=""
                  prefix=" "
                  suffix=""
                  enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                {" "}
                <RiBankFill />
                <p>Bank Accounts</p>
              </div>
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
            </div>
          </div>
        </div>{" "}
        <div className="business-pricing-tab ">
          {" "}
          <div className="tabs filtering-btns2">
            <button
              className={`tab btn-1 ${checkActive2(1, "active2")}`}
              onClick={() => handleClick2(1)}
            >
              User Accounts
            </button>
            <button
              className={`tab btn-2 ${checkActive2(2, "active2")}`}
              onClick={() => handleClick2(2)}
            >
              Bank Accounts
            </button>
            <button
              className={`tab btn-4 ${checkActive2(3, "active2")}`}
              onClick={() => handleClick2(3)}
            >
              Percentile
            </button>
          </div>
          <div className="ssearch-div d-md-flex">
            <div className="col-md-3">
              <h6 style={{ fontFamily: "montM" }}>Search Schools</h6>
              <br />
              <SearchBar callback={reducer} posts={schools} />
            </div>
            <div className="d-flex">
              {" "}
              <div>
                <h6 style={{ fontFamily: "montM", marginLeft: "12px" }}>
                  Filter
                </h6>
                <br />
                <div className="select-div ">
                  <select>
                    <option>Active</option>
                    <option>InActive</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>
              <div>
                <h6 style={{ fontFamily: "montM", marginLeft: "12px" }}>
                  Zone
                </h6>
                <br />
                <NavDropdown
                  title="Zone"
                  id="collapsible-nav-dropdown"
                  className="select-div "
                >
                  <NavDropdown.Item
                    href="#action/3.1"
                    onClick={() => setCat("NC")}
                  >
                    North Central (NC)
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.3"
                    onClick={() => setCat("NW")}
                  >
                    North West (NW)
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.4"
                    onClick={() => setCat("SW")}
                  >
                    South West (SW)
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.4"
                    onClick={() => setCat("SE")}
                  >
                    South East (SE)
                  </NavDropdown.Item>{" "}
                  <NavDropdown.Item
                    href="#action/3.4"
                    onClick={() => setCat("SS")}
                  >
                    South South (SS)
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
            <div className="offset-md-3 ">
              <button className="exp-btn" style={{ flexGrow: 1 }}>
                {" "}
                <img src={Icon3} height="20px" width="20px" />
                Export
              </button>

              <AddCoordinators />
            </div>
          </div>{" "}
          <div className="panels">
            <div className={`panel ${checkActive(1, "active2")}`}>
              <CordinatorsTable data={filteredSchools} />
            </div>{" "}
            <div className={`panel ${checkActive(2, "active2")}`}>
              <AddAccount />
              <SchoolsTable data={schools} />
            </div>
            <div className={`panel ${checkActive(3, "active2")}`}>
              <Percentile data={filteredSchools} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
