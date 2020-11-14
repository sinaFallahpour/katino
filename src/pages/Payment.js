import React, { Component } from "react";
import axios from "axios";
import API_ADDRESS from "../API_ADDRESS";
import { NotFound, Factor } from "../components/payment";

export class Payment extends Component {
  state = {
    plans: [],

    currentPlan: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const planId = this.props.match.params.id;

    let data_1, data_2, plans;
    await axios
      .get(API_ADDRESS + "plan/GetAllPlansForCompanies", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("JWT")}`,
        },
      })
      .then((res) => {
        data_1 = res.data.resul;
        this.setState({ plans: res.data.resul });
      });

    await axios
      .post(
        API_ADDRESS + "Adver/GetUserPlanWhenCreateAdver",
        {},
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => {
        data_2 = res.data.resul.allPlanFor;
        let data = {};
        data[Object.keys(this.state.plans).length] = data_2;
        // let data = { 3: res.data.resul.allPlanFor };
        this.setState({ plans: { ...this.state.plans, ...data } });
      });
    // plans = { ...data_1 };
    let data_3 = [...data_1, data_2];

    let current = data_3.find((item) => item.id == planId);

    // let current = this.state.plans.find((item) => item.id == planId);

    await this.setState({
      currentPlan: current,
    });
  }

  render() {
    // if (this.state.loading) return <>loading</>;
    return (
      <div className="container smt-10 spt-10">
        <div className="row">
          <div className="col-12 col-lg-7 mx-auto">
            <div className="srounded-md sbs-content sp-2 bg-white">
              {this.state.currentPlan !== undefined ? (
                <Factor
                  prop={this.props}
                  price={this.state.currentPlan.price}
                  id={this.state.currentPlan.id}
                />
              ) : (
                <NotFound />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
