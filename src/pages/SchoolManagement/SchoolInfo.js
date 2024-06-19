import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { schools } from "../../Data/schoolsData";
export const SchoolInfo = ({ blog_id, initialValue = "Click tdsddo edit" }) => {
  const [data, setData] = useState({});
  const [id, setId] = useState(0);
  const location = useLocation();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
    // Focus on the input field after enabling editing
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  useEffect(() => {
    setId(blog_id);
    console.log(blog_id);
  }, [blog_id]);

  useEffect(() => {
    if (id !== 0)
      setData(
        schools.find((obj) => {
          return obj.id == id;
        })
      );
    // console.log(data, research, id);
  }, [id]);

  return (
    <>
      <DashboardTop title="School Management" />
      <div className="Admin-dashboard">
        <div className="sch-view-div"></div>
        <div className="sch-info d-flex">
          <div className="sch-display"></div>
          <div>
            <h4>{data.name}</h4>
            <p>South East, Enugu Nigeria. Pending</p>
          </div>
        </div>
        <div className="d-md-flex ">
          <div className="col-md-6">
            <h5>About School</h5>
            <div
              onClick={handleClick}
              style={{ cursor: "pointer" }}
              className="editables"
            >
              {isEditing ? (
                <input
                  type="text"
                  value={value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={handleKeyPress}
                  ref={inputRef}
                  style={{ height: "166px", width: "100%" }} // Optional: to make input take full width
                />
              ) : (
                <span>{value}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <h1>{data.name}</h1> */}
    </>
  );
};
