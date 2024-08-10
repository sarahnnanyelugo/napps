import React, { useContext, useEffect, useState } from "react";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { CiGrid2H } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import { Perks } from "./Perks";
import "./my-perks.scss";
import { schools } from "../../Data/schoolsData";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../../utility/localStorage";
import { ApiContext } from "../../ApiContext";
import { setAuthToken } from "../../utility/api";

export default function MyPerks() {
  const [activeElement, setActiveElement] = useState("element1");
  const [isGridView, setIsGridView] = useState(true);
  const [schInIt, setSchInIt] = useState(false);
  const [authToken, setAuthTokenState] = useState(() => {
    return getLocalStorage('authToken') || '';
  });
  const [user, setUser] = useState(() => {
    return getLocalStorage('user') || '';
  });
  const { data, loading, error, fetchData, postData } = useContext(ApiContext);
  const switchView = (view) => {
    if (view === "grid") {
      setIsGridView(true);
      setActiveElement("element1");
    } else {
      setIsGridView(false);
      setActiveElement("element2");
    }
  };
  async function fetchSchools(){

    await postData("/proprietor-schools",{});
  }
  useEffect(() => {
    setAuthToken(authToken);
      fetchSchools(); 
  },[]);

  return (
    <>
      <DashboardTop title={"Welcome, " +user?.name} />
      <br />
      <div className="my-schools-div">
        {/*<div className="d-flex">*/}
        {/*  /!*<h2 style={{ flexGrow: 1 }}>NAPPS Exclusive Perks and Deals</h2>{" "}*!/*/}
        {/*  <h4*/}
        {/*    onClick={() => switchView("grid")}*/}
        {/*    className={activeElement === "element1" ? "actived" : ""}*/}
        {/*    style={{*/}
        {/*      marginLeft: "20px",*/}
        {/*      marginRight: "20px",*/}
        {/*      marginTop: "5px",*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <IoGridOutline />*/}
        {/*  </h4>*/}
        {/*  <h4*/}
        {/*    className={activeElement === "element2" ? "actived" : ""}*/}
        {/*    onClick={() => switchView("list")}*/}
        {/*    style={{*/}
        {/*      marginTop: "5px",*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <CiGrid2H />*/}
        {/*  </h4>{" "}*/}
        {/*  /!*<a className="add-sch" href={"/registration"}>*!/*/}
        {/*  /!*  {" "}*!/*/}
        {/*  /!*  <IoIosAdd style={{ color: "white", fontSize: "19px" }} />*!/*/}
        {/*  /!*  Add School*!/*/}
        {/*  /!*</a>*!/*/}
        {/*</div>*/}

        <div className={isGridView ? "grid-view" : "list-view"} id="content">
          <div className={isGridView ? "grid-item" : "list-item"}>
            <Perks data="" />
          </div>
        </div>
      </div>
    </>
  );
}
