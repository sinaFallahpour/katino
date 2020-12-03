import React, { Component } from "react";
import { CheckBoxes } from "./CheckBoxes";
import CheckBoxesGenders from "./CheckBoxesGenders";
import CheckBoxesMoteGhazi from "./CheckBoxesMoteGhazi";
import CheckBoxesSabegheKar from "./CheckBoxesSabegheKar";


export class SideBar extends Component {
  state = {
    cities: [],

    model: {},

    filterVisibility: false,

    filters: {
      adverId: 0,
      seacrchKey: "",
      hasComment: null,
      isMarked: null,
      asingResomeStatuses: [],
      genders: [],
      cities: [],
      seniorityleveles: []
    }

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




  handleFilter = async (e) => {


    if (this.state.filters.cities.includes(e.target.value)) {
      let newCitiess = this.state.filters.cities.filter(city => city != e.target.value);
      await this.setState({ filters: { ...this.state.filters, cities: newCitiess } })
    } else {
      await this.setState({
        filters: {
          ...this.state.filters,
          cities: [...this.state.filters.cities, e.target.value]
        }
      })
    }
    let ob = {
      ...this.state.filters,
      adverId: this.props.adverId,
    }
    this.props.startSearch(ob)
  }




  handleGender = async (e) => {


    if (this.state.filters.genders.includes(e.target.value)) {
      let newGenders = this.state.filters.genders.filter(gender => gender != e.target.value);
      await this.setState({ filters: { ...this.state.filters, genders: newGenders } })
    } else {
      await this.setState({
        filters: {
          ...this.state.filters,
          genders: [...this.state.filters.genders, e.target.value]
        }
      })
    }
    let ob = {
      ...this.state.filters,
      adverId: this.props.adverId,
    }
    this.props.startSearch(ob)
  }


  handleMoteghazi = async (e) => {


    if (this.state.filters.asingResomeStatuses.includes(e.target.value)) {
      let newMoteghzi = this.state.filters.asingResomeStatuses.filter(gender => gender != e.target.value);
      await this.setState({ filters: { ...this.state.filters, asingResomeStatuses: newMoteghzi } })
    } else {
      await this.setState({
        filters: {
          ...this.state.filters,
          asingResomeStatuses: [...this.state.filters.asingResomeStatuses, e.target.value]
        }
      })
    }
    let ob = {
      ...this.state.filters,
      adverId: this.props.adverId,
    }
    this.props.startSearch(ob)
  }


  handleSabegheKar = async (e) => {

    if (this.state.filters.seniorityleveles.includes(e.target.value)) {
      let newSabegheKar = this.state.filters.seniorityleveles.filter(gender => gender != e.target.value);
      await this.setState({ filters: { ...this.state.filters, seniorityleveles: newSabegheKar } })
    } else {
      await this.setState({
        filters: {
          ...this.state.filters,
          seniorityleveles: [...this.state.filters.seniorityleveles, e.target.value]
        }
      })
    }
    let ob = {
      ...this.state.filters,
      adverId: this.props.adverId,
    }
    this.props.startSearch(ob)
  }



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
            className={`ad-info-sidebar ${this.state.filterVisibility ? "active" : ""
              }`}
          >
            <div className="d-flex d-lg-none spx-2 mt-2 mb-4 justify-content-between align-items-center ir-b c-regular">
              فیلتر ها
              <i onClick={this.closeHandler} className="fas fa-times"></i>
            </div>

            <div className="smb-2">
              <CheckBoxesMoteGhazi
                title="وضعیت متقاضی"
                name="requestStatus"

                handleMoteghazi={this.handleMoteghazi}

                list={[
                  {
                    key: "در انتظار تعیین وضعیت",
                    num: this.props.info.model.AsingResomeStatus_Pending,
                    enum: 1
                  },
                  {
                    key: "تایید برای مصاحبه",
                    num: this.props.info.model
                      .AsingResomeStatus_AcceptedForInterview,
                    enum: 3
                  },
                  {
                    key: "استخدام شده",
                    num: this.props.info.model.AsingResomeStatus_Hired,
                    enum: 4
                  },
                  {
                    key: "رد شده",
                    num: this.props.info.model.AsingResomeStatus_Rejected,
                    enum: 2
                  },
                ]}
              />
            </div>

            <div className="smb-2">
              <CheckBoxesGenders
                title="جنسیت"
                name="gender"
                handleGender={this.handleGender}

                list={[
                  { key: "مهم نیست", num: this.props.info.model.Gender_NotImp, enum: 0 },
                  { key: "مرد", num: this.props.info.model.Gender_Male, enum: 1 },
                  { key: "زن", num: this.props.info.model.Gender_Female, enum: 2 },
                ]}
              />
            </div>

            <div className="smb-2">
              <CheckBoxes title="شهر" name="city"
                handleFilter={this.handleFilter}
                list={this.props.info.city.map((item) => { return { key: item.cityName, num: item.count } })} />
            </div>

            <div className="smb-0">
              <CheckBoxesSabegheKar
                handleSabegheKar={this.handleSabegheKar}
                title="سابقه کار"
                name="workExperience"
                list={[
                  {
                    key: "تازه کار",
                    num: this.props.info.model.Senioritylevel_Junior,
                    enum: 0
                  },
                  {
                    key: "متخصص",
                    num: this.props.info.model.Senioritylevel_Expert,
                    enum: 1
                  },
                  {
                    key: "مدیر",
                    num: this.props.info.model.Senioritylevel_Manager,
                    enum: 2
                  },
                  {
                    key: "مدیر ارشد",
                    num: this.props.info.model.Senioritylevel_SeniorManger,
                    enum: 3
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
