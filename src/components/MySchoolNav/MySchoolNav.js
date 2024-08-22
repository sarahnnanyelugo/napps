import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./dashboard-nav.scss";
import Logo from "../../assets/images/logo.png";
import { TiChartBar } from "react-icons/ti";
import { LuSchool } from "react-icons/lu";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlinePayments, MdOutlineCampaign } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoMenu } from "react-icons/io5";
const MySchoolNav = () => {
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
          <div className="my-sch-nav">
            <div className="dash-logo">
              {" "}
              <center>
                <Link to={"/"}>
                  <img src={Logo} width="164px" height="57px" />
                </Link>
              </center>
            </div>

            <ul className="list-unstyled col-md-12 ">
              <li>
                <NavLink to={"./my-schools"} activeClassName="active">
                  <span>
                    <LuSchool />
                  </span>
                  Dashboard
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
              </li>
              <li>
                <NavLink to={"./sch-perks"} activeClassName="active">
                  <span>
                    {" "}
                    <MdOutlineCampaign />
                  </span>
                  Perks
                </NavLink>
              </li>{" "}
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MySchoolNav;
