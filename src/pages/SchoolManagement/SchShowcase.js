import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { SchoolBio } from "./SchoolBio";
export const SchShowcase = () => {
  const { blog_id } = useParams();
  return (
    <div>
      <SchoolBio blog_id={blog_id} />
    </div>
  );
};
