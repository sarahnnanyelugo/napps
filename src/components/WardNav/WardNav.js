import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./dashboard-nav.scss";
import Logo from "../../assets/images/logo.png";
import { TiChartBar } from "react-icons/ti";
import { LuSchool } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";

const WardNav = () => {
  return (
    <>
      <div className="dashboard-nav">
        <div className="dash-logo">
          {" "}
          <center>
            <Link to={"/"}>
              <img src={Logo} width="164px" height="57px" />
            </Link>
          </center>
        </div>
        {/* <hr /> */}
        <ul className="list-unstyled col-md-12 ">
          <li>
            <NavLink
              to={"./ward-dashboard"}
              activeClassName="active"
              style={{ padding: "10px 90px 10px 10px" }}
            >
              <span>
                <TiChartBar />
              </span>
              Dashboard
            </NavLink>
          </li>{" "}
          <li>
            <NavLink
              to={"./ward-management"}
              activeClassName="active"
              style={{ padding: "10px 10px 10px 10px" }}
            >
              <span>
                {" "}
                <MdOutlinePayments />
              </span>
              School Management
            </NavLink>
          </li>{" "}
          <li>
            <NavLink
              to={"./ward-sub"}
              activeClassName="active"
              style={{ padding: "10px 90px 10px 10px" }}
            >
              <span>
                {" "}
                <MdOutlinePayments />
              </span>
              Subscription
            </NavLink>
          </li>{" "}
        </ul>
      </div>
    </>
  );
};

export default WardNav;
