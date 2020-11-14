import React, { Component } from "react";
import { Ad } from "../home";
import { jobServices } from "./jobServices";

export class LatestAds extends Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    // Get Jobs Adver
    jobServices.getJobs().then((res) => {
      this.setState({ jobs: res.data.resul.listOfData });
    });
  }

  render() {
    return (
      <div className="row bg-white srounded-md sp-2">
        {this.state.jobs.map((item, index) => {
          return (
            <div
              key={item.id}
              className={
                index + 1 !== this.state.jobs.length
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
          );
        })}
      </div>
    );
  }
}
