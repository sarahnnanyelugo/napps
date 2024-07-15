import React, { useEffect, useLocation, useState } from "react";
import { Link } from "react-router-dom";

export const Schools = ({ data }) => {
  const { bg2 } = data;
  const [blogId, setBlogId] = useState(0);
  //   const location = useLocation();
  const [prevData, setPrevData] = useState([]);
  useEffect(() => {
    setBlogId(data.id);
  });
  return (
    <Link
      className="sch-link"
      to={"/dashboard-layout/sch-showcase/" + data.id}
      state={{ blog_id: blogId }}
    >
      {" "}
      <div className="schools d-flex">
        <div
          className="sch-frame col-md-3 col-6"
          style={{ background: bg2 }}
        ></div>
        <div className="sch-details">
          <h6>{data.name}</h6>
          <p>{data.zone},</p>
          <p>Ward</p>
          <p>
            {data.state} {data.country}.
          </p>
        </div>
      </div>
    </Link>
  );
};
