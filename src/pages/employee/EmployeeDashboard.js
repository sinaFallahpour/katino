import React, { Component } from "react";
import { SideBar, Header, NotRequested } from "../../components/employeePanel";
import { MyRequest } from "./MyRequest";
import { MySuggestAdvers } from "./MySuggestAdvers";
import { PageTitle } from "../../components/PageTitle";
import * as service from "../../components/employeePanel";
import { toast } from "react-toastify";
import agent from "../../core/agent";
import style from "./Checkbox.module.css";
import "./EmployeeDashboard.css";

class EmployeeDashboard extends Component {
  state = {
    currentPage: "Requests",
    resomeAsignForEmployee: [],

    visibility: {
      requests: true,
      bookmarks: false,
      recommanded: false,
    },

    selectdIds: [],
    pageTitle: "",

    markedAds: [],
    markedAdsStatus: false,
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

    await this.getResomePercent();
    await this.getResomeAsignForEmployee();

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

  handleMarkAllOtherAdv = () => {
    if (this.state.markedAdsStatus) {
      this.setState({ markedAdsStatus: false });
      this.setState({ selectdIds: [] });
    } else {
      this.setState({ markedAdsStatus: true });
      let selectdIds = [...this.state.markedAds.map(({ id }) => id)];
      console.log(selectdIds);
      this.setState({ selectdIds });
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

  getResomePercent = async () => {
    // event.preventDefault();

    try {
      // return params;
      let { data } = await agent.CreateResome.GetResomePercent();
      this.setState({ resomePercent: data.resul });
      // toast.success("رزومه با موفقیت ارسال شد");
    } catch (err) {
      if (err.response.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else toast.error(err.response.message[0]);
    }
  };

  getResomeAsignForEmployee = async () => {
    try {
      let { data } = await agent.CreateResome.GetResomeAsignForEmployee();
      this.setState({ resomeAsignForEmployee: data.resul });
    } catch (err) {
      if (err.response.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else toast.error(err.response.message[0]);
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
              <div classNamde="smb-2">
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
                <div className="bg-white srounded-md force-border">
                  <div className="row">
                    <div className="col-12 col-lg-4 smb-2 mb-lg-0">
                      <span
                        onClick={this.tabsHandler}
                        className={`btn ir-r d-block w-100 tabs-option ${
                          this.state.currentPage === "Requests"
                            ? "c-primary selected-option"
                            : ""
                        }`}
                        name="Requests"
                      >
                        درخواست های من
                      </span>
                    </div>

                    <div className="col-12 col-lg-4 smb-2 mb-lg-0">
                      <span
                        onClick={this.tabsHandler}
                        className={`btn ir-r d-block w-100 tabs-option ${
                          this.state.currentPage === "Bookmarks"
                            ? "c-primary selected-option"
                            : ""
                        }`}
                        name="Bookmarks"
                      >
                        آگهی های نشان شده
                      </span>
                    </div>

                    <div className="col-12 col-lg-4 mb-0">
                      <span
                        onClick={this.tabsHandler}
                        className={`btn ir-r d-block w-100 tabs-option ${
                          this.state.currentPage === "Recommanded"
                            ? "c-primary selected-option"
                            : ""
                        }`}
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
                <MyRequest
                  resomeAsignForEmployee={this.state.resomeAsignForEmployee}
                />
              </div>

              <div
                className={
                  this.state.visibility.bookmarks === true
                    ? "d-block BookMarkContainer"
                    : "d-none"
                }
              >
                <span className={style.Ads2Checkbox}>
                  <input
                    id="bookMarkSelection"
                    type="radio"
                    onClick={() => {
                      this.handleMarkAllOtherAdv();
                    }}
                    className={`${style.optionInput} ${style.radio}`}
                    checked={this.state.markedAdsStatus}
                  />
                  <label htmlFor="bookMarkSelection">انتخاب همه</label>
                </span>
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
                <MySuggestAdvers
                  selectdIds={this.state.selectdIds}
                  handleChangeSelecetdId={this.handleChangeSelecetdId}
                />
              </div>
            </aside>

            <aside className="col-12 col-lg-3 mb-0">
              <SideBar resomePercent={this.state.resomePercent} />
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
  }
}

export { EmployeeDashboard };
