import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_ADDRESS from "../../API_ADDRESS";
import validator from "validator";
import { Container, Tab } from "./Form.styles.jsx";

export class Employer extends Component {
  state = {
    phoneNumber: "",

    error: "",
  };

  componentDidMount() {
    const role = this.props.prop.match.params.role;
    this.setState({ role });
  }

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
          role: "Employer",
        })
        .then(() => {
          this.props.prop.history.push(
            `/Employer/Login/Verification?phoneNumber=${this.state.phoneNumber}`
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
            <Container>
              <Tab
                active={this.state.role === "Employer" && "#ffc107"}
                to="/Employer/Login"
              >
                کارفرما
              </Tab>
              <Tab
                active={this.state.role === "Employee" && "#007bff"}
                to="/Employee/Login"
              >
                کارجو
              </Tab>
            </Container>
            <form
              className="w-100"
              noValidate
              onSubmit={this.submitHandler.bind(this)}
            >
              <div
                className="bg-white sp-2 smb-2"
                style={{ borderRadius: "0 0 10px 10px" }}
              >
                <h1 className="fs-l c-dark d-block text-center smb-5 ir-bl">
                  ورود کارفرمایان
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
                      className="form-check-input"
                      type="checkbox"
                      id="checkbox"
                    />
                    <label
                      // onChange={this.checkBoxHandler}
                      className="form-check-label c-regular ir-r d-flex justify-content-start align-item-center"
                      htmlFor="checkbox"
                    >
                      مرا به خاطر بسپار
                    </label>
                  </div>
                  <div>
                    <Link
                      className="btn btn-light ir-r sml-1"
                      to="/Employer/Register"
                    >
                      ثبت نام
                    </Link>

                    <button type="submit" className="btn btn-warning ir-r">
                      ارسال کد تایید
                    </button>
                  </div>
                </footer>
              </div>
            </form>
          </aside>
        </div>
      </section>
    );
  }
}
