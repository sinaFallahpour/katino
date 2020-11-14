import React, { Component } from "react";
import {
  Header,
  ShortDetails,
  Description,
  OtherAds,
  SendResume,
} from "../components/JobDetails";
import axios from "axios";
import API_ADDRESS from "../API_ADDRESS";
import { PageTitle } from "../components/PageTitle";

export class JobDetails extends Component {
  state = {};

  async componentDidMount() {
    const id = this.props.match.params.id;

    await axios
      .get(API_ADDRESS + `Adver/AdverDetails?id=${id}`)
      .then((res) => this.setState({ ...res.data.resul }));

    await axios
      .get(API_ADDRESS + "Adver/GetLastAdversForIndex?pageSize=6")
      .then((res) => this.setState({ latestAds: res.data.resul.listOfData }));
  }

  render() {
    if (!this.state)
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
                  <Header title={this.state.title} />
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
                  {/* <hr className="desc-separator smb-5 d-block mx-auto mt-0" />
                <Description /> */}
                </div>

                <OtherAds list={this.state.latestAds} />
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
