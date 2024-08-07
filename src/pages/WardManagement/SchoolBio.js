import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { FileUpload } from "../../components/FileUpload/FileUpload";
import { schools } from "../../Data/schoolsData";
import ProfileAvater from "../../assets/images/edit-profile.png";
import Icon from "../../assets/images/file-upload.png";
import { FaUserEdit } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";

export const SchoolBio = ({ blog_id }) => {
  const [data, setData] = useState({});
  const [id, setId] = useState(0);
  const location = useLocation();
  const [value, setValue] = useState("");
  const [blogId, setBlogId] = useState(0);

  const inputRef = useRef(null);
  const [banner, setBanner] = useState(null);
  const [picture, setPicture] = useState(null);
  const [contact, setContact] = useState(null);
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
        <div
          className="sch-view-div2"
          style={{ backgroundImage: "url(" + banner + ")" }}
        >
          <center>
            <div className="import-image col-md-2">
              <FileUpload
                align="display flex"
                defaultIcon={<LuImagePlus />}
                uploadable="Banner"
                colr="black"
                callBack={(img) => {
                  setBanner(img);
                }}
              />
            </div>
          </center>
        </div>
        <div className="sch-info d-flex">
          <div
            className="sch-display"
            style={{ backgroundImage: "url(" + picture + ")" }}
          >
            <center>
              {" "}
              <div className="import-image">
                {" "}
                <FileUpload
                  defaultIcon={<FaUserEdit />}
                  uploadable="Picture"
                  colr="white"
                  callBack={(img) => {
                    setPicture(img);
                  }}
                />
              </div>
            </center>
          </div>
          <div style={{ flexGrow: 1 }}>
            <h4>{data.name}</h4>
            <p>
              {data.zone}, {data.state}, Nigeria{" "}
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>.</span>{" "}
              {data.status}
            </p>
          </div>
          <div className="d-flex ">
            <Link
              // to={"/dashboard-layout/displayed-school/" + data.id}
              state={{ blog_id: blogId }}
            >
              {" "}
              <button clasName="cancel-btn">Edit School</button>
            </Link>

            <button clasName="cancel-btn" style={{ marginLeft: "10px" }}>
              Decline
            </button>

            <button className="save-btn">Approve</button>
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
          <div className="contact-holder col-md-5  offset-md-1">
            <div className="">
              <h5>Contact Information</h5>
              <div className="d-flex">
                <div
                  className="contact-frame2 col-md-"
                  style={{ backgroundImage: "url(" + contact + ")" }}
                >
                  {" "}
                  <center>
                    {" "}
                    <div className="import-contact">
                      {" "}
                      <FileUpload
                        defaultIcon={<FaUserEdit />}
                        uploadable="Picture"
                        colr="white"
                        callBack={(img) => {
                          setContact(img);
                        }}
                      />
                    </div>
                  </center>
                </div>
                <div className="col-md-9">
                  <div style={{ marginLeft: "20px" }}>
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
                <h2>Address 1</h2>
                <p className="col-md-10"> {data.address1}</p>
              </div>
              <div className="col-md-6">
                <h2>Website</h2>

                <p>{data.website}</p>
              </div>{" "}
            </div>
            <div className="d-flex">
              <div className="col-md-6">
                {" "}
                <h2>Address 2</h2>
                <p className="col-md-10"> {data.address2}</p>
              </div>
              <div className="col-md-6">
                <h2>Zone</h2>
                <p>{data.zone}</p>
              </div>{" "}
            </div>

            <div className="d-flex">
              <div className="col-md-6">
                <h2>Email</h2>
                <p className="col-md-10">{data.email}</p>
              </div>{" "}
              <div className="col-md-6">
                <h2>State</h2>
                <p>{data.state}</p>
              </div>
            </div>
            <div>
              {" "}
              <div className="d-flex">
                <div className="col-md-6">
                  <h2>Ward</h2>

                  <p>************</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
