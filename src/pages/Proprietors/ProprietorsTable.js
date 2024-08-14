import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../../components/SchoolsTable/schools-table.scss";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ProprietorsTable = ({ data }) => {
  const [password, setPassword] = useState(
    parseFloat(localStorage.getItem("requestor_balance", 0)) || 0
  );
  const [showPassword, setShowPassword] = useState(false);
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
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <div className="d-flex"> </div>

      <div>
        <Table striped bordered hover className="school-table cord" responsive>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th className="">Name </th>
              <th className="">Registered <br/> Schools</th>
              <th> Contact</th>

              <th>Roles</th>

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
                  <td className="">
                    <div className="d-flex">
                      <div
                        className="alphabet">
                        <center>
                          <p>{item.alphabet}</p>
                        </center>
                      </div>
                      {item.name}
                    </div>
                  </td>
                  <td>{item.schools_count}</td>
                  <td>
                    {item.email} <br/>{item.phone}
                  </td>

                  <td>{item.roles?.map((role,index)=>
                    (<li key={index}>{role.name}</li>)
                  )}</td>

                  <td className="edit">
                    <Link
                      className="view"
                      to={"/dashboard-layout/sch-showcase/" + item.id}
                      state={{ blog_id: blogId }}
                    >
                      view
                    </Link>
                  </td>
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

export default ProprietorsTable;
