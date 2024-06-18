import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./dashboard-nav.scss";
import Logo from "../../assets/images/logo.png";
// import Icon1 from "../../assets/images/dash.svg";
// import Icon2 from "../../assets/images/requests.svg";
// import Icon3 from "../../assets/images/message.svg";
// import Icon4 from "../../assets/images/heart.svg";
// import Icon5 from "../../assets/images/sell-booth.png";

const DashboardNav = () => {
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
        <ul className="list-unstyled col-md-9 offset-md-2">
          <li>
            <NavLink to={"./admin-dashboard"} activeClassName="active">
              {/* <img src={Icon2} width="20px" height="20px" /> */}
              Dashboard
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to={"./product-requests"} activeClassName="active">
              {/* <img src={Icon2} width="20px" height="20px" /> Product Requests */}
              School Management
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to={"./order-page"} activeClassName="active">
              {/* <img src={Icon2} width="20px" height="20px" /> Orders */}
              Subscription
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to={"./messages"} activeClassName="active">
              {/* <img src={Icon2} width="20px" height="20px" /> */}
              Payments
            </NavLink>
          </li>{" "}
        </ul>
      </div>
    </>
  );
};

export default DashboardNav;
