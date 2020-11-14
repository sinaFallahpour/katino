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

  render() {
    return (
      <div className="home">
        <SearchBox props={this.props.props} cities={this.state.cities} />

        <Companies logos={this.state.companiesLogo} />
        <Ads
          immediately={this.state.immediatelyAds}
          latest={this.state.latestAds}
        />

        <ResumeBuilder />

        <Blog />
      </div>
    );
  }
}
