import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./news-page.scss";
import { News } from "../../components/News/News";
import { latestNews } from "../../Data/NewsData";
import NavBar from "../../components/Navbar/Navbar";
import { CiSearch } from "react-icons/ci";
import { Footer } from "../../components/Footer/Footer";

export const NewsPage = () => {
  const [state, setState] = useState({
    query: "",
    list: latestNews,
  });

  return (
    <>
      <NavBar />
      <div className="news-div">
        <center>
          <div className="col-md-3">
            {" "}
            <h6>Contact Us</h6>
            <h1>News & Events</h1>
            <p>Know more about us</p>
            <input placeholder="Search" />
          </div>
        </center>
      </div>

      <div className="row row-cols-1 row-cols-lg-3  g-lg-2 col-md-10 offset-md-1 mt5 all-news">
        {state.list.map((data, index) => (
          <News data={data} key={data.id} />
        ))}
      </div>
      <Footer />
    </>
  );
};
