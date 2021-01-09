import React, { Component } from "react";
import { PageTitle } from "../../components";
import {
  Company,
  getCompanyDetails,
  CompanyAds,
} from "../../components/companies";
import { CompanySideBar } from "./CompanySideBar";
import ReactSticky from "react-sticky-box";
import "./companyDetails.styles.css";

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
                    name={this.state.company.companyPersianName}
                    enName={this.state.company.companyEngName}
                    city={this.state.company.city}
                    description={this.state.company.description}
                    filedOfActivity={this.state.company.filedOfActivity}
                    logo={this.state.company.image}
                    rate={this.state.company.rate}
                    hasLink={false}
                  />
                </div>
                <div className="sideBarContainer">
                  <ReactSticky
                    className="rightSideBar"
                    offsetTop={100}
                    offsetBottom={50}
                  >
                    <CompanySideBar
                      email={this.state.company.email}
                      website={this.state.company.url}
                      isActive={this.state.company.isActive}
                      mobile={this.state.company.mobile}
                      phoneNumber={this.state.company.phoneNumber}
                      managementFullName={this.state.company.managementFullName}
                      numberOfStaff={this.state.company.numberOfStaff}
                    />
                  </ReactSticky>

                  <div className="LeftSideBar">
                    <CompanyAds
                      activeAds={this.state.activeAds}
                      deactiveAds={this.state.deactiveAds}
                    />
                  </div>
                </div>
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
