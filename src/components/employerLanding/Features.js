import React from "react";
import { Feature } from "./Feature";

export function Features() {
  return (
    <React.Fragment>
      <h2
        id="#features"
        className="d-block text-center c-dark ir-b fs-l smb-10"
      >
        ویژگی های خدمات ما
      </h2>

      <div className="row spx-lg-5 spt-3">
        <div className="col-12 col-lg-4 smb-10 mb-lg-0">
          <Feature
            img="/img/employers-landing/1.svg"
            title="آسانی در ثبت آگهی"
            text="به راحتی آگهی خود را ثبت کنید."
          />
        </div>

        <div className="col-12 col-lg-4 smb-10 mb-lg-0">
          <Feature
            img="/img/employers-landing/2.svg"
            title="آسانی در ثبت آگهی"
            text="به راحتی آگهی خود را ثبت کنید."
          />
        </div>

        <div className="col-12 col-lg-4 smb-10 mb-lg-0">
          <Feature
            img="/img/employers-landing/3.svg"
            title="آسانی در ثبت آگهی"
            text="به راحتی آگهی خود را ثبت کنید."
          />
        </div>
      </div>
    </React.Fragment>
  );
}
