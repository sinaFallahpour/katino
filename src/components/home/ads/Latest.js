import React from "react";
import { Ad } from "./Ad";
import { Link } from "react-router-dom";

export function Latest({ latest, handleMarkOtherAdv }) {
  if (!latest) return <> </>;
  return (
    <div className="row">
      {latest.map((item) => (
        <div key={item.id} className="col-12 smb-2">
          <Ad
            id={item.id}
            title={item.title}
            companyName={item.companyName}
            city={item.city}
            salary={item.salary}
            type={item.typeOfCooperation}
            typeOfCooperation={item.typeOfCooperation}
            // immediately={this.state.immediatelyAds}
            // latest={this.state.latestAds}
            item={item}
            handleMarkOtherAdv={handleMarkOtherAdv}
          />
        </div>
      ))}

      <div className="col-12 mb-0">
        {latest.hasMoreButton ? (
          <Link
            to="/Jobs"
            className="btn btn-primary srounded-sm ir-r d-flex justify-content-between align-item-center spy-1 spx-2 shadow-none"
          >
            سایر آگهی ها
            <i className="fas fa-chevron-left d-flex align-item-center"></i>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
