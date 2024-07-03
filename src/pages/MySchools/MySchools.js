import React, { useState } from "react";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { CiGrid2H } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import { Schools } from "./Schools";
import "./my-schools.scss";
import { schools } from "../../Data/schoolsData";
export default function MySchools() {
  const [state, setState] = useState({
    query: "",
    list: schools,
  });
  const [isGridView, setIsGridView] = useState(true);
  const switchToGridView = () => {
    setIsGridView(true);
  };
  const switchToListView = () => {
    setIsGridView(false);
  };
  return (
    <>
      <DashboardTop title="" />
      <div className="my-schools-div">
        <div className="d-flex">
          <h2>My Schools</h2>{" "}
          <h4
            onClick={switchToGridView}
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "5px",
            }}
          >
            <IoGridOutline />
          </h4>
          <h4
            onClick={switchToListView}
            style={{
              marginTop: "5px",
            }}
          >
            <CiGrid2H />
          </h4>{" "}
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
