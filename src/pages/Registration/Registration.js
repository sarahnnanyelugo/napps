import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { Password } from "../../components/Password/Password";
// import { zonesAndStates } from "../../Data/States";

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
import { ApiContext } from "../../ApiContext";
import { getLocalStorage, setLocalStorage } from "../../utility/localStorage";
import api, { setAuthToken } from "../../utility/api";
import Spinner from "react-bootstrap/Spinner";

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
  const [zonesAndStates, setZonesAndStates] = useState([]);
  const { data, loading, error, postData } = useContext(ApiContext);

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
  const [user, setUser] =useState(() => {
    return getLocalStorage('user') || {};
  });
  const [authToken, setAuthTokenState] = useState(() => {
    return getLocalStorage('authToken') || '';
  });
  const [states, setStates] = useState([]);
  const handleZoneChange = (e) => {
    const zone = zonesAndStates.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setSelectedZone(zone);
  };
    const handleStateChange = (e) => {
    const state = states.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setSelectedState(state);
  };
  
  const handleLGAChange = (e) => {
    const lga = lgas.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setSelectedLga(lga);
  };
  
  const handleWardChange = (e) => {
    const ward = wards.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setSelectedWard(ward);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["Secondary", "Primary", "EYFS"];

  async function fetchZonesAndStates(){
    try {
      setAuthToken(authToken);
      const response=await api.get("/schools/create");
      setZonesAndStates(response.data);
    } catch (errorResponse) {
      console.error('Error creating proprietor profile:', errorResponse);
    }
  }
  useEffect(()=>{
    if(!authToken)
      {
        toast.error('You must be logged in to create school profile');
        setTimeout(()=>{
          window.history.back();
        },1000)
      }

    fetchZonesAndStates()},[]
  )

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
      ['zone_id']: selectedZone?.id,
    });
    setStates(selectedZone?.states);
  }, [selectedZone]);
    useEffect(() => {
    // console.log(selectedZone);
    // console.log(selectedZone?.states);
    setForm({
      ...form,
      ['education_levels']: selectedOptions,
    });
    setStates(selectedZone?.states);
  }, [selectedOptions]);
  
  useEffect(() => {
    // console.log(selectedZone);
    // console.log(selectedZone?.states);
    setForm({
      ...form,
      ['state_id']: selectedState?.id,
    });
    setLgas(selectedState?.lgas);
  }, [selectedState]);

 useEffect(() => {
    // console.log(selectedZone);
    // console.log(selectedZone?.states);
    
    setForm({
      ...form,
      ['lga_id']: selectedLga?.id
    });
 setWards(selectedLga?.wards);
 }, [selectedLga]);

 useEffect(() => {   
    setForm({
      ...form,
      ['ward_id']: selectedWard?.id
    });
 }, [selectedWard]);

 async function enrollSchool(){
  try {
    await postData("/schools", form);
  } catch (errorResponse) {
    console.error("Error creating proprietor profile:", errorResponse);
  }
 }
 useEffect(()=>{
  if(!data)return;
  setLocalStorage("current_school", data.id);
  toast.success("Proceeding to payment");
      setInterval(() => {
        window.location = "/payment";
      }, 1000);
 },[data])

 useEffect(()=>{
  if(!error)return;
  console.log(error)
 }, [error]);

  const [form, setForm] = useState({
    user_id: user?.id||0, zone_id: 0, state_id: 0, lga_id: 0, ward_id: 0,
    name: "", address: "", address2: "", contact_name: user?.name||"",
    contact_phone: user?.phone||"", contact_email: user?.email||"", website: "", about: "",
    vision: "", mission: "", logo: "", banner: "",
  });
  function handleChange(e) {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
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
      // toast.success("Proceeding to payment");
      // setInterval(() => {
      //   // window.location = "dashboard-layout/admin-dashboard";
      //   window.location = "/payment";
      // }, 1000);
      enrollSchool()
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
              <h2>School Information</h2>{" "}
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
                    name="name"
                    onChange={handleChange}
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
                    name="about"
                    onChange={handleChange}
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
                    name="vision"
                    onChange={handleChange}
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
                    name="mission"
                    onChange={handleChange}
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
                          name="contact_phone"
                          onChange={handleChange}
                          placeholder="+2347032861442"
                          value={user?.phone}
                        />{" "}
                        <h2>School Email</h2>
                        <input
                          className="sch-input "
                          type="email"
                          name="contact_email"
                          onChange={handleChange}
                          placeholder="britishspringcollege@gmail.com"
                          value={user?.email}
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
                        <select name="school_type"
                          onChange={handleSelect}>
                          <option value="Day">Day</option>
                          <option value="Boarding">Boarding</option>
                          <option value="Both">Both</option>
                        </select>
                        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
                      </div>
                    </div>{" "}
                    <div className="col">
                      <h2>Education level</h2>
                      <div className="d-flex flex-row">
                        {options.map((option) => (
                          <div key={option} className="mr-3">
                            <input
                              type="checkbox"
                              id={option}
                              name={option}
                              value={option}
                              checked={selectedOptions.includes(option)}
                              onChange={() => handleCheckboxChange(option)}
                            />
                            <label htmlFor={option} className="ml-1">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>{" "}
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
                        <select disabled={!selectedZone} onChange={handleStateChange}>
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
                      <select disabled={!selectedState} onChange={handleLGAChange}>
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
                      <select disabled={!selectedState} onChange={handleWardChange}>
                          <option value="" disabled selected>
                            {selectedState
                              ? "Select Ward"
                              : "Select LGA First"}
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

            <div className="col-md- flex-end">
              {" "}
              <button className="payment-button "> {loading && <Spinner animation="border" variant="light" size="sm" />} Create School </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
