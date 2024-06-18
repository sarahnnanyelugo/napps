import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./news.scss";
export const News = ({ data }) => {
  const [blogId, setBlogId] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setBlogId(data.id);
  });

  return (
    <div className="col">
      {" "}
      <div className="news-component col-md-12 flexy flexyM">
        <div className="col-md- news-details">
          <h6>{data.newsHeading}</h6>

          <p>{data.newsDetails}</p>
        </div>
        <div
          className=" news-img"
          style={{ backgroundImage: `url(${data.img})` }}
        ></div>
        <div className="d-flex" style={{ padding: "10px" }}>
          <small style={{ flexGrow: 1 }}>{data.date}</small>
          <Link
            className="news-link"
            to={"/main-news/" + data.id}
            state={{ blog_id: blogId }}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
