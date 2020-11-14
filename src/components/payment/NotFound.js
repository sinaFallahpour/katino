import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NotFound extends Component {
  render() {
    return (
      <React.Fragment>
        <span className="d-block text-center c-danger ir-r">
          خرید با مشکل مواجه شده است، لطفا دوباره سعی کنید
        </span>

        <Link
          className="btn btn-secondary ir-r d-block mx-auto smt-2"
          to="/Employer/Dashboard/Plans"
        >
          باز گشت به صفحه‌ی تعرفه ها
        </Link>
      </React.Fragment>
    );
  }
}
