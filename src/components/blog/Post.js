import React from "react";
import { Link } from "react-router-dom";

export function Post(props) {
  let desc =
    props.desc?.length <= 200 ? props.desc : props.desc?.substring(0, 200);

  return (
    <Link className="text-decoration-none" to={`/Blog/Post/${props.id}`}>
      <div className="bg-white srounded-md sbs-shadow sp-2 row">
        <div className="col-12 col-lg-4 smb-2 mb-lg-0 p-0">
          <img
            className="d-block w-100 srounded-sm"
            src={props.pic}
            title={props.title}
          />
        </div>
        <div className="col-12 col-lg-8 p-0 pr-lg-3 d-lg-flex flex-lg-column justify-content-lg-center align-items-lg-start">
          <h3 className="ir-b fs-m c-dark smb-2 text-truncate w-100">
            {props.title}
          </h3>

          <p
            className="ir-r fs-s c-regular smb-2"
            dangerouslySetInnerHTML={{ __html: `${desc}...` }}
          ></p>

          <span className="ir-r fs-s c-grey">{props.date}</span>
        </div>
      </div>
    </Link>
  );
}
