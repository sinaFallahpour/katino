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

import { citiesService } from "../components";

import agent from "../core/agent";
import { toast } from "react-toastify";

export class Home extends Component {
  state = {
    companiesLogo: [],
    immediatelyAds: [],
    latestAds: [],
    cities: [],
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
  }

  // handleMarkOtherAdv;

  handleMarkOtherAdv = async (adverId) => {
    try {
      let currentAdver = this.state.latestAds.listOfData.find(
        (c) => c.id == adverId
      );
      console.log(currentAdver);
      if (currentAdver.isMarked) {
        // this.setState({ isMarked: false });
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

        // this.setState({
        //   latestAds: this.state.latestAds.map((el) =>
        //     el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
        //   ),
        // });

        await agent.Adver.markAdvder(adverId);
      }
    } catch (ex) {
      console.log(ex);
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

        // this.setState({
        //   data: this.state.adsList.map((el) =>
        //     el.id === adverId
        //       ? Object.assign({}, el, { isMarked: !el.isMarked })
        //       : el
        //   ),
        // });
      }
    }
  };

  render() {
    return (
      <div className="home">
        <SearchBox props={this.props.props} cities={this.state.cities} />

        <Companies logos={this.state.companiesLogo} />
        <Ads
          immediately={this.state.immediatelyAds}
          latest={this.state.latestAds}
          handleMarkOtherAdv={this.handleMarkOtherAdv}
        />

        <ResumeBuilder />

        <Blog />
      </div>
    );
  }
}
