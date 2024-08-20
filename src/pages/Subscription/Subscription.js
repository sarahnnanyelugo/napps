import React, { useEffect, useState } from "react";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import CountUp from "react-countup";
import Icon1 from "../../assets/images/user1.svg";
import Icon2 from "../../assets/images/user2.svg";
import "./school-management.scss";

import { useAuth } from "../../AuthContext";
import api, { setAuthToken } from "../../utility/api";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import formatNumber from "../../utility/utils";
import { Link } from "react-router-dom";
import { getGreen, getRed } from "../../utility/dots";

export const Subscription = () => {
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [subscriptions, setSubscriptions] = useState([]);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [inactiveSubscriptions, setInactiveSubscriptions] = useState([]);
  const [filter, setFilter] = useState("total"); // 'active', 'inactive', 'total'
  const [filteredData, setFilteredData] = useState([]);
  const { authToken } = useAuth();

  async function fetchSubscriptions() {
    try {
      setAuthToken(authToken);
      const { data } = await api.post(`/admin/fetch-subscriptions`, {});
      setActiveCount(data.active_subscriptions);
      setInactiveCount(data.inactive_subscriptions);
      setTotalCount(data.total_subscriptions);
      setSubscriptions(data.subscriptions);
      setActiveSubscriptions(
        data.subscriptions.filter((sub) => sub.status === "successful")
      );
      setInactiveSubscriptions(
        data.subscriptions.filter((sub) => sub.status !== "successful")
      );
    } catch (errorResponse) {
      toast.error("Error fetching list: " + errorResponse.response?.status);
    }
  }

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    const filtered =
      filter === "active"
        ? activeSubscriptions
        : filter === "inactive"
        ? inactiveSubscriptions
        : subscriptions;
    setFilteredData(filtered);
  }, [filter, activeSubscriptions, inactiveSubscriptions, subscriptions]);

  return (
    <>
      <DashboardTop title="Subscription" />
      <div className="Admin-dashboard">
        <div className="row row-cols-3 row-cols-lg-3 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                <img src={Icon1} height="30px" alt="Total Subscribers Icon" />
                <p>Total Subscribers</p>
              </div>
              <h1 className="stats">
                <CountUp
                  start={0}
                  end={totalCount || 0}
                  duration={2}
                  enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                <img
                  src={Icon2}
                  height="30px"
                  alt="Active Subscriptions Icon"
                />
                <p>Active Subscriptions</p>
              </div>
              <h1 className="stats">
                <CountUp
                  start={0}
                  end={activeCount}
                  duration={2}
                  enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                <img
                  src={Icon2}
                  height="30px"
                  alt="Expired Subscriptions Icon"
                />
                <p>Inactive Subscriptions</p>
              </div>
              <h1 className="stats">
                <CountUp
                  start={0}
                  end={inactiveCount}
                  duration={2}
                  enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>
        </div>
        <div className="schools-filter-div col-md-12">
          <h4>All Schools</h4>
          <div className="d-flex justify-content-start mb-3">
            <Button
              variant="primary"
              onClick={() => setFilter("total")}
              style={{ margin: "6px" }}
            >
              Total
            </Button>
            <Button
              variant="success"
              onClick={() => setFilter("active")}
              style={{ margin: "6px" }}
            >
              Active
            </Button>
            <Button
              variant="danger"
              onClick={() => setFilter("inactive")}
              style={{ margin: "6px" }}
            >
              Inactive
            </Button>
          </div>

          <Table striped bordered hover responsive className="school-table">
            <thead>
              <tr>
                <th>#</th>
                <th>School Name</th>
                <th>Proprietor Name</th>
                <th>Transaction ID</th>
                <th>Amount (₦)</th>
                <th>Renewal Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((sub) => (
                <tr key={sub.id}>
                  <td>
                    <img src={sub.school.logo} alt="Logo" width="50" />
                  </td>
                  <td>{sub.school.name}</td>
                  <td>{sub.proprietor.name}</td>
                  <td>{sub.tx_ref}</td>
                  <td>{formatNumber(sub.amount)}</td>
                  <td>
                    {sub.start_date} - {sub.end_date}
                  </td>
                  <td>
                    <img
                      src={sub.status === "successful" ? getGreen() : getRed()}
                      alt="status icon"
                      style={{ width: "10px" }}
                    />{" "}
                    {sub.status ? sub.status : "Pending"}
                  </td>
                  <td>
                    <Link
                      className="view"
                      to={"/verify-pay?tx_ref=" + sub.tx_ref}
                      target={"_blank"}
                    >
                      view
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
