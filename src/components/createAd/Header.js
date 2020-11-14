import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <header className="ca-header d-flex justify-content-between align-items-center smb-5">
        <span className="ir-b c-dark fs-m">درج آگهی جدید</span>
        <Link
          className="ir-r c-grey text-decoration-none d-flex align-items-center"
          to="/Employer/Dashboard"
        >
          بازگشت
          <i className="fas fa-angle-left smr-1"></i>
        </Link>
      </header>
    );
  }
}
