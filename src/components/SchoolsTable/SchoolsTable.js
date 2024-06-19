import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "./schools-table.scss";
const SchoolsTable = ({ data, initialDisplayCount = 4 }) => {
  const [isShowingAll, setIsShowingAll] = useState(false);

  const handleToggleDisplay = () => {
    setIsShowingAll(!isShowingAll);
  };
  const visibleData = isShowingAll ? data : data.slice(0, initialDisplayCount);

  const { bg, colo, bd2, colo2 } = data;
  return (
    <div>
      <div className="d-flex">
        {" "}
        <h5 style={{ flexGrow: 1 }}>Newly Registered School</h5>
        <button onClick={handleToggleDisplay} className="more-btn">
          {isShowingAll ? "See less" : "See all"}
        </button>
      </div>

      <Table striped bordered hover className="school-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>Registration ID</th>
            <th>Zone</th>
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
                <button
                  className="table-btn"
                  style={{ background: item.bg, color: item.colo }}
                >
                  {item.status}
                </button>
              </td>
              <td>{item.regID}</td>
              <td>{item.zone}</td>
              <td className="edit">view</td>
              <td className="edit" style={{ color: "#00923F" }}>
                edit
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
