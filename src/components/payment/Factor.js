import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import API_ADDRESS from "../../API_ADDRESS";
import { numberSeparator } from "../../common";

export class Factor extends Component {
  state = {
    errMessage: "",
    id: 0,
    modalStatus: false,
    discount: "",
    giftCode: 0,
    giftDiscount: 0,
  };

  componentDidMount = () => {
    this.setState({ id: this.props.id });
  };

  modalHandler = {
    isOpen: () => this.setState({ modalStatus: true }),
    isClose: () => this.setState({ modalStatus: false }),
  };

  changeHandler = (event) => {
    const formData = { [event.target.name]: event.target.value };
    this.setState({ ...this.state, ...formData });
  };

  discountSubmiter = (event) => {
    event.preventDefault();
    axios
      .get(API_ADDRESS + `/CheckGiftCart?giftCode=${this.state.giftCode}`, {
        headers: {
          authorization: `bearer ${window.localStorage.getItem("JWT")}`,
        },
      })
      .then((res) =>
        this.setState({
          ...this.state,
          giftDiscount: res.data.resul.giftDiscount / 100,
          modalStatus: false,
        })
      );
  };

  paymentSubmiter = (event) => {
    event.preventDefault();

    axios
      .post(
        API_ADDRESS +
          `payment/TestPaymentPlan?planId=${this.props.id}${
            this.state.giftCode !== 0
              ? `&giftCartId=${this.state.giftCode}`
              : ""
          }`,
        {},
        {
          headers: {
            authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => {
        this.props.prop.history.push({
          pathname: "/Employer/SuccessPayment",
          search: "",
          state: { message: res.data.message[1] },
        });

        // let htmlPage = res.data;
        // let htmlElement = document.createElement("html");
        // let innerHtml = htmlPage
        //   .replace("<html>", "")
        //   .replace("</html>", "")
        //   .trim();
        // htmlElement.innerHTML = innerHtml;
        // document.documentElement.replaceWith(htmlElement);
        // document.getElementById("paymentForm").submit();
      })
      .catch((err) =>
        this.setState({ errMessage: err.response.data.message[0] })
      );
  };

  render() {
    return (
      <React.Fragment>
        {/* Factor */}
        <div className="payment-factor">
          <header className="f-header d-flex justify-content-between align-items-">
            <span className="fs-m ir-b c-dark">بررسی و پرداخت صورت حساب</span>
            <Link
              className="c-dark ir-r text-decoration-none"
              to="/Employer/Dashboard/Plans"
            >
              بازگشت
              <i className="fas fa-angle-left smr-1"></i>
            </Link>
          </header>

          <form onSubmit={this.paymentSubmiter} className="w-100">
            <div className="f-item d-lg-flex justify-content-lg-between align-items-lg-center sp-1 smt-2">
              <div className="f-field ir-r spy-1">مبلغ سفارش:</div>
              <div className="f-field ir-r spy-1">
                {this.props?.price !== undefined
                  ? `${numberSeparator(
                      this.props?.price * (1 - this.state.giftDiscount)
                    )} تومان`
                  : "در حال بار گذاری..."}
              </div>
            </div>

            <div className="f-item d-lg-flex justify-content-lg-between align-items-lg-center sp-1">
              <div className="f-field ir-r spy-1">تخفیف:</div>
              <div className="f-field ir-r spy-1">
                <span className="c-danger">
                  {this.props?.price !== undefined
                    ? `${numberSeparator(
                        this.props.price * this.state.giftDiscount
                      )} تومان`
                    : "در حال بار گذاری..."}
                  <button
                    onClick={this.modalHandler.isOpen}
                    type="button"
                    className="btn shadow-none p-0 c-primary smr-1 text-decoration-none"
                  >
                    {` کد تخفیف دارید؟ `}
                  </button>
                </span>
              </div>
            </div>

            <div className="f-item d-lg-flex justify-content-lg-between align-items-lg-center sp-1">
              <div className="f-field ir-r spy-1">مالیات بر ارزش افزوده:</div>
              <div className="f-field ir-r spy-1">
                {this.props?.price !== undefined
                  ? `${numberSeparator(
                      this.props?.price * (1 - this.state.giftDiscount) * 0.09
                    )} تومان `
                  : "در حال بار گذاری..."}
              </div>
            </div>

            <div className="f-item d-lg-flex justify-content-lg-between align-items-lg-center sp-1">
              <div className="f-field ir-r spy-1">مبلغ قابل پرداخت:</div>
              <div className="f-field ir-r spy-1 c-success">
                {this.props?.price !== undefined
                  ? `${numberSeparator(
                      Math.floor(
                        this.props?.price * (1 - this.state.giftDiscount) * 1.09
                      )
                    )} تومان `
                  : "در حال بار گذاری..."}
              </div>
            </div>

            <button
              onSubmit={this.paymentSubmiter}
              type="submit"
              className="btn btn-success ir-r spx-3 d-flex mx-auto"
            >
              اتصال به درگاه پرداخت
            </button>

            <span className="d-block text-center c-danger ir-r smt-3">
              {this.state.errMessage}
            </span>
          </form>
        </div>
        {/* Discount Modal */}
        <div
          className={`p-discount-modal d-flex justify-content-center align-items-center ${
            this.state.modalStatus === true ? "active" : ""
          }`}
        >
          <div className="overlay" onClick={this.modalHandler.isClose}></div>

          <div className="content bg-white sbs-content srounded-md spy-5 spx-2 d-flex flex-column justify-content-center">
            <form onSubmit={this.discountSubmiter} className="w-100">
              <div className="input-group smb-2">
                <span className="d-block w-100 text-center ir-r c-dark smb-1">
                  لطفا کد تخفیف خود را وارد کنید:
                </span>
                <input
                  onChange={this.changeHandler}
                  name="giftCode"
                  type="text"
                  className="form-control ir-r srounded-sm shadow-none"
                />
              </div>

              <div className="buttons d-flex justify-content-center align-items-center">
                <button
                  onClick={this.modalHandler.isClose}
                  type="button"
                  className="btn ir-r shadow-none p-0 sml-2"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  className="btn ir-r shadow-none btn-success"
                >
                  ثبت
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
