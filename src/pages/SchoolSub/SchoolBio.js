import React, {useEffect, useState, useRef} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {DashboardTop} from "../../components/DashboardTop/DashboardTop";
import {schools} from "../../Data/schoolsData";
import api from "../../utility/api";
import {getGreen, getRed} from "../../utility/dots";

export const SchoolBio = ({school_id}) => {
    const [data, setData] = useState(null);
    const [ld, setLd] = useState(false);

    useEffect(() => {
        if (!school_id) return;
        api.get('/schools/search/' + school_id)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching zone chart data:', error);
            });
    }, [school_id]);
    useEffect(() => {
        console.log(data)
        if (!data) return;
        setLd(true)
    }, [data])
    return (
        <>
            {/*<DashboardTop title="School Management" />*/}
            {ld && <div className="Admin-dashboard">
                <div className="sch-view-div" style={{
                    backgroundImage: "url(" + data.banner + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}/>
                <div className="sch-info d-flex">
                    <div className="sch-display" style={{
                        backgroundColor:"#f3f3f3",
                        backgroundImage: "url(" + data.logo + ")",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}/>
                    <div style={{flexGrow: 1}}>
                        <h4>{data?.name}</h4>
                        <p>{data?.zone.name}, {data?.state.name}, Nigeria{" "}
                            <span style={{fontSize: "20px", fontWeight: "bold"}}><img
                                src={data.status ? getGreen() : getRed()} style={{width: "10px"}}/></span>{" "}
                            {data?.status === 1 ? 'Active' : 'Inactive'}
                        </p>
                    </div>
                    <div className="d-flex ">
                        <button clasName="cancel-btn">Edit School</button>
                        <button clasName="cancel-btn" style={{marginLeft: "10px"}}>
                            Decline
                        </button>

                        <button className="save-btn">Approve</button>
                    </div>
                </div>
                <div className="d-md-flex more-info">
                    <div className="col-md-6">
                        <h5>About School</h5>
                        <p> {data?.about}</p>

                        <h5>Vision</h5>

                        <p> {data?.vision}</p>

                        <h5>Mission</h5>

                        <p> {data?.mission}</p>
                    </div>
                    <div className="contact-holder col-md-5  offset-md-1">
                        <div className="">
                            <h5>Contact Information</h5>
                            <div className="d-flex">
                                <div className="contact-frame2 col-md-"
                                     style={{
                                         backgroundImage: "url(" + data?.proprietor?.dp + ")",
                                         backgroundSize: "contain",
                                         backgroundPosition: "center",
                                         backgroundRepeat: "no-repeat"
                                     }}
                                />
                                <div className="col-md-9">
                                    <div style={{marginLeft: "20px"}}>
                                        <p> {data?.proprietor?.name}</p>
                                        <p>{data?.phone}</p>
                                        <p>{data?.website}</p>
                                    </div>
                                    {" "}
                                </div>
                            </div>
                        </div>

                        <div className="d-flex">
                            {" "}
                            <div className="col-md-6">
                                <h2>Address 1</h2>
                                <p className="col-md-10"> {data?.address1}</p>
                            </div>
                            <div className="col-md-6">
                                <h2>Website</h2>

                                <p>{data?.website}</p>
                            </div>
                            {" "}
                        </div>
                        <div className="d-flex">
                            <div className="col-md-6">
                                {" "}
                                <h2>Address 2</h2>
                                <p className="col-md-10"> {data?.address2}</p>
                            </div>
                            <div className="col-md-6">
                                <h2>Zone</h2>
                                <p>{data?.zone?.name}</p>
                            </div>
                            {" "}
                        </div>

                        <div className="d-flex">
                            <div className="col-md-6">
                                <h2>Email</h2>
                                <p className="col-md-10">{data?.email}</p>
                            </div>
                            {" "}
                            <div className="col-md-6">
                                <h2>State</h2>
                                <p>{data?.state?.name}</p>
                            </div>
                        </div>
                        <div>
                            {" "}
                            <div className="d-flex">
                                <div className="col-md-6">
                                    <h2>Ward</h2>

                                    <p>{data?.ward?.name}</p>
                                    <p>************</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};
