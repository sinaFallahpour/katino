import React from "react";
import { Immediately, Latest } from "./index";

export function Ads({ immediately, latest, handleMarkOtherAdv }) {
  return (
    <section className="container-fluid spx-2 spx-lg-10 smy-10">
      <div className="row">
        <div className="col-12 col-lg-8 smb-4">
          <h3 className="d-block text-right fs-l c-dark smb-2 ir-b">
            آگهی های <span className="badge badge-danger ir-b fs-m">فوری</span>
          </h3>
          <div className="bg-white sp-1 sp-lg-2 srounded-md smb-2 mb-lg-0">
            <Immediately
              immediately={immediately}
              handleMarkOtherAdv={handleMarkOtherAdv}
              status="immediate"
            />
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <h3 className="d-block text-right fs-l c-dark smb-2 ir-b">
            آخرین آگهی ها
          </h3>
          <div className="bg-white sp-1 sp-lg-2 srounded-md">
            <Latest
              hasMoreButton={true}
              latest={latest}
              handleMarkOtherAdv={handleMarkOtherAdv}
              status="latest"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
