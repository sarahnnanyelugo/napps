import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import Icon from "../../assets/images/file-upload.png";
import { FaUserEdit } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import "./add-sch-form.scss";
import { schools } from "../../Data/schoolsData";
import { FileUpload } from "../FileUpload/FileUpload";
import { FaLink } from "react-icons/fa6";

export const AddSchForm = () => {
  const [data, setData] = useState({});
  const [isItalic, setIsItalic] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const [banner, setBanner] = useState(null);
  const [picture, setPicture] = useState(null);
  const [contact, setContact] = useState(null);

  const toggleItalic = () => {
    setIsItalic(!isItalic);
  };
  const toggleBold = () => {
    setIsBold(!isBold);
  };
  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
  };

  return (
    <>
      <div className="add-sch-form">
        <br />
        <div className=" col-md-10 offset-md-1 sch-form">
          <div
            className="sch-view-div3"
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
          <div className="sch-info2 d-flex">
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
            <div className="col-md-4">
              <input
                className="sch-input "
                type="text"
                placeholder="School Name"
              />

              <p style={{ color: "grey" }}>
                -------- ---------,-------- ---------.
              </p>
            </div>
          </div>
          <div className="d-md-flex more-info" style={{ padding: "20px" }}>
            <div className="col-md-6">
              <h5>About School</h5>
              <div className="d-flex">
                <div className="select-div">
                  <select>
                    <option>Normal text</option>
                    <option>Other text options</option>
                  </select>
                </div>
                <h6 onClick={toggleBold}>B</h6>
                <h6 className="dec" onClick={toggleUnderline}>
                  U
                </h6>
                <h6 onClick={toggleItalic}>
                  <em>I</em>
                </h6>
                <h6>
                  <FaLink />
                </h6>
              </div>
              <textarea
                placeholder="About school"
                style={{
                  fontStyle: isItalic ? "italic" : "normal",
                  fontWeight: isBold ? "Bold" : "normal",
                  textDecoration: isUnderline ? "underline" : "normal",
                }}
              ></textarea>
              <small>40 characters left</small>
              <h5>Vision</h5>
              <div className="d-flex">
                <div className="select-div">
                  <select>
                    <option>Normal text</option>
                    <option>Other text options</option>
                  </select>
                </div>
                <h6 onClick={toggleBold}>B</h6>
                <h6 className="dec" onClick={toggleUnderline}>
                  U
                </h6>
                <h6 onClick={toggleItalic}>
                  <em>I</em>
                </h6>{" "}
                <h6>
                  <FaLink />
                </h6>
              </div>
              <textarea
                placeholder="Brief vision statement"
                style={{
                  fontStyle: isItalic ? "italic" : "normal",
                  fontWeight: isBold ? "Bold" : "normal",
                  textDecoration: isUnderline ? "underline" : "normal",
                }}
              ></textarea>
              <small>40 characters left</small> <h5>Mission</h5>
              <div className="d-flex">
                <div className="select-div">
                  <select>
                    <option>Normal text</option>
                    <option>Other text options</option>
                  </select>
                </div>
                <h6 onClick={toggleBold}>B</h6>
                <h6 className="dec" onClick={toggleUnderline}>
                  U
                </h6>
                <h6 onClick={toggleItalic}>
                  <em>I</em>
                </h6>{" "}
                <h6>
                  <FaLink />
                </h6>
              </div>
              <textarea
                placeholder="Brief mission statement"
                style={{
                  fontStyle: isItalic ? "italic" : "normal",
                  fontWeight: isBold ? "Bold" : "normal",
                  textDecoration: isUnderline ? "underline" : "normal",
                }}
              ></textarea>
              <small>40 characters left</small>
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
                  <div className="col-md-8" style={{ marginLeft: "20px" }}>
                    <h6>Name</h6>
                    <input
                      className="sch-input "
                      type="text"
                      placeholder="Head of schools name"
                    />{" "}
                    <h6>Phone</h6>
                    <input
                      className="sch-input "
                      type="text"
                      placeholder="+2347032861442"
                    />{" "}
                    <h6>Email</h6>
                    <input
                      className="sch-input "
                      type="text"
                      placeholder="britishspringcollege@gmail.com"
                    />
                  </div>
                </div>
              </div>
              <h5>Locations</h5>
              <div className="">
                {" "}
                <div className="col-md-">
                  <h2>Address 1</h2>
                  <input
                    className="sch-input "
                    type="text"
                    placeholder="1, British Spring Estate Road, Nkwelle Awka, Anambra State"
                  />
                </div>
                <div className="col-md-">
                  <h2>Address 2</h2>
                  <input
                    className="sch-input "
                    type="text"
                    placeholder="SpringField Academy, 30 NewnNkisi Road, GRA Onitsha, Anambra State"
                  />
                </div>{" "}
              </div>

              <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
                <div className="col">
                  {" "}
                  <h2>Website</h2>
                  <input
                    className="sch-input "
                    type="text"
                    placeholder="britishspringcollege@gmail.com"
                  />
                </div>
                <div className="col">
                  <h2>Ward</h2>
                  <div className="sch-input ">
                    <select className="">
                      <option>Ward 1</option>
                      <option>Ward 2</option>
                      <option>Ward 3</option>
                    </select>
                  </div>
                </div>{" "}
                <div className="col ">
                  {" "}
                  <h2>Zone</h2>
                  <div className="sch-input ">
                    <select className="">
                      <option>Ward 1</option>
                      <option>Ward 2</option>
                      <option>Ward 3</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <h2>State</h2>

                  <div className="sch-input ">
                    <select className="">
                      <option>Ward 1</option>
                      <option>Ward 2</option>
                      <option>Ward 3</option>
                    </select>
                  </div>
                </div>{" "}
              </div>
              <div className="d-flex offset-md-6 ">
                <button className="cancel">Cancel</button>
                <button className="add">Add school</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
