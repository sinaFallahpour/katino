import React from "react";
import { Link } from "react-router-dom";

export function Intro() {
  return (
    <div className="employers-intro row d-lg-flex justify-content-lg-between align-items-lg-center">
      <div className="col-12 col-lg-5 img-holder smb-5 mb-lg-0">
        <img className="d-block w-100" src="/img/employer-landing-intro.png" />
      </div>

      <div className="col-12 col-lg-6 offset-lg-1 texts-holder d-flex flex-column align-items-center align-items-lg-start justify-content-start">
        <h2 className="ir-b c-dark fs-l smb-2">
          به راحتی آگهی خود را درج کنید!
        </h2>

        <p className="text-center text-lg-right d-block fs-m ir-r smb-2">
          با استفاده از خدمات کاتینو به راحتی و در سریعترین زمان ممکن آگهی خود
          را درج کنید.
          <br />
          برای این کار نیاز است ابتدا وارد پنل شوید.
        </p>

        <div className="buttons d-flex flex-column flex-lg-row justify-content-start align-items-center">
          <Link
            className="btn btn-lg ir-r btn-warning sml-1"
            to="/Employer/Login"
          >
            ورود/ثبت نام کارفرمایان
          </Link>
        </div>
      </div>
    </div>
  );
}
