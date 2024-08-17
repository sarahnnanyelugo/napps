import React, {useContext, useEffect, useState} from "react";
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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {getLocalStorage} from "../../utility/localStorage";
import {ApiContext} from "../../ApiContext";
import {setAuthToken} from "../../utility/api";
export const SchoolSUb = () => {
  const [category, setCategory] = useState("*");
  const [filteredSchools, setfilteredSchools] = useState(subscribedSchools);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthTokenState] = useState(() => {
    return getLocalStorage('authToken') || '';
  });
  const [user, setUser] = useState(() => {
    return getLocalStorage('user') || '';
  });
  const { data, loading, error, fetchData, postData } = useContext(ApiContext);
  function setCat(cat) {
    setCategory(cat);
  }
  useEffect(() => {
    if(!data)return;
    if (category === "*") {
      setfilteredSchools(data?.subscriptions);
    } else {
      setfilteredSchools(
        data?.subscriptions.filter((prd) => prd.category.indexOf(category) !== -1)
      );
    }
  }, [data]);
  function reducer(dt) {
    // console.log(dt);
    setfilteredSchools(dt?.list);
  }
  useEffect(() => {
    new WOW.WOW({
      live: true,
    }).init();
  }, [category]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 2 seconds delay
    if(!authToken)return
    const fetchSubInfo = async () => {
      setAuthToken(authToken);
      try {
        await postData("/my-subscriptions", {}); // the postData call
      } catch (errorResponse) {
        console.error('Error fetching role information:', errorResponse);
      }
    };

    fetchSubInfo();
    return () => clearTimeout(timer);
  }, []);

  const renderSkeletonRows = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(
        <tr key={i}>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>{" "}
          <td>
            <Skeleton />
          </td>
        </tr>
      );
    }
    return rows;
  };
  return (
    <>
      <DashboardTop title="Subscription" />
      <div className="Admin-dashboard">
        <div className=" row row-cols-1 row-cols-lg-3 g-2 g-lg-4 mt">
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
                  end={data?.sum||0}
                  duration={1}
                  decimal=""
                  prefix="₦ "
                  // suffix="₦"
                  enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                {" "}
                <h4>
                  <PiLinkSimpleBreakThin />
                </h4>
                <p>Subscription Invoices</p>
              </div>
              <h1 className="stats">
                {" "}
                <CountUp
                  start={0}
                  end={data?.count||0}
                  duration={1}
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
                <h4>
                  <PiLinkSimpleBreakThin />
                </h4>
                <p>Pending Subscription</p>
              </div>
              <h1 className="stats">
                {" "}
                <CountUp
                    start={0}
                    end={data?.count||0}
                    duration={1}
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
              <SearchBar callback={reducer} posts={data?.subscriptions} />
            </div>
          </div>{" "}
          <hr />
          {(isLoading||loading) ? (
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <Skeleton />
                  </th>
                  <th>
                    <Skeleton />
                  </th>
                  <th>
                    <Skeleton />
                  </th>
                  <th>
                    <Skeleton />
                  </th>{" "}
                  <th>
                    <Skeleton />
                  </th>{" "}
                  <th>
                    <Skeleton />
                  </th>{" "}
                  <th>
                    <Skeleton />
                  </th>{" "}
                  <th>
                    <Skeleton />
                  </th>
                </tr>
              </thead>
              <tbody>{renderSkeletonRows()}</tbody>
            </table>
          ) : (
            data && <SubscribedTable data={filteredSchools} />
          )}
        </div>
      </div>
    </>
  );
};
