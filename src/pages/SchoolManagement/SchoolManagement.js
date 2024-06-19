import React, { useEffect, useState } from "react";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import CountUp from "react-countup";
import Icon1 from "../../assets/images/user1.svg";
import Icon2 from "../../assets/images/user2.svg";
import Icon3 from "../../assets/images/exp.svg";
import "./school-management.scss";
import SchoolsTable from "../../components/SchoolsTable/SchoolsTable";
import { schools } from "../../Data/schoolsData";
import ManagementTable from "./ManagementTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import NavDropdown from "react-bootstrap/NavDropdown";
export const SchoolManagement = () => {
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
    // console.log(dt);
    setfilteredSchools(dt.list);
  }
  return (
    <>
      <DashboardTop title="School Management" />
      <div className="Admin-dashboard">
        <div className=" row row-cols-1 row-cols-lg-3 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                {" "}
                <img src={Icon1} height="30px" />
                <p>Total Registered Schools</p>
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
          </div>{" "}
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                {" "}
                <img src={Icon2} height="30px" />
                <p>Total Registered Schools</p>
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
          </div>{" "}
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                {" "}
                <img src={Icon2} height="30px" />
                <p>Total Registered Schools</p>
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
        <div className="schools-filter-div col-md-12">
          {" "}
          <h4>All Schools</h4>
          <div className=" d-flex filtering-btns">
            <button
              className={` ${category === "*" ? "sch-active" : ""}`}
              onClick={() => setCat("*")}
            >
              All Schools
            </button>
            <button
              className={` ${category === "active" ? "sch-active" : ""}`}
              onClick={() => setCat("active")}
            >
              Active Schools
            </button>
            <button
              className={` ${category === "inactive" ? "sch-active" : ""}`}
              onClick={() => setCat("inactive")}
            >
              Inactive Schools
            </button>
            <button
              className={` ${category === "pending" ? "sch-active" : ""}`}
              onClick={() => setCat("pending")}
            >
              Pending Schools
            </button>
          </div>
          <div className="ssearch-div d-flex">
            <div className="col-md-3">
              <h6>Search Schools</h6>
              <br />
              <SearchBar callback={reducer} posts={schools} />
            </div>
            <div>
              <h6>Status</h6>
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
              <h6>Zone</h6>
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
            <div className="offset-md-4">
              <button className="exp-btn">
                {" "}
                <img src={Icon3} height="20px" width="20px" />
                Export
              </button>
              <button className="add-sch-btn">Add School</button>
            </div>
          </div>{" "}
          <hr />
          <ManagementTable data={filteredSchools} />
        </div>
      </div>
    </>
  );
};
