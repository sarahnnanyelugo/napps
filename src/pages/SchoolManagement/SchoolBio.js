import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { schools } from "../../Data/schoolsData";
export const SchoolBio = ({ blog_id }) => {
  const [data, setData] = useState({});
  const [id, setId] = useState(0);
  const location = useLocation();
  const [value, setValue] = useState("");

  const inputRef = useRef(null);

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
  useEffect(() => {
    setValue(schools.about);
  }, []);
  return (
    <>
      <DashboardTop title="School Management" />
      <div className="Admin-dashboard">
        <div className="sch-view-div"></div>
        <div className="sch-info d-flex">
          <div className="sch-display"></div>
          <div style={{ flexGrow: 1 }}>
            <h4>{data.name}</h4>
            <p>
              {data.zone}, {data.state}, Nigeria. {data.status}
            </p>
          </div>
          <div className="d-flex ">
            <button clasName="cancel-btn">Edit School</button>
            <button clasName="cancel-btn" style={{ marginLeft: "10px" }}>
              Cancel
            </button>

            <button className="save-btn">Save</button>
          </div>
        </div>
        <div className="d-md-flex more-info">
          <div className="col-md-6">
            <h5>About School</h5>
            <p> {data.about}</p>

            <h5>Vision</h5>

            <p> {data.vision}</p>

            <h5>Mission</h5>

            <p> {data.mission}</p>
          </div>
          <div className="contact-holder col-md-6">
            <div className="">
              <h5>Contact Information</h5>
              <div className="d-flex">
                <div className="contact-frame col-md-"></div>
                <div className="col-md-9">
                  <div>
                    <p> {data.founder}</p>
                    <p>{data.phone}</p>
                    <p>{data.website}</p>
                  </div>{" "}
                </div>
              </div>
            </div>

            <div className="d-flex">
              {" "}
              <div className="col-md-6">
                <h3>Address 1</h3>
                <p> {data.address1}</p>
              </div>
              <div className="col-md-6">
                <h3>Website</h3>

                <p>{data.website}</p>
              </div>{" "}
            </div>
            <div className="d-flex">
              <div className="col-md-6">
                {" "}
                <h3>Address 2</h3>
                <p> {data.address2}</p>
              </div>
              <div className="col-md-6">
                <h3>Zone</h3>
                <p>{data.zone}</p>
              </div>{" "}
            </div>

            <div className="d-flex">
              <div className="col-md-6">
                <h3>Email</h3>
                <p>{data.email}</p>
              </div>{" "}
              <div className="col-md-6">
                <h3>State</h3>
                <p>{data.state}</p>
              </div>
            </div>
            <div>
              {" "}
              <div className="d-flex">
                <div className="col-md-6">
                  <h3>Ward</h3>

                  <p>{data.founder}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
