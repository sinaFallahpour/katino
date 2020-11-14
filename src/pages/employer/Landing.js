import React, { Component } from "react";
import {
  Intro,
  Features,
  Plans,
  Customers,
} from "../../components/employerLanding";
import * as service from "../../components/employerLanding";

export class EmployerLanding extends Component {
  state = {
    plans: [],
  };

  componentDidMount = async () => {
    await service
      .getPlans()
      .then((res) => this.setState({ plans: res.data.resul }));
  };

  render() {
    return (
      <section className="employer-landing container-fluid spx-2 spx-lg-10 smt-10 spt-3">
        <div className="smb-10 spb-10">
          <Intro />
        </div>

        <div className="smb-10 spb-10">
          <Features />
        </div>

        <div className="smb-10 spb-10">
          <Plans items={this.state.plans} />
        </div>

        <div>
          <Customers />
        </div>
      </section>
    );
  }
}
