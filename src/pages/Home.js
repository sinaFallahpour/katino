import React, { Component } from "react";
import {
  SearchBox,
  Companies,
  ResumeBuilder,
  Blog,
  Ads,
  companyService,
  adsServices,
} from "../components/home";
import { GetLandingPage } from "../core/api/landing-page";

import { citiesService } from "../components";
import * as service from "../components/blog";

import agent from "../core/agent";
import { toast } from "react-toastify";

export class Home extends Component {
  state = {
    companiesLogo: [],
    immediatelyAds: [],
    latestAds: [],
    cities: [],
    blog: [],
    LandingInfo: [],
    Landin_Resome_Title: "",
    Landin_Resome_Content: "",
    Landing_Img: "",
  };

  componentDidMount() {
    // Cities for Search Box
    citiesService
      .getCities()
      .then((res) => this.setState({ cities: res.data.resul }));

    // Companies Logo
    companyService
      .getCompanies()
      .then((res) => this.setState({ companiesLogo: res.data.resul }));

    // Latest Ads
    adsServices
      .getLatest()
      .then((res) => this.setState({ latestAds: res.data.resul }));

    // Immediately Ads
    adsServices
      .getImmediately()
      .then((res) => this.setState({ immediatelyAds: res.data.resul }));

    service.getBlogs().then((res) => this.setState({ blog: res.data.resul }));

    GetLandingPage().then((res) =>
      res?.resul?.map((item) => {
        item.key === "Landin_Resome_Title" &&
          this.setState({ Landin_Resome_Title: item.value });
        item.key === "Landin_Resome_Content" &&
          this.setState({ Landin_Resome_Content: item.value });
        item.key === "Landing_Img" &&
          this.setState({ Landing_Img: item.value });
      })
    );
  }

  handleMarkOtherAdv = async (adverId) => {
    try {
      let currentAdver = this.state.latestAds.listOfData.find(
        (c) => c.id == adverId
      );
      if (currentAdver.isMarked) {
        this.setState({
          latestAds: {
            ...this.state.latestAds,
            listOfData: this.state.latestAds.listOfData.map((el) =>
              el.id === adverId
                ? Object.assign({}, el, { isMarked: false })
                : el
            ),
          },
        });
        await agent.Adver.unmarkAdvder(adverId);
      } else {
        this.setState({
          latestAds: {
            ...this.state.latestAds,
            listOfData: this.state.latestAds.listOfData.map((el) =>
              el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
            ),
          },
        });

        await agent.Adver.markAdvder(adverId);
      }
    } catch (ex) {
      this.setState({ isMarked: !this.state.isMarked });

      if (ex?.response?.data) {
        toast.error(ex.response?.data?.message[0]);
        this.setState({
          latestAds: {
            ...this.state.latestAds,
            listOfData: this.state.latestAds.listOfData.map((el) =>
              el.id === adverId
                ? Object.assign({}, el, { isMarked: !el.isMarked })
                : el
            ),
          },
        });
      }
    }
  };

  render() {
    return (
      <div className="home">
        <SearchBox
          LandingImg={this.state.Landing_Img}
          props={this.props.props}
          cities={this.state.cities}
        />

        <Companies logos={this.state.companiesLogo} />
        <Ads
          immediately={this.state.immediatelyAds}
          latest={this.state.latestAds}
          handleMarkOtherAdv={this.handleMarkOtherAdv}
        />

        <ResumeBuilder
          title={this.state.Landin_Resome_Title}
          content={this.state.Landin_Resome_Content}
        />
        <Blog posts={this.state.blog} />
      </div>
    );
  }
}
