import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./dashboard-nav.scss";
import Logo from "../../assets/images/logo.png";
import { TiChartBar } from "react-icons/ti";
import { LuSchool } from "react-icons/lu";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";

const MySchoolNav = () => {
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
            <NavLink to={"./my-schools"} activeClassName="active">
              <span>
                <LuSchool />
              </span>
              My Schools
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to={"./sch-sub"} activeClassName="active">
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

export default MySchoolNav;
