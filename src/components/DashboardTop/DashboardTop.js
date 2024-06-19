import React from "react";
import Icon3 from "../../assets/images/bell.svg";
import Icon4 from "../../assets/images/search2.svg";
import Icon5 from "../../assets/images/user.svg";
import "./dashboard-top.scss";
export const DashboardTop = (props) => {
  return (
    <>
      <div className="d-flex top-navv ">
        <h1 style={{ flexGrow: 1 }}>{props.title}</h1>
        <input placeholder="Search" className="col-md-3" />
        <div style={{ marginLeft: "16px", marginRight: "16px" }}>
          <img src={Icon3} width="24px" />
        </div>
        <div>
          <img src={Icon5} width="38px" />
        </div>
      </div>
    </>
  );
};
