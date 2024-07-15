import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./dashboard-nav.scss";
import Logo from "../../assets/images/logo.png";
import { TiChartBar } from "react-icons/ti";
import { LuSchool } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";

const ZoneNav = () => {
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
            <NavLink to={"./zone-dashboard"} activeClassName="active">
              <span>
                <TiChartBar />
              </span>
              My Schools
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to={"./zone-management"} activeClassName="active">
              <span>
                {" "}
                <MdOutlinePayments />
              </span>
              School Management
            </NavLink>
          </li>{" "}
        </ul>
      </div>
    </>
  );
};

export default ZoneNav;
