import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_ADDRESS from "../../API_ADDRESS";
import validator from "validator";

export class Employee extends Component {
  state = {
    phoneNumber: "",
    error: "",
  };

  async changeHandler(event) {
    const formData = { [event.target.name]: event.target.value };

    await this.setState({ ...this.state, ...formData });
  }

  submitHandler(event) {
    event.preventDefault();

    if (this.formIsValid()) {
      axios
        .post(API_ADDRESS + "Account/Login", {
          phoneNumber: this.state.phoneNumber,
          role: "Employee",
        })
        .then(() => {
          this.props.prop.history.push(
            `/Employee/Login/Verification?phoneNumber=${this.state.phoneNumber}`
          );
        })
        .catch((err) => {
          this.setState({ ...this.state, error: err.response.data.message[0] });
        });
    }
  }

  formIsValid() {
    let error = "";

    let phEmpty = validator.isEmpty(this.state.phoneNumber);
    let phLength = this.state.phoneNumber.length === 11 ? true : false;
    let phFormat = validator.isMobilePhone(this.state.phoneNumber, ["fa-IR"]);

    if (phEmpty) error = "لطفا شماره موبایل خود را وارد کنید.";
    else if (!phLength) error = "شماره موبایل باید 11 رقم باشد.";
    else if (!phFormat) error = "لطفا شماره موبایل خود را به درستی وارد کنید.";

    this.setState({ ...this.state, error: error });

    return !error;
  }

  render() {
    return (
      <section className="container-fluid spx-2 spx-lg-10 smy-10 spt-10">
        <div className="row">
          <aside className="col-12 col-lg-5 mx-auto">
            <form
              className="w-100"
              noValidate
              onSubmit={this.submitHandler.bind(this)}
            >
              <div className="bg-white srounded-md sp-2 smb-2">
                <h1 className="fs-l c-dark d-block text-center smb-5 ir-bl">
                  ورود کارجویان
                </h1>

                <div className="text-input srounded-sm">
                  <label
                    className="ir-r text-regular text-right smb-1 label bg-white"
                    htmlFor="phoneNumber"
                  >
                    لطفا شماره موبایل خود را با 09 وارد کنید
                    <span className="text-danger d-inline">*</span>
                  </label>

                  <div className="form-group d-flex justify-content-center align-items-center">
                    <input
                      required
                      name="phoneNumber"
                      onChange={this.changeHandler.bind(this)}
                      value={this.state.phoneNumber || ""}
                      id="phoneNumber"
                      maxLength="11"
                      minLength="11"
                      className="form-control digit d-block fs-m text-right ir-r text-regular shadow-none"
                      type="text"
                      placeholder="مثال: 09111111111"
                    />
                  </div>
                </div>

                <span className="d-block c-danger fs-s ir-r">
                  {this.state.error}
                </span>

                <footer className="d-flex justify-content-between align-items-center smt-2">
                  <div className="form-check">
                    <input
                      // onChange={this.checkBoxHandler}
                      className="form-check-input"
                      type="checkbox"
                      id="checkbox"
                    />
                    <label
                      className="form-check-label c-regular ir-r d-flex justify-content-start align-item-center"
                      htmlFor="checkbox"
                    >
                      مرا به خاطر بسپار
                    </label>
                  </div>
                  <div>
                    <Link
                      className="btn btn-light ir-r sml-1"
                      to="/Employee/Register"
                    >
                      ثبت نام
                    </Link>
                    <button type="submit" className="btn btn-primary ir-r">
                      ارسال کد تایید
                    </button>
                  </div>
                </footer>
              </div>
            </form>

            <div className="employer-buttons row">
              <div className="col-12 col-lg-6 smb-2 mb-lg-0">
                <Link
                  className="btn btn-lg srounded-md sbs-content btn-warning ir-r w-100"
                  to="/Empolyer/Login"
                >
                  ورود کارفرمایان
                </Link>
              </div>
              <div className="col-12 col-lg-6 mb-0">
                <Link
                  className="btn btn-lg srounded-md sbs-content btn-warning-light ir-r w-100"
                  to="/Employer/Register"
                >
                  ثبت نام کارفرمایان
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    );
  }
}
