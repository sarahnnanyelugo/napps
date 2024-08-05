import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { schools } from "../../Data/schoolsData";
import { MdNavigateNext } from "react-icons/md";
import { GrPrevious } from "react-icons/gr";
import SearchBar from "../../components/SearchBar/SearchBar";
import { GrNext } from "react-icons/gr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { subscribedSchools } from "../../Data/subscribedSchData";
import SubscribedTable from "../SchoolSub/SubscribedTable";
export const AllSubs = ({ blog_id }) => {
  const [data, setData] = useState({});
  const [id, setId] = useState(0);
  const location = useLocation();
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("*");
  const [filteredSchools, setfilteredSchools] = useState(subscribedSchools);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);

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
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);
  function reducer(dt) {
    // console.log(dt);
    setfilteredSchools(dt.list);
  }
  const renderSkeletonRows = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(
        <tr key={i}>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>
          <td>
            <Skeleton />
          </td>{" "}
          <td>
            <Skeleton />
          </td>
        </tr>
      );
    }
    return rows;
  };
  return (
    <>
      <ul className="list-inline list-unstyled bread-crums">
        <li className="list-inline-item">
          <Link to={"/"}>
            Home <MdNavigateNext />
          </Link>
        </li>
        <li className="list-inline-item">
          <Link to={"subscription/show-subs"}>
            Subscription <MdNavigateNext />
          </Link>
        </li>
        <li className="list-inline-item">
          <p to={""}>{data.name}</p>
        </li>
      </ul>
      <div className="d-flex">
        {" "}
        <div className="col-md-1">
          {" "}
          <Link to={""}>
            {" "}
            <GrPrevious />
          </Link>
          <Link to={""}>
            {" "}
            <GrNext className="col-md-6" />
          </Link>
        </div>
        <div className="col-md-11">
          {" "}
          <DashboardTop title="Subscription" />
        </div>
      </div>
      <div className="Admin-dashboard">
        <div className="sch-detail-cont d-md-flex">
          <div className="col-md-6">
            {" "}
            <div className="sch-info d-flex">
              <div className="sch-display4"></div>
              <div className="data-info">
                <h4>{data.name}</h4>
                <p>
                  {data.zone}, {data.state}, Nigeria{" "}
                  <button style={{ color: data.colo, background: data.bg }}>
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      .
                    </span>{" "}
                    {data.status}
                  </button>
                </p>{" "}
                <p>Registration ID:{data.regID}</p>
              </div>

              {/* <div className="d-flex ">
                <button clasName="cancel-btn">Edit School</button>
                <button clasName="cancel-btn" style={{ marginLeft: "10px" }}>
                  Decline
                </button>

                <button className="save-btn">Approve</button>
              </div> */}
            </div>{" "}
            <hr />{" "}
            <div className="">
              <h5>Contact Information</h5>
              <div className="d-flex">
                <div className="contact-frame2 col-md-"></div>
                <div className="col-md-9">
                  <div style={{ marginLeft: "20px" }}>
                    <p>
                      {" "}
                      {data.founder}
                      <br />
                      {data.phone} <br />
                      {data.website}
                    </p>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {" "}
            <div className="contact-holder col-md-12  ">
              <div className="d-flex">
                {" "}
                <div className="col-md-6">
                  <h2>Address 1</h2>
                  <p className="col-md-10"> {data.address1}</p>
                </div>
                <div className="col-md-6">
                  <h2>Website</h2>

                  <p>{data.website}</p>
                </div>{" "}
              </div>
              <div className="d-flex">
                <div className="col-md-6">
                  {" "}
                  <h2>Address 2</h2>
                  <p className="col-md-10"> {data.address2}</p>
                </div>
                <div className="col-md-6">
                  <h2>Zone</h2>
                  <p>{data.zone}</p>
                </div>{" "}
              </div>

              <div className="d-flex">
                <div className="col-md-6">
                  <h2>Email</h2>
                  <p className="col-md-10">{data.email}</p>
                </div>{" "}
                <div className="col-md-6">
                  <h2>State</h2>
                  <p>{data.state}</p>
                </div>
              </div>
              <div>
                {" "}
                <div className="d-flex">
                  <div className="col-md-6">
                    <h2>Ward</h2>

                    <p>************</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="schools-filter-div col-md-12">
        {" "}
        <div className="ssearch-div d-flex">
          <h5>Transaction History</h5>
          <div className="col-md-3 offset-md-7">
            <SearchBar callback={reducer} posts={subscribedSchools} />
          </div>
        </div>{" "}
        <hr />
        {isLoading ? (
          <table className="table">
            <thead>
              <tr>
                <th>
                  <Skeleton />
                </th>
                <th>
                  <Skeleton />
                </th>
                <th>
                  <Skeleton />
                </th>
                <th>
                  <Skeleton />
                </th>{" "}
                <th>
                  <Skeleton />
                </th>{" "}
                <th>
                  <Skeleton />
                </th>{" "}
                <th>
                  <Skeleton />
                </th>{" "}
                <th>
                  <Skeleton />
                </th>
              </tr>
            </thead>
            <tbody>{renderSkeletonRows()}</tbody>
          </table>
        ) : (
          <SubscribedTable data={filteredSchools} />
        )}
      </div>
    </>
  );
};
