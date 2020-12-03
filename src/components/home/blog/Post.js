import React from "react";
import ADDRESS from "../../../ADDRESS";
import { Link } from "react-router-dom";

export function Post(props) {
  return (
    <Link
      className="card text-decoration-none border-0 sp-2 srounded-md"
      to={`/Blog/Post/${props.id}`}
    >
      <div className="row no-gutters">
        <div className="col-3">
          <img
            src={props.pic}
            className="card-img"
            alt={props.title}
          />
        </div>
        <div className="col-9 spr-1 d-flex flex-column m-auto">
          <div className="card-body p-0">
            <h5 className="card-title text-truncate ir-b fs-m c-regular smb-1">
              {props.title}
            </h5>
            <span className="ir-r fs-m c-regular">{props.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
