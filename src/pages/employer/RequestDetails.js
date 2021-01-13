import React, { Component } from "react";
import {
  Header,
  Content,
  SideBar,
} from "../../components/employerPanel/requestDetails";
import { PageTitle } from "../../components";
import * as service from "../../components/employerPanel";

import agent from "../../core/agent";
import { toast } from "react-toastify";

export class RequestDetails extends Component {
  state = {
    userAllInfo: [],
    YadDashts: [],
    comment: "",
    editable: true,
    shortInfo: null,
    asignResomeStatus: null,
  };

  async componentDidMount() {
    const adId = this.props.match.params.id;
    const currentResumeId = this.props.match.params.resumeId;
    const currentAsignResomeId = this.props.match.params.asignResomeId;

    let asignResomeId;
    await service.getAdverResumes(adId).then((res) => {
      let allResumes = res.data.resul;

      let currentResume = allResumes.find(
        (item) => (item.resomeId = currentResumeId)
      );
      asignResomeId = currentResume.asignResomeId;

      // currentResume.asignResomeId
      this.setState({
        adId: adId,
        allResumes: allResumes,
        currentResume: currentResume,
      });
    });

    await service
      .userAllInfoForResome(currentResumeId)
      .then((res) => this.setState({ userAllInfo: res.data.resul }));

    const { data: data1 } = await agent.Resome.GetUserShortInfoForResome(
      currentResumeId
    );
    await this.setState({ shortInfo: data1.resul });

    const { data: data2 } = await agent.Resome.GetAsignResomeStatus(
      currentAsignResomeId
    );
    await this.setState({ asignResomeStatus: data2.resul });
    if (data2.resul != 1) {
      this.setState({ editable: false });
    }

    try {
      // return params;
      let { data } = await agent.RequestDetails.LoadCommentForAsignResome(
        asignResomeId
      );
      this.setState({ YadDashts: data.resul });
      // toast.success("رزومه با موفقیت ارسال شد");
    } catch (err) {
      if (err?.response?.status === 401) toast.error("لطفا وارد شوید.");
      else if (err?.response?.status === 404) toast.error("خطای رخ داده  ");
      else if (err?.response?.status === 500) toast.error("مشکلی رخ داده ");
      // else toast.error(err.response?.data.message[0]);
    }
  }

  SubmitYadDasht = async (event, comment) => {
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

  changeAsignResomeStatus = async (description, asingResomeStatus) => {
    const currentAsignResomeId = this.props.match.params.asignResomeId;
    try {
      let asignResomeId = this.state.currentResume?.asignResomeId;
      let { data } = await agent.Resome.ChangeAsignResomeStatus(
        currentAsignResomeId,
        asingResomeStatus,
        description
      );
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

  render() {
    return (
      <PageTitle title="مشاهده رزومه">
        <section className="container-fluid spx-2 spx-lg-10 smt-10 spt-3">
          <div className="row">
            <div className="col-12 smb-5">
              <Header adId={this.state.adId} />
            </div>

            <div className="col-12 col-lg-8 smb-2 mb-lg-0">
              <Content
                userShortInfoForResome={this.state.shortInfo}
                allInfo={this.state.userAllInfo}
              />
            </div>

            <div className="col-12 col-lg-4">
              <SideBar
                asignResomeStatus={this.state.asignResomeStatus}
                editable={this.state.editable}
                changeAsignResomeStatus={this.changeAsignResomeStatus}
                SubmitYadDasht={this.SubmitYadDasht}
                assignId={this.state.currentResume?.asignResomeId}
                YadDashts={this.state.YadDashts}
              />
            </div>
          </div>
        </section>
      </PageTitle>
    );
  }
}
