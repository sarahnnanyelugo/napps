import React, { useState } from "react";
import "./login.scss";
import Logo from "../../assets/images/logo.png";

import { GoogleButton } from "../../components/GoogleButton/GoogleButton";
import { Link } from "react-router-dom";
import { MembersDetail } from "../MembersDetail/MembersDetail";
import { Password } from "../../components/Password/Password";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Login = () => {
  const [value, setValue] = useState();

  const [form, setForm] = useState({
    email: " ",
    password: " ",
  });
  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  }
  function handleSubmit(e) {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form?.email) {
      toast.error("email is required");
    } else if (!regex.test(form?.email)) {
      toast.error("This is not a valid email");
    } else {
      toast.success("You have successfully logged into your account");
      setInterval(() => {
        // window.location = "dashboard-layout/admin-dashboard";
        window.location = "dashboard-layout/admin-dashboard";
      }, 1000);
    }
    sessionStorage.setItem("user", JSON.stringify(form));
  }
  return (
    <>
      <ToastContainer />
      <form action="" onSubmit={handleSubmit}>
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
          <input
            placeholder="Enter email address here"
            type="email"
            name="email"
            onChange={handleChange}
          />
          <Password onChange={handleChange} name="password" type="password" />
          <button className="email-button"> LOGIN</button>
          <center>
            <p>
              By registering you agree with our <Link>Terms</Link> &{" "}
              <Link>Conditions</Link>
            </p>
          </center>
        </div>
      </form>
    </>
  );
};
