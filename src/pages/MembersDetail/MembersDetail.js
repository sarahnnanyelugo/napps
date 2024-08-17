import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { Password } from "../../components/Password/Password";
import "./members-detail.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiContext } from "../../ApiContext";
import api from "../../utility/api";
import { setLocalStorage } from "../../utility/localStorage";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";

export const MembersDetail = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [value, setValue] = useState();
  const [ld, setLd] = useState(false);
  const [role, setRole] = useState([]);
  const { data, loading, error, fetchData, postData } = useContext(ApiContext);
  const [form, setForm] = useState({
    email: " ",
    password: " ",
    fname: " ",
    lname: " ",
    title: " ",
    phone: " ",
    password_confirmation: " ",
  });
  useEffect(() => {
    setForm({ ...form, ["roles"]: [role?.id] });
  }, [role]);

  const initRoles = async () => {
    setLd(true);
    try {
      const response = await api.get(apiUrl + "/register");
      setRole(response.data);
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLd(false);
    }
  };
  useEffect(() => {
    initRoles();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  useEffect(() => {
    setForm({ ...form, ["phone"]: value });
  }, [value]);

  useEffect(() => {
    setForm({
      ...form,
      ["name"]: form.title + " " + form.fname + " " + form.lname,
    });
  }, [form.title, form.fname, form.lname]);

  useEffect(() => {
    // console.log(form);
  },[form.phone])
  useEffect(() => {
    if (!data)
      return;
    toast.success("Thanks for Signing Up!");
    setSchoolRegistrationProforma();
    setInterval(() => {
      window.location = "/registration";
    }, 1000);
  }, [data]);
  
  useEffect(() => {
    if (!error)
      return;
    toast.error("Registration Error:" + error.response?.data);
    // console.log(error.response?.data);
  }, [error]);
  async function registerProprietor() {
    try {
      await postData("/register", form);
    } catch (errorResponse) {
      toast.error("Error creating proprietor profile: ", errorResponse.response?.data);
    }
  }

  function setSchoolRegistrationProforma() {
    setLocalStorage("user", data.user);
    setLocalStorage("authToken", data.token);
    setLocalStorage("isLoggedIn", true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form?.email) {
      toast.error("email is required");
    } else if (!regex.test(form?.email)) {
      toast.error("Please provide a valid email");
    } else {
      console.log(form);
      registerProprietor();
    }
  }
  return (
    <>
      <ToastContainer />
      <form action="" onSubmit={handleSubmit}>
        {" "}
        <div className="login-div col-md-8 offset-md-2">
          <center>
            <Link to={"/"}>
              <img
                className="img"
                src={Logo}
                alt="Scholar"
                width="198px"
                height="69px"
              />
            </Link>
            <h2>Member Details (School Owners)</h2>{" "}
          </center>
          <p className="col-md-">
            By registering with NAPPS, you gain access to our members’ portal,
            allowing you to add your school to our online directory, connect
            with other proprietors, create a student management system, and much
            more.
            <br />
            <br />
            If you are already registered with NAPPS, please{" "}
            <Link to={"/login"} className="login">
              Log in
            </Link>{" "}
            to your account. If not, you can register by completing the form
            below.
          </p>
          <Row className=" members-detail">
            <Col>
              <h6>Title</h6>
              <input
                onChange={handleChange}
                name="title"
                placeholder="Mr, Mrs, Miss… etc."
              />
            </Col>{" "}
            <Col>
              <h6>First Name</h6>
              <input
                name="fname"
                onChange={handleChange}
                placeholder="Enter first name here"
              />
            </Col>{" "}
            <Col>
              <h6>Last Name</h6>
              <input
                name="lname"
                onChange={handleChange}
                placeholder="Enter last name here"
              />
            </Col>
          </Row>
          <Row className=" members-detail">
            <Col>
              <h6>School Owners Email (Login Email)</h6>
              <input
                placeholder="olasunkanmifinesse@gmail.com"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </Col>{" "}
            <Col style={{ display: "grid" }}>
              <h6 style={{ textAlign: "left" }}>School Owners Phone Number</h6>
              <PhoneInput
                defaultCountry="NG"
                value={value}
                onChange={setValue}
                placeholder="700 000 0000"
              />
            </Col>
          </Row>
          <Row className=" members-detail">
            <Col>
              <h6>Password</h6>
              <Password
                onChange={handleChange}
                name="password"
                type="password"
              />
            </Col>
            <Col>
              <h6>Confirm Password</h6>
              <Password
                onChange={handleChange}
                name="password_confirmation"
                type="password"
              />
            </Col>
          </Row>
          <div className="col-md- flex-end">
            <p>By registering, you agree with our <Link to={"/terms"} target={'blank'} className={"text-info bold"}>Terms & Conditions</Link></p>
            <button className="payment-button ">
              {loading && <Spinner animation="border" variant="light" size="sm"/>}{" "}
              Proceed{" "}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
