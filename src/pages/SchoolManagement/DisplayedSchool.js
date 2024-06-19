import React from "react";
import { SchoolInfo } from "./SchoolInfo";
import { Link, useLocation, useParams } from "react-router-dom";
export const DisplayedSchool = () => {
  const { blog_id } = useParams();
  return (
    <div>
      <SchoolInfo blog_id={blog_id} />
    </div>
  );
};
