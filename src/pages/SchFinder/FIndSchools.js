import React from "react";

export default function FIndSchools({ data }) {
  return (
    <>
      <div className="col find-sch-div">
        <div className="show-sch"></div>
        <div className="show-sch2"></div>
        <h3>{data.name}</h3>
        <p>{data.address}</p>
        <p>
          {data.phone1}, {data.phone2}
        </p>
        <div className="d-flex sch-cat-btns">
          <button className="gen-btn">{data.gender}</button>
          <button className="cat-btn">{data.category}</button>
        </div>{" "}
        <button className="day-boarding">{data.category}</button>
      </div>
    </>
  );
}
