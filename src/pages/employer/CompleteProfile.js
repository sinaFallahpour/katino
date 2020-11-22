import React, { Component } from "react";
import { Input } from "../../components";
import API_ADDRESS from "../../API_ADDRESS";
import axios from "axios";
import validator from "validator";

export class CompleteProfile extends Component {
  state = {
    userId: "",

    faCompanyName: "",

    enCompanyName: "",

    image: "",

    emergencPhone: "",

    url: "",

    fieldOfActivity: "",

    numberOfStaff: "",

    fieldOptions: [],

    errors: { faCN: "", enCN: "" },
  };

  async componentDidMount() {
    let categories;
    let fieldOptions = [];
    await axios.get(API_ADDRESS + "Categories/GetAllCategories").then((res) => {
      res.data.resul.map((item) => {
        fieldOptions.push({
          value: item.id,
          label: item.name,
        });
      });

      this.setState({
        fieldOptions: fieldOptions,
      });

      // categories = res.data.resul;
      // this.setState({
      //   completeProfile: {
      //     ...this.state,
      //     categories: res.data.resul,
      //   },
      // });
    });
  }

  async changeHandler(event) {
    const formData = { [event.target.name]: event.target.value };
    await this.setState({ ...this.state, ...formData });
  }

  fieldHandler(event) {
    this.state.fieldOfActivity = event.value;
  }

  staffHandler(event) {
    this.state.numberOfStaff = event.value;
  }

  submitHandler(event) {
    event.preventDefault();

    // if (this.formIsValid()) {
    let formData = new FormData();
    formData.append("Image", document.getElementById("image").files[0]);
    formData.append("userId", "cba461e7-20b4-4aaa-80ad-7b40f0491096");
    formData.append("PersianFullName", this.state.faCompanyName);
    formData.append("EngFullName", this.state.enCompanyName);
    formData.append("EmergencPhone", this.state.emergencPhone);
    formData.append("url", this.state.url);
    formData.append("FieldOfActivity", this.state.fieldOfActivity);
    formData.append("NumberOfStaff", this.state.numberOfStaff);
    axios
      .post(API_ADDRESS + "Account/CompanySubmitRegistrstion", formData, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("JWT")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.props.history.push("/Employer/Dashboard");
        }
      });
    // }
  }

  formIsValid() {
    let errors = {};

    // Persian Company Name
    let faCNEmpty = validator.isEmpty(this.state.faCompanyName);
    let faCNFormat = validator.isAlpha(this.state.faCompanyName, ["fa-IR"]);

    // English Company Name
    let enCNEmpty = validator.isEmpty(this.state.enCompanyName);
    let enCNFormat = validator.isAlpha(this.state.enCompanyName, ["en-US"]);

    // Telephone
    let ePEmpty = validator.isEmpty(this.state.emergencPhone);
    let ePNumber = validator.isNumeric(this.state.emergencPhone);
    let ePLength = this.state.emergencPhone.length >= 11 ? true : false;

    if (faCNEmpty) errors.faCN = "لطفا نام شرکت را وارد کنید.";
    else if (!faCNFormat) errors.faCN = "لطفا نام شرکت را به فارسی وارد کنید.";

    if (enCNEmpty) errors.enCN = "لطفا نام شرکت را وارد کنید.";
    else if (!enCNFormat)
      errors.enCN = "لطفا نام شرکت را به انگلیسی وارد کنید.";

    if (ePEmpty) errors.eP = "لطفا شماره تماس شرکت را وارد کنید.";

    this.setState({ ...this.state, errors });
  }

  render() {
    return (
      <section className="container-fluid spx-2 spx-lg-10 smy-10 spt-10">
        <div className="row">
          <aside className="col-12 col-lg-5 mx-auto">
            <form className="w-100" onSubmit={this.submitHandler.bind(this)}>
              <div className="bg-white srounded-md sp-2 smb-2">
                <h1 className="fs-l c-dark d-block text-center smb-5 ir-bl">
                  تکمیل پروفایل شرکت
                </h1>

                <Input
                  onChange={this.changeHandler.bind(this)}
                  type="text"
                  label="لطفا نام شرکت را به فارسی وارد کنید"
                  placeholder="نام شرکت به فارسی"
                  id="faCompanyName"
                  name="faCompanyName"
                  priority="required"
                />
                <span className="d-block c-danger fs-s ir-r smb-2">
                  {this.state.errors.faCN}
                </span>

                <Input
                  onChange={this.changeHandler.bind(this)}
                  type="text"
                  label="لطفا نام شرکت را به انگلیسی وارد کنید"
                  placeholder="نام شرکت به انگلیسی"
                  id="enCompanyName"
                  name="enCompanyName"
                  priority="required"
                />
                <span className="d-block c-danger fs-s ir-r smb-2">
                  {this.state.errors.enCN}
                </span>

                <Input
                  // onChange=
                  type="uploadLogo"
                  id="image"
                  name="image"
                  label="لطفا لوگوی شرکت خود را وارد کنید"
                />

                <Input
                  onChange={this.changeHandler.bind(this)}
                  type="text"
                  maxLength="11"
                  label="لطفا شماره تماس شرکت را وارد کنید"
                  placeholder="شماره تماس شرکت"
                  id="emergencPhone"
                  name="emergencPhone"
                  priority="required"
                />

                <Input
                  onChange={this.changeHandler.bind(this)}
                  type="text"
                  label="لطفا وبسایت شرکت را وارد کنید"
                  placeholder="وبسایت شرکت"
                  id="url"
                  name="url"
                />

                <Input
                  onChange={this.fieldHandler.bind(this)}
                  type="selection"
                  label="حوزه فعالیت شرکت"
                  placeholder="حوزه فعالیت خود را انتخاب کنید"
                  priority="required"
                  name="fieldOfActivity"
                  id="fieldOfActivity"
                  options={this.state.fieldOptions}
                />

                <Input
                  onChange={this.staffHandler.bind(this)}
                  type="selection"
                  label="تعداد پرسنل"
                  placeholder="محدوده تعداد پرنسل شرکت را انتخاب کنید"
                  priority="required"
                  name="numberOfStaff"
                  id="numberOfStaff"
                  options={[
                    { value: "0", label: "بین 2 تا 10 نفر" },
                    { value: "1", label: "بین 11 تا 50 نفر" },
                    { value: "2", label: "بین 51 تا 200 نفر" },
                    { value: "3", label: "بین 201 تا 500 نفر" },
                    { value: "4", label: "بین 501 تا 1000 نفر" },
                    { value: "5", label: "بیشتر از 1000 نفر" },
                  ]}
                />

                <button type="submit" className="btn btn-warning ir-r spx-4">
                  تایید
                </button>
              </div>
            </form>
          </aside>
        </div>
      </section>
    );
  }
}
