import React from "react";

export default function Officers({ data }) {
  const { profileImg, name, portfolio } = data;
  return (
    <div className="col">
      <div className="officers-div">
        <center>
          {" "}
          <img src={profileImg} width="100%" />
          <h5>{name}</h5>
          <p>{portfolio}</p>
        </center>
      </div>
    </div>
  );
}
