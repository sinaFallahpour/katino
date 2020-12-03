import React, { Component } from "react";
import { SideBar, Header, NotRequested } from "../../components/employeePanel";
import { PageTitle } from "../../components/PageTitle";
import * as service from "../../components/employeePanel";
import { toast } from "react-toastify";

import agent from "../../core/agent";
export class EmployeeDashboard extends Component {
  state = {
    currentPage: "Requests",

    visibility: {
      requests: true,
      bookmarks: false,
      recommanded: false,
    },

    selectdIds: [],
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

      default:
        this.setState({
          currentPage: "Recommanded",
          visibility: { requests: false, bookmarks: false, recommanded: true },
          pageTitle: pageTitle(currentPage),
        });
        break;

      // case "Recommanded":
      //   this.setState({
      //     currentPage: "Recommanded",
      //     visibility: { requests: false, bookmarks: false, recommanded: true },
      //     pageTitle: pageTitle(currentPage),
      //   });
      //   break;
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
      default:
      case "Recommanded":
        this.setState({
          currentPage: "Recommanded",
          visibility: { requests: false, bookmarks: false, recommanded: true },
          pageTitle: pageTitle("Recommanded"),
        });
        break;
    }
  };

  handleMarkOtherAdv = async (adverId) => {
    try {
      let currentAdver = this.state.markedAds.find((c) => c.id == adverId);
      if (currentAdver.isMarked) {
        // this.setState({ isMarked: false });

        this.setState({
          markedAds: this.state.markedAds.map((el) =>
            el.id === adverId ? Object.assign({}, el, { isMarked: false }) : el
          ),
        });
        const { data } = await agent.Adver.unmarkAdvder(adverId);
      } else {
        this.setState({
          markedAds: this.state.markedAds.map((el) =>
            el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
          ),
        });

        await agent.Adver.markAdvder(adverId);
      }
    } catch (ex) {
      this.setState({ isMarked: !this.state.isMarked });
      if (ex?.response?.data) {
        toast.error(ex.response?.data?.message[0]);
        this.setState({
          data: this.state.markedAds.map((el) =>
            el.id === adverId
              ? Object.assign({}, el, { isMarked: !el.isMarked })
              : el
          ),
        });
      }
    }
  };

  handleChangeSelecetdId = (adverId) => {
    if (this.state.selectdIds.includes(adverId)) {
      let selectdIds = this.state.selectdIds.filter((item) => item !== adverId);
      this.setState({ selectdIds });
    } else {
      let selectdIds = [...this.state.selectdIds, adverId];
      this.setState({ selectdIds });
    }
  };

  handleAsignResomeToListOfAdvers = async () => {
    try {
      if (this.state?.selectdIds?.length == 0) return;
      // return params;
      let { data } = await agent.Adver.asignResomeToListOfAdvers(
        this.state.selectdIds
      );

      if (data?.message) toast.success(data.message[0]);

      // toast.success("رزومه با موفقیت ارسال شد");
    } catch (err) {

      if (err.response.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else toast.error(err.response.data.message[0]);
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
                  selectdIds={this.state.selectdIds}
                  handleAsignResomeToListOfAdvers={
                    this.handleAsignResomeToListOfAdvers
                  }
                />
              </div>

              <div className="smb-2">
                <div className="bg-white srounded-md sp-2">
                  <div className="row">
                    <div className="col-12 col-lg-4 smb-2 mb-lg-0">
                      <span
                        onClick={this.tabsHandler}
                        className={`btn ir-r d-block w-100 ${this.state.currentPage==="Requests"?"c-primary":""}`}
                        name="Requests"
                      >
                        درخواست های من
                      </span>
                    </div>

                    <div className="col-12 col-lg-4 smb-2 mb-lg-0">
                      <span
                        onClick={this.tabsHandler}
                        className={`btn ir-r d-block w-100 ${this.state.currentPage==="Bookmarks"?"c-primary":""}`}
                        name="Bookmarks"
                      >
                        آگهی های نشان شده
                      </span>
                    </div>

                    <div className="col-12 col-lg-4 mb-0">
                      <span
                        onClick={this.tabsHandler}
                        className={`btn ir-r d-block w-100 ${this.state.currentPage==="Recommanded"?"c-primary":""}`}
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
                <NotRequested
                  items={this.state.markedAds}
                  handleMarkOtherAdv={this.handleMarkOtherAdv}
                  selectdIds={this.state.selectdIds}
                  handleChangeSelecetdId={this.handleChangeSelecetdId}
                />
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
    default:
      return "آگهی های پیشنهادی";

    // case "Recommanded":
    //   return "آگهی های پیشنهادی";
  }
}
