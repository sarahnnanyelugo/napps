import React, { useState } from "react";
import NavBar from "../../components/Navbar/Navbar";
import { statesAndLGAs } from "../../Data/States";
import Search from "../../assets/images/search-icon.svg";
import { topRated, featuredSchs } from "../../Data/FindSchs";
import "./sch-finder.scss";
import FIndSchools from "./FIndSchools";
import RatedSchools from "./RatedSchools";
import { Footer } from "../../components/Footer/Footer";
export const SchFinder = () => {
  const [selectedState, setSelectedState] = useState("");
  const [lgas, setLgas] = useState([]);
  const [visibleItems, setVisibleItems] = useState(9); // State to track the number of visible items
  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 9); // Increase visible items by 9 on each click
  };
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setLgas(statesAndLGAs[state]);
  };
  const firstSchool = topRated[0];
  const secondSchool = topRated[1];
  const thirdSchool = topRated[2];
  const [state, setState] = useState({
    query: "",

    list: featuredSchs,
  });
  return (
    <>
      <NavBar />
      <div className="sch-finder-landing">
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
      <div className="col-md-10 offset-md-1" style={{ marginTop: "80px" }}>
        <h3>Top Rated Schools</h3>
        <div className="d-md-flex">
          <div className="col-md-5" style={{ paddingRight: "10px" }}>
            {" "}
            <FIndSchools data={firstSchool} />
          </div>
          <div className="col-md-7" style={{ paddingLeft: "10px" }}>
            {" "}
            <RatedSchools data={secondSchool} />
            <RatedSchools data={thirdSchool} />
          </div>
        </div>
      </div>

      <div className="col-md-10 offset-md-1 mobile-padding">
        <h3 style={{ marginTop: "80px" }}>Featured Schools</h3>
        <div className=" row row-cols-1 row-cols-lg-3 g-2 g-lg-4 mt">
          {state.list.slice(0, visibleItems).map((data, index) => (
            <FIndSchools key={index} data={data} />
          ))}
        </div>
        <center>
          {visibleItems < state.list.length && (
            <button onClick={loadMore} className="load-more-btn">
              See More
            </button> // Only show the button if there are more items to display
          )}
        </center>
      </div>
      <Footer />
    </>
  );
};
