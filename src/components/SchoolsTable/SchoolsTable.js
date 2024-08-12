import React, {useState, useLocation, useEffect} from "react";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import "./schools-table.scss";
import SchDetails from '../SchDetails/SchDetails';
import {getGreen, getRed} from "../../utility/dots";

export const opener = () => {return <p className={"btn"}>View</p>}

const SchoolsTable = ({data, initialDisplayCount = 4}) => {
    // const [num] = data;
    const [blogId, setBlogId] = useState(0);
    // const location = useLocation();
    const [prevData, setPrevData] = useState([]);

    const [isShowingAll, setIsShowingAll] = useState(false);

    const handleToggleDisplay = () => {
        setIsShowingAll(!isShowingAll);
    };
    const visibleData = isShowingAll ? data : data?.slice(0, initialDisplayCount);


    return (
        <div>
            <div className="d-flex tabled-data">
                {" "}
                <h5 style={{flexGrow: 1}}>Newly Registered School</h5>
                {/* <button onClick={handleToggleDisplay} className="more-btn">
          {isShowingAll ? "See less" : "See all"}
        </button> */}
            </div>

            <Table striped bordered hover className="school-table" responsive>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox"/>
                    </th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Registration ID</th>
                    <th>Zone</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {visibleData?.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <input type="checkbox"/>
                        </td>

                        <td className="">
                            <div className="d-flex flex-column">
                                {item.name}
                                <small>{item.proprietor?.name}</small>
                            </div>
                        </td>

                        <td>
                            <div
                                className={`btn btn-light text-muted`}
                                style={{
                                    width: "fit-content",
                                    height: "35px",
                                }}
                            >
                                <img src={item.status ? getGreen() : getRed()} style={{width: "10px"}}/>   {item.status ? 'Active' : 'Inactive'}
                            </div>
                        </td>
                        <td>{item.uuid}</td>
                        <td>{item.zone?.name}</td>
                        <td className="edit">
                            <div className="btn-group">
                                    <SchDetails opener={opener()} school_id={item.uuid}/>
                                    <Link
                                        className="edit btn"
                                        to={"/dashboard-layout/displayed-school/" + item.id}
                                        state={{blog_id: blogId}}
                                        style={{color: "#00923F"}}
                                    >
                                        {" "}
                                        edit
                                    </Link>
                            </div>

                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="d-flex">
                <p style={{flexGrow: 1}}>Page 1 of 10</p>
                <div className="d-flex">
                    <button className="more-btn" style={{marginRight: "10px"}}>
                        Previous
                    </button>
                    <button className="more-btn">Next</button>
                </div>
            </div>
        </div>
    );
};

export default SchoolsTable;
