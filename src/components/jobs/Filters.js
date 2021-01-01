import React, { Component } from "react";
import Select from "react-select";
import { jobServices } from "./jobServices";
import { citiesService } from "../citiesService";
import "./filter.style.css";

export class Filters extends Component {
  state = {
    categories: [],
    cities: [],

    selectedValue: [],
    setSelectedValue: [],
    data: {
      category: "",
      typeOfCooperation: null,
      workExperience: null,
      salary: null,
    },
    customStyles: {
      option: (provided) => ({
        ...provided,
        fontFamily: "iransans-regular",
      }),

      singleValue: (provided) => ({
        ...provided,
        fontFamily: "iransans-regular",
      }),
      valueContainer: (provided) => ({
        ...provided,
        fontFamily: "iransans-regular",
      }),
      placeholder: (provided) => ({
        ...provided,
        fontFamily: "iransans-regular",
      }),
    },

    typeOfCooperation: [
      {
        value: 1,
        label: "تمام وقت",
      },
      {
        value: 2,
        label: "پاره وقت",
      },
      {
        value: 3,
        label: "کارآموزی",
      },
      {
        value: 4,
        label: "دورکاری",
      },
    ],

    salary: [
      {
        value: 1,
        label: "کمتر از 1 میلیون",
      },
      {
        value: 2,
        label: "بین 1 تا 2.5 میلیون",
      },
      {
        value: 3,
        label: "بین 2.5 تا 3.5 میلیون",
      },
      {
        value: 4,
        label: "بین 3.5 تا 5 میلیون",
      },
      {
        value: 5,
        label: "بین 5 تا 8 میلیون",
      },
      {
        value: 6,
        label: "بیشتر از یک میلیون",
      },
    ],

    expriences: [
      {
        value: 1,
        label: "مهم نیست",
      },
      {
        value: 2,
        label: "کمتر از سه سال",
      },
      {
        value: 3,
        label: "بیبین 3 تا 7 سال",
      },
      {
        value: 4,
        label: "بیشتر از 7 سال",
      },
    ],
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.InitialUrlValue !== this.props.InitialUrlValue) {
      const listOfData = { ...nextProps.InitialUrlValue };

      for (let key in listOfData) {
        this.setState((prevState) => ({
          data: {
            ...prevState.data,
            [key]: listOfData[key] ? listOfData[key] : "",
          },
        }));
      }
    }
  };

  componentDidMount() {
    jobServices.getCategories().then((res) => {
      let categories = [];

      res.data.resul.map((item) =>
        categories.push({ value: item.id, label: item.name })
      );

      this.setState({
        categories: [...categories],
      });
    });

    citiesService.getCities().then((res) => {
      let cities = [];
      res.data.resul.map((item) => {
        cities.push({
          value: item.cityName,
          label: ` ${item.provinceName}، ${item.cityName} `,
        });
      });

      this.setState({ cities: [...cities] });
    });
  }

  changeHandler = (event) => {
    this.setSelectedValue(
      Array.isArray(event) ? event.map((x) => x.value) : []
    );
  };

  handleFilter = async (e, { action, name }) => {
    if (action === "select-option") {
      if (name === "category") {
        await this.setState({
          data: { ...this.state.data, [name]: e ? e.label : "" },
        });
      } else {
        await this.setState({
          data: { ...this.state.data, [name]: e ? e.value : "" },
        });
      }
      this.props.handleFilter(this.state.data);
    } else if (action === "clear") {
      await this.setState({
        data: { ...this.state.data, [name]: null },
      });
      this.props.handleFilter(this.state.data);
    }
  };

  render() {
    return (
      <div className=" filterContainer">
        {/* type of job  */}
        <div>
          <div
            className="srounded-md sbs-content sp-1"
            styles={{ fontFamily: "iransans-regular" }}
          >
            <Select
              isClearable
              value={this.state.categories.filter(
                (option) => option.label === this.state.data.category
              )}
              onChange={this.handleFilter}
              isSearchable={false}
              placeholder={"دسته بندی شغلی"}
              options={this.state.categories}
              name="category"
              styles={this.state.customStyles}
            />
          </div>
        </div>

        {/* type of cooperation  */}
        <div>
          <div className="srounded-md sbs-content sp-1">
            <Select
              isClearable
              value={this.state.typeOfCooperation.filter(
                (option) =>
                  option.value === parseInt(this.state.data.typeOfCooperation)
              )}
              onChange={this.handleFilter}
              isSearchable={false}
              placeholder={"نوع قرارداد"}
              options={this.state.typeOfCooperation}
              name="typeOfCooperation"
              styles={this.state.customStyles}
            />
          </div>
        </div>

        {/* salary  */}
        <div>
          <div className="srounded-md sbs-content  sp-1">
            <Select
              isClearable
              value={this.state.salary.filter(
                (option) => option.value === parseInt(this.state.data.salary)
              )}
              onChange={this.handleFilter}
              isSearchable={false}
              placeholder={"میزان حقوق"}
              options={this.state.salary}
              name="salary"
              styles={this.state.customStyles}
            />
          </div>
        </div>

        {/* experience  */}
        <div>
          <div className="srounded-md sbs-content sp-1">
            <Select
              isClearable
              value={this.state.expriences.filter(
                (option) =>
                  option.value === parseInt(this.state.data.workExperience)
              )}
              onChange={this.handleFilter}
              isSearchable={false}
              placeholder={"سابقه کار"}
              options={this.state.expriences}
              name="workExperience"
              styles={this.state.customStyles}
            />
          </div>
        </div>
      </div>
    );
  }
}
