import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { Password } from "../../components/Password/Password";
// import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { statesAndLGAs } from "../../Data/States";

import "./registration.scss";
export const Registration = () => {
  const [value, setValue] = useState();
  const [towns, setLga] = useState([]);
  const [naijaState, setNaijaState] = useState("");
  const [naijaLga, setNaijaLga] = useState();
  const [selectedState, setSelectedState] = useState("");
  const [lgas, setLgas] = useState([]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setLgas(statesAndLGAs[state]);
  };
  return (
    <div div className="members-form">
      {" "}
      <center>
        {" "}
        <div className="login-div col-md-7 ">
          <center>
            <img
              className="img"
              src={Logo}
              alt="Scholar"
              width="198px"
              height="69px"
            />
            <h2>School Informations</h2>{" "}
          </center>
          <p className="col-md-">
            Once you complete the registration of your school with NAPPS, it’ll
            be added to our online directory. Additionally, you can add more
            schools to your account after signing up, giving you greater
            flexibility and management options.
          </p>
          <Row className=" registration-detail">
            <Col>
              <h6>School Name</h6>
              <input placeholder="Enter school name here" />
            </Col>{" "}
            <Col>
              <h6>School Email</h6>
              <input placeholder="Enter address email here" />
            </Col>{" "}
          </Row>
          <Row className=" members-detail">
            <Col>
              <h6>School Address</h6>
              <input placeholder="Enter school address here" />
            </Col>{" "}
            <Col style={{ display: "grid" }}>
              <h6 style={{ textAlign: "left" }}>School Phone Number</h6>

              <PhoneInput
                defaultCountry="NG"
                value={value}
                onChange={setValue}
                placeholder="700 000 0000"
              />
            </Col>
          </Row>
          <Row className=" members-detail">
            <Col style={{ display: "grid" }}>
              <h6 style={{ textAlign: "left" }}>State</h6>

              <select value={selectedState} onChange={handleStateChange}>
                <option value="" disabled>
                  Select your state
                </option>
                {Object.keys(statesAndLGAs).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </Col>
            <Col style={{ display: "grid" }}>
              <h6 style={{ textAlign: "left" }}>LGA</h6>
              <select disabled={!selectedState}>
                <option value="" disabled>
                  Select an LGA
                </option>
                {lgas.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <div className=" members-detail d-md-flex">
            <div style={{ display: "grid" }} className="col-md-6">
              <h6 style={{ textAlign: "left" }}>Ward</h6>
              <select>
                <option>Nort-west</option>
                <option>South-East</option>
              </select>
            </div>
            <div
              style={{ display: "grid", visibility: "hidden" }}
              className="col-md-6"
            />
          </div>

          <Row>
            <Col>
              <h6 style={{ textAlign: "left" }}>Education Level</h6>
              <select>
                <option>Early Years Foundation School</option>
                <option>Primary School</option>
                <option>Secondary School</option>
              </select>
            </Col>
            <Col>
              {" "}
              <h6 style={{ textAlign: "left" }}>School Type</h6>
              <select>
                <option>Day</option>
                <option>Boarding</option>
                <option>Both</option>
              </select>
            </Col>
          </Row>
          <div className="col-md- flex-end">
            <Link to={"/members-detail"}>
              {" "}
              <button className="payment-button "> Continue</button>
            </Link>
          </div>
        </div>
      </center>
    </div>
  );
};
