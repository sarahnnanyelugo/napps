import React, {useEffect, useState, useRef} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {DashboardTop} from "../../components/DashboardTop/DashboardTop";
import {FileUpload} from "../../components/FileUpload/FileUpload";
import {schools} from "../../Data/schoolsData";
import ProfileAvatar from "../../assets/images/edit-profile.png";
import Icon from "../../assets/images/file-upload.png";
import {FaUserEdit} from "react-icons/fa";
import {LuImagePlus} from "react-icons/lu";
import {CiMenuKebab} from "react-icons/ci";
import Dropdown from "react-bootstrap/Dropdown";
import {MdMoreVert} from "react-icons/md";
import api from "../../utility/api";
import {getGreen,getRed} from "../../utility/dots";

export const SchoolBio = ({school_id}) => {
    const [data, setData] = useState({});
    const [id, setId] = useState(1);
    const [blogId, setBlogId] = useState(1);

    const [banner, setBanner] = useState(null);
    const [picture, setPicture] = useState(null);
    const [contact, setContact] = useState(null);

    const [ld, setLd] = useState(false);

    useEffect(() => {
        if (!school_id) return;
        api.get('/schools/search/' + school_id)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching school data:', error);
            });
    }, [school_id]);
    useEffect(() => {
        console.log(data)
        if (!data) return;
        setLd(true)
    }, [data])
    return (
        <>
            <DashboardTop title="School Management"/>
            {ld && <>
                <div className="Admin-dashboard">
                    <div
                        className="sch-view-div2"
                        style={{backgroundImage: "url(" + data.banner + ")"}}
                    >
                        {/*<center>*/}
                        {/*  <div className="import-image col-md-2">*/}
                        {/*    <FileUpload*/}
                        {/*        align="display flex"*/}
                        {/*        defaultIcon={<LuImagePlus />}*/}
                        {/*        uploadable="Banner"*/}
                        {/*        colr="black"*/}
                        {/*        callBack={(img) => {*/}
                        {/*          setBanner(img);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*  </div>*/}
                        {/*</center>*/}
                    </div>
                    <div className="sch-info d-flex">
                        <div
                            className="sch-display"
                            style={{
                                backgroundColor:"#f3f3f3",
                                backgroundImage: "url(" + data.logo + ")",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                            }}
                        >
                            {/*<center>*/}
                            {/*  {" "}*/}
                            {/*  <div className="import-image">*/}
                            {/*    {" "}*/}
                            {/*    <FileUpload*/}
                            {/*        defaultIcon={<FaUserEdit />}*/}
                            {/*        uploadable="Picture"*/}
                            {/*        colr="white"*/}
                            {/*        callBack={(img) => {*/}
                            {/*          setPicture(img);*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*  </div>*/}
                            {/*</center>*/}
                        </div>
                        <div style={{flexGrow: 1}}>
                            <h4>{data.name}</h4>
                            <p>
                                {data.zone?.name}, {data.state?.name}, Nigeria{" "}
                                <span>
                <img src={data.status ? getGreen() : getRed()} style={{width: "10px"}}/>
                                    {(data.status ? ' Active' : ' Inactive')}
              </span>{" "}
                            </p>
                        </div>
                        <div className="d-flex ">
                            {" "}
                            {/*<Link*/}
                            {/*    state={{school_id: blogId}}*/}
                            {/*>*/}
                            {/*    {" "}*/}
                            {/*    <button clasName="cancel-btn">Edit School</button>*/}
                            {/*</Link>*/}
                            <Dropdown>
                                <Dropdown.Toggle className="more-btn">
                                    <MdMoreVert style={{fontSize: "25px"}}/>
                                </Dropdown.Toggle>

                                {/*<Dropdown.Menu>*/}
                                {/*    {" "}*/}
                                {/*    <Dropdown.Item href="#/action-2">Approve</Dropdown.Item>*/}
                                {/*    <hr/>*/}
                                {/*    <Dropdown.Item href="#/action-1" style={{color: "#DE1E1E"}}>*/}
                                {/*        {" "}*/}
                                {/*        Decline*/}
                                {/*    </Dropdown.Item>*/}
                                {/*</Dropdown.Menu>*/}
                            </Dropdown>
                        </div>
                    </div>
                    <div className="d-md-flex more-info">
                        <div className="col-md-6">
                            <h5>About School</h5>
                            <p> {data.about}</p>

                            <h5>Vision</h5>

                            <p> {data.vision}</p>

                            <h5>Mission</h5>

                            <p> {data.mission}</p>
                        </div>
                        <div className="contact-holder col-md-5  offset-md-1">
                            <div className="">
                                <h5>Contact Information</h5>
                                <div className="d-flex">
                                    <div
                                        className="contact-frame2 col-md-"
                                        style={{backgroundImage: "url(" + data.proprietor?.dp + ")"}}
                                    >
                                        {" "}
                                        {/*<center>*/}
                                        {/*  {" "}*/}
                                        {/*  <div className="import-contact">*/}
                                        {/*    {" "}*/}
                                        {/*    <FileUpload*/}
                                        {/*        defaultIcon={<FaUserEdit />}*/}
                                        {/*        uploadable="Picture"*/}
                                        {/*        colr="white"*/}
                                        {/*        callBack={(img) => {*/}
                                        {/*          setContact(img);*/}
                                        {/*        }}*/}
                                        {/*    />*/}
                                        {/*  </div>*/}
                                        {/*</center>*/}
                                    </div>
                                    <div className="col-md-9">
                                        <div style={{marginLeft: "20px"}}>
                                            <p> {data.proprietor?.name}</p>
                                            <p>{data.phone}</p>
                                            <p>{data.website}</p>
                                        </div>
                                        {" "}
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex">
                                {" "}
                                <div className="col-md-6">
                                    <h2>Address 1</h2>
                                    <p className="col-md-10"> {data.address}</p>
                                </div>
                                <div className="col-md-6">
                                    <h2>Website</h2>

                                    <p>{data.website}</p>
                                </div>
                                {" "}
                            </div>
                            <div className="d-flex">
                                <div className="col-md-6">
                                    {" "}
                                    <h2>Address 2</h2>
                                    <p className="col-md-10"> {data.address2}</p>
                                </div>
                                <div className="col-md-6">
                                    <h2>Zone</h2>
                                    <p>{data.zone?.name}</p>
                                </div>
                                {" "}
                            </div>

                            <div className="d-flex">
                                <div className="col-md-6">
                                    <h2>Email</h2>
                                    <p className="col-md-10">{data.contact_email}</p>
                                </div>
                                {" "}
                                <div className="col-md-6">
                                    <h2>State</h2>
                                    <p>{data.state?.name}</p>
                                </div>
                            </div>
                            <div>
                                {" "}
                                <div className="d-flex">
                                    <div className="col-md-6">
                                        <h2>Ward</h2>
                                        <p>{data.ward?.name}</p>
                                        <p>************</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    );
};
