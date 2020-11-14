import React from "react";
import { Link } from "react-router-dom";

export function LandingNavbar() {
  return (
    <header className="g-header fixed-top w-100 d-flex justify-content-between align-items-center spx-2 spx-xl-10 bg-white navbar-shadow">
      {/* Links */}
      <nav className="navbar navbar-expand-lg navbar-light pr-0 py-0">
        <Link className="navbar-brand p-0 m-0" to="/">
          <img src="/img/logo.png" height="40" alt="کاتینو" loading="lazy" />
        </Link>

        <div
          className="collapse navbar-collapse d-none d-lg-block"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item smr-lg-1 smr-xl-4">
              <Link
                className="nav-link text-center position-relative ir-r fs-s p-0"
                to="/"
              >
                خانه
              </Link>
            </li>
            <li className="nav-item smr-lg-1 smr-xl-4">
              <Link
                className="text-center nav-link position-relative ir-r fs-s p-0"
                to="/Jobs"
              >
                جستجوی مشاغل
              </Link>
            </li>

            <li className="nav-item smr-lg-1 smr-xl-4">
              <Link
                className="nav-link text-center position-relative ir-r fs-s p-0"
                to="/"
              >
                رزومه ساز
              </Link>
            </li>

            <li className="nav-item smr-lg-1 smr-xl-4">
              <Link
                className="nav-link text-center position-relative ir-r fs-s p-0"
                to="/BestCompanies"
              >
                شرکت های برتر
              </Link>
            </li>

            <li className="nav-item smr-lg-1 smr-xl-4">
              <Link
                className="nav-link text-center position-relative ir-r fs-s p-0"
                to="/Employers"
              >
                بخش کارفرمایان
              </Link>
            </li>

            <li className="nav-item smr-lg-1 smr-xl-4">
              <Link
                className="nav-link text-center position-relative ir-r fs-s p-0"
                to="/"
              >
                وبلاگ
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Buttons */}
      <div className="buttons d-flex justify-content-start">
        <Link
          className="btn btn-warning ir-r d-none d-lg-block sml-1"
          to="/Employers"
        >
          <i className="fas fa-briefcase sml-1"></i>
          ثبت آگهی استخدام
        </Link>

        <Link className="btn btn-primary ir-r" to="/Employee/Login/">
          <i className="fas fa-user sml-1"></i>
          ورود/ثبت نام
        </Link>
      </div>
    </header>
  );
}
