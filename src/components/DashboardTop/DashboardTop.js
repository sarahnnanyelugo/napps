import React from "react";
import Icon3 from "../../assets/images/bell.svg";
import Icon4 from "../../assets/images/search2.svg";
import Icon5 from "../../assets/images/user.svg";
import "./dashboard-top.scss";
import Dropdown from "react-bootstrap/Dropdown";

export const DashboardTop = (props) => {
  return (
    <>
      <div className="d-flex top-navv ">
        <h2 style={{ flexGrow: 1 }}>{props.title}</h2>
        <input placeholder="Search" className="col-md-3" />
        <div
          style={{ marginLeft: "16px", marginRight: "16px" }}
          className="notify-bell"
        >
          <center>
            {" "}
            <img src={Icon3} width="24px" />
          </center>
        </div>
        <div className="profile-drop">
          <Dropdown>
            <Dropdown.Toggle>
              <img src={Icon5} width="38px" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
              <hr />
              <Dropdown.Item href="#/action-2" style={{ color: "#DE1E1E" }}>
                Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
