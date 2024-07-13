import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AddSchForm } from "../../components/AddSchForm/AddSchForm";
export const AddSch = () => {
  const { blog_id } = useParams();
  return (
    <div>
      <AddSchForm blog_id={blog_id} />
    </div>
  );
};
