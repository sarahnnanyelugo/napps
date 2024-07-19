import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./news-page.scss";
import { News } from "../../components/News/News";
import { latestNews } from "../../Data/NewsData";
export const NewsPage = () => {
  const [state, setState] = useState({
    query: "",
    list: latestNews,
  });

  return (
    <>
      {" "}
      <div className="postgraduate-page">
        <center>
          <h1>our news hub</h1>
        </center>
      </div>
      <h3 className="offset-md-2 mt">Stay Informed</h3>
      <div className="row row-cols-1 row-cols-lg-2  g-lg-2 col-md-8 offset-md-2 mt5">
        {state.list.map((data, index) => (
          <News data={data} key={data.id} />
        ))}
      </div>
    </>
  );
};
