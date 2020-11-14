import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserAds } from "../../components/employerPanel";
import * as service from "../../components/employerPanel";

export class Dashboard extends Component {
  state = { userAds: [] };

  componentDidMount = async () => {
    await service
      .getUserAds()
      .then((res) => this.setState({ userAds: res.data.resul }));
  };

  render() {
    return (
      <section className="dash-employer container-fluid spx-2 smt-10 spx-lg-10">
        <div className="row">
          <div className="bg-white srounded-md sshadow w-100 sp-2">
            <nav className="navbar navbar-expand-lg pr-0 py-0">
              <div>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item smr-lg-4">
                    <Link
                      className="nav-link position-relative c-main ir-r fs-m p-0 smb-1 mb-lg-0 active"
                      to="/Employer/Dashboard"
                    >
                      همه آگهی ها
                    </Link>
                  </li>

                  <li className="nav-item smr-lg-4">
                    <Link
                      className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0"
                      to="/Employer/Dashboard"
                    >
                      آگهی های فعال
                    </Link>
                  </li>

                  <li className="nav-item smr-lg-4">
                    <Link
                      className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0 active"
                      to="/Employer/Dashboard"
                    >
                      پیش نویس
                    </Link>
                  </li>

                  <li className="nav-item smr-lg-4">
                    <Link
                      className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0"
                      to="/Employer/Dashboard"
                    >
                      بسته شده
                    </Link>
                  </li>
                  <li className="nav-item smr-lg-4">
                    <Link
                      className="nav-link position-relative c-grey ir-r fs-m p-0 mb-0"
                      to="/Employer/Dashboard"
                    >
                      آرشیو شده
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="row smt-3">
          <div className="bg-white srounded-md sshadow sp-2 w-100">
            <div className="col-12">
              <div className="form-group">
                <input
                  className="ir-r form-control srounded-sm shadow-none"
                  placeholder="جستجو در آگهی ها"
                />
              </div>
            </div>

            <hr className="smy-2" />

            <UserAds ads={this.state.userAds} />
          </div>
        </div>
      </section>
    );
  }
}
