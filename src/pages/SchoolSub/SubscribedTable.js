import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../../components/SchoolsTable/schools-table.scss";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import red from "../../assets/images/red_dot.png";
import green from "../../assets/images/green_dot.png";
const SubscribedTable = ({ data }) => {
  const [blogId, setBlogId] = useState(0);
  const [prevData, setPrevData] = useState([]);
  useEffect(() => {
    setBlogId(data?.id);
    console.log(data)
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
              <th>School</th>
              <th>Date & TIme</th> <th>Status</th>
              <th>Amount</th>
              <th>Renewal Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <TransitionGroup component="tbody">
            {data?.map((item) => (
              <CSSTransition
                key={item.id}
                timeout={500}
                classNames="row-slide-up"
              >
                <tr key={item.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td style={{ fontFamily: "montM" }}>{item.tx_ref}</td>
                  <td>{item.school.name}</td>
                  <td>
                    {item.updated_at}
                  </td>
                  <td style={{
                    color: item.status=='successful'?'green':'red',
                    fontFamily: "montM",
                  }}>
                      {/*<img src={(item.status=='successful'?green:red)} style={{width:"2%"}} alt=""/>*/}
                      {" " }{(item.status||"Pending").toUpperCase()}

                  </td>
                  <td>{item.amount}</td>

                  <td>{item.end_date}</td>
                  <td className="edit">
                    <Link
                      className="view"
                      to={"/verify-pay?tx_ref=" + item.tx_ref}
                      target={'blank'}
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
