import React from "react";
import SchDetails from "../../components/SchDetails/SchDetails";
import {getGreen, getRed} from "../../utility/dots";
import {Tooltip} from 'react-tooltip';

export const opener = () => {
    return <p className={"btn btn-sm btn-outline-success"}>View Details</p>
}
export default function FIndSchools({data}) {
    return (
        <>
            <div className="col find-sch-div">
                <div className="show-sch" style={{
                    backgroundImage: `url(${data.banner})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}></div>
                <div className="show-sch2" style={{
                    backgroundImage: `url(${data.logo})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}></div>
                <h3>{data.name}</h3>
                <div className="d-flex justify-content-between">
                    <div>
                        <p>{data.address}</p>
                        <p>{data.address2}</p>
                    </div>
                    <div className="d-flex flex-column">
                        <button className="btn btn-outline-default"><img src={data?.status?getGreen():getRed()}
                                                                         alt="status dot" style={{width: "10px"}}/> {data.status?"Active":"Inactive"}</button>
                        <SchDetails opener={opener()} school_id={data.uuid}/>
                    </div>
                </div>
                <p>{data.contact_phone}</p>
{" "}

                <div className=" sch-cat-btns">
                    <button className="gen-btn"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Gender"
                            data-tooltip-place="top">{data.gender}</button>
                    <button className="cat-btn"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="School Types"
                            data-tooltip-place="top">{data.school_type}</button>
                    <button className="day-boarding"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Education Levels"
                            data-tooltip-place="top">{data.education_levels}</button>
                    <Tooltip id="my-tooltip" />
                </div>


            </div>
        </>
    );
}
