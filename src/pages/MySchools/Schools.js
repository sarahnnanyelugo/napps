import React, { useEffect, useLocation, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const Schools = ({ data }) => {
  const { bg2 } = data;
  const [blogId, setBlogId] = useState(0);
  //   const location = useLocation();
  // const [prevData, setPrevData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setBlogId(data.id);
  // });
  useEffect(() => {
    // Set a timer to simulate loading delay
    const timer = setTimeout(() => {
      setBlogId(data.id);
      setIsLoading(false);
    }, 3000); // 2 seconds delay

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [data]);
  return (
    <Link
      className="sch-link"
      to={"/dashboard-layout/sch-showcase/" + data.id}
      state={{ blog_id: blogId }}
    >
      {" "}
      <div className="schools d-flex">
        <div className="sch-frame col-md-3 col-6" style={{ background: bg2 }}>
          {" "}
          {/* <Skeleton count={10} /> */}
        </div>
        <div className="sch-details">
          <h6 className="col-md-12">
            {isLoading ? (
              <Skeleton count={1} style={{ width: "200px" }} />
            ) : (
              data.name
            )}
          </h6>
          <p>{isLoading ? <Skeleton count={1} /> : data.zone},</p>
          <p>Ward</p>
          <p>{isLoading ? <Skeleton count={1} /> : data.state} </p>
          <p> {isLoading ? <Skeleton count={1} /> : data.country}.</p>
        </div>
      </div>
    </Link>
  );
};
