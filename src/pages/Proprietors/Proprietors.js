import React, { useEffect, useState } from "react";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import CountUp from "react-countup";

import Icon3 from "../../assets/images/exp.svg";
import "./school-management.scss";

import { schools } from "../../Data/schoolsData";
import CordinatorsTable from "./ProprietorsTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import NavDropdown from "react-bootstrap/NavDropdown";
import WOW from "wowjs";
import { RiBankFill } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";
import { LuSchool2 } from "react-icons/lu";

import AddCoordinators from "./AddCoordinators";
import api, {setAuthToken} from "../../utility/api";
import {useAuth} from "../../AuthContext";

export const Proprietors = () => {
  const [category, setCategory] = useState("*");
  const [filteredSchools, setfilteredSchools] = useState([]);
  const [data, setData] = useState(null);
  const [proprietor,setProprietor]=useState(null)
  const [ld, setLd] = useState(false);
  const {authToken}=useAuth()
  const handleRadioSelect = (selectedId) => {
    console.log('Selected radio button with ID:', selectedId);
    // Initialize or perform any action based on the selected radio button
    if (selectedId) {
      // If a valid ID is selected, set the proprietor to the corresponding data item
      let propr=data?.proprietors_list?.find(propr => propr.id === selectedId)
      console.log(propr)
      setProprietor(propr);
    } else {
      // If no ID is selected, handle accordingly (e.g., reset the proprietor)
      setProprietor(null);
    }
  };
  useEffect(() => {
    setAuthToken(authToken);
    api.post('/admin/fetch-proprietors')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching zone chart data:', error);
        });
  }, []);
  useEffect(() => {
    console.log(data)
    if (!data) return;
    setfilteredSchools(data?.proprietors_list)
    setLd(true)
  }, [data])

  function setCat(cat) {
    setCategory(cat);
  }
  useEffect(() => {
    if (category === "*") {
      setfilteredSchools(schools);
    } else {
      setfilteredSchools(
        schools.filter((prd) => prd.category.indexOf(category) !== -1)
      );
    }
  }, [category]);
  function reducer(dt) {
    setfilteredSchools(dt.list);
  }
  useEffect(() => {
    new WOW.WOW({
      live: true,
    }).init();
  }, [category]);

  const [activeIndex, setActiveIndex2] = useState(1);
  const handleClick2 = (index) => setActiveIndex2(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";
  const checkActive2 = (index, className) =>
    activeIndex === index ? className : "";
  return (
    <>
      <DashboardTop title="Proprietors" />
      <div className="Admin-dashboard">
        <div className=" row row-cols-2 row-cols-lg-2 g-2 g-lg-4 mt">
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                {" "}
                <SlPeople style={{ fontSize: "25px" }} />
                <p>Number of School Owners</p>
              </div>
              <h1 className="stats">
                {" "}
                <CountUp
                  start={0}
                  end={data?.proprietors_count}
                  duration={1}
                  decimal=""
                  prefix=" "
                  suffix=""
                  enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>{" "}
          <div className="col">
            <div className="summary d-flex">
              <div style={{ flexGrow: 1 }}>
                {" "}
                <LuSchool2 style={{ fontSize: "25px" }} />
                <p>Number of Registered Schools</p>
              </div>
              <h1 className="stats">
                {" "}
                <CountUp
                  start={0}
                  end={data?.registered_schools_count}
                  duration={2}
                  decimal=""
                  prefix=" "
                  suffix=""
                  enableScrollSpy={true}
                />
              </h1>
            </div>
          </div>
        </div>{" "}
        <div className="business-pricing-tab ">
          {" "}
          <div className="ssearch-div d-md-flex justify-content-between">
            <div className="col-md-3">
              <h6 style={{ fontFamily: "montM" }}>Search Proprietors</h6>
              <br />
              <SearchBar callback={reducer} posts={data?.proprietors_list} />
            </div>
            <div>
              <div className="btn-group">
                <button className="btn btn-light" >
                  {" "}
                  <img src={Icon3} width="20px" />&nbsp;
                  Export
                </button>
                <AddCoordinators proprietor={proprietor}/>
              </div>
            </div>
          </div>{" "}
          <CordinatorsTable data={filteredSchools} onRadioSelect={handleRadioSelect}/>
        </div>
      </div>
    </>
  );
};
