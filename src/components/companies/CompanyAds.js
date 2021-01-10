import React, { Component } from "react";
import { Latest } from "../home/ads/Latest";
import agent from "../../core/agent";
import { toast } from "react-toastify";
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
  };

  tabsHandler = (id) => {
    id && this.setState({ buttons: { ...this.state.buttons, status: id } });
  };

  handleMarkOtherAdv = async (adverId) => {
    try {
      let currentAdver = this.state.deactiveAds.find((c) => c.id == adverId);
      if (currentAdver.isMarked) {
        const newList = this.state.deactiveAds.map((el) =>
          el.id === adverId ? Object.assign({}, el, { isMarked: false }) : el
        );

        this.setState({
          deactiveAds: newList,
        });
        await agent.Adver.unmarkAdvder(adverId);
      } else {
        const newList = this.state.deactiveAds.map((el) =>
          el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
        );

        this.setState({
          deactiveAds: newList,
        });

        await agent.Adver.markAdvder(adverId);
      }
    } catch (ex) {
      this.setState({ isMarked: !this.state.isMarked });

      if (ex?.response?.data) {
        toast.error(ex.response?.data?.message[0]);
        const newList = this.state.deactiveAds.map((el) =>
          el.id === adverId
            ? Object.assign({}, el, { isMarked: !el.isMarked })
            : el
        );
        this.setState({
          deactiveAds: newList,
        });
      }
    }
  };

  handleMarkActiveAdv = async (adverId) => {
    try {
      let currentAdver = this.state.activeAds.find((c) => c.id == adverId);
      if (currentAdver.isMarked) {
        const newList = this.state.activeAds.map((el) =>
          el.id === adverId ? Object.assign({}, el, { isMarked: false }) : el
        );

        this.setState({
          activeAds: newList,
        });
        await agent.Adver.unmarkAdvder(adverId);
      } else {
        const newList = this.state.activeAds.map((el) =>
          el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
        );

        this.setState({
          activeAds: newList,
        });

        await agent.Adver.markAdvder(adverId);
      }
    } catch (ex) {
      this.setState({ isMarked: !this.state.isMarked });

      if (ex?.response?.data) {
        toast.error(ex.response?.data?.message[0]);
        const newList = this.state.activeAds.map((el) =>
          el.id === adverId
            ? Object.assign({}, el, { isMarked: !el.isMarked })
            : el
        );
        this.setState({
          activeAds: newList,
        });
      }
    }
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
                <Latest
                  handleMarkOtherAdv={this.handleMarkActiveAdv}
                  hasMoreButton={false}
                  latest={this.state.activeAds}
                />
              ) : (
                <div className="ToggleAdvItems">موردی یافت نشد </div>
              )}
            </div>
          )}
          {status === 2 && (
            <div>
              {this.state.deactiveAds && this.state.deactiveAds.length !== 0 ? (
                <Latest
                  handleMarkOtherAdv={this.handleMarkOtherAdv}
                  hasMoreButton={false}
                  latest={this.state.deactiveAds}
                />
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
