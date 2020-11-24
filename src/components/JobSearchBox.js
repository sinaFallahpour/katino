import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

export class JobSearchBox extends Component {
  state = {
    selectedOption: null,
    city: "",
    key: "",
  };

  changeHandler = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  cityHandler = (event) => this.setState({ city: event.value });

  render() {
    let cities = [];

    this.props.cities.map((id) => {
      cities.push({
        value: id.cityName,
        label: ` ${id.provinceName}، ${id.cityName} `,
      });
    });

    return (
      <div className="row w-100 sp-2 spy-2 bg-white rounded-content srounded-md">
        {/* What? */}
        <div className="col-12 col-lg-5 smb-2 pr-lg-0 mb-lg-0">
          <div className="form-group mb-0 ir-r srounded-md">
            <label className="fs-regular ir-b c-dark">
              به دنبال چه چیزی هستید؟
            </label>

            <input
              onChange={this.changeHandler}
              name="key"
              className="form-control ir-r"
              placeholder="عنوان شغلی، شرکت و..."
            />
          </div>
        </div>

        {/* Where? */}
        <div className="col-12 col-lg-5 smb-2 mb-lg-0">
          <div className="form-group mb-0 ir-r srounded-md">
            <label className="fs-regular ir-b c-dark">در کدام شهر؟</label>
            <Select
              onChange={this.cityHandler}
              placeholder="انتخاب شهر"
              styles={{ fontFamily: "iransans-regular" }}
              options={cities}
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="col-12 col-lg-2 mb-0 pl-lg-0 d-flex align-items-end">
          <button
            onClick={() => {
              this.props.handleSearch(this.state);
            }}
            type="button"
            className="btn btn-primary d-block w-100 ir-r fs-m srounded-sm"
            // href="/Jobs?key=ghghgfgchhgfg&amp;city=آستارا"
            dideo-checked="true"
          >
            جستجو
          </button>

          {/* <Link
            type="button"
            className="btn btn-primary d-block w-100 ir-r fs-m srounded-sm"
            to={
              this.state.city
                ? `/Jobs?key=${this.state.searchInput}&city=${this.state.city}`
                : `/Jobs?key=${this.state.searchInput}`
            }
          >
            جستجو
          </Link> */}
        </div>
      </div>
    );
  }
}
