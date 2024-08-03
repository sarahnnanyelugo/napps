import React, { useState, useLocation, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "./schools-table.scss";
const SchoolsTable = ({ data, initialDisplayCount = 4 }) => {
  // const [num] = data;
  const [blogId, setBlogId] = useState(0);
  // const location = useLocation();
  const [prevData, setPrevData] = useState([]);
  useEffect(() => {
    setBlogId(data.id);
  });

  const [isShowingAll, setIsShowingAll] = useState(false);

  const handleToggleDisplay = () => {
    setIsShowingAll(!isShowingAll);
  };
  const visibleData = isShowingAll ? data : data.slice(0, initialDisplayCount);

  const { bg, colo, bd2, colo2 } = data;
  return (
    <div>
      <div className="d-flex tabled-data">
        {" "}
        <h5 style={{ flexGrow: 1 }}>Newly Registered School</h5>
        {/* <button onClick={handleToggleDisplay} className="more-btn">
          {isShowingAll ? "See less" : "See all"}
        </button> */}
      </div>

      <Table striped bordered hover className="school-table" responsive>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>Registration ID</th>
            <th>Zone</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item) => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" />
              </td>

              <td className="">
                <div className="d-flex">
                  <div
                    className="alphabet"
                    style={{ background: item.bg2, color: item.colo2 }}
                  >
                    <center>
                      <p>{item.alphabet}</p>
                    </center>
                  </div>
                  {item.name}
                </div>
              </td>

              <td>
                <div
                  className="table-btn"
                  style={{
                    background: item.bg,
                    color: item.colo,
                    padding: "0px 25px",
                    width: "fit-content",
                    height: "35px",
                  }}
                >
                  {item.status}
                </div>
              </td>
              <td>{item.regID}</td>
              <td>{item.zone}</td>
              <td className="edit">
                <Link
                  className="view"
                  to={"/dashboard-layout/sch-showcase/" + item.id}
                  state={{ blog_id: blogId }}
                >
                  view
                </Link>
              </td>
              <td className="edit" style={{ color: "#00923F" }}>
                <Link
                  className="edit"
                  to={"/dashboard-layout/displayed-school/" + item.id}
                  state={{ blog_id: blogId }}
                >
                  {" "}
                  edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex">
        <p style={{ flexGrow: 1 }}>Page 1 of 10</p>
        <div className="d-flex">
          <button className="more-btn" style={{ marginRight: "10px" }}>
            Previous
          </button>
          <button className="more-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default SchoolsTable;
