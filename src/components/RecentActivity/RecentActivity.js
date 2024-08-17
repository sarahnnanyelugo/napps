import React, {useEffect, useState} from "react";
import "./recent-activity.scss";
import Icon1 from "../../assets/images/p.svg";
import {formatAudiTrail} from "../../utility/utils";

export const RecentActivity = ({ data }) => {
  const [formattedData,setFormattedData]=useState({});
    useEffect(() => {
        if ('bg' in data) {
            setFormattedData(data);
        } else {
            const newData = formatAudiTrail(data);
            setFormattedData(newData);
        }
    }, [data]);
  return (
    <div className="activities">
      <div className="col-md-2 alphabet" style={{ background: formattedData.bg }}>
        <center>
          <p>{formattedData.alphabet}</p>
        </center>
      </div>
      <div className="col-md-9" style={{ flexGrow: 1 }}>
        <h4>{formattedData.schoolName}</h4>
        <p>{formattedData.schoolDetail}</p>
      </div>
      <div className="col-md-3">
        <small>{formattedData.time}</small>
        <sup>.</sup>
      </div>
    </div>
  );
};
