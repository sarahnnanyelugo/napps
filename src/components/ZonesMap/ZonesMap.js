import React, {useEffect, useState} from "react";
import "./zones-map.scss";
import SouthEast from "../../assets/images/south-east.svg";
import SouthSouth from "../../assets/images/south-south.svg";
import SouthWest from "../../assets/images/south-west.svg";
import NorthCentral from "../../assets/images/north-central.svg";
import NorthEast from "../../assets/images/north-east.svg";
import NorthWest from "../../assets/images/north-west.svg";
import Tooltip from "../Tooltip/Tooltip";

export const ZonesMap = ({zones}) => {
  const {NC, NE, SS, SE, SW, NW}=zones
  return (
    <>
      <div className="d-flex">
        {" "}
        <div className="south-east zoomed">
          {" "}
          {SE && <Tooltip total={SE[0]||0} active={SE[1]||0} inactive={SE[2]||0}>
            <img src={SouthEast} alt="Scholar" width="" height="135px" />{" "}
          </Tooltip>}
        </div>
        <div className="north-east zoomed">
          <Tooltip zone={"North East"} total={NE[0]||0} active={NE[1]||0} inactive={NE[2]||0}>
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
        {NC && <Tooltip zone={"North Central"} total={NC[0]||0} active={NC[1]||0} inactive={NC[2]||0}>
          <img src={NorthCentral} alt="Scholar" width="" height="140px" />{" "}
        </Tooltip>}
      </div>
      <div className="d-flex col-md-8">
        {" "}
        <div className="south-west zoomed">
          {SW && <Tooltip zone={"South West"} total={SW[0]||0} active={SW[1]||0} inactive={SW[2]||0}>
            <img src={SouthWest} alt="Scholar" width="" height="" />{" "}
          </Tooltip>}
        </div>
        <div>
          {" "}
          <div className="south-south zoomed">
            {SS && <Tooltip zone={"South South"} total={SS[0]||0} active={SS[1]||0} inactive={SS[2]||0}>
              <img src={SouthSouth} alt="Scholar" width="" height="" />{" "}
            </Tooltip>}
          </div>{" "}
          <div className="north-west zoomed">
            {NW && <Tooltip zone={"North West"} total={NW[0]||0} active={NW[1]||0} inactive={NW[2]||0}>
              <img src={NorthWest} alt="Scholar" height="83px" className="" />{" "}
            </Tooltip>}
          </div>
        </div>
      </div>
    </>
  );
};
