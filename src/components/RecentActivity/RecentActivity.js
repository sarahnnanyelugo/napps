import React from "react";
import "./recent-activity.scss";
import Icon1 from "../../assets/images/p.svg";

export const RecentActivity = ({ data }) => {
  const { bg } = data;
  return (
    <div className="activities">
      <div className="col-md-2 alphabet" style={{ background: bg }}>
        <center>
          <p>{data.alphabet}</p>
        </center>
      </div>
      <div className="col-md-9" style={{ flexGrow: 1 }}>
        <h4>{data.schoolName}</h4>
        <p>{data.schoolDetail}</p>
      </div>
      <div className="col-md-3">
        <small>{data.time}</small>
        <sup>.</sup>
      </div>
    </div>
  );
};
