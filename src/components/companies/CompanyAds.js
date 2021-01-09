import React, { Component } from "react";
import { Latest } from "../home/ads/Latest";
import "./company.style.css";
export class CompanyAds extends Component {
  state = {
    buttons: {
      activeAds: true,
      deactiveAds: false,
      status: 1,
    },
  };

  componentDidMount = async () => {
    await this.setState({
      activeAds: this.props.activeAds,
      deactiveAds: this.props.deactiveAds,
    });
    console.log(this.props.activeAds);
    console.log(this.props.deactiveAds);
  };

  tabsHandler = (id) => {
    id && this.setState({ buttons: { ...this.state.buttons, status: id } });
  };

  render() {
    const { status } = this.state.buttons;

    return (
      <div className="company-ads">
        <nav className="d-flex justify-content-start align-items-center">
          <span
            onClick={() => this.tabsHandler(1)}
            className={`btn btn-lg ir-r spx-2 ${
              status === 1 ? "btn-success-light" : "text-secondary btn-light"
            }`}
          >
            آگهی های فعال
          </span>
          <span
            onClick={() => this.tabsHandler(2)}
            className={`btn btn-lg ir-r spx-2 ${
              status === 2 ? "btn-success-light" : "text-secondary btn-light"
            }`}
          >
            آگهی های غیر فعال
          </span>
        </nav>

        <div className="bg-white sp-2 ads-holder">
          {status === 1 && (
            <div>
              {this.state.activeAds && this.state.activeAds.length !== 0 ? (
                <Latest hasMoreButton={false} latest={this.state.activeAds} />
              ) : (
                <div className="ToggleAdvItems">موردی یافت نشد </div>
              )}
            </div>
          )}
          {status === 2 && (
            <div>
              {this.state.deactiveAds && this.state.deactiveAds.length !== 0 ? (
                <Latest hasMoreButton={false} latest={this.state.deactiveAds} />
              ) : (
                <div className="ToggleAdvItems"> موردی یافت نشد </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
