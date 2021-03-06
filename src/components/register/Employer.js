import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input } from "../Input";
import axios from "axios";
import API_ADDRESS from "../../API_ADDRESS";
import validator from "validator";

export class Employer extends Component {
  state = {
    register: {
      fullName: "",
      phoneNumber: "",
      isValid: true,
      fnValueErr: false,
      fnLangErr: false,
      phValueErr: false,
      phNumberErr: false,
    },
  };

  changeHandler(event) {
    const formData = { [event.target.name]: event.target.value };
    this.setState({ register: { ...this.state.register, ...formData } });
  }

  submitHandler = async (event) => {
    await event.preventDefault();

    await this.formValidator();

    if (this.state.register.isValid) {
      await axios
        .post(API_ADDRESS + "Account/EmployerRegister", {
          phoneNumber: this.state.register.phoneNumber,
          fullName: this.state.register.fullName,
        })
        .then((res) => {
          if (res.status === 200) {
            this.props.prop.history.push(
              `/Employer/Register/Verification?phoneNumber=${this.state.register.phoneNumber}`
            );
          }
        });
    }
  };

  async formValidator() {
    await this.setState({
      register: { ...this.state.register, isValid: true },
    });

    await this.fnValidator();

    await this.phValidator();

    if (
      this.state.register.fnValueErr ||
      this.state.register.fnLangErr ||
      this.state.register.phNumberErr ||
      this.state.register.phValueErr
    ) {
      await this.setState({
        register: { ...this.state.register, isValid: false },
      });
    } else {
      await this.setState({
        register: { ...this.state.register, isValid: true },
      });
    }
  }

  async fnValidator() {
    const fnValue = await validator.isEmpty(this.state.register.fullName);

    const fnLang = await validator.isAlpha(this.state.register.fullName, [
      "fa-IR",
    ]);

    if (fnValue) {
      await this.setState({
        register: { ...this.state.register, fnValueErr: true },
      });
    } else {
      await this.setState({
        register: { ...this.state.register, fnValueErr: false },
      });
    }

    if (!fnLang) {
      await this.setState({
        register: { ...this.state.register, fnLangErr: false },
      });
    } else {
      await this.setState({
        register: { ...this.state.register, fnLangErr: true },
      });
    }
  }

  async phValidator() {
    const phValue = await validator.isEmpty(this.state.register.phoneNumber);
    const phNumber = await validator.isMobilePhone(
      this.state.register.phoneNumber,
      ["fa-IR"]
    );

    if (phValue) {
      await this.setState({
        register: { ...this.state.register, phValueErr: true },
      });
    } else {
      await this.setState({
        register: { ...this.state.register, phValueErr: false },
      });
    }

    if (!phNumber) {
      await this.setState({
        register: { ...this.state.register, phNumberErr: true },
      });
    } else {
      await this.setState({
        register: { ...this.state.register, phNumberErr: false },
      });
    }
  }

  fnErrors() {
    if (this.state.register.fnLangErr === true) {
      return (
        <small className="d-block text-right text-danger ir-r fs-m">
          لطفا نام و نام خانوادگی خود را به فارسی وارد کنید.
        </small>
      );
    } else if (this.state.register.fnValueErr === true) {
      return (
        <small className="d-block text-right text-danger ir-r fs-m">
          لطفا نام و نام خانوادگی خود را وارد کنید.
        </small>
      );
    }
  }

  phErrors() {
    if (this.state.register.phValueErr === true) {
      return (
        <small className="d-block text-right text-danger ir-r fs-m">
          لطفا شماره موبایل خود را وارد کنید.
        </small>
      );
    } else if (this.state.register.phNumberErr === true) {
      return (
        <small className="d-block text-right text-danger ir-r fs-m">
          لطفا شماره موبایل خود را به درستی وارد کنید.
        </small>
      );
    }
  }

  render() {
    return (
      <section className="container-fluid spx-2 spx-lg-10 smy-10 spt-10">
        <div className="row">
          <aside className="col-12 col-lg-5 mx-auto">
            <form className="w-100" noValidate onSubmit={this.submitHandler}>
              <div className="bg-white srounded-md sp-2 smb-2">
                <h1 className="fs-l c-dark d-block text-center smb-5 ir-bl">
                  ثبت نام کارفرمایان
                </h1>

                <Input
                  onChange={this.changeHandler.bind(this)}
                  type="text"
                  label="لطفا نام و نام خانوادگی خود را وارد کنید"
                  placeholder="نام و نام خانوادگی"
                  id="fullName"
                  name="fullName"
                  priority="required"
                />
                {this.fnErrors()}

                <Input
                  onChange={this.changeHandler.bind(this)}
                  type="phoneNumber"
                  placeholder="مثال: 09111111111"
                  label="لطفا شماره موبایل خود را با 09 وارد کنید"
                  id="phoneNumber"
                  name="phoneNumber"
                  priority="required"
                />
                {this.phErrors()}

                <footer className="d-flex justify-content-between align-items-center smt-2">
                  <Link className="ir-r text-primary" to="/Employee/Login">
                    ورود کارفرمایان
                  </Link>

                  <button type="submit" className="btn btn-warning ir-r">
                    ارسال کد تایید
                  </button>
                </footer>
              </div>

              <div className="employer-buttons row">
                <div className="col-12 col-lg-6 smb-2 mb-lg-0">
                  <Link
                    className="btn btn-lg srounded-md sbs-content btn-primary ir-r w-100"
                    to="/Employee/Login"
                  >
                    ورود کارجویان
                  </Link>
                </div>
                <div className="col-12 col-lg-6 mb-0">
                  <Link
                    className="btn btn-lg srounded-md sbs-content btn-primary-light ir-r w-100"
                    to="/Employee/Register"
                  >
                    ثبت نام کارجویان
                  </Link>
                </div>
              </div>
            </form>
          </aside>
        </div>
      </section>
    );
  }
}
