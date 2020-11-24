import React, { Component } from "react";
import { CheckBoxes } from "./CheckBoxes";

export class SideBar extends Component {
  state = {
    cities: [],

    model:{},

    filterVisibility: false,
  };

  filterHandler = () => {
    this.state.filterVisibility === false
      ? this.setState({ filterVisibility: true })
      : this.setState({ filterVisibility: true });
  };

  submitFilterHandler = () => {
    this.setState({ filterVisibility: false });
  };

  closeHandler = () => {
    this.setState({ filterVisibility: false });
  };

  render() {
    if (!this.props.info.model) {
      return (
        <span className="d-block text-right ir-r c-regular fs-s">
          در حال بارگذاری
        </span>
      );
    } else {
      return (
        <React.Fragment>
          <span
            onClick={this.filterHandler}
            className="d-block d-lg-none btn btn-primary ir-r spy-1"
          >
            فیلتر
          </span>

          <div
            className={`ad-info-sidebar ${
              this.state.filterVisibility ? "active" : ""
            }`}
          >
            <div className="d-flex d-lg-none spx-2 mt-2 mb-4 justify-content-between align-items-center ir-b c-regular">
              فیلتر ها
              <i onClick={this.closeHandler} className="fas fa-times"></i>
            </div>

            <div className="smb-2">
              <CheckBoxes
                title="وضعیت متقاضی"
                name="requestStatus"
                list={[
                  {
                    key: "در انتظار تعیین وضعیت",
                    num: this.props.info.model.AsingResomeStatus_Pending,
                  },
                  {
                    key: "تایید برای مصاحبه",
                    num: this.props.info.model
                      .AsingResomeStatus_AcceptedForInterview,
                  },
                  {
                    key: "استخدام شده",
                    num: this.props.info.model.AsingResomeStatus_Hired,
                  },
                  {
                    key: "رد شده",
                    num: this.props.info.model.AsingResomeStatus_Rejected,
                  },
                ]}
              />
            </div>

            <div className="smb-2">
              <CheckBoxes
                title="جنسیت"
                name="gender"
                list={[
                  { key: "مهم نیست", num: this.props.info.model.Gender_NotImp },
                  { key: "مرد", num: this.props.info.model.Gender_Male },
                  { key: "زن", num: this.props.info.model.Gender_Female },
                ]}
              />
            </div>

            <div className="smb-2">
              <CheckBoxes title="شهر" name="city"
              
              
              list={this.props.info.city.map((item)=>{return {key:item.cityName,num:item.count}})} />
            </div>

            <div className="smb-0">
              <CheckBoxes
                title="سابقه کار"
                name="workExperience"
                list={[
                  {
                    key: "تازه کار",
                    num: this.props.info.model.Senioritylevel_Junior,
                  },
                  {
                    key: "متخصص",
                    num: this.props.info.model.Senioritylevel_Expert,
                  },
                  {
                    key: "مدیر",
                    num: this.props.info.model.Senioritylevel_Manager,
                  },
                  {
                    key: "مدیر ارشد",
                    num: this.props.info.model.Senioritylevel_SeniorManger,
                  },
                ]}
              />
            </div>

            <span
              onClick={this.submitFilterHandler}
              className="submit-filter btn btn-primary ir-r spy-1 d-lg-none"
            >
              اعمال فیلتر
            </span>
          </div>
        </React.Fragment>
      );
    }
  }
}
