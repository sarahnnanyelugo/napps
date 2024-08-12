import React, {useEffect} from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { SchoolBio } from "./SchoolBio";
export const SchShowcase = () => {
  const { school_id } = useParams();
  useEffect(()=>{
      console.log(school_id)
  })
  return (
    <div>
      <SchoolBio school_id={school_id} />
    </div>
  );
};
