import React from "react";

export function Feature(props) {
  return (
    <div className="bg-white features-card srounded-md sp-2 position-relative">
      <img
        className="img d-block mx-auto position-absolute"
        src={props.img}
        title={props.title}
      />

      <h3 className="d-block text-center ir-b fs-l smb-2 c-dark">
        {props.title}
      </h3>

      <p className="d-block text-center ir-r fs-m mb-0 c-regular">
        {props.text}
      </p>
    </div>
  );
}
