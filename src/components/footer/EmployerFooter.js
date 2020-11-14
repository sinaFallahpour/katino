import React from "react";
import { Link } from "react-router-dom";

export function EmployerFooter() {
  return (
    <footer className="g-footer border-top d-none d-lg-block container-fluid smt-10 spx-10 bg-white">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center spy-2">
          <Link className="ir-r c-grey sml-1" to="/">
            تماس با ما
          </Link>
          <Link className="ir-r c-grey sml-1" to="/">
            سوالات متداول
          </Link>
          <Link className="ir-r c-grey ml-0" to="/">
            قوانین و شرایط استفاده
          </Link>
        </div>
      </div>
    </footer>
  );
}
