import React from "react"
import { Link } from "react-router-dom"

export function ResumeBuilder() {
  return (
    <section className="container-fluid spy-10 spx-5  d-none d-block">
      <div className="row">
        <div className="col-12 col-lg-5 d-flex justify-content-center align-item-center">
          <img
            className="d-block w-75"
            src="/img/resume-illustration.svg"
            alt="رزومه ساز آنلاین کاتینو"
          />
        </div>
        <div className="col-12 col-lg-7 d-flex flex-column justify-content-center align-items-start">
          <h3 className="c-dark ir-bl smb-2">آنلاین رزومه ات رو بساز!</h3>

          <p className="fs-m ir-r text-justify smb-2">
            با رزومه ساز آنلاین کاتینو می‌توانید به راحتی رزومه خود را بسازید.
          </p>

          <Link
            to="/"
            className="btn btn-warning-light srounded-sm ir-r d-flex justify-content-between align-item-center spy-1 spx-2 shadow-none"
          >
            ورود/ثبت نام کارجویان
            <i className="fas fa-chevron-left d-flex align-item-center smr-3"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
