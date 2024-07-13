import React, { useState } from "react";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { CiGrid2H } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import { Schools } from "./Schools";
import "./my-schools.scss";
import { schools } from "../../Data/schoolsData";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";

export default function MySchools() {
  const [state, setState] = useState({
    query: "",
    list: schools,
  });
  const [activeElement, setActiveElement] = useState("element1");
  const [isGridView, setIsGridView] = useState(true);
  //   const switchToGridView = () => {
  //     setIsGridView(true);
  //   };
  //   const switchToListView = () => {
  //     setIsGridView(false);
  //   };
  const switchView = (view) => {
    if (view === "grid") {
      setIsGridView(true);
      setActiveElement("element1");
    } else {
      setIsGridView(false);
      setActiveElement("element2");
    }
  };
  return (
    <>
      <DashboardTop title="" />
      <div className="my-schools-div">
        <div className="d-flex">
          <h2 style={{ flexGrow: 1 }}>My Schools</h2>{" "}
          <h4
            onClick={() => switchView("grid")}
            className={activeElement === "element1" ? "actived" : ""}
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "5px",
            }}
          >
            <IoGridOutline />
          </h4>
          <h4
            className={activeElement === "element2" ? "actived" : ""}
            onClick={() => switchView("list")}
            style={{
              marginTop: "5px",
            }}
          >
            <CiGrid2H />
          </h4>{" "}
          <Link className="add-sch" to={"/add-sch"}>
            {" "}
            <span>
              {" "}
              <IoIosAdd />
            </span>
            Add School
          </Link>
        </div>

        <div className={isGridView ? "grid-view" : "list-view"} id="content">
          {state.list.map((data, index) => (
            <div key={index} className={isGridView ? "grid-item" : "list-item"}>
              <Schools data={data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
