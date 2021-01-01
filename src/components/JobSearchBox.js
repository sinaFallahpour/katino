import React, { Component } from "react";
import Select from "react-select";
import "./job.styles.css";

export class JobSearchBox extends Component {
  state = {
    selectedOption: null,
    city: "",
    key: "",
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.InitialUrlValue !== this.props.InitialUrlValue) {
      const listOfData = { ...nextProps.InitialUrlValue };

      for (let key in listOfData) {
        this.setState((prevState) => ({
          ...prevState.data,
          [key]: listOfData[key] ? listOfData[key] : "",
        }));
      }
    }
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFilterSearch = async (e, { action, name }) => {
    if (action === "select-option") {
      await this.setState({
        ...this.state.data,
        [name]: e ? e.value : "",
      });
      this.props.handleFilter(this.state);
    } else if (action === "clear") {
      await this.setState({
        ...this.state.data,
        [name]: null,
      });
      this.props.handleFilter(this.state);
    }
  };

  render() {
    let cities = [];

    this.props.cities.map((id) => {
      cities.push({
        value: id.cityDivisionCode,
        label: ` ${id.provinceName}، ${id.cityName} `,
      });
    });

    return (
      <div className=" jobSearchContainer">
        {/* What? */}
        <div className="col-12 col-lg-5 smb-2 pr-lg-0 mb-lg-0">
          <div className="form-group mb-0 ir-r srounded-md">
            <label className="fs-regular ir-b c-dark">
              به دنبال چه چیزی هستید؟
            </label>

            <input
              value={this.state.key}
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
              isClearable
              value={cities.filter(
                (option) => option.value === parseInt(this.state.city)
              )}
              onChange={this.handleFilterSearch}
              placeholder="انتخاب شهر"
              styles={{ fontFamily: "iransans-regular" }}
              options={cities}
              name="city"
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
            dideo-checked="true"
          >
            جستجو
          </button>
        </div>
      </div>
    );
  }
}
