import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { Password } from "../../components/Password/Password";
import "./members-detail.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
export const MembersDetail = () => {
  const [value, setValue] = useState();
  return (
    <>
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
          allowing you to add your school to our online directory, connect with
          other proprietors, create a student management system, and much more.
          <br />
          <br />
          If you are already registered with NAPPS, please{" "}
          <Link to={"/"} className="login">
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
            <input placeholder="olasunkanmifinesse@gmail.com" />
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
            <Password />
          </Col>
          <Col>
            <h6>Confirm Password</h6>
            <Password />
          </Col>
        </Row>
        <div className="col-md- flex-end">
          <Link to={"/registration"}>
            {" "}
            <button className="payment-button "> Proceed to Payment</button>
          </Link>
        </div>
      </div>
    </>
  );
};
