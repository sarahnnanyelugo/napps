import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { schools } from "../../Data/schoolsData";
export const SchoolInfo = ({ blog_id }) => {
  const [data, setData] = useState({});
  const [id, setId] = useState(0);
  const location = useLocation();

  const [value, setValue] = useState(""); // Set an initial value if needed

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
  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
        <div className="d-md-flex">
          <div className="col-md-6">
            <h5>About School</h5>
            <textarea onChange={handleChange}></textarea>

            <p>Current Value: </p>
          </div>
        </div>
      </div>
      {/* <h1>{data.name}</h1> */}
    </>
  );
};
