import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../../components/SchoolsTable/schools-table.scss";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { UserPassword } from "../../components/UserPassword/UserPassword";
import EyeClose from "../../assets/images/eye-close.jpg";
import EyeOpen from "../../assets/images/eye-open.svg";
const Percentile = ({ data }) => {
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
      <Table striped bordered hover className="school-table percentile-table">
        <thead>
          <tr>
            <th>Zones</th>
            <th>Federal(%)</th>
            <th>Zonal(%)</th>
            <th>State(%)</th>
            <th>LGA(%)</th>
            <th>Ward(%)</th>
            <th>Total(%)</th>
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
                <td style={{ fontFamily: "montM" }}>{item.zone}</td>

                <td>
                  <input placeholder={item.federal} type="text" />
                </td>

                <td>
                  {" "}
                  <input placeholder={item.zonal} type="text" />
                </td>
                <td>
                  <input placeholder={item.statePercent} type="text" />
                </td>
                <td>
                  <input placeholder={item.lga} type="text" />
                </td>
                <td>
                  <input placeholder={item.ward} type="text" />
                </td>
                <td> {item.total}</td>
              </tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Table>
    </div>
  );
};

export default Percentile;
