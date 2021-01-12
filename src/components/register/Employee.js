import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_ADDRESS from "../../API_ADDRESS";
import validator from "validator";
import { toast } from "react-toastify";
import { Container, Tab } from "./Form.styles.jsx";

export class Employee extends Component {
  state = {
    fullName: "",
    phoneNumber: "",

    errors: { fullName: "", phoneNumber: "" },
  };

  async changeHandler(event) {
    const formData = { [event.target.name]: event.target.value };
    await this.setState({ ...this.state, ...formData });
  }
  componentDidMount() {
    const role = this.props.prop.match.params.role;
    this.setState({ role });
  }

  submitHandler(event) {
    event.preventDefault();

    if (this.formIsValid()) {
      axios
        .post(API_ADDRESS + "Account/EmployeeRegister", {
          fullName: this.state.fullName,
          phoneNumber: this.state.phoneNumber.toString(),
        })
        .then(() => {
          this.props.prop.history.push(
            `/Employee/Register/Verification?phoneNumber=${this.state.phoneNumber}`
          );
        })
        .catch((err) => {
          err.response.data.message &&
            err.response.data.message.map((er) => toast.error(er));

          this.setState({
            ...this.state,
            errors: {
              ...this.state.errors,
              phoneNumber: err.response.data.message,
            },
          });
        });
    }
  }

  formIsValid() {
    let errors = {};

    let fnEmpty = validator.isEmpty(this.state.fullName);
    let fnLength = this.state.fullName.length >= 6 ? true : false;

    let phEmpty = validator.isEmpty(this.state.phoneNumber);
    let phLength = this.state.phoneNumber.length === 11 ? true : false;
    let phFormat = validator.isMobilePhone(this.state.phoneNumber, ["fa-IR"]);

    if (fnEmpty) errors.fullName = "لطفا نام و نام خانوادگی خود را وارد کنید.";
    else if (!fnLength)
      errors.fullName = "نام و نام خانوادگی حداقل باید 6 حرف باشد.";

    if (phEmpty) errors.phoneNumber = "لطفا شماره موبایل خود را وارد کنید.";
    else if (!phLength) errors.phoneNumber = "شماره موبایل باید 11 رقم باشد.";
    else if (!phFormat)
      errors.phoneNumber = "لطفا شماره موبایل خود را به درستی وارد کنید.";

    this.setState({ ...this.state, errors });

    return !(errors.fullName || errors.phoneNumber);
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
                کارفرمایان
              </Tab>
              <Tab
                active={this.state.role === "Employee" && "#007bff"}
                to="/Employee/Login"
              >
                کارجویان
              </Tab>
            </Container>
            <form
              noValidate
              onSubmit={this.submitHandler.bind(this)}
              className="w-100"
            >
              <div
                className="bg-white sp-2 smb-2"
                style={{ borderRadius: "0 0 10px 10px" }}
              >
                <h1 className="fs-l c-dark d-block text-center smb-5 ir-bl">
                  ثبت نام کارجویان
                </h1>

                <div className="text-input srounded-sm">
                  <label
                    className="ir-r text-regular text-right smb-1 label bg-white"
                    htmlFor="fullName"
                  >
                    لطفا نام و نام خانوادگی خود را وارد کنید
                    <span className="text-danger d-inline">*</span>
                  </label>

                  <div className="form-group d-flex justify-content-center align-items-center">
                    <input
                      name="fullName"
                      onChange={this.changeHandler.bind(this)}
                      value={this.state.fullName || ""}
                      id="fullName"
                      className="form-control digit d-block fs-m text-right ir-r text-regular shadow-none"
                      type="text"
                      placeholder="مثال: نام و نام خانوادگی"
                    />
                  </div>
                </div>

                <span className="d-block c-danger fs-s ir-r smb-2">
                  {this.state.errors.fullName}
                </span>

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

                <span className="d-block c-danger fs-s ir-r smb-2">
                  {this.state.errors.phoneNumber}
                </span>

                <footer className="d-flex justify-content-between align-items-center smt-2">
                  <Link className="ir-r text-primary" to="/Employee/Login">
                    ورود کارجویان
                  </Link>

                  <button type="submit" className="btn btn-primary ir-r">
                    ارسال کد تایید
                  </button>
                </footer>
              </div>
            </form>
          </aside>
        </div>
      </section>
    );
  }
}
