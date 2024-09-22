import React from "react";
import "./footer.scss";
import Logo from "../../assets/images/logo.png";
import Fb from "../../assets/images/fb.svg";
import Twi from "../../assets/images/twi.svg";
import In from "../../assets/images/in.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer-div">
      <div className="d-md-flex col-md-10 offset-md-1">
        <div className="col-md-4">
          <img
            className="img"
            src={Logo}
            alt="Scholar"
            width="164px"
            height="57px"
          />
        </div>
        <div className="col-md-8 d-flex">
          {" "}
          <div className="col-md-3">
            <h5>About</h5>
            <ul className="list-unstyled">
              <li>
                <Link to={"/about-us"}>About Us</Link>
              </li>{" "}
              <li>
                <Link to={"/"}>Terms of Use</Link>
              </li>{" "}
              <li>
                <Link to={"/"}>List of Executives</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to={"/registration"}>Register your School</Link>
              </li>{" "}
              <li>
                <Link to={"/login"}>Member Login</Link>
              </li>{" "}
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li>
                <Link to={"/contact-us"}>Contact Us</Link>
              </li>{" "}
              <li>
                <Link to={"/"}>How it works</Link>
              </li>{" "}
            </ul>
          </div>
          <div className="col-md-3">
            <h5>About</h5>
            <ul className="list-unstyled text-inline">
              <li className="list-inline-item">
                <Link to={"/"}>
                  <img
                    className="img"
                    src={Twi}
                    alt="Scholar"
                    width="24px"
                    height="24px"
                  />
                </Link>
              </li>{" "}
              <li className="list-inline-item">
                <Link to={"/"}>
                  <img
                    className="img"
                    src={Fb}
                    alt="Scholar"
                    width="24px"
                    height="24px"
                  />
                </Link>
              </li>{" "}
              <li className="list-inline-item">
                <Link to={"/"}>
                  <img
                    className="img"
                    src={In}
                    alt="Scholar"
                    width="24px"
                    height="24px"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>{" "}
      <hr className="col-md-10 offset-md-1" />
      <p className="offset-md-1">
        © Copyright 2024 National Association of Proprietors of Private Schools.
        All Rights Reserved
      </p>
    </footer>
  );
};
