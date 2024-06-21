import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { schools } from "../../Data/schoolsData";
export const SchoolBio = ({ blog_id }) => {
  const [data, setData] = useState({});
  const [id, setId] = useState(0);
  const location = useLocation();
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isVision, setIsVision] = useState(false);
  const [isMission, setIsMission] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isAddress1, setIsAddress1] = useState(false);
  const [isAddress2, setIsAddress2] = useState(false);
  const [isWebsite, setIsWebsite] = useState(false);
  const [isWard, setIsWard] = useState(false);
  const [isZone, setIsZone] = useState(false);
  const [isState, setIsState] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const inputRef = useRef(null);
  const toggleItalic = () => {
    setIsItalic(!isItalic);
  };
  const toggleBold = () => {
    setIsBold(!isBold);
  };
  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    setIsAbout(false);
    setIsVision(false);
    setIsMission(false);
    setIsName(false);
    setIsPhone(false);
    setIsEmail(false);
    setIsAddress1(false);
    setIsAddress2(false);
    setIsWebsite(false);
    setIsWard(false);
    setIsState(false);
    setIsZone(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsAbout(false);
      setIsVision(false);
      setIsMission(false);
      setIsName(false);
      setIsPhone(false);
      setIsEmail(false);
      setIsAddress1(false);
      setIsAddress2(false);
      setIsWebsite(false);
      setIsWard(false);
      setIsState(false);
      setIsZone(false);
    }
  };

  const handleAbout = () => {
    setIsAbout(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleVision = () => {
    setIsVision(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleMission = () => {
    setIsMission(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleName = () => {
    setIsName(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handlePhone = () => {
    setIsPhone(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleEmail = () => {
    setIsEmail(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleAddress1 = () => {
    setIsAddress1(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleAddress2 = () => {
    setIsAddress2(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleWebsite = () => {
    setIsWebsite(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleWard = () => {
    setIsWard(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleState = () => {
    setIsState(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleZone = () => {
    setIsZone(true);

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
            <button clasName="cancel-btn">Cancel</button>

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

            <h3>Address 1</h3>

            <p> {data.founder}</p>

            <h3>Address 2</h3>

            <p> {data.founder}</p>

            <div className="d-flex">
              <div>
                <h3>Website</h3>

                <p>{data.website}</p>
              </div>{" "}
              <div>
                <h3>Ward</h3>

                <p>{data.founder}</p>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h3>Zone</h3>
                <p>{data.zone}</p>
              </div>{" "}
              <div>
                <h3>State</h3>
                <p>{data.state}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
