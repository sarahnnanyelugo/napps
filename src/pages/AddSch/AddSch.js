import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AddSchForm } from "../../components/AddSchForm/AddSchForm";
export const AddSch = () => {
  return (
    <div>
      <AddSchForm founder_id={1} />
    </div>
  );
};
