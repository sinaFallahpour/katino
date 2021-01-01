import React, { Component } from "react";
import {
  salary,
  cooperationType,
  gender,
  educationDegree,
  workExperience,
} from "../../enums";
import { findCities } from "../../enums/city";

export class ShortDetails extends Component {
  render() {
    return (
      <div className="ad-short-details">
        <ul>
          {this.props.companyName && (
            <li className="bg-success-light c-success ir-r fs-m sp-1 d-inline-block srounded-sm smb-2 sml-2">
              <div className="d-flex align-items-center justify-content-start">
                <i className="fas fa-building sml-1"></i>
                {this.props.companyName}
              </div>
            </li>
          )}

          {this.props.city && (
            <li className="bg-success-light c-success ir-r fs-m sp-1 d-inline-block srounded-sm smb-2 sml-2">
              <div className="d-flex align-items-center justify-content-start">
                <i className="fas fa-map-marker-alt sml-1"></i>
                {findCities(this.props.city)}
              </div>
            </li>
          )}

          {this.props.salary && (
            <li className="bg-success-light c-success ir-r fs-m sp-1 d-inline-block srounded-sm smb-2 sml-2">
              <div className="d-flex align-items-center justify-content-start">
                {`میزان حقوق: ${salary(this.props.salary)}`}
              </div>
            </li>
          )}

          {this.props.typeOfCooperation && (
            <li className="bg-success-light c-success ir-r fs-m sp-1 d-inline-block srounded-sm smb-2 sml-2">
              <div className="d-flex align-items-center justify-content-start">
                {`نوع قرارداد: ${cooperationType(
                  this.props.typeOfCooperation
                )}`}
              </div>
            </li>
          )}

          {this.props.gender && (
            <li className="bg-success-light c-success ir-r fs-m sp-1 d-inline-block srounded-sm smb-2 sml-2">
              <div className="d-flex align-items-center justify-content-start">
                {`جنسیت: ${gender(this.props.gender)}`}
              </div>
            </li>
          )}
          {this.props.feildOfActivity && (
            <li className="bg-success-light c-success ir-r fs-m sp-1 d-inline-block srounded-sm smb-2 sml-2">
              <div className="d-flex align-items-center justify-content-start">
                {`حوزه فعالیت: ${this.props.feildOfActivity}`}
              </div>
            </li>
          )}

          {this.props.degreeOfEducation && (
            <li className="bg-success-light c-success ir-r fs-m sp-1 d-inline-block srounded-sm smb-2 sml-2">
              <div className="d-flex align-items-center justify-content-start">
                {`حداقل تحصیلات: ${educationDegree(
                  this.props.degreeOfEducation
                )}`}
              </div>
            </li>
          )}

          {this.props.workExperience && (
            <li className="bg-success-light c-success ir-r fs-m sp-1 d-inline-block srounded-sm smb-2 sml-2">
              <div className="d-flex align-items-center justify-content-start">
                {`حداقل سابقه کار: ${workExperience(
                  this.props.workExperience
                )}`}
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
