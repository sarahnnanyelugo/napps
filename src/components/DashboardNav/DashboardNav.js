import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./dashboard-nav.scss";
import Logo from "../../assets/images/logo.png";
import { TiChartBar } from "react-icons/ti";
import { LuSchool } from "react-icons/lu";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";

const DashboardNav = () => {
  return (
    <>
      <div className="dashboard-nav2">
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
            <NavLink to={"./admin-dashboard"} activeClassName="active">
              <span>
                <LuSchool />
              </span>
              Dashboard
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to={"./school-management"} activeClassName="active">
              <span>
                {" "}
                <MdOutlinePayments />
              </span>
              School Management
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to={"./subscription"} activeClassName="active">
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

export default DashboardNav;
