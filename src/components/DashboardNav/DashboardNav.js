import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./dashboard-nav.scss";
import Logo from "../../assets/images/logo.png";
import { TiChartBar } from "react-icons/ti";
import { LuSchool } from "react-icons/lu";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { SlCompass } from "react-icons/sl";
import { FaPeopleRoof } from "react-icons/fa6";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoMenu } from "react-icons/io5";

const DashboardNav = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <p
        onClick={handleShow}
        className="mobileview offcanvas-btn"
        style={{ cursor: "pointer", float: "right" }}
      >
        <IoMenu style={{ fontSize: "32px" }} />
      </p>
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop={false}
        responsive="lg"
        placement="start"
        scroll={true}
        className="menuu"
        style={{
          height: "auto",
          maxHeight: "100vh",

          maxWidth: "100%",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
                  onClick={handleClose}
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
                  onClick={handleClose}
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
                  onClick={handleClose}
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
                  to={"./coordinators"}
                  activeClassName="active"
                  style={{ padding: "10px 60px 10px 10px" }}
                  onClick={handleClose}
                >
                  <span>
                    {" "}
                    <SlCompass />
                  </span>
                  Configurations
                </NavLink>
              </li>{" "}
              <li>
                <NavLink
                  to={"./proprietors"}
                  activeClassName="active"
                  style={{ padding: "10px 60px 10px 10px" }}
                  onClick={handleClose}
                >
                  <span>
                    {" "}
                    <FaPeopleRoof />
                  </span>
                  School Owners
                </NavLink>
              </li>{" "}
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default DashboardNav;
