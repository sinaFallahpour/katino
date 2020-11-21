import React, { Component } from "react";
import { Link } from "react-router-dom";
import { adverStatus } from "../../../enums";

export class Header extends Component {
  render() {
    return (
      <header className="ad-info-header sp-2 w-100 bg-white srounded-md">
        <div className="top d-flex justify-content-between alig-items-center">
          <h3 className="ir-b c-dark text-right fs-m mb-0">
            {this.props.title}
            <span className="bg-light ir-r fs-s smr-1 p-2 srounded-sm">
              {adverStatus(this.props.status)}
            </span>
          </h3>
        </div>

        <hr className="smy-2" />

        <div className="bottom d-lg-flex align-items-lg-center justify-content-lg-between">
          <ul className="tabs smb-2 mb-lg-0 p-0 d-flex align-items-center justify-content-start">
            <li className="tab-item spy-1 spx-2 active">
              <Link
                className="ir-r text-decoration-none tab-link"
                to="/Employer/AdInfo/1046"
              >
                متقاضیان
              </Link>
            </li>

            <li className="tab-item spy-1 spx-2">
              <Link
                className="ir-r text-decoration-none tab-link"
                to="/Employer/AdInfo/1046/Statistics"
              >
                آمار
              </Link>
            </li>
          </ul>

          <ul className="options p-0 d-lg-flex align-items-lg-center justify-content-lg-start">
            <li className="options-item bg-white sml-lg-2">
              <Link
                className="d-flex align-items-center justify-content-start ir-r fs-m c-regular text-decoration-none"
                to={`/Employer/CreateAd/${this.props.id}`}
              >
                <i className="far fa-edit sml-1"></i>
                ویرایش
              </Link>
            </li>

            <li className="options-item bg-white sml-lg-2">
              <Link
                className="d-flex align-items-center justify-content-start ir-r fs-m c-regular text-decoration-none"
                to={`/JobDetails/${this.props.id}`}
              >
                <i className="fas fa-eye sml-1"></i>
                مشاهده
              </Link>
            </li>

            <li className="options-item bg-white sml-lg-2">
              <Link
                className="d-flex align-items-center justify-content-start ir-r fs-m c-regular text-decoration-none"
                to="/"
              >
                <i className="fas fa-sync-alt sml-1"></i>
                تمدید
              </Link>
            </li>

            <li className="options-item setting bg-white ml-0">
              <span
                className="cursor-pointer d-flex align-items-center justify-content-start ir-r fs-m c-regular text-decoration-none"
                to="/"
              >
                <i className="fas fa-cog sml-1"></i>
                تنظیمات
              </span>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
