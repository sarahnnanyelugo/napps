import React, { useEffect } from "react";
import Icon3 from "../../assets/images/bell.svg";
import Icon4 from "../../assets/images/search2.svg";
import Icon5 from "../../assets/images/user.svg";
import "./dashboard-top.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "../../AuthContext";

export const DashboardTop = (props) => {
  const { logout, isLoggedIn } = useAuth();

  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    if (!isLoggedIn) {
      setInterval(() => {
        window.location = "/login";
      }, 100);
    }
  }, [isLoggedIn]);
  return (
    <>
      <div className="d-md-flex top-navv ">
        <h2 style={{ flexGrow: 1 }}>{props.title}</h2>
        <div className="d-flex col-md-4">
          {" "}
          <input placeholder="Search" className="col-md-8" />
          <div className="notify-bell">
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

              {isLoggedIn && (
                <Dropdown.Menu>
                  {/*<Dropdown.Item href="#/action-1">Profile</Dropdown.Item>*/}
                  <Dropdown.Item href="/dashboard-selector">
                    My Roles
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item
                    onClick={handleLogout}
                    style={{ color: "#DE1E1E" }}
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};
