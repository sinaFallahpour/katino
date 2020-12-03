import React, { Component } from "react";
import {
  Header,
  Content,
  SideBar,
} from "../../components/employerPanel/requestDetails";
import { PageTitle } from "../../components";
import * as service from "../../components/employerPanel";


import agent from "../../core/agent"
import { toast } from "react-toastify"


export class RequestDetails extends Component {
  state = {
    userAllInfo: [],
    YadDashts: [],
    comment: "",
  };

  async componentDidMount() {
    const adId = this.props.match.params.id;
    const currentResumeId = this.props.match.params.resumeId;


    let asignResomeId;
    await service.getAdverResumes(adId).then((res) => {
      let allResumes = res.data.resul;

      let currentResume = allResumes.find(
        (item) => (item.resomeId = currentResumeId)
      );
      asignResomeId = currentResume.asignResomeId

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

    try {
      // return params;
      let { data } = await agent.RequestDetails.LoadCommentForAsignResome(asignResomeId);
      this.setState({ YadDashts: data.resul })
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
      // return params;
      // let data1 = { ...this.state.info2 };
      // if (data1.isMarreid == "false") data1.isMarreid = false;
      // else data1.isMarreid = true;

      let obj = {
        comment: comment,
        asignId: this.state.currentResume?.asignResomeId
      }
      let { data } = await agent.RequestDetails.AddCommentForAsignResome(obj)
      this.setState({ YadDashts: comment })
      toast.success("ثبت موفقیت آمیز");
      // this.setState({ editMode1: false });
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




  // getYaDasht = async (asignId) => {
  //   // event.preventDefault();

  //   try {
  //     // return params;
  //     let { data } = await agent.RequestDetails.LoadCommentForAsignResome(asignId);
  //     this.setState({ YadDashts: data.resul })
  //     // toast.success("رزومه با موفقیت ارسال شد");
  //   } catch (err) {
  //     if (err.response.status === 401) toast.error("لطفا وارد شوید.");
  //     else if (err.response.status === 404) toast.error("خطای رخ داده  ");
  //     else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
  //     else toast.error(err.response.message[0]);
  //   }
  // };










  render() {
    return (
      <PageTitle title="مشاهده رزومه">
        <section className="container-fluid spx-2 spx-lg-10 smt-10 spt-3">
          <div className="row">
            <div className="col-12 smb-5">
              <Header adId={this.state.adId} />
            </div>

            <div className="col-12 col-lg-8 smb-2 mb-lg-0">
              <Content allInfo={this.state.userAllInfo} />
            </div>

            <div className="col-12 col-lg-4">
              <SideBar SubmitYadDasht={this.SubmitYadDasht} assignId={this.state.currentResume?.asignResomeId} YadDashts={this.state.YadDashts} />
            </div>
          </div>
        </section>
      </PageTitle>
    );
  }
}

// const el = document.getElementById("contentHolder");

// let space = cumulativeOffset(el);


// function cumulativeOffset(element) {
//   var top = 0,
//     left = 0;
//   do {
//     top += element.offsetTop || 0;
//     element = element.offsetParent;
//   } while (element);

//   return top;
// }
