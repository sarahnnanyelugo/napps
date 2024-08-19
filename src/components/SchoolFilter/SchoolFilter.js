import SearchBar from "../SearchBar/SearchBar";
// import {schools} from "../../Data/schoolsData";
import NavDropdown from "react-bootstrap/NavDropdown";
import Icon3 from "../../assets/images/exp.svg";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import ManagementTable from "../../pages/SchoolManagement/ManagementTable";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { ApiContext } from "../../ApiContext";
import WOW from "wowjs";
import api, { setAuthToken } from "../../utility/api";
import { toast } from "react-toastify";
import { removeLocalStorage } from "../../utility/localStorage";

export const SchoolFilter = () => {
  const [category, setCategory] = useState("*");
  const [zone, setZone] = useState("*");
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setfilteredSchools] = useState([]);

  async function fetchSchools() {
    try {
      setAuthToken(authToken);
      const response = await api.post(`/admin/fetch-schools`);
      setSchools(response.data);
      setfilteredSchools(response.data);
      console.log(response);
      setLoading(false);
    } catch (errorResponse) {
      toast.error(
        "Error initializing subscription: " + errorResponse.response?.status
      );
      setLoading(false);
      if (errorResponse?.response?.status === 401) {
        removeLocalStorage("authToken");
        removeLocalStorage("isLoggedIn");
      }
    }
  }

  useEffect(() => {
    if (!authToken) {
      toast.error("You must be logged in to access this page");
      setTimeout(() => {
        window.history.back();
      }, 1000);
    }
    fetchSchools();
  }, []);

  function setCat(cat) {
    setCategory(cat);
  }
  function setZn(cat) {
    setZone(cat);
  }

  useEffect(() => {
    if (category === "*") {
      setfilteredSchools(schools);
    } else {
      setfilteredSchools(schools.filter((prd) => prd.status == category));
    }
  }, [category]);
  useEffect(() => {
    if (zone === "*") {
      setfilteredSchools(schools);
    } else {
      setfilteredSchools(schools.filter((prd) => prd.zone_id == zone));
    }
  }, [zone]);
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
    <div className="schools-filter-div2 col-md-12">
      {" "}
      <h4>All Schools</h4>
      <div className=" d-md-flex filtering-btns22">
        <button
          className={`btn-1 ${category === "*" ? "sch-active" : ""}`}
          onClick={() => setCat("*")}
        >
          All Schools
        </button>
        <button
          className={`btn-2 ${category === 1 ? "sch-active" : ""}`}
          onClick={() => setCat(1)}
        >
          Active Schools
        </button>
        <button
          className={`btn-4 ${category === 0 ? "sch-active" : ""}`}
          onClick={() => setCat(0)}
        >
          Inactive Schools
        </button>
        {/*<button*/}
        {/*    className={`btn-4 ${category === "pending" ? "sch-active" : ""}`}*/}
        {/*    onClick={() => setCat("pending")}*/}
        {/*>*/}
        {/*    Pending Schools*/}
        {/*</button>*/}
      </div>{" "}
      <hr />
      <div className="ssearch-div d-md-flex">
        <div className="col-md-3 filter-headings">
          <h6 style={{ fontFamily: "montM" }}>Search Schools</h6>

          <SearchBar callback={reducer} posts={schools} />
        </div>
        <div className="d-flex">
          <div className="col-6 filter-headings">
            <h6 style={{ fontFamily: "montM", marginLeft: "12px" }}>Status</h6>

            <div className="select-div ">
              <select
                onChange={(e) => {
                  setCat(e.target.value);
                }}
              >
                <option value={"*"}>All</option>
                <option value={1}>Active</option>
                <option value={0}>InActive</option>
              </select>
            </div>
          </div>
          <div className="col-6 filter-headings">
            <h6 style={{ fontFamily: "montM", marginLeft: "12px" }}>Zone</h6>

            <NavDropdown
              title="Zone"
              id="collapsible-nav-dropdown"
              className="select-div "
            >
              <NavDropdown.Item href="#action/3.1" onClick={() => setZn(1)}>
                North Central (NC)
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" onClick={() => setZn(2)}>
                North East (NE)
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" onClick={() => setZn(3)}>
                North West (NW)
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4" onClick={() => setZn(4)}>
                South East (SE)
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4" onClick={() => setZn(5)}>
                South South (SS)
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4" onClick={() => setZn(6)}>
                South West (SW)
              </NavDropdown.Item>{" "}
            </NavDropdown>
          </div>
        </div>

        <div className="offset-3">
          <button className="exp-btn">
            {" "}
            <img src={Icon3} height="20px" width="20px" />
            Export
          </button>
          <Link to={"/registration"}>
            <button className="add-sch-btn" style={{ paddingTop: "6px" }}>
              <IoMdAdd />
              Add School
            </button>
          </Link>
        </div>
      </div>{" "}
      <hr />
      {!loading && filteredSchools && (
        <ManagementTable data={filteredSchools} />
      )}
    </div>
  );
};
