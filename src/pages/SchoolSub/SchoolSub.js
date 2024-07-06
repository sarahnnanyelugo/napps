import React, { useEffect, useState } from "react";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import CountUp from "react-countup";
import Icon1 from "../../assets/images/user1.svg";
import Icon2 from "../../assets/images/user2.svg";
import Icon3 from "../../assets/images/exp.svg";
import "./subscription.scss";
import SchoolsTable from "../../components/SchoolsTable/SchoolsTable";
import { subscribedSchools } from "../../Data/subscribedSchData";
import SubscribedTable from "./SubscribedTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import NavDropdown from "react-bootstrap/NavDropdown";
import WOW from "wowjs";
import { PiLinkSimpleBreakThin } from "react-icons/pi";

export const SchoolSUb = () => {
  const [category, setCategory] = useState("*");
  const [filteredSchools, setfilteredSchools] = useState(subscribedSchools);
  function setCat(cat) {
    setCategory(cat);
  }
  useEffect(() => {
    if (category === "*") {
      setfilteredSchools(subscribedSchools);
    } else {
      setfilteredSchools(
        subscribedSchools.filter((prd) => prd.category.indexOf(category) !== -1)
      );
    }
  }, [category]);
  const [state, setState] = useState({
    query: "",
    list: subscribedSchools,
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
      <DashboardTop title="Subscription" />
      <div className="Admin-dashboard">
        <div className=" row row-cols-1 row-cols-lg-2 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                {" "}
                <img src={Icon1} height="30px" />
                <p>Total Fees Paid</p>
              </div>
              <h1 className="stats">
                {" "}
                <CountUp
                  start={0}
                  end={100}
                  duration={2}
                  decimal=""
                  prefix="K "
                  suffix="₦"
                  enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                {" "}
                {/* <img src={Icon2} height="30px" /> */}
                <h4>
                  <PiLinkSimpleBreakThin />
                </h4>
                <p>Renewals Made</p>
              </div>
              <h1 className="stats">
                {" "}
                <CountUp
                  start={0}
                  end={20}
                  duration={2}
                  decimal=""
                  prefix=" "
                  suffix=""
                  enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>{" "}
        </div>{" "}
        <div className="schools-filter-div col-md-12">
          {" "}
          <div className="ssearch-div d-flex">
            <h5>Transaction History</h5>
            <div className="col-md-3 offset-md-7">
              <SearchBar callback={reducer} posts={subscribedSchools} />
            </div>
          </div>{" "}
          <hr />
          <SubscribedTable data={filteredSchools} />
        </div>
      </div>
    </>
  );
};
