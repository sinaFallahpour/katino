import React, { Component } from "react";
import { Latest } from "../home/ads/Latest";

export class CompanyAds extends Component {
  state = {
    buttons: {
      activeAds: true,
      deactiveAds: false,
    },
  };

  componentDidMount = async () => {
    await this.setState({
      activeAds: this.props.activeAds,
      deactiveAds: this.props.deactiveAds,
    });
  };

  tabsHandler = () => {
    this.state.buttons.activeAds === true
      ? this.setState({ buttons: { activeAds: false, deactiveAds: true } })
      : this.setState({ buttons: { activeAds: true, deactiveAds: false } });
  };

  render() {
    return (
      <div className="company-ads">
        <nav className="d-flex justify-content-start align-items-center">
          <span
            onClick={this.tabsHandler}
            className="btn btn-lg ir-r spx-2 btn-success-light"
          >
            آگهی های فعال
          </span>
          <span
            onClick={this.tabsHandler}
            className="btn btn-lg ir-r spx-2 btn-primary-light"
          >
            آگهی های غیر فعال
          </span>
        </nav>

        <div className="bg-white sp-2 ads-holder">
          <div
            className={
              this.state.buttons.activeAds === true ? "d-block" : "d-none"
            }
          >
            <Latest hasMoreButton={false} latest={this.state.activeAds} />
          </div>

          <div
            className={
              this.state.buttons.deactiveAds === true ? "d-block" : "d-none"
            }
          >
            <Latest hasMoreButton={false} latest={this.state.deactiveAds} />
          </div>
        </div>
      </div>
    );
  }
}
