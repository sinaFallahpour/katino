import React, { Component } from "react";
import { PageTitle } from "../../components";
import {
  Company,
  getCompanyDetails,
  CompanyAds,
} from "../../components/companies";

export class CompanyDetails extends Component {
  state = {};

  componentDidMount = async () => {
    const enName = this.props.match.params.enName;

    await getCompanyDetails(enName).then((res) =>
      this.setState({
        company: res.data.resul.company,
        activeAds: res.data.resul.activeAdver,
        deactiveAds: res.data.resul.deactiveAdver,
      })
    );
  };

  render() {
    if (this.state.company)
      return (
        <PageTitle
          title={`درباره شرکت ${this.state.company.companyPersianName}`}
        >
          <section className="container-fluids px-2 spx-lg-100 smt-100 spt-3 smt-10 spt-3">
            <div className="row">
              <div className="col-12 col-lg-9 mx-auto">
                <header className="company-details-header srounded-md"></header>
              </div>

              <div className="col-11 col-lg-8 mx-auto p-0 company-details smt-10 companies">
                <div className="smb-10">
                  <Company
                    filedOfActivity={this.state.company.filedOfActivity}
                    name={this.state.company.companyPersianName}
                    website={this.state.company.url}
                    logo={this.state.company.image}
                    city={this.state.company.city}
                    rate={this.state.company.rate}
                    enName={this.state.company.companyEngName}
                    description={this.state.company.description}
                    hasLink={false}
                  />
                </div>

                <CompanyAds
                  activeAds={this.state.activeAds}
                  deactiveAds={this.state.deactiveAds}
                />
              </div>
            </div>
          </section>
        </PageTitle>
      );
    else
      return (
        <PageTitle title="در حال بارگذاری...">
          <section className="container-fluid spx-2 spx-lg-100 smt-100 spt-3 smt-10 spt-3">
            <div className="row">
              <span className="ir-r bg-white srounded-md sp-3 d-block mx-auto">
                در حال بارگذاری...
              </span>
            </div>
          </section>
        </PageTitle>
      );
  }
}
