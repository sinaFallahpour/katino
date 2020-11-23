import React from "react";
import { Link } from "react-router-dom";

export function Header(props) {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-end smb-2">
        <Link
          className="ir-r c-regular fs-s d-flex align-items-center text-decoration-none mr-auto"
          to={`/Employer/AdInfo/${props.adId}`}
        >
          بازگشت
          <i className="fas fa-arrow-left smr-1"></i>
        </Link>
      </div>

      <header className="bg-white srounded-md sbs-shadow sp-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center ir-r c-regular fs-s">
          <i className="fas fa-chevron-right sml-1"></i>
          رزومه بعدی
        </div>

        <div className="d-flex align-items-center ir-r c-regular fs-s">
          رزومه قبلی
          <i className="fas fa-chevron-left smr-1"></i>
        </div>
      </header>
    </React.Fragment>
  );
}
