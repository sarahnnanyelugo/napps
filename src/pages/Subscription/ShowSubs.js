import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AllSubs } from "./AllSubs";
export const ShowSubs = () => {
  const { blog_id } = useParams();
  return (
    <div>
      <AllSubs blog_id={blog_id} />
    </div>
  );
};
