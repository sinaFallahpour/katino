import React, { Component } from "react";
import { PageTitle } from "../../components/PageTitle";
import {
  Content,
  Header,
  SideBar,
} from "../../components/employerPanel/adInfo";
import * as service from "../../components/employerPanel";

export class AdInfo extends Component {
  state = {
    currentItem: {},

    sideBarInfo: {},

    resumes: [],
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

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
                <SideBar info={this.state.sideBarInfo} />
              ) : (
                ""
              )}
            </div>

            <div className="col-12 col-lg-9 mb-0">
              <Content resumes={this.state.resumes} />
            </div>
          </div>
        </section>
      </PageTitle>
    );
  }
}
