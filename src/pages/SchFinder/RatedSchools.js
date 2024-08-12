import React from "react";

export default function RatedSchools({ data }) {
  return (
    <>
      <div className="col find-sch-div ">
        <div className="d-flex">
          {" "}
          <div className="show-sch col-md-6"></div>
          <div>
            {" "}
            <div className=" d-flex">
              <div className="show-sch3 col-md-3"></div>
              <div>
                {" "}
                <h3>{data.name}</h3>
                <p>{data.address}</p>
                <p>
                  {data.phone1}, {data.phone2}
                </p>{" "}
              </div>{" "}
            </div>
            <div
              className="d-flex sch-cat-btns "
              style={{ marginLeft: "20px" }}
            >
              <button className="gen-btn">{data.gender}</button>
              <button className="cat-btn">{data.category}</button>{" "}
            </div>
            <button className="day-boarding" style={{ marginLeft: "20px" }}>
              {data.category}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
