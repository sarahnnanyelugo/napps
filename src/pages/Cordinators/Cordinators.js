import React, { useContext, useEffect, useState } from "react";
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
import { ApiContext } from "../../ApiContext";
import api, { setAuthToken } from "../../utility/api";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../AuthContext";
import AccountsTable from "../../components/AccountsTable/AccountsTable";
export const Cordinators = () => {
  const [coordinators, setCoordinators] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCoordinators, setFilteredCoordinators] = useState(false);
  const { authToken } = useAuth();
  async function fetchCoordinators() {
    setIsLoading(true);
    try {
      setAuthToken(authToken);
      const response = await api.post(`/admin/fetch-coordinators`);
      setCoordinators(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (errorResponse) {
      toast.error(
        "Error initializing search scheme: " + errorResponse.response?.status
      );
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchCoordinators();
  }, []);

  useEffect(() => {
    if (coordinators) setFilteredCoordinators(coordinators);
  }, [coordinators]);

  const [activeIndex, setActiveIndex2] = useState(1);
  const handleClick2 = (index) => setActiveIndex2(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";
  const checkActive2 = (index, className) =>
    activeIndex === index ? className : "";

  function reducer(dt) {
    setFilteredCoordinators(dt.list);
  }
  return (
    <>
      <ToastContainer />
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
              Coordinators
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
          {activeIndex === 1 && (
            <div className="ssearch-div d-md-flex justify-content-md-between">
              <div className="col-md-3">
                <h6 style={{ fontFamily: "montM" }}>Search Coordinators</h6>
                <br />
                <SearchBar callback={reducer} posts={coordinators} />
              </div>
              <div className="">
                {" "}
                <div className="btn-group ">
                  <button className="btn btn-light" style={{ flexGrow: 1 }}>
                    {" "}
                    <img src={Icon3} height="20px" width="20px" />
                    Export
                  </button>
                  <AddCoordinators />
                </div>
              </div>
            </div>
          )}
          <div className="panels">
            {/* {!isLoading&&coordinators &&
            <div className={`panel ${checkActive(1, "active2")}`}>
              <CordinatorsTable data={filteredCoordinators} />
            </div>} */}
            <div className={`panel ${checkActive(2, "active2")}`}>
              {/*<AddAccount />*/}
              <AccountsTable />
            </div>
            <div className={`panel ${checkActive(3, "active2")}`}>
              {/*<Percentile data={filteredSchools} />*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
