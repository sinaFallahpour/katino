import React, { Component } from "react";
import {
  ShortDetails,
  Description,
  OtherAds,
  SendResume,
} from "../components/JobDetails";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import API_ADDRESS from "../API_ADDRESS";
import { PageTitle } from "../components/PageTitle";
import agent from "../core/agent";

export class JobDetails extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    await axios
      .get(API_ADDRESS + `Adver/AdverDetails?id=${id}`)
      .then((res) => this.setState({ ...res.data.resul }));

    await axios
      .get(API_ADDRESS + "Adver/GetLastAdversForIndex?pageSize=6")
      .then((res) => this.setState({ latestAds: res.data.resul.listOfData }));

    this.setState({ loading: false });
  }

  handleMark = async () => {
    try {
      if (this.state.isMarked) {
        this.setState({ isMarked: false });
        const { data } = await agent.Adver.unmarkAdvder(
          this.props.match.params.id
        );
      } else {
        this.setState({ isMarked: true });
        const { data } = await agent.Adver.markAdvder(
          this.props.match.params.id
        );
      }
    } catch (ex) {
      this.setState({ isMarked: !this.state.isMarked });
      if (ex?.response?.data) {
        toast.error(ex.response.data.message[0]);
      }
    }
  };

  handleMarkOtherAdv = async (adverId) => {
    try {
      let currentAdver = this.state.latestAds.find((c) => c.id == adverId);
      if (currentAdver.isMarked) {
        this.setState({
          latestAds: this.state.latestAds.map((el) =>
            el.id === adverId ? Object.assign({}, el, { isMarked: false }) : el
          ),
        });
        const { data } = await agent.Adver.unmarkAdvder(
          this.props.match.params.id
        );
      } else {
        this.setState({
          latestAds: this.state.latestAds.map((el) =>
            el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
          ),
        });

        const { data } = await agent.Adver.markAdvder(
          this.props.match.params.id
        );
      }
    } catch (ex) {
      this.setState({ isMarked: !this.state.isMarked });
      if (ex?.response?.data) {
        toast.error(ex.response?.data?.message[0]);
        this.setState({
          data: this.state.latestAds.map((el) =>
            el.id === adverId
              ? Object.assign({}, el, { isMarked: !el.isMarked })
              : el
          ),
        });
      }
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
    if (this.state.loading)
      return (
        <div className="ad-details container-fluid spx-2 spx-lg-10 smt-10 spt-5 smb-10">
          <div className="row">
            <div className="col-12 col-lg-12">
              <div className="bg-white srounded-md sp-2 smb-5 text-center ir-r">
                در حال بارگذاری...
              </div>
            </div>
          </div>
        </div>
      );
    else
      return (
        <PageTitle title={this.state.title}>
          <div className="ad-details container-fluid spx-2 spx-lg-10 smt-10 spt-5 smb-10">
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="bg-white srounded-md sp-2 smb-5">
                  <header className="d-flex justify-content-between align-items-center smb-3">
                    <h3 className="ir-b c-dark text-right fs-l mb-0">
                      {this.state.title}
                    </h3>

                    <i
                      onClick={this.handleMark}
                      className={`bookmarker-btn c-dark fs-l ${
                        this.state.isMarked === false ? "far" : "fas"
                      } fa-bookmark`}
                    ></i>
                  </header>

                  <ShortDetails
                    companyName={this.state.companyName}
                    city={this.state.city}
                    salary={this.state.salary}
                    typeOfCooperation={this.state.typeOfCooperation}
                    gender={this.state.gender}
                    feildOfActivity={this.state.feildOfActivity}
                    degreeOfEducation={this.state.degreeOfEducation}
                    workExperience={this.state.workExperience}
                  />
                  <hr className="desc-separator smb-5 d-block mx-auto mt-0" />
                  <Description description={this.state.descriptionOfJob} />
                </div>

                <OtherAds
                  handleMarkOtherAdv={this.handleMarkOtherAdv}
                  list={this.state.latestAds}
                />
              </div>

              <div className="col-12 col-lg-4">
                <SendResume id={this.state.id} />
              </div>
            </div>
          </div>
        </PageTitle>
      );
  }
}
