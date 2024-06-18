import React from "react";
import "./login.scss";
import Logo from "../../assets/images/logo.png";

import { GoogleButton } from "../../components/GoogleButton/GoogleButton";
import { Link } from "react-router-dom";
import { MembersDetail } from "../MembersDetail/MembersDetail";

export const Login = () => {
  return (
    <>
      <center>
        {" "}
        <div className="login-div col-md-8">
          <center>
            <img
              className="img"
              src={Logo}
              alt="Scholar"
              width="198px"
              height="69px"
            />
            <h2>Welcome to NAPPS</h2>
            <p className="col-md-7">
              Lets connect you with the best of parents and students And make
              your school standout online
            </p>
            {/* <img className="col-md-12 bg" src={BG} alt="Scholar" /> */}
            <div className="rad" />
          </center>
        </div>
      </center>
      <div className="col-md-4 offset-md-4 choice">
        {" "}
        <GoogleButton />
        <div className="d-flex ">
          <div className="hr col-md-5 hr1"></div>
          <p className="or">Or</p>
          <div className="hr col-md-5 hr2"></div>
        </div>
        <h6>School Owners Email (Login Email)</h6>
        <input placeholder="Enter email address here" />
        <Link to={"/members-detail"}>
          {" "}
          <button className="email-button"> Confirm Email Address</button>
        </Link>
        <center>
          <p>
            By registering you agree with our <Link>Terms</Link> &{" "}
            <Link>Conditions</Link>
          </p>
        </center>
      </div>
    </>
  );
};
