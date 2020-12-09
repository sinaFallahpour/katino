import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SuccessPayment extends Component {
  componentDidMount = () => { };

  render() {
    return (
      <div className="container smt-10 spt-10">
        <div className="row">
          <div className="col-12 col-lg-5 mx-auto">
            <div className="payment-factor">
              <header className="f-header d-flex justify-content-center align-items-center">
                <span className="fs-m ir-b c-dark c-success">
                  پرداخت با موفقیت انجام شد.
                </span>
              </header>

              <div className="f-item sp-2 smt-2 sbs-content srounded-md">
                <div className="d-block text-center ir-r spy-1">
                  {this.props?.location?.state?.message}
                </div>

                <Link
                  to="/Employer/Dashboard"
                  className="ir-r btn btn-warning smt-2 d-block mx-auto"
                >
                  بازگشت به داشبورد
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
