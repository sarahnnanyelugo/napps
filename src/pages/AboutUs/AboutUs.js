import React, { useState } from "react";
import NavBar from "../../components/Navbar/Navbar";
import Icon1 from "../../assets/images/mission.svg";
import Icon2 from "../../assets/images/vission.svg";
import Icon3 from "../../assets/images/value.svg";
import Icon4 from "../../assets/images/tik.svg";
import Tick from "../../assets/images/tick.png";
import { Col, Row } from "react-bootstrap";
import { executiveMembers, zonalPresidents } from "../../Data/officersData";
import "./about-us.scss";
import Officers from "./Officers";
import { Footer } from "../../components/Footer/Footer";
export const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="about-div">
        <div className="col-md-8 about-intro offset-md-2 mobile-padding">
          <center>
            {" "}
            <h6>About Us</h6>
            <h3>Nurturing for national development</h3>
          </center>
          <p>
            The National Association of Proprietors of Private Schools (NAPPS)
            is the apex association of private school owners in Nigeria. NAPPS
            was created to promote the welfare and interaction of proprietors of
            private schools and the advancement of quality educational services
            in the country.
          </p>
          <p>
            The proprietors of private schools at an educational stakeholders
            meeting held at Abuja, took advantage of the meeting to discuss the
            need for/and the inauguration of a national association.
          </p>
          <p>
            At subsequent meetings of presidents of associations of private
            schools from the states of the federation held at Abuja on Thursday
            25th November 2005, the formation of the proposed national
            association and the name National Association of Proprietors of
            Private Schools (NAPPS) was approved.The association has been served
            by well respected and highly placed individuals.
          </p>
        </div>{" "}
        <div className=" row row-cols-1 row-cols-lg-3 g-2 g-lg-5 col-md-10 offset-md-1 mobile-padding">
          <div className="col">
            <div className="value">
              <img
                className=""
                src={Icon1}
                alt="Scholar"
                width="40px"
                height="40px"
              />
              <h5>Our Mission</h5>
              <p>
                We strive to be the incubator of knowledge and orientation
                required to provide and create the change needed for national
                development and transformation
              </p>
            </div>
          </div>{" "}
          <div className="col">
            <div className="value">
              <img
                className=""
                src={Icon2}
                alt="Scholar"
                width="40px"
                height="40px"
              />
              <h5>Our Vision</h5>
              <p>
                We are committed to the comprehensive education and nurturing of
                the Nigerian child for functional quality living and nation
                building
              </p>
            </div>
          </div>{" "}
          <div className="col">
            <div className="value">
              <img
                className=""
                src={Icon3}
                alt="Scholar"
                width="24px"
                height="24px"
              />
              <h5>Our Core Values</h5>
              <Row>
                <Col>
                  {" "}
                  <img
                    className=""
                    src={Icon4}
                    alt="Scholar"
                    width="24px"
                    height="24px"
                  />
                  Professionalism
                </Col>{" "}
                <Col>
                  {" "}
                  <img
                    className=""
                    src={Icon4}
                    alt="Scholar"
                    width="24px"
                    height="24px"
                  />
                  Integrity
                </Col>
              </Row>{" "}
              <Row>
                <Col>
                  {" "}
                  <img
                    className=""
                    src={Icon4}
                    alt="Scholar"
                    width="24px"
                    height="24px"
                  />
                  Equity
                </Col>{" "}
                <Col>
                  {" "}
                  <img
                    className=""
                    src={Icon4}
                    alt="Scholar"
                    width="24px"
                    height="24px"
                  />
                  Patriotism
                </Col>
              </Row>{" "}
              <Row>
                <Col>
                  {" "}
                  <img
                    className=""
                    src={Icon4}
                    alt="Scholar"
                    width="24px"
                    height="24px"
                  />
                  Religious tolerance
                </Col>{" "}
                <Col>
                  {" "}
                  <img
                    className=""
                    src={Icon4}
                    alt="Scholar"
                    width="24px"
                    height="24px"
                  />
                  Discipline
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="aims mobile-padding">
          <div className="aims-div col-md-10 offset-md-1">
            <h6>About Us</h6>
            <h3>Aims & Objectives</h3>
            <div className="d-md-flex col-md-12 ">
              <div className="col-md-6 left">
                <div className="d-flex">
                  <img src={Tick} height="32px" width="32px" />
                  <p className="col-md-12">
                    To assist the Governments and peoples of the Federal
                    Republic of Nigeria in the provision of world class
                    educational administration, delivery of quality education,
                    maintenance of appropriate standards and global best
                    practices.
                  </p>
                </div>
                <div className="d-flex">
                  <img src={Tick} height="32px" width="32px" />
                  <p className="col-md-12">
                    To cooperate with government at all levels and any similar
                    or any relevant organization for the general progress,
                    protection and welfare of the Nigerian child and education
                    development of the nation.
                  </p>
                </div>
                <div className="d-flex">
                  <img src={Tick} height="32px" width="32px" />
                  <p className="col-md-12">
                    To promote the advancement of quality educational services
                    in Nigeria.
                  </p>
                </div>{" "}
                <div className="d-flex">
                  <img src={Tick} height="32px" width="32px" />
                  <p className="col-md-12">
                    To keep members abreast of developments, new trends,
                    teaching methods and aids by ensuring quality professional
                    publications, workshops, seminars and conferences for
                    teachers and administrators.
                  </p>
                </div>
              </div>
              <div className="col-md-6 right">
                {" "}
                <div className="d-flex">
                  <img src={Tick} height="32px" width="32px" />
                  <p className="col-md-12">
                    To promote self-regulatory functions and oversight in the
                    operations of private schools in the country and act as a
                    liaison body between the association and the government for
                    evolving conductive educational polices and quality control
                    of private schools in the federation.
                  </p>
                </div>{" "}
                <div className="d-flex">
                  <img src={Tick} height="32px" width="32px" />
                  <p className="col-md-12">
                    To consider, express views on all proposed legislation,
                    national and international issues with regards to
                    socio-political, economic and educational delivery system in
                    Nigeria and beyond.
                  </p>
                </div>{" "}
                <div className="d-flex">
                  <img src={Tick} height="32px" width="32px" />
                  <p className="col-md-12">
                    To promote the welfare and interaction of private schools
                    proprietors in the country.
                  </p>
                </div>
                <div className="d-flex">
                  <img src={Tick} height="32px" width="32px" />
                  <p className="col-md-12">
                    To promote collaboration between the Governments at all
                    levels, their educational agencies and the private sector
                    educational service providers. To partner with governments
                    at all levels in the area of policy formulation,
                    development, implementation, quality control and evaluation
                    of the implication of policies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<center>*/}
        {/*  <h6>About Us</h6>*/}
        {/*  <h3>National Executive Members</h3>*/}
        {/*</center>*/}
        {/*<div className=" row row-cols-1 row-cols-lg-4 g-2 g-lg-4 mt col-md-10 offset-md-1 mobile-padding">*/}
        {/*  {executiveMembers.map((data, index) => (*/}
        {/*    <Officers data={data} key={"m" + index} />*/}
        {/*  ))}*/}
        {/*</div>{" "}*/}
        {/*<center>*/}
        {/*  <h6 style={{ marginTop: "150px" }}>About Us</h6>*/}
        {/*  <h3>Zonal Presidents</h3>*/}
        {/*</center>*/}
        {/*<div className=" row row-cols-1 row-cols-lg-4 g-2 g-lg-4 mt col-md-10 offset-md-1 mobile-padding">*/}
        {/*  {zonalPresidents.map((data, index) => (*/}
        {/*    <Officers data={data} key={"m" + index} />*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>{" "}
      <Footer />
    </>
  );
};
