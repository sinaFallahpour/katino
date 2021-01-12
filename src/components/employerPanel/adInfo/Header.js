import React, { useState } from "react";
import { Link } from "react-router-dom";
import { adverStatus } from "../../../enums";
import { AdverDetails } from "../AdverDetails";

export const Header = ({ id, status, title }) => {
  const [toggle, setToggle] = useState(false);
  const [adverId, setAdverId] = useState();

  function goto(event) {
    if (event.target.id !== "modalContaierOfAdver") {
      setToggle(false);
    }
  }
  document.body.addEventListener("click", goto);

  return (
    <>
      {toggle && <AdverDetails adverId={adverId} />}
      <header className="ad-info-header sp-2 w-100 bg-white srounded-md">
        <div className="top d-flex justify-content-between alig-items-center">
          <h3 className="ir-b c-dark text-right fs-m mb-0">
            {title}{" "}
            <span className="bg-light ir-r fs-s smr-1 p-2 srounded-sm ">
              {adverStatus(status)}
            </span>
          </h3>
        </div>
      </header>
    </>
  );
};
