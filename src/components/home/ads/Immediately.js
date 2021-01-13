import React from "react";
import { Ad } from "./";

export function Immediately({ immediately, handleMarkOtherAdv, status }) {
  if (!immediately) return <></>;
  return (
    <div className="row">
      {immediately.map((item) => (
        <div key={item.id} className="col-12 col-lg-6 smb-2">
          <Ad
            id={item.id}
            title={item.title}
            companyName={item.companyName}
            city={item.city}
            salary={item.salary}
            typeOfCooperation={item.typeOfCooperation}
            descriptionOfJob={item.descriptionOfJob}
            item={item}
            handleMarkOtherAdv={handleMarkOtherAdv}
            status={status}
          />
        </div>
      ))}
    </div>
  );
}
