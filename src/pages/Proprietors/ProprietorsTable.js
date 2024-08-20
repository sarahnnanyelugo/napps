import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../../components/SchoolsTable/schools-table.scss";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ProprietorsTable = (props) => {
  const [password, setPassword] = useState(
    parseFloat(localStorage.getItem("requestor_balance", 0)) || 0
  );
  const [showPassword, setShowPassword] = useState(false);
  const { onRadioSelect, data } = props;
  const [blogId, setBlogId] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  // Handler for radio button change
  const handleRadioChange = (id) => {
    const toSelect = selectedId === id ? null : id;
    setSelectedId(toSelect); // Update the selected radio button
    onRadioSelect(toSelect); // Call the callback function with the selected id
  };
  const location = useLocation();
  const [prevData, setPrevData] = useState([]);
  useEffect(() => {
    setBlogId(data?.id);
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
      <div>
        <Table striped bordered hover className="school-table cord" responsive>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th className="">Name </th>
              <th className="">Registered Schools</th>
              <th> Contact</th>

              <th>Roles</th>

              {/*<th>Action</th>*/}
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
                    <input
                      type="checkbox"
                      name="radioSelection"
                      checked={selectedId === item.id}
                      onChange={() => handleRadioChange(item.id)}
                    />
                  </td>
                  <td className="">
                    <div className="d-flex">
                      <div className="alphabet">
                        <center>
                          <p>
                            <img
                              src={item.dp}
                              alt=""
                              style={{ width: "25px" }}
                            />
                          </p>
                        </center>
                      </div>
                      {item.name}
                    </div>
                  </td>
                  <td>{item.schools_count}</td>
                  <td>
                    {item.email} <br />
                    {item.phone}
                  </td>

                  <td>
                    {item.roles?.map((role, index) => (
                      <li key={index}>{role.name}</li>
                    ))}
                  </td>

                  {/*<td className="edit">*/}
                  {/*  <Link*/}
                  {/*    className="view"*/}
                  {/*    to={"/dashboard-layout/sch-showcase/" + item.id}*/}
                  {/*    state={{ blog_id: blogId }}*/}
                  {/*  >*/}
                  {/*    view*/}
                  {/*  </Link>*/}
                  {/*</td>*/}
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
