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
    }, 2000); // 2 seconds delay

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
        <div className="sch-frame col-md-3 col-6" style={{ background: bg2||"#AA9C75" }}>
          {data.dp && <img src={data.dp} style={{width: "100%"}}/>}
        </div>
        <div className="sch-details">
          <h6 className="col-md-12">
            {isLoading ? (
              <Skeleton count={1} style={{ width: "200px" }} />
            ) : (
                "NAPPS Perks"
            )}
          </h6>
          <p>{isLoading ? <Skeleton count={1} /> : "Campaigns"}</p>
          <p>{isLoading ? <Skeleton count={1} /> : "Exciting Discounts"}</p>

          <p>
            {isLoading ? <Skeleton count={1} /> : "Exclusive Deals!"}{" "}
          </p>
          
          {!isLoading &&
           <p><img src={red} style={{ width:"10px" }}/>
           {(' Coming Soon!')}
           </p>
           }

        </div>
      </div>
    </Link>
  );
};
