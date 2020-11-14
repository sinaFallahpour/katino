import React, { Component } from "react";
import { SideBar, Header, NotRequested } from "../../components/employeePanel";
import { PageTitle } from "../../components/PageTitle";
import * as service from "../../components/employeePanel";

export class EmployeeDashboard extends Component {
  state = {
    currentPage: "Requests",

    visibility: {
      requests: true,
      bookmarks: false,
      recommanded: false,
    },

    pageTitle: "",

    markedAds: [],
  };

  componentDidMount = async () => {
    const currentPage = this.props.match.params.page;

    switch (currentPage) {
      case "Requests":
        this.setState({
          currentPage: "Requests",
          visibility: { requests: true, bookmarks: false, recommanded: false },
          pageTitle: pageTitle(currentPage),
        });
        break;

      case "Bookmarks":
        this.setState({
          currentPage: "Bookmarks",
          visibility: { requests: false, bookmarks: true, recommanded: false },
          pageTitle: pageTitle(currentPage),
        });
        break;

      case "Recommanded":
        this.setState({
          currentPage: "Recommanded",
          visibility: { requests: false, bookmarks: false, recommanded: true },
          pageTitle: pageTitle(currentPage),
        });
        break;
    }

    service
      .getMarkedAds(1, 5)
      .then((res) => this.setState({ markedAds: res.data }));
  };

  tabsHandler = (event) => {
    switch (event.target.getAttribute("name")) {
      case "Requests":
        this.setState({
          currentPage: "Requests",
          visibility: { requests: true, bookmarks: false, recommanded: false },
          pageTitle: pageTitle("Requests"),
        });
        break;

      case "Bookmarks":
        this.setState({
          currentPage: "Bookmarks",
          visibility: { requests: false, bookmarks: true, recommanded: false },
          pageTitle: pageTitle("Bookmarks"),
        });
        break;

      case "Recommanded":
        this.setState({
          currentPage: "Recommanded",
          visibility: { requests: false, bookmarks: false, recommanded: true },
          pageTitle: pageTitle("Recommanded"),
        });
        break;
    }
  };

  render() {
    return (
      <PageTitle
        title={this.state.pageTitle ? this.state.pageTitle : "داشبورد"}
      >
        <section className="employee-dashboard spx-2 spx-lg-10 container-fluid smt-10 spt-3">
          <div className="row">
            <aside className="col-12 col-lg-9 smb-2 mb-lg-0">
              <div className="smb-2">
                <Header
                  title={this.state.pageTitle}
                  type={this.state.currentPage}
                />
              </div>

              <div className="smb-2">
                <div className="bg-white srounded-md sp-2">
                  <div className="row">
                    <div className="col-12 col-lg-4 smb-2 mb-lg-0">
                      <span
                        onClick={this.tabsHandler}
                        className="btn ir-r d-block w-100"
                        name="Requests"
                      >
                        درخواست های من
                      </span>
                    </div>

                    <div className="col-12 col-lg-4 smb-2 mb-lg-0">
                      <span
                        onClick={this.tabsHandler}
                        className="btn ir-r d-block w-100"
                        name="Bookmarks"
                      >
                        آگهی های نشان شده
                      </span>
                    </div>

                    <div className="col-12 col-lg-4 mb-0">
                      <span
                        onClick={this.tabsHandler}
                        className="btn ir-r d-block w-100"
                        name="Recommanded"
                      >
                        آگهی های پیشنهادی
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requests */}
              <div
                className={
                  this.state.visibility.requests === true ? "d-block" : "d-none"
                }
              >
                Requests
              </div>

              <div
                className={
                  this.state.visibility.bookmarks === true
                    ? "d-block"
                    : "d-none"
                }
              >
                <NotRequested items={this.state.markedAds} />
              </div>

              <div
                className={
                  this.state.visibility.recommanded === true
                    ? "d-block"
                    : "d-none"
                }
              >
                Recommanded
              </div>
            </aside>

            <aside className="col-12 col-lg-3 mb-0">
              <SideBar />
            </aside>
          </div>
        </section>
      </PageTitle>
    );
  }
}

function pageTitle(page) {
  switch (page) {
    case "Requests":
      return "درخواست‌های من";
    case "Bookmarks":
      return "آگهی های نشان شده";
    case "Recommanded":
      return "آگهی های پیشنهادی";
  }
}
