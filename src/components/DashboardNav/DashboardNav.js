import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./dashboard-nav.scss";
import Logo from "../../assets/images/logo.png";
import { TiChartBar } from "react-icons/ti";
import { LuSchool } from "react-icons/lu";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { SlPeople } from "react-icons/sl";
import { FaPeopleRoof } from "react-icons/fa6";

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
            <NavLink
              to={"./admin-dashboard"}
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
              to={"./school-management"}
              activeClassName="active"
              style={{ padding: "10px 10px 10px 10px" }}
            >
              <span>
                {" "}
                <LuSchool />
              </span>
              School Management
            </NavLink>
          </li>{" "}
          <li>
            <NavLink
              to={"./subscription"}
              activeClassName="active"
              style={{ padding: "10px 80px 10px 10px" }}
            >
              <span>
                {" "}
                <MdOutlinePayments />
              </span>
              Subscription
            </NavLink>
          </li>{" "}
          <li>
            <NavLink
              to={"./cordinators"}
              activeClassName="active"
              style={{ padding: "10px 80px 10px 10px" }}
            >
              <span>
                {" "}
                <SlPeople />
              </span>
              Cordinators
            </NavLink>
          </li>{" "}
          <li>
            <NavLink
              to={"./ proprietors"}
              activeClassName="active"
              style={{ padding: "10px 80px 10px 10px" }}
            >
              <span>
                {" "}
                <FaPeopleRoof />
              </span>
              Proprietors
            </NavLink>
          </li>{" "}
        </ul>
      </div>
    </>
  );
};

export default DashboardNav;
