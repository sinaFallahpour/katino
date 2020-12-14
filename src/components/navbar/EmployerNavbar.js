import React, { Component } from "react"
import { Link } from "react-router-dom"
import API_ADDRESS from "../../API_ADDRESS"
import ADDRESS from "../../ADDRESS"
import axios from "axios"

export class EmployerNavbar extends Component {
  state = {
    userInfo: {
      name: "",
      img: "",
    },

    profileDropdown: false,
    profileActivity: "",

    notifDropdown: false,
    notifActivity: "",
    notifCount: 0,
    notifs: [],
    notifIds: [],
  }

  async componentDidMount() {
    await axios
      .get(API_ADDRESS + "Adver/GetAdverNotificationForUser", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("JWT")}`,
        },
      })
      .then((res) => {
        let ids = []

        res.data.resul.advernotifs.map((item) => ids.push(item.id))
        this.setState({
          notifCount: res.data.resul.notificationCount,
          notifs: res.data.resul.advernotifs,
          notifIds: ids,
        })
      })

    axios
      .get(API_ADDRESS + "Account/GetEmployerInfo", {
        headers: { Authorization: `bearer ${localStorage.getItem("JWT")}` },
      })
      .then((res) =>
        this.setState({
          userInfo: {
            name: res.data.resul.fullName,
            img: res.data.resul.image,
          },
        })
      )
  }

  profileDropdown = () => {
    if (this.state.profileDropdown === false) {
      this.setState({
        ...this.state,
        profileDropdown: true,
        notifDropdown: false,
        profileActivity: "active",
        notifActivity: "",
      })
    } else {
      this.setState({
        ...this.state,
        profileDropdown: false,
        profileActivity: "",
      })
    }
  }

  notifDropdown = () => {
    if (this.state.notifDropdown === false) {
      this.setState({
        ...this.state,
        notifDropdown: true,
        profileDropdown: false,
        notifActivity: "active",
        profileActivity: "",
        notifCount: 0,
      })

      axios.post(
        API_ADDRESS + "Adver/SeenAdverNotification",
        this.state.notifIds,
        { headers: { Authorization: `bearer ${localStorage.getItem("JWT")}` } }
      )
    } else {
      this.setState({
        ...this.state,
        notifDropdown: false,
        notifActivity: "",
      })
    }
  }

  logout = async () => {
    await window.localStorage.clear()
    window.location.href = "/"
  }

  render() {
    return (
      <header className="g-header dash-nav bg-logo fixed-top w-100 d-flex justify-content-between align-items-center spx-2 spx-lg-10 navbar-shadow">
        {/* Links */}
        <nav className="navbar navbar-expand-lg pr-0 py-0">
          <Link className="navbar-brand p-0 m-0" to="/Employer/Dashboard">
            <img
              className="d-none d-lg-block"
              src="/img/logo-white.png"
              height="40"
              alt="کاتینو"
              loading="lazy"
            />

            <img
              className="d-block d-lg-none"
              src="/img/logo-white-short.png"
              height="40"
              alt="کاتینو"
              loading="lazy"
            />
          </Link>

          <div
            className="collapse navbar-collapse d-none d-lg-block"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item smr-lg-4">
                <Link
                  className="nav-link text-white position-relative ir-r fs-m p-0"
                  to="/Employer/Dashboard"
                >
                  داشبورد
                </Link>
              </li>

              <li className="nav-item smr-lg-4">
                <Link
                  className="nav-link text-white position-relative ir-r fs-m p-0 active"
                  to="/Employer/Dashboard"
                >
                  آگهی ها
                </Link>
              </li>
              <li className="nav-item smr-lg-4">
                <Link
                  className="nav-link text-white position-relative ir-r fs-m p-0"
                  to="/Employer/Dashboard"
                >
                  پروفایل شرکت
                </Link>
              </li>

              <li className="nav-item smr-lg-4">
                <Link
                  className="nav-link text-white position-relative ir-r fs-m p-0"
                  to="/Employer/Dashboard/Plans"
                >
                  خرید اشتراک و امور مالی
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="buttons d-flex justify-content-start align-items-center">
          <Link
            className="btn btn-warning ir-r text-white srounded-md text-decoration-none d-none d-lg-flex justify-content-center align-items-center sml-2"
            to="/Employer/CreateAd"
          >
            درج آگهی جدید
            {/* <i className="fas fa-plus text-white"></i> */}
          </Link>

          <div className="notification sml-2 position-relative">
            <div className="head" onClick={this.notifDropdown}>
              <i className="far fa-bell icon text-white"></i>
              {this.state.notifCount === 0 ? (
                ""
              ) : (
                <span className="counter rounded-circle text-center ir-r bg-danger text-white position-absolute">
                  {this.state.notifCount}
                </span>
              )}
            </div>

            <div
              className={`notifs-dropdown bg-white position-absolute shadow ${this.state.notifActivity}`}
            >
              <ul className="m-0">
                {this.state.notifs.map((item, index) =>
                  index === 0 ? (
                    <li key={index} className=" text-right c-grey spy-1 fs-s">
                      <span className="ir-b">{`آگهی ${item.title}: `}</span>
                      <span className="ir-r">{item.adminDescription}</span>
                    </li>
                  ) : (
                    <li
                      key={index}
                      className="ir-r text-right c-grey spy-1 fs-s border-top"
                    >
                      {item.adminDescription}
                    </li>
                  )
                )}

                <li>
                  <Link
                    className="btn btn-primary-light ir-r d-block w-100"
                    to="/Employer/Notifications"
                  >
                    مشاهده ی اطلاعیه ها
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="user bg-white srounded-md sp-1 position-relative"
            onClick={this.profileDropdown}
          >
            <div className="head">
              <img
                height="36"
                alt=""
                className="sml-1 srounded-sm"
                src={`${ADDRESS}img/CompanyLogo/${this.state.userInfo.img}`}
              />

              <span className="ir-r fs-s sml-1 d-none d-lg-inline">
                {this.state.userInfo.name}
              </span>
              <i className="fas fa-chevron-down text-white sp-1 bg-logo srounded-md"></i>
            </div>

            <div
              className={`profile-dropdown bg-white position-absolute shadow ${this.state.profileActivity}`}
            >
              <ul className="m-0">
                <li className="smb-1">
                  <Link
                    className="ir-r c-grey text-decoration-none"
                    to="/Employer/CreateAd"
                  >
                    ایجاد آگهی استخدام
                  </Link>
                </li>
                <li className="smb-1">
                  <Link
                    className="ir-r c-grey text-decoration-none"
                    to="/Employer/Dashboard/Plans"
                  >
                    خرید پنل
                  </Link>
                </li>
                <li className="smb-1">
                  <Link
                    className="ir-r c-grey text-decoration-none"
                    to="/Employer/Dashboard"
                  >
                    آگهی های استخدام
                  </Link>
                </li>
                <li className="smb-1">
                  <Link
                    className="ir-r c-grey text-decoration-none"
                    to="/Employer/EditProfile"
                  >
                    ویرایش اطلاعات شرکت
                  </Link>
                </li>
                <li className="smb-1">
                  <Link
                    className="ir-r c-grey text-decoration-none"
                    to="/Employer/Dashboard"
                  >
                    تاریخچه حساب
                  </Link>
                </li>
                <li className="smb-1">
                  <Link
                    className="ir-r c-grey text-decoration-none"
                    to="/Tickets"
                  >
                    تیکت های پشتیبانی
                  </Link>
                </li>
                <li className="smb-1">
                  <Link
                    className="ir-r c-grey text-decoration-none"
                    to="/Employer/Dashboard"
                  >
                    تنظیمات حساب کاربری
                  </Link>
                </li>

                <li className="smb-1">
                  <Link
                    className="ir-r c-grey text-decoration-none"
                    to="/Employer/Dashboard"
                  >
                    مدیریت اطلاع رسانی ها
                  </Link>
                </li>
                <li className="mb-0">
                  <button
                    type="button"
                    className="ir-r btn c-danger p-0 text-decoration-none shadow-none"
                    onClick={this.logout}
                  >
                    خروج از حساب
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
