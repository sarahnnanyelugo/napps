import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import NavBar from "../../components/Navbar/Navbar";
import "./home.scss";
import Search from "../../assets/images/search-icon.svg";
import Icon1 from "../../assets/images/mission.svg";
import Icon2 from "../../assets/images/vission.svg";
import Icon3 from "../../assets/images/value.svg";
import Icon4 from "../../assets/images/tik.svg";
import Icon6 from "../../assets/images/test.png";
import Icon7 from "../../assets/images/test3.png";
import Icon8 from "../../assets/images/test2.png";
import { News } from "../../components/News/News";
import { latestNews } from "../../Data/NewsData";
import Testimonials from "../../components/Testimonials/Testimonials";
import { Footer } from "../../components/Footer/Footer";
import { statesAndLGAs } from "../../Data/States";
import FAQAccordionBlueTwo from "../../components/FAQAccordionBlueTwo/FAQAccordionBlue";
export const Home = () => {
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
  const [state, setState] = useState({
    query: "",

    list2: latestNews.filter((newsItem) => {
      return newsItem.id <= 4;
    }),
  });

  const slides = [
    {
      image: Icon6,
      title:
        "“My child was struggling with exam anxiety, but this platform has made all the difference. The step-by-step solutions have built their confidence, and I’ve seen a significant improvement in their scores. ..”",
    },
    {
      image: Icon7,
      title:
        "“This platform has been a game-changer for my exam preparation. The practice tests are spot-on, and the detailed solutions have been a lifesaver. I’ve seen a significant improvement in my scores since usin...”",
    },
    {
      image: Icon8,
      title:
        "“As someone preparing for a certification exam, this platform has been invaluable. The ability to practice and review detailed solutions has boosted my confidence. I highly recommend it to anyone with exam goals.”",
    },
    {
      image: Icon7,
      title:
        "My child was struggling with exam anxiety, but this platform has made all the difference. The step-by-step solutions have built their confidence, and I’ve seen a significant improvement in their scores. It’s a parent’s dream!”",
    },
    {
      image: Icon6,
      title:
        "My child was struggling with exam anxiety, but this platform has made all the difference. The step-by-step solutions have built their confidence, and I’ve seen a significant improvement in their scores. ..!”",
    },
  ];
  return (
    <>
      <NavBar />
      <div className="home-landing">
        <div className="col-md-4 offset-md-1">
          <p>Connect with schools and Top educators around you</p>
        </div>
      </div>
      <div className="col-md-10 offset-md-1 find-sch col-10 offset-1">
        <h2>Find schools around you</h2>
        <div className="d-md-flex">
          <div className="col-md-10 ">
            <div className="row row-cols-1 row-cols-lg-3 g-2 g-lg-2 ">
              <div className="col">
                <h6>School Name</h6>
                <input placeholder="Enter school name here" />
              </div>
              <div className="col">
                {" "}
                <h6>State</h6>
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
              </div>
              <div className="col">
                <h6 style={{ textAlign: "left" }}>LGA</h6>
                <select disabled={!selectedState}>
                  <option value="" disabled>
                    LGA
                  </option>
                  {lgas.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <button>
              {" "}
              <img
                className=""
                src={Search}
                alt="Scholar"
                width="24px"
                height="24px"
              />
              Search
            </button>
          </div>
        </div>
        <div className="next-select col-md-8 row row-cols-1 row-cols-lg-3 g-2 g-lg-2">
          <div className="col">
            {" "}
            <select>
              <option>Gender</option>
              <option>Male</option>
              <option>female</option>
            </select>
          </div>
          <div className="col">
            {" "}
            <select>
              <option>Levels of Education</option>
              <option>EYFS</option>
              <option>Primary</option>
              <option>Secondary</option>
            </select>
          </div>
          <div className="col">
            {" "}
            <select>
              <option>Boarding Facility (Hostel)</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>
      </div>
      <center>
        <h2 className="welcome">Welcome to NAPPS</h2>
      </center>
      <div className="col-md-8 offset-md-2 intro-p mobile-padding">
        {" "}
        <p>
          The National Association of Proprietors of Private Schools (NAPPS) is
          the apex association of private school owners in Nigeria. NAPPS was
          founded in 2005 with the aim of promoting the welfare and interaction
          of proprietors of private schools and the advancement of quality
          educational services in Nigeria. <br />
          <br />
          This coupled with our vision which compels us to educate and nurture
          the Nigerian child for functional as well as quality living wherever
          he finds himself spurs us to stay at our best in ensuring the delivery
          quality of educational services at all our schools.
        </p>
      </div>
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
      <div className="col-md-12  news-div mobile-padding ">
        <div className="col-md-10  offset-md-1">
          <h2>News & Events</h2>
          <div className=" row row-cols-1 row-cols-lg-4 g-2 g-lg-2 mt">
            {state.list2.map((data, index) => (
              <News data={data} key={"m" + index} />
            ))}
          </div>
        </div>
      </div>
      <center>
        <h2>What school owners are saying</h2>
      </center>
      <div className="col-md-4 offset-md-4">
        <p>Hear what the school owners are saying…</p>
      </div>
      <div className="col-md-10 offset-md-1 testimonial-div">
        <Testimonials slides={slides} />
      </div>
      <div className="faq-container">
        <div className="col-md-10 d-md-flex offset-md-1">
          <div className="col-md-3 faq-title">
            <h2>FAQs</h2>
          </div>
          <div className="col-md-9">
            <FAQAccordionBlueTwo />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
