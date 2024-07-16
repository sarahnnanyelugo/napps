import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { Password } from "../../components/Password/Password";
import "./members-detail.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MembersDetail = () => {
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
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!form?.email) {
  //     toast.error("email is required");
  //   } else if (!form?.password) {
  //     toast.error("password is required");
  //   } else if (form.password.length < 4) {
  //     toast.error("password must be more than 4 characters");
  //   } else if (form.password.length > 10) {
  //     toast.error("password must be less than 10 characters");
  //   } else if (!regex.test(form?.email)) {
  //     toast.error("This is not a valid email");
  //   } else {
  //     toast.success("You have successfully signed in");
  //     setInterval(() => {
  //       window.location = "./admin-dashboard";
  //     }, 1000);
  //   }
  //   sessionStorage.setItem("user", JSON.stringify(form));
  // }
  function handleSubmit(e) {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form?.email) {
      toast.error("email is required");
    } else if (!regex.test(form?.email)) {
      toast.error("This is not a valid email");
    } else {
      toast.success("You have successfully created your personal account");
      setInterval(() => {
        window.location = "dashboard-layout/admin-dashboard";
      }, 1000);
    }
    sessionStorage.setItem("user", JSON.stringify(form));
  }
  return (
    <>
      <ToastContainer />
      <form action="" onSubmit={handleSubmit}>
        {" "}
        <div className="login-div col-md-8 offset-md-2">
          <center>
            <img
              className="img"
              src={Logo}
              alt="Scholar"
              width="198px"
              height="69px"
            />
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
              <input placeholder="Mr, Mrs, Miss… etc." />
            </Col>{" "}
            <Col>
              <h6>First Name</h6>
              <input placeholder="Enter first name here" />
            </Col>{" "}
            <Col>
              <h6>Last Name</h6>
              <input placeholder="Enter last name here" />
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
                name="password"
                type="password"
              />
            </Col>
          </Row>
          <div className="col-md- flex-end">
            {" "}
            <button className="payment-button "> Proceed to Payment</button>
          </div>
        </div>
      </form>
    </>
  );
};
