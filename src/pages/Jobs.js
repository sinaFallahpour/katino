import React, { Component } from "react";
import {
  JobSearchBox,
  citiesService,
  // LatestAds,
  Ad,
  Pagination,
  Filters,
  latestAdvers,
  searchAdver,
} from "../components";

export class Jobs extends Component {
  state = {
    cities: [],
    adsList: [],
    pageCount: 1,
  };

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);

    let key = params.get("key");
    let city = params.get("city");

    if (key || city)
      searchAdver(key, city, 1, 10).then((res) => {
        this.setState({
          adsList: res.data.resul.listOfData,
          pageCount: res.data.resul.pageCount,
        });
      });
    else
      latestAdvers(1, 10).then((res) => {
        this.setState({
          adsList: res.data.resul.listOfData,
          pageCount: res.data.resul.pageCount,
        });
      });

    citiesService
      .getCities()
      .then((res) => this.setState({ cities: res.data.resul }));
  }

  render() {
    return (
      <div className="search-jobs spt-10">
        <div className="container-fluid spx-2 spx-lg-10 smt-10">
          <JobSearchBox cities={this.state.cities} />

          <Filters />

          <hr className="smy-5" />

          <div className="row bg-white srounded-md sp-2">
            {this.state.adsList
              ? this.state.adsList.map((item, index) => (
                  <div
                    key={item.id}
                    className={
                      index + 1 !== this.state.adsList.length
                        ? "col-12 smb-2"
                        : "col-12 mb-0"
                    }
                  >
                    <Ad
                      id={item.id}
                      title={item.title}
                      companyName={item.companyName}
                      city={item.city}
                      salary={item.salary}
                      typeOfCooperation={item.typeOfCooperation}
                      descriptionOfJob={item.descriptionOfJob}
                    />
                  </div>
                ))
              : ""}
          </div>

          {/* <div className="row bg-white srounded-md sp-2">

         {this.state.adsList?this.state.adsList.map((item,index)=>
            )}
      </div> */}

          {this.state.pageCount > 1 ? (
            <Pagination pageCount={this.state.pageCount} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
