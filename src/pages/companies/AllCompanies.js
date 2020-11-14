import React, { Component } from "react";
import { Companies } from "../../components/companies";
import * as service from "../../components/companies";
import axios from "axios";
import API_ADDRESS from "../../API_ADDRESS";

export class AllCompanies extends Component {
  state = {
    companies: [],
  };

  async componentDidMount() {
    // let { companies, cities } = [];

    await service
      .allCompanies()
      .then((res) => this.setState({ companies: res.data.resul }));

    // await service.getCities().then((res) => (cities = res.data.resul));

    // console.log(companies);
    // console.log(cities);
  }

  changeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  searchHandler = (event) => {
    event.preventDefault();

    axios
      .get(
        API_ADDRESS + `Account/SearchInCompanies?key=${this.state.searchInput}`
      )
      .then((res) => {
        this.setState({ companies: res.data.resul });
      });
  };

  render() {
    return (
      <section className="companies container-fluid spx-2 spx-lg-10 smt-10 spt-3 mb-0">
        {/* Header */}
        <header className="companies-header srounded-md spb-5 d-flex justify-content-center align-items-center">
          <form className="w-100" noValidate onSubmit={this.searchHandler}>
            <div className="search-box bg-white srounded-sm sp-1 d-flex mx-auto">
              <input
                onChange={this.changeHandler.bind(this)}
                name="searchInput"
                id="searchInput"
                className="form-control shadow-none ir-r"
                type="text"
                placeholder="عنوان شرکت"
              />
              <button
                type="submit"
                className="btn btn-primary ir-r shadow-none"
              >
                جستجو
              </button>
            </div>
          </form>
        </header>

        {/* <div className="row"> */}
        {/* Filters */}
        {/* <aside className="col-12 col-lg-3"> */}
        {/* <Filters /> */}
        {/* </aside> */}

        {/* Companies */}
        {/* <aside className="col-12 col-lg-9"> */}
        {this.state.companies === [] ? (
          <div className="row companies smr-2 sml-2 position-relative">
            <div className="col-12">
              <div className="bg-white srounded-md spx-2 spy-4 ir-r fs-m">
                نتیجه ای یافت نشد.
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <Companies companies={this.state.companies} />

        {/* </aside> */}
        {/* </div> */}
      </section>
    );
  }
}
