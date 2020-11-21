import React, { Component } from "react";
import { PageTitle } from "../../components/PageTitle";
import { Header } from "../../components/employerPanel";
import * as service from "../../components/employerPanel";

export class AdInfo extends Component {
  state = {
    currentItem: {},
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    await service
      .getUserAds()
      .then((res) =>
        this.setState({ currentItem: res.data.resul.find((item) => item.id) })
      );

    console.log(this.state.currentItem);
  }

  render() {
    return (
      <PageTitle title={`مدیریت آگهی ${this.state.currentItem.title}`}>
        <section className="container-fluid spx-2 spx-lg-10 smt-10 spt-3">
          <div className="row">
            <Header
              id={this.state.currentItem.id}
              title={this.state.currentItem.title}
              status={this.state.currentItem.adverStatus}
            />
          </div>
        </section>
      </PageTitle>
    );
  }
}
