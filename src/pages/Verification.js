import React, { Component } from "react";
import { Input } from "../components";
import API_ADDRESS from "../API_ADDRESS";
import axios from "axios";
import Timer from "react-compound-timer";
import validator from "validator";
import auth from "../core/authService";
import { Redirect } from "react-router-dom";
export class Verification extends Component {
  state = {
    verification: {
      phoneNumber: "",
      verifyCode: "",
      timer: 120000,
      refresh: false,
      reset: false,
    },

    error: "",
  };

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);

    const phoneNumber = params.get("phoneNumber");
    this.setState({
      verification: { ...this.state.verification, phoneNumber: phoneNumber },
    });
  }

  changeHandler(event) {
    const formData = { [event.target.name]: event.target.value };
    this.setState({
      verification: { ...this.state.verification, ...formData },
    });
  }

  submitHandler(event) {
    event.preventDefault();

    if (this.formIsValid()) {
      let code = parseInt(this.state.verification.verifyCode);
      this.setState({
        verification: { ...this.state.verification, verifyCode: code },
      });

      axios
        .post(API_ADDRESS + "Account/VerifyCode", {
          phoneNumber: this.state.verification.phoneNumber,
          verifyCode: this.state.verification.verifyCode,
        })
        .then((res) => {
          const url = window.location.href;
          const token = res.data.resul.token;
          localStorage.setItem("JWT", token);

          if (!(url.search("/Employee/") === -1)) {
            localStorage.setItem("userInfo", "Employee");
            this.props.props.history.push("/Employee/Jobs");
          } else if (!(url.search("/Employer/Login") === -1)) {
            localStorage.setItem("userInfo", "Employer");
            this.props.props.history.push("/Employer/Dashboard/");
          } else if (!(url.search("/Employer/Register") === -1)) {
            localStorage.setItem("userInfo", "Employer");

            this.props.props.history.push(
              `/Employer/CompleteProfile?phoneNumber=${this.state.verification.phoneNumber}`
            );
          }
        })
        .catch((err) => {
          this.setState({ ...this.state, error: err.response.data.message[0] });
        });
    }
  }

  formIsValid() {
    let error = "";

    let empty = validator.isEmpty(this.state.verification.verifyCode);

    if (empty) error = "لطفا کد اعتبارسنجی را وارد کنید.";

    this.setState({ ...this.state, error: error });

    return !error;
  }

  resendCode = async () => {
    await axios.post(API_ADDRESS + "Account/Login", {
      phoneNumber: this.state.verification.phoneNumber,
    });

    await this.setState({
      verification: { ...this.state.verification, refresh: false },
    });

    await setTimeout(() => {
      this.setState({
        verification: {
          ...this.state.verification,
          refresh: true,
          timeToUpdate: 0,
          reset: true,
        },
      });
    }, 120000);
  };

  render() {
    if (auth.getCurrentUser()) {
      return <Redirect to="/" />;
    }

    setTimeout(() => {
      this.setState({
        verification: {
          ...this.state.verification,
          refresh: true,
          timer: 120000,
        },
      });
    }, 120000);

    return (
      <section className="container-fluid spx-2 spx-lg-10 smy-10 spt-10">
        <div className="row">
          <aside className="col-12 col-lg-5 mx-auto">
            <form className="w-100" onSubmit={this.submitHandler.bind(this)}>
              <div className="bg-white srounded-md sp-2 smb-2">
                <h1 className="fs-l c-dark d-block text-center smb-5 ir-bl">
                  تایید کد اعتبارسنجی
                </h1>

                <Input
                  onChange={this.changeHandler.bind(this)}
                  placeholder="کد 6 رقمی"
                  label="کد اعتبارسنجی خود را وارد کنید"
                  type="verification"
                  id="verifyCode"
                  name="verifyCode"
                />

                <span className="d-block c-danger fs-s ir-r">
                  {this.state.error}
                </span>

                <div className="d-flex justify-content-between align-items-center smy-2 refresh-code ir-r">
                  {this.state.verification.refresh === true ? (
                    <button
                      id="refreshBtn"
                      onClick={this.resendCode}
                      className="btn px-0 shadow-none ir-r"
                    >
                      ارسال دوباره
                    </button>
                  ) : (
                    <button
                      id="refreshBtn"
                      disabled
                      onClick={this.resendCode}
                      className="btn px-0 shadow-none ir-r"
                    >
                      ارسال دوباره
                    </button>
                  )}

                  {this.state.verification.refresh === false ? (
                    <Timer
                      direction="backward"
                      initialTime={this.state.verification.timer}
                      reset={this.state.verification.reset}
                      checkpoints={[
                        {
                          time: 0,
                          callback: () =>
                            this.setState({
                              verification: {
                                ...this.state.verification,
                                refresh: true,
                              },
                            }),
                        },
                      ]}
                    >
                      <Timer.Minutes />
                      :
                      <Timer.Seconds />
                    </Timer>
                  ) : (
                    ""
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-success ir-r d-block mx-auto"
                >
                  تایید
                </button>
              </div>
            </form>
          </aside>
        </div>
      </section>
    );
  }
}
