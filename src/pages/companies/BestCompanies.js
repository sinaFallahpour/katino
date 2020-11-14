import React, { Component } from "react";
import { Companies } from "../../components/companies";
import * as service from "../../components/companies";
import { Link } from "react-router-dom";

export class BestCompanies extends Component {
  state = {
    companies: [],
  };

  async componentDidMount() {
    await service
      .bestCompanies()
      .then((res) => this.setState({ companies: res.data.resul }));
  }

  render() {
    return (
      <section className="companies container-fluid spx-2 spx-lg-10 smt-10 spt-3 mb-0">
        <header className="companies-header srounded-md spb-5 d-flex flex-column justify-content-center align-items-center">
          <h1 className="ir-b text-white title mb-0">50 شرکت برتر</h1>
          <Link to="/AllCompanies" className="ir-r text-white smt-1">
            سایر شرکت ها
          </Link>
        </header>

        <Companies companies={this.state.companies} />
      </section>
    );
  }
}
