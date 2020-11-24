import React, { Component } from "react";

export class ContentHeader extends Component {
  state = {
    OVisibility: false,
    SVisibility: false,
  };

  operationHandler = () => {
    this.state.OVisibility === false
      ? this.setState({ OVisibility: true, SVisibility: false })
      : this.setState({ OVisibility: false, SVisibility: false });
  };

  sortHandler = () => {
    this.state.SVisibility === false
      ? this.setState({ SVisibility: true, OVisibility: false })
      : this.setState({ SVisibility: false, OVisibility: false });
  };

  render() {
    return (
      <div className="bg-white srounded-md sp-2 sbs-shadow">
        <input
          className="form-control ir-r fs-s shadow-none srounded-sm smb-2"
          placeholder="جستجو در رزومه ها..."
        />

        <div className="d-flex align-items-center justify-content-between">
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle ir-r shadow-none fs-s"
              type="button"
              id="operations"
              onClick={this.operationHandler}
            >
              عملیات گروهی
            </button>
            <div
              style={{ left: "auto", right: 0 }}
              className={`dropdown-menu sp-1 sbs-shadow srounded-md border-0 ${
                this.state.OVisibility === true ? "d-block" : "d-none"
              }`}
            >
              <a className="dropdown-item ir-r fs-s p-0 smb-1" href="#">
                رد کردن رزومه های نتایج جستجو
              </a>
              <a className="dropdown-item ir-r fs-s p-0" href="#">
                خروجی اکسل
              </a>
            </div>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle ir-r shadow-none fs-s"
              type="button"
              id="operations"
              onClick={this.sortHandler}
            >
              مرتب سازی رزومه ها
            </button>
            <div
              className={`dropdown-menu sp-1 sbs-shadow srounded-md border-0 ${
                this.state.SVisibility === true ? "d-block" : "d-none"
              }`}
            >
              <a className="dropdown-item ir-r fs-s p-0 smb-1" href="#">
                زمان ارسال رزومه
              </a>
              <a className="dropdown-item ir-r fs-s p-0" href="#">
                پیشنهاد سیستم
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
