import React, {useContext, useEffect, useState} from "react";
import {DashboardTop} from "../../components/DashboardTop/DashboardTop";
import {CiGrid2H} from "react-icons/ci";
import {IoGridOutline} from "react-icons/io5";
import {Schools} from "./Schools";
import "./my-schools.scss";
import {IoIosAdd} from "react-icons/io";
import {ApiContext} from "../../ApiContext";
import {setAuthToken} from "../../utility/api";
import {useAuth} from "../../AuthContext";

export default function MySchools() {
    const [schoolList, setSchoolList] = useState([]);
    const [activeElement, setActiveElement] = useState("element1");
    const [isGridView, setIsGridView] = useState(true);
    const {authToken, userState} = useAuth();
    const [ready, setReady] = useState(false)
    const {data, loading, error, fetchData, postData} = useContext(ApiContext);
    const switchView = (view) => {
        if (view === "grid") {
            setIsGridView(true);
            setActiveElement("element1");
        } else {
            setIsGridView(false);
            setActiveElement("element2");
        }
    };

    async function fetchSchools() {
        await postData("/proprietor-schools", {});
    }

    useEffect(() => {
        setSchoolList([])
        setAuthToken(authToken);
        fetchSchools();
        setReady(false)
    }, []);

    useEffect(() => {
        // Clear previous data
        setSchoolList([]);
        // Check if there is new data to set
        if (data) {
            setSchoolList(data);
        }
    }, [data]);


    return (
        <>
            <DashboardTop title={"Welcome, " + userState?.name} hideSearch={1}/>
            <br/>
            <div className="my-schools-div">
                <div className="d-flex">
                    <h2 style={{flexGrow: 1}}>My Schools</h2>{" "}
                    <h4
                        onClick={() => switchView("grid")}
                        className={activeElement === "element1" ? "actived" : ""}
                        style={{
                            marginLeft: "20px",
                            marginRight: "20px",
                            marginTop: "5px",
                        }}
                    >
                        <IoGridOutline/>
                    </h4>
                    <h4
                        className={activeElement === "element2" ? "actived" : ""}
                        onClick={() => switchView("list")}
                        style={{
                            marginTop: "5px",
                        }}
                    >
                        <CiGrid2H/>
                    </h4>{" "}
                    <a className="add-sch" href={"/registration"}>
                        {" "}
                        <IoIosAdd style={{color: "white", fontSize: "19px"}}/>
                        Add School
                    </a>
                </div>

                <div className={`${isGridView ? "grid-view" : "list-view"}`} id="content">
                    {(!loading) && schoolList?.map((data, index) => (
                        <div key={index} className={isGridView ? "grid-item" : "list-item"}>
                            <Schools data={data}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
