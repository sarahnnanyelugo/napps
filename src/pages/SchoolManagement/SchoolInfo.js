import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { schools } from "../../Data/schoolsData";
export const SchoolInfo = ({ blog_id }) => {
  const [data, setData] = useState({});
  const [id, setId] = useState(0);
  const location = useLocation();
  const [value, setValue] = useState("");
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
            <p>South East, Enugu Nigeria. Pending</p>
          </div>
          <div className="d-flex ">
            <button clasName="cancel-btn">Cancel</button>
            <button className="save-btn">Save</button>
          </div>
        </div>
        <div className="d-md-flex more-info">
          <div className="col-md-6">
            <h5>About School</h5>
            <div className="d-flex">
              <div className="select-div">
                <select>
                  <option>Normal text</option>
                  <option>Other texts options</option>
                </select>
              </div>
              <h6>B</h6>
              <h6 className="dec">U</h6>
              <h6>
                <em>I</em>
              </h6>
            </div>
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
                  style={{ height: "166px", width: "100%" }}
                  className="form-control"
                />
              ) : (
                <span className="editable-text">{data.about}</span>
              )}
            </div>
            <p>40 characters left</p>
            <h5>Vision</h5>
            <div className="d-flex">
              <div className="select-div">
                <select>
                  <option>Normal text</option>
                  <option>Other texts texts</option>
                </select>
              </div>
              <h6>B</h6>
              <h6 className="dec">U</h6>
              <h6>
                <em>I</em>
              </h6>
            </div>
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
                  style={{ height: "166px", width: "100%" }}
                  className="form-control"
                />
              ) : (
                <span className="editable-text">{data.vision}</span>
              )}
            </div>
            <p>40 characters left</p>
            <h5>Mission</h5>
            <div className="d-flex">
              <div className="select-div">
                <select>
                  <option>Normal text</option>
                  <option>Other texts texts</option>
                </select>
              </div>
              <h6>B</h6>
              <h6 className="dec">U</h6>
              <h6>
                <em>I</em>
              </h6>
            </div>
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
                  style={{ height: "166px", width: "100%" }}
                  className="form-control"
                />
              ) : (
                <span className="editable-text">{data.mission}</span>
              )}
            </div>
            <p>40 characters left</p>
          </div>
          <div className="contact-holder col-md-6">
            <div className="">
              <h5>Contact Information</h5>
              <div className="d-flex">
                <div className="contact-frame col-md-"></div>
                <div>
                  <div>
                    <h3>Name</h3>

                    <div
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                      className="editables-two "
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={value}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onKeyPress={handleKeyPress}
                          ref={inputRef}
                          className="form-control"
                        />
                      ) : (
                        <span className="editable-text">{data.founder}</span>
                      )}
                    </div>
                  </div>{" "}
                  <div>
                    <h3>Phone</h3>

                    <div
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                      className="editables-two "
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={value}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onKeyPress={handleKeyPress}
                          ref={inputRef}
                          style={{ height: "30px", width: "100%" }}
                          className="form-control"
                        />
                      ) : (
                        <span className="editable-text">{data.phone}</span>
                      )}
                    </div>
                  </div>{" "}
                  <div>
                    <h3>Email</h3>

                    <div
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                      className="editables-two "
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={value}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onKeyPress={handleKeyPress}
                          ref={inputRef}
                          style={{ height: "30px", width: "100%" }}
                          className="form-control"
                        />
                      ) : (
                        <span className="editable-text">{data.email}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3>Location</h3>
              <h3>Address 1</h3>
              <div
                onClick={handleClick}
                style={{ cursor: "pointer" }}
                className="editables-two "
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    ref={inputRef}
                    style={{ height: "30px", width: "100%" }}
                    className="form-control"
                  />
                ) : (
                  <span className="editable-text">{data.founder}</span>
                )}
              </div>
            </div>
            <div>
              <h3>Address 2</h3>

              <div
                onClick={handleClick}
                style={{ cursor: "pointer" }}
                className="editables-two "
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    ref={inputRef}
                    style={{ height: "30px", width: "100%" }}
                    className="form-control"
                  />
                ) : (
                  <span className="editable-text">{data.founder}</span>
                )}
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h3>Website</h3>

                <div
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                  className="editables-two "
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyPress={handleKeyPress}
                      ref={inputRef}
                      style={{ height: "30px", width: "100%" }}
                      className="form-control"
                    />
                  ) : (
                    <span className="editable-text">
                      <small>{data.website}</small>
                    </span>
                  )}
                </div>
              </div>{" "}
              <div>
                <h3>Ward</h3>

                <div
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                  className="editables-two "
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyPress={handleKeyPress}
                      ref={inputRef}
                      style={{ height: "30px", width: "100%" }}
                      className="form-control"
                    />
                  ) : (
                    <span className="editable-text">
                      <small>{data.founder}</small>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h3>Zone</h3>

                <div
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                  className="editables-two "
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyPress={handleKeyPress}
                      ref={inputRef}
                      style={{ height: "30px", width: "100%" }}
                      className="form-control"
                    />
                  ) : (
                    <span className="editable-text">
                      <small>{data.zone}</small>
                    </span>
                  )}
                </div>
              </div>{" "}
              <div>
                <h3>State</h3>

                <div
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                  className="editables-two "
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyPress={handleKeyPress}
                      ref={inputRef}
                      style={{ height: "30px", width: "100%" }}
                      className="form-control"
                    />
                  ) : (
                    <span className="editable-text">
                      <small>{data.state}</small>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
