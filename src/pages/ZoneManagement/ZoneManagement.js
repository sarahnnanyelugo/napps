import React, { useEffect, useState } from "react";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import CountUp from "react-countup";
import Icon1 from "../../assets/images/user1.svg";
import Icon2 from "../../assets/images/user2.svg";
import Icon3 from "../../assets/images/exp.svg";
import Map from "../../assets/images/map2.png";
import "./school-management.scss";
import { schools } from "../../Data/schoolsData";
import SearchBar from "../../components/SearchBar/SearchBar";
import NavDropdown from "react-bootstrap/NavDropdown";
import WOW from "wowjs";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ManagementTable from "../SchoolManagement/ManagementTable";

export const ZoneManagement = () => {
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
  useEffect(() => {
    new WOW.WOW({
      live: true,
    }).init();
  }, [category]);
  return (
    <>
      <DashboardTop title="School Management" />

      <div className="Admin-dalshboard">
        <div className=" row row-cols-2 row-cols-lg-3 g-2 g-lg-4 mt">
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
                  end={53}
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
                  end={49}
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
                  end={17}
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
          <h5>At a glance</h5>
          <hr />
          <div className="d-md-flex">
            {" "}
            <div className="col-md-6 map-div col-8">
              <br />
              <center>
                <div class="image-container">
                  {" "}
                  <img
                    src={Map}
                    width="100%"
                    title="total school:50 active school:30 inactive school:80"
                  />
                </div>
              </center>
            </div>
            <div className="col-md-6 progress-div">
              <div>
                <div className="d-flex">
                  <div className="col-md-8">
                    <h6>Benue</h6>
                    <ProgressBar number={16} max={200} color="#0470C7" />
                  </div>
                  <p>90 Schools</p>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="col-md-8">
                    <h6>Kogi</h6>
                    <ProgressBar number={40} max={200} color="#DC64D6" />
                  </div>
                  <p>110 Schools</p>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="col-md-8">
                    <h6>Kano</h6>
                    <ProgressBar number={60} max={200} color="#EF7A80" />
                  </div>
                  <p>130 Schools</p>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="col-md-8">
                    <h6>Nasasrawa</h6>
                    <ProgressBar number={14} max={200} color="#67CB35" />
                  </div>
                  <p>80 Schools</p>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="col-md-8">
                    <h6>Niger</h6>
                    <ProgressBar number={10} max={200} color="#7F58D9" />
                  </div>
                  <p>50 Schools</p>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="col-md-8">
                    <h6>Plateau</h6>
                    <ProgressBar number={20} max={200} color="#225A60" />
                  </div>
                  <p>100 Schools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="schools-filter-div col-md-12">
          {" "}
          <h4>All Schools</h4>
          <div className=" d-md-flex filtering-btns">
            <button
              className={`btn-1 ${category === "*" ? "sch-active" : ""}`}
              onClick={() => setCat("*")}
            >
              All Schools
            </button>
            <button
              className={`btn-2 ${category === "active" ? "sch-active" : ""}`}
              onClick={() => setCat("active")}
            >
              Active Schools
            </button>
            <button
              className={`btn-2 ${category === "inactive" ? "sch-active" : ""}`}
              onClick={() => setCat("inactive")}
            >
              Inactive Schools
            </button>
            <button
              className={`btn-4 ${category === "pending" ? "sch-active" : ""}`}
              onClick={() => setCat("pending")}
            >
              Pending Schools
            </button>
          </div>{" "}
          <hr />
          <div className="ssearch-div d-md-flex">
            <div className="col-md-3">
              <h6 style={{ fontFamily: "montM" }}>Search Schools</h6>
              <br />
              <SearchBar callback={reducer} posts={schools} />
            </div>
            <div>
              <h6 style={{ fontFamily: "montM", marginLeft: "12px" }}>
                Status
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
              <h6 style={{ fontFamily: "montM", marginLeft: "12px" }}>Zone</h6>
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
            <div className="offset-md-3">
              <button className="exp-btn">
                {" "}
                <img src={Icon3} height="20px" width="20px" />
                Export
              </button>
              <button className="add-sch-btn">
                <span>+</span>Add School
              </button>
            </div>
          </div>{" "}
          <hr />
          <ManagementTable data={filteredSchools} />
        </div>
      </div>
    </>
  );
};
