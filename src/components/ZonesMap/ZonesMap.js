import React from "react";
import "./zones-map.scss";
import SouthEast from "../../assets/images/south-east.svg";
import SouthSouth from "../../assets/images/south-south.svg";
import SouthWest from "../../assets/images/south-west.svg";
import NorthCentral from "../../assets/images/north-central.svg";
import NorthEast from "../../assets/images/north-east.svg";
import NorthWest from "../../assets/images/north-west.svg";
import Tooltip from "../Tooltip/Tooltip";

export const ZonesMap = () => {
  return (
    <>
      <div className="d-flex">
        {" "}
        <div className="south-east zoomed">
          {" "}
          <Tooltip total="36" active="30" inactive="6">
            <img src={SouthEast} alt="Scholar" width="" height="135px" />{" "}
          </Tooltip>
        </div>
        <div className="north-east zoomed">
          <Tooltip total="36" active="30" inactive="6">
            <img
              src={NorthEast}
              alt="Scholar"
              // width="160px"
              height="200px"
            />
          </Tooltip>
        </div>
      </div>
      <div className="north-central zoomed">
        <Tooltip total="36" active="30" inactive="6">
          <img src={NorthCentral} alt="Scholar" width="" height="140px" />{" "}
        </Tooltip>
      </div>
      <div className="d-flex col-md-8">
        {" "}
        <div className="south-west zoomed">
          <Tooltip total="36" active="30" inactive="6">
            <img src={SouthWest} alt="Scholar" width="" height="" />{" "}
          </Tooltip>
        </div>
        <div>
          {" "}
          <div className="south-south zoomed">
            <Tooltip total="36" active="30" inactive="6">
              <img src={SouthSouth} alt="Scholar" width="" height="" />{" "}
            </Tooltip>
          </div>{" "}
          <div className="north-west zoomed">
            <Tooltip total="36" active="30" inactive="6">
              <img src={NorthWest} alt="Scholar" height="83px" className="" />{" "}
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};
