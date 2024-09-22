import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
// import { zonesAndStates } from "../../Data/States";

import "react-phone-number-input/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserEdit } from "react-icons/fa";
import "./registration.scss";
import { FileUpload } from "../../components/FileUpload/FileUpload";
import { LuImagePlus } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
import { ApiContext } from "../../ApiContext";
import { getLocalStorage, setLocalStorage } from "../../utility/localStorage";
import api, { setAuthToken } from "../../utility/api";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "../../AuthContext";

export const Registration = (props) => {
  const [isItalic, setIsItalic] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [banner, setBanner] = useState(null);
  const [picture, setPicture] = useState(null);
  const [contact, setContact] = useState(null);
  const [zonesAndStates, setZonesAndStates] = useState([]);
  const { error, postData } = useContext(ApiContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleItalic = () => {
    setIsItalic(!isItalic);
  };
  const toggleBold = () => {
    setIsBold(!isBold);
  };
  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
  };
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLga, setSelectedLga] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [lgas, setLgas] = useState(null);
  const [wards, setWards] = useState(null);

  const { authToken, userState } = useAuth();
  const [states, setStates] = useState([]);
  const handleZoneChange = (e) => {
    const zone = zonesAndStates.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setSelectedZone(zone);
  };
  const handleStateChange = (e) => {
    const state = states.find((item) => item.id === parseInt(e.target.value));
    setSelectedState(state);
  };

  const handleLGAChange = (e) => {
    const lga = lgas.find((item) => item.id === parseInt(e.target.value));
    setSelectedLga(lga);
  };

  const handleWardChange = (e) => {
    const ward = wards.find((item) => item.id === parseInt(e.target.value));
    setSelectedWard(ward);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["Secondary", "Primary", "EYFS"];

  async function fetchZonesAndStates() {
    try {
      setAuthToken(authToken);
      const response = await api.get("/schools/create");
      setZonesAndStates(response.data);
    } catch (errorResponse) {
      toast.error(
        "Error creating proprietor profile:",
        errorResponse.response?.status
      );
    }
  }

  useEffect(() => {
    if (!authToken) {
      toast.error("You must be logged in to create school profile");
      setTimeout(() => {
        window.history.back();
      }, 1000);
      return;
    }

    fetchZonesAndStates();
  }, []);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };
  useEffect(() => {
    // console.log(selectedZone);
    // console.log(selectedZone?.states);
    setForm({
      ...form,
      ["zone_id"]: selectedZone?.id,
    });
    setStates(selectedZone?.states);
  }, [selectedZone]);
  useEffect(() => {
    setForm({
      ...form,
      ["education_levels"]: selectedOptions,
    });
    setStates(selectedZone?.states);
  }, [selectedOptions]);

  useEffect(() => {
    // console.log(selectedZone);
    // console.log(selectedZone?.states);
    setForm({
      ...form,
      ["state_id"]: selectedState?.id,
    });
    setLgas(selectedState?.lgas);
  }, [selectedState]);

  useEffect(() => {
    // console.log(selectedZone);
    // console.log(selectedZone?.states);

    setForm({
      ...form,
      ["lga_id"]: selectedLga?.id,
    });
    setWards(selectedLga?.wards);
  }, [selectedLga]);

  useEffect(() => {
    setForm({
      ...form,
      ["ward_id"]: selectedWard?.id,
    });
  }, [selectedWard]);

  async function enrollSchool() {
    try {
      setLoading(true);
      setAuthToken(authToken);
      const formPayload = new FormData();
      // Append the file and form data
      if (banner) {
        formPayload.append("bannerImg", banner[0].file, "banner.jpg");
      }
      if (picture) {
        formPayload.append("logoImg", picture[0].file, "logo.jpg");
      }
      if (contact) {
        formPayload.append("contactImg", contact[0].file, "dp.jpg");
      }
      for (const [key, value] of Object.entries(form)) {
        formPayload.append(key, value);
      }

      // Send the FormData payload
      const response = await api.post("/schools", formPayload, {
        headers: {
          "content-type": "multipart/form-data", // Ensure correct Content-Type header
        },
      });
      if (response.data) {
        setLoading(false);
        setData(response.data);
      }
    } catch (errorResponse) {
      setLoading(false);
      toast.error(
        errorResponse.response?.data || "Error creating proprietor profile"
      );
    }
  }

  useEffect(() => {
    if (!data || loading) return;
    setLocalStorage("current_school", data.id);
    toast.success("Proceeding to payment");
    setInterval(() => {
      window.location = "/payment";
    }, 1000);
  }, [data]);

  useEffect(() => {
    if (!error) return;
    console.log(error);
  }, [error]);

  const [form, setForm] = useState({
    user_id: userState?.id || 0,
    zone_id: 0,
    state_id: 0,
    lga_id: 0,
    ward_id: 0,
    name: "",
    address: "",
    address2: "",
    contact_name: userState?.name || "",
    contact_phone: userState?.phone || "",
    contact_email: userState?.email || "",
    website: "",
    about: "",
    vision: "",
    mission: "",
    logo: "",
    banner: "",
  });

  function handleChange(e) {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log(form);
  }

  function handleSelect(e) {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form?.contact_email) {
      toast.error("email is required");
    } else if (!regex.test(form?.contact_email)) {
      toast.error("This is not a valid email");
    } else {
      enrollSchool();
    }
  }

  return (
    <>
      {" "}
      <ToastContainer />
      <form action="" onSubmit={handleSubmit}>
        {/*<div className="float-end">*/}
        {/*    <span className="btn btn-danger" onClick={()=>{window.history.back()}}>X</span>*/}
        {/*</div>*/}
        <div className="members-form sch-dit">
          {" "}
          <div className="login-div col-md-8 offset-md-2 ">
            <center>
              <Link to={"/"}>
                <img
                  className="img"
                  src={Logo}
                  alt="Scholar"
                  width="198px"
                  height="69px"
                />
              </Link>
              <h2>School Information</h2>{" "}
            </center>
            <center>
              {" "}
              <p className="col-md-9">
                Once you complete the registration of your school with NAPPS,
                it'll be added to our online directory. Additionally, you can
                add more schools to your account after signing up, giving you
                greater flexibility and management options.
              </p>
            </center>
            <div className=" col-md-12 sch-form">
              <div
                className="sch-view-div3"
                style={{
                  backgroundImage:
                    "url(" + (banner ? banner[0]?.data_url : banner) + ")",
                }}
              >
                <center>
                  <div className="import-image col-md-12">
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
                  style={{
                    backgroundImage:
                      "url(" + (picture ? picture[0]?.data_url : picture) + ")",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <center>
                    {" "}
                    <div className="import-image">
                      {" "}
                      <FileUpload
                        defaultIcon={<FaUserEdit />}
                        uploadable="Logo"
                        colr="white"
                        callBack={(img) => {
                          setPicture(img);
                        }}
                      />
                    </div>
                  </center>
                </div>
              </div>
              <div className="d-md-flex more-info" style={{ padding: "20px" }}>
                <div className="col-md-6">
                  <h5>School Name</h5>
                  <div className="col-md-12">
                    <input
                      className="sch-input form-control"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      placeholder="School Name"
                    />
                  </div>

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
                    name="about"
                    onChange={handleChange}
                    style={{
                      fontStyle: isItalic ? "italic" : "normal",
                      fontWeight: isBold ? "Bold" : "normal",
                      textDecoration: isUnderline ? "underline" : "normal",
                    }}
                  ></textarea>
                  {/* <small>40 characters left</small> */}
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
                    name="vision"
                    onChange={handleChange}
                    style={{
                      fontStyle: isItalic ? "italic" : "normal",
                      fontWeight: isBold ? "Bold" : "normal",
                      textDecoration: isUnderline ? "underline" : "normal",
                    }}
                  ></textarea>
                  {/* <small>40 characters left</small>  */}
                  <h5>Mission</h5>
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
                    name="mission"
                    onChange={handleChange}
                    style={{
                      fontStyle: isItalic ? "italic" : "normal",
                      fontWeight: isBold ? "Bold" : "normal",
                      textDecoration: isUnderline ? "underline" : "normal",
                    }}
                  ></textarea>
                  {/* <small>40 characters left</small> */}
                </div>
                <div className="contact-holder col-md-5  offset-md-1">
                  <div className="">
                    <h5>Contact Information</h5>
                    <div className="d-flex">
                      <div
                        className="contact-frame2 col-md- mt3"
                        style={{
                          backgroundImage:
                            "url(" +
                            (contact ? contact[0]?.data_url : contact) +
                            ")",
                        }}
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
                          name="contact_phone"
                          onChange={handleChange}
                          placeholder="+2347032861442"
                          value={userState?.phone}
                        />{" "}
                        <h2>School Email</h2>
                        <input
                          className="sch-input "
                          type="email"
                          name="contact_email"
                          onChange={handleChange}
                          placeholder="britishspringcollege@gmail.com"
                          value={userState?.email}
                        />{" "}
                        <h2>School Website</h2>
                        <input
                          className="sch-input "
                          type="text"
                          name="website"
                          onChange={handleChange}
                          placeholder="e.g: https://glistencollege.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-">
                    <h2>Address 1</h2>
                    <input
                      className="sch-input "
                      type="text"
                      name="address"
                      onChange={handleChange}
                      placeholder="1, British Spring Estate Road, Nkwelle Awka, Anambra State"
                    />
                  </div>
                  <div className="col-md-">
                    <h2>Address 2</h2>
                    <input
                      className="sch-input "
                      type="text"
                      name="address2"
                      onChange={handleChange}
                      placeholder="SpringField Academy, 30 NewnNkisi Road, GRA Onitsha, Anambra State"
                    />
                  </div>{" "}
                  <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
                    <div className="col">
                      <h2>Education type</h2>
                      <div className="select-div ">
                        <select name="school_type" onChange={handleSelect}>
                          <option value="Day">Day</option>
                          <option value="Boarding">Boarding</option>
                          <option value="Both">Both</option>
                        </select>
                        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
                      </div>
                    </div>
                    <div className="col">
                      <h2>Gender</h2>
                      <div className="select-div ">
                        <select name="gender" onChange={handleSelect}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>
                    </div>{" "}
                  </div>{" "}
                  <div className="row row-cols-2 g-1">
                    <div className="col">
                      <h2>Education level</h2>
                      <div className="">
                        {options.map((option) => (
                          <div
                            key={option}
                            className="mr-3 d-flex"
                            style={{ marginBottom: "10px" }}
                          >
                            <label
                              htmlFor={option}
                              className=""
                              style={{ fontFamily: "montSB", fontSize: "12px" }}
                            >
                              {option}
                            </label>
                            <input
                              style={{ marginTop: "7px" }}
                              type="checkbox"
                              id={option}
                              name={option}
                              value={option}
                              checked={selectedOptions.includes(option)}
                              onChange={() => handleCheckboxChange(option)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col">
                      <h2
                        style={{
                          marginBottom: "5px",
                        }}
                      >
                        Number of Students:
                      </h2>
                      <div className="">
                        <div className="mr-3">
                          <label
                            className="ml-1"
                            style={{
                              fontFamily: "montSB",
                              fontSize: "12px",
                            }}
                          >
                            Male
                          </label>
                          <input
                            type="number"
                            min={0}
                            name="male_count"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mr-3">
                          <label
                            className="ml-1"
                            style={{
                              fontFamily: "montSB",
                              fontSize: "12px",
                              marginTop: "10px",
                            }}
                          >
                            Female
                          </label>
                          <input
                            type="number"
                            min={0}
                            name="female_count"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
                    <div className="col">
                      <h2>Zone</h2>
                      <div className="select-div ">
                        <select onChange={handleZoneChange}>
                          <option value="" disabled selected>
                            Select your zone
                          </option>
                          {zonesAndStates.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                              {zone.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>{" "}
                    <div className="col">
                      <h2>State</h2>
                      <div className="select-div ">
                        <select
                          disabled={!selectedZone}
                          onChange={handleStateChange}
                        >
                          <option value="" disabled selected>
                            {selectedZone
                              ? "Select state"
                              : "Select zone First"}
                          </option>
                          {states?.map((state, index) => (
                            <option key={index} value={state.id}>
                              {state.name} ({state.capital})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>{" "}
                    <div className="col">
                      <h2>LGA</h2>
                      <div className="select-div ">
                        <select
                          disabled={!selectedState}
                          onChange={handleLGAChange}
                        >
                          <option value="" disabled selected>
                            {selectedState
                              ? "Select LGA"
                              : "Select State First"}
                          </option>
                          {lgas?.map((lga, index) => (
                            <option key={index} value={lga.id}>
                              {lga.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>{" "}
                    <div className="col">
                      <h2>Ward</h2>
                      <div className="select-div ">
                        <select
                          disabled={!selectedState}
                          onChange={handleWardChange}
                        >
                          <option value="" disabled selected>
                            {selectedState ? "Select Ward" : "Select LGA First"}
                          </option>
                          {wards?.map((ward, index) => (
                            <option key={index} value={ward.id}>
                              {ward.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md- flex-end float-end">
              {" "}
              <button className="payment-button ">
                {" "}
                {loading && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}{" "}
                Create School
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
