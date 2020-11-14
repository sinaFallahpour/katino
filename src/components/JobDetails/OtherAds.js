import React from "react";
import { Ad } from "../home";

export function OtherAds(props) {
  return (
    <React.Fragment>
      <h4 className="ir-b c-dark text-right d-block fs-l smb-3">
        سایر آگهی ها
      </h4>

      <div className="bg-white sp-2 srounded-md">
        {!props.list ? (
          <div className="ir-r d-block text-right c-regular">
            در حال بارگیری
          </div>
        ) : (
          props.list.map((item) => (
            <div key={item.id} className="smb-2">
              <Ad
                id={item.id}
                title={item.title}
                companyName={item.companyName}
                city={item.city}
                salary={item.salary}
                typeOfCooperation={item.typeOfCooperation}
                descriptionOfJob={item.descriptionOfJob}
              />
            </div>
          ))
        )}
      </div>
    </React.Fragment>
  );
}
