import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { Password } from "../../components/Password/Password";
import { zonesAndStates } from "../../Data/States";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { statesAndLGAs } from "../../Data/States";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserEdit } from "react-icons/fa";
import "./registration.scss";
import { FileUpload } from "../../components/FileUpload/FileUpload";
import { LuImagePlus } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
export const Registration = (props) => {
  const [value, setValue] = useState();
  const { founder_id } = props;
  const [isItalic, setIsItalic] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [founder, setFounder] = useState(null);
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
  const [selectedState, setSelectedState] = useState(null);
  const [states, setStates] = useState([]);
  const handleStateChange = (e) => {
    const state = zonesAndStates.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setSelectedState(state);
  };
  useEffect(() => {
    console.log(selectedState);
    console.log(selectedState?.states);
    setStates(selectedState?.states);
  }, [selectedState]);
  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  }
  const [form, setForm] = useState({
    email: " ",
    password: " ",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form?.email) {
      toast.error("email is required");
    } else if (!regex.test(form?.email)) {
      toast.error("This is not a valid email");
    } else {
      toast.success("Proceeding to payment");
      setInterval(() => {
        // window.location = "dashboard-layout/admin-dashboard";
        window.location = "/payment";
      }, 1000);
    }
    sessionStorage.setItem("user", JSON.stringify(form));
  }

  return (
    <>
      {" "}
      <ToastContainer />
      <form action="" onSubmit={handleSubmit}>
        {" "}
        <div className="members-form sch-dit">
          {" "}
          <div className="login-div col-md-8 offset-md-2 ">
            <center>
              <img
                className="img"
                src={Logo}
                alt="Scholar"
                width="198px"
                height="69px"
              />
              <h2>School Informations</h2>{" "}
            </center>
            <center>
              {" "}
              <p className="col-md-9">
                Once you complete the registration of your school with NAPPS,
                it’ll be added to our online directory. Additionally, you can
                add more schools to your account after signing up, giving you
                greater flexibility and management options.
              </p>
            </center>
            <div className=" col-md-12 sch-form">
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
                        className="contact-frame2 col-md- mt3"
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
                        <h2>School Phone</h2>
                        <input
                          className="sch-input "
                          type="text"
                          placeholder="+2347032861442"
                        />{" "}
                        <h2>School Email</h2>
                        <input
                          placeholder="olasunkanmifinesse@gmail.com"
                          type="email"
                          name="email"
                          onChange={handleChange}
                        />
                        <h2>School Website</h2>
                        <input
                          className="sch-input "
                          type="text"
                          placeholder="britishspringcollege@gmail.com"
                        />
                      </div>
                    </div>
                  </div>
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
                  <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
                    <div className="col">
                      <h2>Education type</h2>
                      <div className="select-div ">
                        <select>
                          <option>Day</option>
                          <option>Boarding</option>
                          <option>Both</option>
                        </select>
                      </div>
                    </div>{" "}
                    <div className="col">
                      <h2>Education level</h2>
                      <div className="select-div ">
                        <select>
                          <option>Secondary</option>
                          <option>Primary</option>
                          <option>EYFS</option>
                        </select>
                      </div>
                    </div>{" "}
                    <div className="col">
                      <h2>Zone</h2>
                      <div className="select-div ">
                        <select onChange={handleStateChange}>
                          <option value="" disabled selected>
                            Select your zone
                          </option>
                          {zonesAndStates.map((state) => (
                            <option key={state.id} value={state.id}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>{" "}
                    <div className="col">
                      <h2>State</h2>
                      <div className="select-div ">
                        <select disabled={!selectedState}>
                          <option value="" disabled selected>
                            {selectedState
                              ? "Select state"
                              : "Select zone First"}
                          </option>
                          {states?.map((state, index) => (
                            <option key={index} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>{" "}
                    <div className="col">
                      <h2>LGA</h2>
                      <div className="select-div ">
                        <select>
                          <option>Ward 1</option>
                          <option>Ward 2</option>
                          <option>Ward 3</option>
                        </select>
                      </div>
                    </div>{" "}
                    <div className="col">
                      <h2>Ward</h2>
                      <div className="select-div ">
                        <select>
                          <option>Ward 1</option>
                          <option>Ward 2</option>
                          <option>Ward 3</option>
                        </select>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md- flex-end">
              {" "}
              <button className="payment-button "> Proceed to Payment</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
