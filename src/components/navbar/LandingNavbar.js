import React from "react";
import { Link } from "react-router-dom";
import auth from "../../core/authService";
import ADDRESS from "../../ADDRESS";

export class LandingNavbar extends React.Component {
  state = {
    profileDropdown: false,
    profileActivity: "",

    notifDropdown: false,
    notifActivity: "",
    notifCount: 10,
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  profileDropdown = () => {
    if (this.state.profileDropdown === false) {
      this.setState({
        ...this.state,
        profileDropdown: true,
        notifDropdown: false,
        profileActivity: "active",
        notifActivity: "",
      });
    } else {
      this.setState({
        ...this.state,
        profileDropdown: false,
        profileActivity: "",
      });
    }
  };

  notifDropdown = () => {
    if (this.state.notifDropdown === false) {
      this.setState({
        ...this.state,
        notifDropdown: true,
        profileDropdown: false,
        notifActivity: "active",
        profileActivity: "",
        notifCount: 0,
      });
    } else {
      this.setState({
        ...this.state,
        notifDropdown: false,
        notifActivity: "",
      });
    }
  };

  logout = async () => {
    await window.localStorage.clear();
    window.location.href = "/";
  };

  render() {
    return (
      <header className="g-header dash-nav employee-nav fixed-top w-100 d-flex justify-content-between align-items-center spx-2 spx-xl-10 bg-white navbar-shadow">
        {/* Links */}
        <nav className="navbar navbar-expand-lg navbar-light pr-0 py-0">
          <Link className="navbar-brand p-0 m-0" to="/">
            <img
              src={
                this.props.Logo && `${ADDRESS}img/setting/${this.props.Logo}`
              }
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
              <li className="nav-item smr-lg-1 smr-xl-4">
                <Link
                  className="nav-link text-center position-relative ir-r fs-s p-0"
                  to="/"
                >
                  خانه
                </Link>
              </li>
              <li className="nav-item smr-lg-1 smr-xl-4">
                <Link
                  className="text-center nav-link position-relative ir-r fs-s p-0"
                  to="/Jobs"
                >
                  جستجوی مشاغل
                </Link>
              </li>

              <li className="nav-item smr-lg-1 smr-xl-4">
                <Link
                  className="nav-link text-center position-relative ir-r fs-s p-0"
                  to="/Employee/CreateResume"
                >
                  رزومه ساز
                </Link>
              </li>

              <li className="nav-item smr-lg-1 smr-xl-4">
                <Link
                  className="nav-link text-center position-relative ir-r fs-s p-0"
                  to="/BestCompanies"
                >
                  شرکت های برتر
                </Link>
              </li>

              <li className="nav-item smr-lg-1 smr-xl-4">
                <Link
                  className="nav-link text-center position-relative ir-r fs-s p-0"
                  to="/Employers"
                >
                  بخش کارفرمایان
                </Link>
              </li>

              <li className="nav-item smr-lg-1 smr-xl-4">
                <Link
                  className="nav-link text-center position-relative ir-r fs-s p-0"
                  to="/Blog"
                >
                  وبلاگ
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Buttons */}

        {!auth.getCurrentUser() ? (
          <div className="buttons d-flex justify-content-start">
            <Link
              className="btn btn-warning ir-r d-none d-lg-block sml-1"
              to="/Employers"
            >
              <i className="fas fa-briefcase sml-1"></i>
              ثبت آگهی استخدام
            </Link>

            <Link className="btn btn-primary ir-r" to="/Employee/Login/">
              <i className="fas fa-user sml-1"></i>
              ورود/ثبت نام
            </Link>
          </div>
        ) : (
          <div className="buttons d-flex justify-content-start align-items-center">
            <div
              className="user bg-primary srounded-md sp-1 position-relative"
              onClick={this.profileDropdown}
            >
              <div className="head">
                <span className="ir-r fs-s sml-1 text-white d-none d-lg-inline">
                  پروفایل
                </span>
                <i className="fas fa-chevron-down text-white srounded-md"></i>
              </div>

              <div
                className={`profile-dropdown bg-white position-absolute shadow ${this.state.profileActivity}`}
              >
                <ul className="m-0">
                  <li className="smb-1">
                    <Link
                      className="ir-r c-grey text-decoration-none"
                      to="/Employee/Dashboard/Requests"
                    >
                      درخواست های من
                    </Link>
                  </li>

                  <li className="smb-1">
                    <Link
                      className="ir-r c-grey text-decoration-none"
                      to="/Employee/plans"
                    >
                      خرید پلن
                    </Link>
                  </li>

                  <li className="smb-1">
                    <Link
                      className="ir-r c-grey text-decoration-none"
                      to="/Employee/Dashboard/Bookmarks"
                    >
                      آگهی های نشان شده
                    </Link>
                  </li>

                  <li className="smb-1">
                    <Link
                      className="ir-r c-grey text-decoration-none"
                      to="/Employee/Home"
                    >
                      ایمیل های اطلاع رسانی
                    </Link>
                  </li>

                  <li className="smb-1">
                    <Link
                      className="ir-r c-grey text-decoration-none"
                      to="/Employee/CreateResume"
                    >
                      رزومه ساز
                    </Link>
                  </li>

                  <li className="smb-1">
                    <Link
                      className="ir-r c-grey text-decoration-none"
                      to="/Employee/Home"
                    >
                      مشاهده رزومه
                    </Link>
                  </li>

                  <li className="smb-1">
                    <Link
                      className="ir-r c-grey text-decoration-none"
                      to="/Employee/Home"
                    >
                      تنظیمات حساب کاربری
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
        )}
      </header>
    );
  }
}
