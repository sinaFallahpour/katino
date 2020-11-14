import React from "react";
import { Link } from "react-router-dom";
import ADDRESS from "../../../ADDRESS";

export function Company(props) {
  return (
    <Link
      className="card border-0 srounded-md sbs-content d-block w-100 text-decoration-none sp-2"
      to="/"
    >
      <img
        src={props.image}
        className="card-img-top d-block w-75 mx-auto"
        alt={props.companyName}
      />
      <div className="card-body p-0 smt-2">
        <h5 className="card-title fs-m c-regular ir-r text-center">
          {props.companyName}
        </h5>
      </div>
    </Link>
  );
}
