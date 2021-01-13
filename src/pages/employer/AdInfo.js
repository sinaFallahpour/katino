import React, { Component } from "react";
import { PageTitle } from "../../components/PageTitle";
import {
  Content,
  Header,
  SideBar,
} from "../../components/employerPanel/adInfo";
import * as service from "../../components/employerPanel";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import agent from "../../core/agent";

export class AdInfo extends Component {
  state = {
    currentItem: {},
    sideBarInfo: {},
    resumes: [],
    adverId: null,
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    this.setState({ adverId: id });
    await service
      .getUserAds()
      .then((res) =>
        this.setState({ currentItem: res.data.resul.find((item) => item.id) })
      );
    await service.sidebar(id).then((res) => {
      this.setState({ sideBarInfo: res.data.resul });
    });
    await service
      .getAdverResumes(id)
      .then((res) => this.setState({ resumes: res.data.resul }));
  }
  SubmitFilter = async (event, comment) => {
    event.preventDefault();
    try {
      let obj = {
        comment: comment,
        asignId: this.state.currentResume?.asignResomeId,
      };
      let { data } = await agent.RequestDetails.AddCommentForAsignResome(obj);
      this.setState({ YadDashts: comment });
      toast.success("ثبت موفقیت آمیز");
    } catch (err) {
      if (err.response.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else {
        for (let index = 0; index < err.response.data.message.length; index++) {
          toast.error(err.response.data.message[index]);
        }
      }
    }
  };
  startSearch = async (obj) => {
    this.returnLoading("صبر کنید...");
    try {
      let { data } = await agent.RequestDetails.FilterAllResomesInfoForAdver(
        obj
      );
      this.setState({ resumes: data.resul });
    } catch (err) {
      if (err.response.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else if (err.response.status === 400) {
        if (err.response.data.resul == null) this.setState({ resumes: [] });
      } else {
        for (let index = 0; index < err.response.data.message.length; index++) {
          toast.error(err.response.data.message[index]);
        }
      }
    } finally {
      setTimeout(() => {
        Swal.close();
      }, 400);
    }
  };
  returnLoading = (title) => {
    Swal.fire({
      title: title,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
    Swal.showLoading();
  };

  render() {
    return (
      <PageTitle title={`مدیریت آگهی ${this.state.currentItem.title}`}>
        <section className="container-fluid spx-2 spx-lg-10 smt-10 spt-3">
          <div className="row">
            <div className="col-12 smb-5">
              <Header
                id={this.state.currentItem.id}
                title={this.state.currentItem.title}
                status={this.state.currentItem.adverStatus}
              />
            </div>

            <div className="col-12 col-lg-3 smb-2 mb-lg-0">
              {this.state.sideBarInfo ? (
                <SideBar
                  adverId={this.state.adverId}
                  startSearch={this.startSearch}
                  info={this.state.sideBarInfo}
                />
              ) : (
                ""
              )}
            </div>

            <div className="col-12 col-lg-9 mb-0">
              <Content
                id={this.state.currentItem.id}
                resumes={this.state.resumes}
              />
            </div>
          </div>
        </section>
      </PageTitle>
    );
  }
}
