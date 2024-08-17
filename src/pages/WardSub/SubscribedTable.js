import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../../components/SchoolsTable/schools-table.scss";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const SubscribedTable = ({ data }) => {
  const { bg, colo, bd2, colo2, category } = data;
  const [blogId, setBlogId] = useState(0);
  const location = useLocation();
  const [prevData, setPrevData] = useState([]);
  useEffect(() => {
    setBlogId(data.id);
  });

  const getTransitionClass = (item) => {
    const wasInPrev = prevData.some((prevItem) => prevItem.id === item.id);
    const isInCurrent = data.some((currentItem) => currentItem.id === item.id);

    if (!wasInPrev && isInCurrent) return "row-slide-down";
    if (wasInPrev && !isInCurrent) return "row-slide-up";
    return "";
  };
  return (
    <div>
      <div>
        <Table striped bordered hover className="sub-table" responsive>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Transaction ID</th>
              <th>Date & TIme</th> <th>Status</th>
              <th>Amount</th>
              <th>Payment method</th>
              <th>Renewal Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <TransitionGroup component="tbody">
            {data.map((item) => (
              <CSSTransition
                key={item.id}
                timeout={500}
                classNames="row-slide-up"
              >
                <tr key={item.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td style={{ fontFamily: "montM" }}>{item.regID}</td>
                  <td>
                    {item.date}
                    {item.time}
                  </td>
                  <td>
                    <button
                      className="table-btn"
                      style={{
                        background: item.bg,
                        color: item.colo,
                        fontFamily: "montM",
                      }}
                    >
                      <span style={{ fontSize: "25px" }}>.</span>
                      {item.status}
                    </button>
                  </td>
                  <td>{item.amount}</td>
                  <td>{item.payment}</td>
                  <td>{item.renewal}</td>
                  <td className="edit">
                    <Link
                      className="view"
                      to={"/dashboard-layout/sch-showcase/" + item.id}
                      state={{ blog_id: blogId }}
                    >
                      view
                    </Link>
                  </td>
                  {/* <td className="edit" style={{ color: "#00923F" }}>
                    <Link
                      className="edit"
                      to={"/dashboard-layout/displayed-school/" + item.id}
                      state={{ blog_id: blogId }}
                    >
                      {" "}
                      edit
                    </Link>
                  </td> */}
                </tr>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Table>
      </div>

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

export default SubscribedTable;
