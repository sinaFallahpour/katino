import React, { Component } from "react";
import axios from "axios";
import API_ADDRESS from "../../API_ADDRESS";
import Select from "react-select";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from "react-router-dom";
import validator from "validator";

export class Fields extends Component {
  state = {
    hasPlan: false,

    validation: {
      title: {
        validaty: false,
        message: "",
      },

      fieldOfActivity: {
        validaty: false,
        message: "",
      },

      city: {
        validaty: false,
        message: "",
      },

      typeOfCooperation: {
        validaty: false,
        message: "",
      },

      salary: {
        validaty: false,
        message: "",
      },

      descriptionOfJob: {
        validaty: false,
        message: "",
      },

      gender: {
        validaty: false,
        message: "",
      },

      workExperience: {
        validaty: false,
        message: "",
      },

      degreeOfEducation: {
        validaty: false,
        message: "",
      },

      military:{
        validaty: false,
        message: "",
      }
    },

    allPlanFor: {},

    fields: {
      fieldOfActivity: "",
      title: "",
      city: "",
      typeOfCooperation: 0,
      salary: 0,
      workExperience: 0,
      degreeOfEducation: 0,
      gender: 0,
      military: "",
      descriptionOfJob: "",
    },

    categories: [],

    cities: [],

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
        label: "دور کاری",
      },
    ],

    salaries: [
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
        label: "بیشتر از 8 میلیون",
      },
      {
        value: 7,
        label: "توافقی",
      },
    ],

    sex: [
      {
        value: 0,
        label: "مهم نیست",
      },
      {
        value: 1,
        label: "مرد",
      },
      {
        value: 2,
        label: "زن",
      },
    ],

    exprience: [
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
        label: "بین سه تا هفت سال",
      },
      {
        value: 4,
        label: "بیشتر از هفت سال",
      },
    ],

    militaryList: "",

    education: [
      {
        value: 1,
        label: "مهم نیست",
      },
      {
        value: 2,
        label: "دیپلم",
      },
      {
        value: 3,
        label: "کاردانی",
      },
      {
        value: 4,
        label: "کارشناسی",
      },
      {
        value: 5,
        label: "کارشناسی ارشد",
      },
      {
        value: 6,
        label: "دکترا",
      },
    ],
  };

  async componentDidMount() {
    let categories = [];
    let cities = [];

    await axios.get(API_ADDRESS + "Categories/GetAllCategories").then((res) => {
      res.data.resul.map((item) => {
        categories.push({ value: item.id, label: item.name });
      });
    });

    await axios.get(API_ADDRESS + "Account/GetCities").then((res) => {
      res.data.resul.map((item) => {
        cities.push({
          value: item.cityName,
          label: `${item.provinceName}، ${item.cityName}`,
        });
      });
    });

    this.setState({ ...this.state, categories: categories, cities: cities });

    axios
      .post(
        API_ADDRESS + "Adver/GetUserPlanWhenCreateAdver",
        {},
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => {
        res.data.resul.hasPlan === false
          ? this.setState({
              hasPlan: false,
              planId: res.data.resul.allPlanFor.id,
              planDetails: res.data.resul.allPlanFor,
            })
          : this.setState({ hasPlan: true });
      });
  }

  checkBoxHandler = async (event) => {
    let value = event.target.value;
    let checked = event.target.checked;

    if (checked === true) {
      if (!this.state.militaryList.includes(value)) {
        let list = this.state.militaryList;
        await this.setState({
          ...this.state,
          militaryList:
            this.state.militaryList !== ""
              ? `${this.state.militaryList}, ${value}`
              : `${this.state.militaryList}${value}`,
        });
        // list = list.slice(0, -1);
      }
    } else if (checked === false) {
      let list = await this.state.militaryList;
      list === value
        ? (list = list.replace(value, ""))
        : (list = list.replace(`, ${value}`, ""));
      // list = ;
      // list=list.replace(" ","")
      // if (list.includes(" ")) {
      // list = list.replace(" ", "");
      // list = list.replace(",,", "");
      // }
      // list = list.slice(0, -1);
      // list = list.replace(", ,", " , ");
      // list=list.substring(2)
      this.setState({ ...this.state, militaryList: list });
    }
  };

  changeHandler = (event) => {
    const formData = { [event.target.name]: event.target.value };
    this.setState({ fields: { ...this.state.fields, ...formData } });
  };

  fieldOfActivityHandler = async (event) => {
    await this.setState({
      fields: { ...this.state.fields, fieldOfActivity: `${event.value}` },
    });
  };

  citiyHandler = async (event) => {
    await this.setState({
      fields: { ...this.state.fields, city: event.value },
    });
  };

  typeOfCooperationHandler = async (event) => {
    await this.setState({
      fields: { ...this.state.fields, typeOfCooperation: event.value },
    });
  };

  salaryHandler = async (event) => {
    await this.setState({
      fields: { ...this.state.fields, salary: event.value },
    });
  };

  editorHandler = async (event, editor) => {
    const data = await editor.getData();
    await this.setState({
      fields: { ...this.state.fields, descriptionOfJob: data },
    });
  };

  sexHandler = async (event) => {
    await this.setState({
      fields: { ...this.state.fields, gender: event.value },
    });
  };

  exprienceHandler = async (event) => {
    await this.setState({
      fields: { ...this.state.fields, workExperience: event.value },
    });
  };

  degreeOfEducationHandler = async (event) => {
    await this.setState({
      fields: { ...this.state.fields, degreeOfEducation: event.value },
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    
    if(this.validation()){

        axios
      .post(
        API_ADDRESS + "Adver/CreateAdver",
        {
          fieldOfActivity: this.state.fields.fieldOfActivity,
          title: this.state.fields.title,
          city: this.state.fields.city,
          typeOfCooperation: this.state.fields.typeOfCooperation,
          salary: this.state.fields.salary,
          workExperience: this.state.fields.workExperience,
          degreeOfEducation: this.state.fields.degreeOfEducation,
          gender: this.state.fields.gender,
          military: this.state.militaryList,
          descriptionOfJob: this.state.fields.descriptionOfJob,
        },
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          },
        }
      )
      .then(() => {
        // if (this.state.hasPlan === true)
        this.props.prop.history.push({ pathname: "/Employer/Dashboard" });
        // else
      })
      .catch((err) => {
        // if (err.response.status === 400) {
        // this.props.prop.history.push(``);
        // }
      });
    // }
      }
  };

  validation = () => {
    // Title
    let titleEmpty = validator.isEmpty(this.state.fields.title);

    if (titleEmpty === true) {
      this.setState({
        validation: {
          title: { validaty: true, message: "لطفا عنوان آگهی را انتخاب کنید." },
        },
      });
    } else {
      this.setState({ validation: { title: false } });
    }

    
    // Fields Activity
    let fAEmpty = validator.isEmpty(this.state.fields.fieldOfActivity);
    
    if (fAEmpty === true) {
      this.setState({
        validation: {
          fieldOfActivity: {
            validaty: true,
            message: "لطفا دسته بندی آگهی را انتخاب کنید.",
          },
        },
      });
    } else {
      this.setState({
        validation: {
          fieldOfActivity: {
            validaty: false,
            message: "",
          },
        },
      });
    }

    // City
    let cityEmpty = validator.isEmpty(this.state.fields.city);

    if (cityEmpty === true) {
      this.setState({
        validation: {
          city: {
            validaty: true,
            message: "لطفا شهر مربوط به آگهی را انتخاب کنید.",
          },
        },
      });
    } else {
      this.setState({
        validation: {
          city: {
            validaty: false,
            message: "",
          },
        },
      });
    }


    // Cooperation of Type
    let cOTEmpty = validator.isEmpty(this.state.fields.typeOfCooperation);

    if (this.state.fields.typeOfCooperation === 0 || cOTEmpty === true) {
      this.setState({
        validation: {
          typeOfCooperation: {
            validaty: true,
            message: "لطفا نوع همکاری مربوط به آگهی را انتخاب کنید.",
          },
        },
      });
    } else {
      this.setState({
        validation: {
          typeOfCooperation: {
            validaty: false,
            message: "",
          },
        },
      });
    }

    // Salary
    let salaryEmpty = validator.isEmpty(this.state.fields.salary);

    if (this.state.fields.salary === 0 || salaryEmpty === true) {
      this.setState({
        validation: {
          salary: {
            validaty: true,
            message: "لطفا میزان حقوق مربوط به آگهی را انتخاب کنید.",
          },
        },
      });
    } else {
      this.setState({
        validation: {
          salary: {
            validaty: false,
            message: "",
          },
        },
      });
    }

    // Description
    let descriptionEmpty = validator.isEmpty(
      this.state.fields.descriptionOfJob
    );

    if (descriptionEmpty === true) {
      this.setState({
        validation: {
          descriptionOfJob: {
            validaty: true,
            message: "لطفا توضیحات مربوط به آگهی را انتخاب کنید.",
          },
        },
      });
    } else {
      this.setState({
        validation: {
          descriptionOfJob: {
            validaty: false,
            message: "",
          },
        },
      });
    }

    // Gender
    let genderEmpty = validator.isEmpty(this.state.fields.gender);

    if (this.state.fields.gender === 0 || genderEmpty === true) {
      this.setState({
        validation: {
          gender: {
            validaty: true,
            message: "لطفا جنسیت مربوط به آگهی را انتخاب کنید.",
          },
        },
      });
    } else {
      this.setState({
        validation: {
          gender: {
            validaty: false,
            message: "",
          },
        },
      });
    }

    // degreeOfEducation
    let eduEmpty = validator.isEmpty(this.state.fields.degreeOfEducation);

    if (this.state.fields.degreeOfEducation === 0 || eduEmpty === true) {
      this.setState({
        validation: {
          degreeOfEducation: {
            validaty: true,
            message: "لطفا حداقل مدرک تحصیلی مربوط به آگهی را انتخاب کنید.",
          },
        },
      });
    } else {
      this.setState({
        validation: {
          degreeOfEducation: {
            validaty: false,
            message: "",
          },
        },
      });
    }

    // workExperience
    let workExperienceEmpty = validator.isEmpty(
      this.state.fields.workExperience
    );

    if (
      this.state.fields.workExperience === 0 ||
      workExperienceEmpty === true
    ) {
      this.setState({
        validation: {
          workExperience: {
            validaty: true,
            message: "لطفا سابقه کار مرتبط با آگهی را انتخاب کنید.",
          },
        },
      });
    } else {
      this.setState({
        validation: {
          workExperience: {
            validaty: false,
            message: "",
          },
        },
      });
    }

    // military
    let militaryEmpty = validator.isEmpty(
      this.state.fields.workExperience
    );

    if (militaryEmpty === true) {
      this.setState({
        validation: {
          military: {
            validaty: true,
            message: "لطفا سابقه کار مرتبط با آگهی را انتخاب کنید.",
          },
        },
      });
    } else {
      this.setState({
        validation: {
          military: {
            validaty: false,
            message: "",
          },
        },
      });
    }

    return (
      this.state.validation.title.validaty!==true&&
    this.state.validation.fieldOfActivity.validaty!==true&&
    this.state.validation.city.validaty!==true&&
    this.state.validation.typeOfCooperation.validaty!==true&&
    this.state.validation.salary.validaty!==true&&
    this.state.validation.descriptionOfJob.validaty!==true&&
    this.state.validation.gender.validaty!==true&&
    this.state.validation.workExperience.validaty!==true&&
    this.state.validation.degreeOfEducation.validaty!==true&&
    this.state.validation.military.validaty!==true
    )
  };

  render() {
    return (
      <form className="w-100" onSubmit={this.submitHandler}>
        <div className="row">
          <div className="col-12 smb-2">
            <div className="form-group mb-0">
              <input
                onChange={this.changeHandler}
                type="text"
                placeholder="عنوان آگهی"
                className="form-control ir-r shadow-none"
                id="title"
                name="title"
              />

              {this.state.validation.title.validaty === true ? (
                <small className="ir-r d-block text-right c-danger fs-s smt-1">
                  {this.state.validation.title.message}
                </small>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-12 col-lg-6 smb-2 ir-r">
            <label
              className="ir-r d-block text-right smb-1"
              htmlFor="categories"
            >
              دسته بندی شغلی
            </label>

            <Select
              onChange={this.fieldOfActivityHandler}
              id="fieldOfActivity"
              options={this.state.categories}
              placeholder="دسته بندی مربوطه را جستجو کنید..."
            />

            {this.state.validation.fieldOfActivity.validaty === true ? (
              <small className="ir-r d-block text-right c-danger fs-s smt-1">
                {this.state.validation.fieldOfActivity.message}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="col-12 col-lg-6 smb-2 ir-r">
            <label className="ir-r d-block text-right smb-1" htmlFor="cities">
              انتخاب استان و شهر
            </label>
            <Select
              onChange={this.citiyHandler}
              id="cities"
              options={this.state.cities}
              placeholder="شهر مربوطه را جستجو کنید..."
            />

            {this.state.validation.city.validaty === true ? (
              <small className="ir-r d-block text-right c-danger fs-s smt-1">
                {this.state.validation.city.message}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="col-12 col-lg-6 smb-2 ir-r">
            <label
              className="ir-r d-block text-right smb-1"
              htmlFor="cooperationType"
            >
              نوع همکاری
            </label>

            <Select
              onChange={this.typeOfCooperationHandler}
              isSearchable={false}
              id="cooperationType"
              options={this.state.cooperationType}
              placeholder="نوع همکاری را انتخاب کنید..."
            />

            {this.state.validation.typeOfCooperation.validaty === true ? (
              <small className="ir-r d-block text-right c-danger fs-s smt-1">
                {this.state.validation.typeOfCooperation.message}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="col-12 col-lg-6 smb-2 ir-r">
            <label className="ir-r d-block text-right smb-1" htmlFor="salary">
              میزان حقوق
            </label>
            <Select
              onChange={this.salaryHandler}
              isSearchable={false}
              id="salary"
              options={this.state.salaries}
              placeholder="میزان حقوق را انتخاب کنید..."
            />

            {this.state.validation.salary.validaty === true ? (
              <small className="ir-r d-block text-right c-danger fs-s smt-1">
                {this.state.validation.salary.message}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="col-12 smb-2 ir-r">
            <CKEditor
              onChange={this.editorHandler}
              className="cke_rtl"
              editor={ClassicEditor}
              config={{
                toolbar: [
                  "|",
                  "bold",
                  "italic",
                  "numberedList",
                  "bulletedList",
                  "|",
                  "undo",
                  "redo",
                ],
                removePlugins: ["Heading", "Link"],
                language: "fa",
              }}
            />

            {this.state.validation.descriptionOfJob.validaty === true ? (
              <small className="ir-r d-block text-right c-danger fs-s smt-1">
                {this.state.validation.descriptionOfJob.message}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="col-12 col-lg-6 smb-2 ir-r">
            <label className="ir-r d-block text-right smb-1" htmlFor="sex">
              جنسیت
            </label>
            <Select
              onChange={this.sexHandler}
              isSearchable={false}
              id="sex"
              options={this.state.sex}
              placeholder="جنسیت را انتخاب کنید..."
            />

            {this.state.validation.gender.validaty === true ? (
              <small className="ir-r d-block text-right c-danger fs-s smt-1">
                {this.state.validation.gender.message}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="col-12 col-lg-6 smb-2 ir-r">
            <label
              className="ir-r d-block text-right smb-1"
              htmlFor="exprience"
            >
              سابقه کار مرتبط
            </label>
            <Select
              onChange={this.exprienceHandler}
              isSearchable={false}
              id="exprience"
              options={this.state.exprience}
              placeholder="سابقه کار مورد نیاز را انتخاب کنید..."
            />

            {this.state.validation.workExperience.validaty === true ? (
              <small className="ir-r d-block text-right c-danger fs-s smt-1">
                {this.state.validation.workExperience.message}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="col-12 col-lg-6 smb-2 ir-r">
            <label
              className="ir-r d-block text-right smb-1"
              htmlFor="education"
            >
              حداقل مدرک تحصیلی
            </label>
            <Select
              onChange={this.degreeOfEducationHandler}
              isSearchable={false}
              id="education"
              options={this.state.education}
              placeholder="حداقل مدرک تحصیلی مورد نیاز را انتخاب کنید..."
            />

            {this.state.validation.degreeOfEducation.validaty === true ? (
              <small className="ir-r d-block text-right c-danger fs-s smt-1">
                {this.state.validation.degreeOfEducation.message}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="col-12 col-lg-6 smb-2 ir-r">
            <label className="ir-r d-block text-right smb-1">
              وضعیت نظام وظیفه
            </label>

            <div className="form-check form-check-inline">
              <input
                onClick={this.checkBoxHandler}
                className="form-check-input"
                type="checkbox"
                id="checkbox1"
                value="مهم نیست"
              />
              <label className="form-check-label" htmlFor="checkbox1">
                مهم نیست
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                onClick={this.checkBoxHandler}
                className="form-check-input"
                type="checkbox"
                id="checkbox2"
                value="مشمول"
              />
              <label className="form-check-label" htmlFor="checkbox2">
                مشمول
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                onClick={this.checkBoxHandler}
                className="form-check-input"
                type="checkbox"
                id="checkbox3"
                value="معاف"
              />
              <label className="form-check-label" htmlFor="checkbox3">
                معاف
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                onClick={this.checkBoxHandler}
                className="form-check-input"
                type="checkbox"
                id="checkbox4"
                value="دارای کارت پایان خدمت"
              />
              <label className="form-check-label" htmlFor="checkbox4">
                دارای کارت پایان خدمت
              </label>
            </div>
          
            {this.state.validation.military.validaty === true ? (
              <small className="ir-r d-block text-right c-danger fs-s smt-1">
                {this.state.validation.military.message}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="smt-3 col-12">
            <div className="row d-lg-flex align-items-lg-center">
              {this.state.hasPlan === false ? (
                <div className="col-12 col-lg-6 smb-2 mb-lg-0 ir-r">
                  هزینه انتشار آگهی برای 30 روز، 90,000 تومان می‌باشد.
                </div>
              ) : (
                ""
              )}

              <div className="col-12 col-lg-3 mt-0 smt-lg-3 smb-2 mb-lg-0 ir-r mr-auto">
                <button
                  type="button"
                  className="btn btn-light ir-r d-block w-100"
                >
                  ذخیره در پیش نویس
                </button>
              </div>

              <div className="col-12 col-lg-3 mt-0 smt-lg-3 smb-2 mb-lg-0 ir-r ml-auto">
                {this.state.hasPlan === false ? (
                  <Link
                    onClick={this.passData}
                    className="btn btn-warning ir-r d-block w-100"
                    to={`/Employer/Dashboard/Plans/${this.state.planId}/Payment`}
                  >
                    پرداخت هزینه
                  </Link>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-success ir-r d-block w-100"
                  >
                    فعالسازی و انتشار
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
