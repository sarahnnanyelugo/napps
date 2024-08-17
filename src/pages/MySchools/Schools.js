import React, {useEffect, useLocation, useState} from "react";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import red from "../../assets/images/red_dot.png";
import green from "../../assets/images/green_dot.png";
import Zenith from "../../assets/images/zenith.jpeg"
import {getGreen, getRed} from "../../utility/dots";

export const Schools = ({data}) => {
    const {bg2} = data;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("Loading", data);
    });
    useEffect(() => {
        // Set a timer to simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds delay

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, [data]);
    return (
        <Link
            className="sch-link"
            to={"/my-school-layout/my-schools/sch-showcase/" + data.uuid}
            state={{blog_id: data.uuid}}
        >
            {" "}
            <div className="schools d-flex">
                {isLoading ? (
                    <Skeleton count={1} style={{width: "200px"}} className="sch-frame col-md-3 col-6"/>
                ) : <div className="sch-frame col-md-3 col-6" style={{
                    background: "#F3F3F3",
                    backgroundImage: `url(${data.logo})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}>

                </div>}
                <div className="sch-details">
                    <h6 className="col-md-12">
                        {isLoading ? (
                            <Skeleton count={1} style={{width: "200px"}}/>
                        ) : (
                            data.name
                        )}
                    </h6>
                    <p>{isLoading ? <Skeleton count={1}/> : data.zone?.name + " Zone"}</p>
                    <p>{isLoading ? <Skeleton count={1}/> : data.ward?.name + " Ward"}</p>

                    <p>
                        {isLoading ? <Skeleton count={1}/> : data.state?.name + " State"}{" "}
                    </p>

                    {!isLoading &&
                    <p><img src={data.status ? getGreen() : getRed()} style={{width: "10px"}}/>
                        {(data.status ? ' Active' : ' Inactive')}
                    </p>
                    }


                </div>
            </div>
        </Link>
    );
};
