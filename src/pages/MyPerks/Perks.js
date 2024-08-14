import React, { useEffect, useLocation, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import red from "../../assets/images/red_dot.png";
import green from "../../assets/images/green_dot.png";
import Zenith from "../../assets/images/zenith.jpeg"
export const Perks = ({ data }) => {
  const { bg2 } = data;
  const [blogId, setBlogId] = useState(0);
  //   const location = useLocation();
  // const [prevData, setPrevData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Loading",data);
  });
  useEffect(() => {
    // Set a timer to simulate loading delay
    const timer = setTimeout(() => {
      setBlogId(data.id);
      setIsLoading(false);
    }, 600); // 2 seconds delay

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [data]);
  return (
    <Link
      className="sch-link"
      state={{ blog_id: blogId }}
    >
      {" "}
      <div className="schools d-flex">
        <div className="sch-frame col-md-3 col-6 d-flex justify-content-center align-items-center" style={{ background: bg2||"#AA9C75" }}>
          <h3 className="col-md-12 p-3">
            {isLoading ? (
                <Skeleton count={1} style={{ width: "200px" }} />
            ) : (
                "Coming soon!"
            )}
          </h3>
        </div>
        <div className="sch-details">

          <h4>{isLoading ? <Skeleton count={1} /> : "Campaigns"}</h4>
          <h4>{isLoading ? <Skeleton count={1} /> : "Exciting Discounts"}</h4>

          <h4>
            {isLoading ? <Skeleton count={1} /> : "Exclusive Deals!"}{" "}
          </h4>
          
          {!isLoading &&
           <h4><img src={red} style={{ width:"10px" }}/>
           {(' Coming Soon!')}
           </h4>
           }

        </div>
      </div>
    </Link>
  );
};
