import React, { Component } from "react";
import {
  Header,
  Content,
  SideBar,
} from "../../components/employerPanel/requestDetails";
import { PageTitle } from "../../components";
import * as service from "../../components/employerPanel";

export class RequestDetails extends Component {
  state = {
    userAllInfo: [],
  };

  async componentDidMount() {
    const adId = this.props.match.params.id;
    const currentResumeId = this.props.match.params.resumeId;

    await service.getAdverResumes(adId).then((res) => {
      let allResumes = res.data.resul;

      let currentResume = allResumes.find(
        (item) => (item.resomeId = currentResumeId)
      );

      this.setState({
        adId: adId,
        allResumes: allResumes,
        currentResume: currentResume,
      });
    });

    await service
      .userAllInfoForResome(currentResumeId)
      .then((res) => this.setState({ userAllInfo: res.data.resul }));
  }

  render() {
    return (
      //   <PageTitle title="">
      <section className="container-fluid spx-2 spx-lg-10 smt-10 spt-3">
        <div className="row">
          <div className="col-12 smb-5">
            <Header adId={this.state.adId} />
          </div>

          <div className="col-12 col-lg-8 smb-2 mb-lg-0">
            <Content allInfo={this.state.userAllInfo} />
          </div>

          <div className="col-12 col-lg-4">
            <SideBar />
          </div>
        </div>
      </section>
      //   </PageTitle>
    );
  }
}
