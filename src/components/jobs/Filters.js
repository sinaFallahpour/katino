import React, { Component } from "react";
import Select from "react-select";
import { jobServices } from "./jobServices";
import { citiesService } from "../citiesService";

export class Filters extends Component {
  state = {
    categories: [],
    cities: [],

    selectedValue: [],
    setSelectedValue: [],

    cooperationType: [
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

  render() {
    return (
      <div className="filters row smt-4">
        <div className="col-12 col-lg-3 ir-r smb-2">
          <div className="srounded-md sbs-content bg-white sp-1">
            <Select
              onChange={this.changeHandler}
              isMulti
              isClearable
              value={this.state.categories.filter((obj) =>
                this.state.selectedValue.includes(obj.value)
              )}
              isSearchable={false}
              placeholder={"دسته بندی شغلی"}
              options={this.state.categories}
            />
          </div>
        </div>

        <div className="col-12 col-lg-3 ir-r smb-2">
          <div className="srounded-md sbs-content bg-white sp-1">
            <Select
              isMulti
              isSearchable={false}
              placeholder={"نوع قرارداد"}
              options={this.state.cooperationType}
            />
          </div>
        </div>

        <div className="col-12 col-lg-3 ir-r smb-2">
          <div className="srounded-md sbs-content bg-white sp-1">
            <Select isMulti placeholder={"شهر"} options={this.state.cities} />
          </div>
        </div>

        <div className="col-12 col-lg-3 ir-r smb-2">
          <div className="srounded-md sbs-content bg-white sp-1">
            <Select
              isMulti
              isSearchable={false}
              placeholder={"میزان حقوق"}
              options={this.state.salary}
            />
          </div>
        </div>

        <div className="col-12 col-lg-3 ir-r mb-0">
          <div className="srounded-md sbs-content bg-white sp-1">
            <Select
              isMulti
              isSearchable={false}
              placeholder={"سابقه کار"}
              options={this.state.expriences}
            />
          </div>
        </div>
      </div>
    );
  }
}
