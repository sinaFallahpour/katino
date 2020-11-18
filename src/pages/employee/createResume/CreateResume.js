import React, { Component } from "react";
import axios from "axios";
import API_ADDRESS from "../../../API_ADDRESS";
import Select from "react-select";

import { toast } from "react-toastify";
import { SideBar } from "../../../components";
import agent, { avatarUrl } from "../../../core/agent";
import { salaries, typeOfCooperation, expriences } from "./salaries";

export class CreateResume extends Component {
  state = {
    hasImage: false,
    cities: [],

    editMode: false,
  };

  async componentDidMount() {
    await axios
      .get(`${API_ADDRESS}UserJobShortDescription/GetUserShortDescription`, {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          "content-type": "application/json;charset=utf-8",
        },
      })
      .then((res) => this.setState({ info: res.data.resul }));

    const res = await agent.Cities.Cities();

    const { data } = await agent.CreateResome.loadEmployeePersonalInformation();

    const resAboutMe = await agent.CreateResome.LoadEmployeeAboutMe();

    const resJobSkill = await agent.CreateResome.GetAlljobSkillsForSelect();
    const resuserJobSkill = await agent.CreateResome.getAllUserJobSkillsForCurrentUser();

    const resuJobPreference = await agent.CreateResome.GetUserJobPreferenceForCurrentUser();

    await this.getResomePercent();



    await this.setState({
      info2: data.resul,
      cities: res.data.resul,
      jobSkills: resJobSkill.data.resul,
      userJobSkills: resuserJobSkill.data.resul,
      aboutMen: resAboutMe.data.resul,
      info8: resuJobPreference.data.resul
    });

  }




  getResomePercent = async () => {
    // event.preventDefault();

    try {
      // return params;
      let { data } = await agent.CreateResome.GetResomePercent();
      this.setState({ resomePercent: data.resul })
      // toast.success("رزومه با موفقیت ارسال شد");
    } catch (err) {
      if (err.response.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else toast.error(err.response.message[0]);
    }
  };








  async avatarHandler(event) {

    // await this.setState({
    //   avatarFile: event.target.files[0],
    // });

    await this.setState({
      avatarSRC: URL.createObjectURL(event.target.files[0]),
    });

    let formData = new FormData();

    formData.append("image", document.getElementById("avatar").files[0]);

    axios
      .post(API_ADDRESS + "Account/EmployeeChangeAvatar", formData, {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
        },
      })
      .then(async (data) => {
        // avatarUrl + "/" + this.state.info2?.employeeAvatar
        await this.setState({ info2: { ...this.state.info2, employeeAvatar: data.data.resul } })

        // this.setState({ hasImage: true })
      }
      )
      .catch(
        this.setState({
          errors: {
            avatar: "خطایی رخ داده است لطفا دوباره امتحان کنید.",
          },
        })
      );
  }

  editDesc() {
    this.setState({ editMode: true });
  }

  cancel() {
    this.setState({ editMode: false });
  }

  async radionHandler(event) {
    await this.setState({
      info: {
        ...this.state.info,
        employmentStatus: parseInt(event.target.value),
      },
    });
  }

  returnEmploymentStatus = () => {
    var employmentStatus = this.state.info?.employmentStatus;
    if (!employmentStatus) return;
    if (employmentStatus == 1) return "جویای شغل";
    if (employmentStatus == 2) return "شاغل";
    if (employmentStatus == 3) return "به دنبال شغل بهتر";
  };

  async changeHandler(event) {
    const formData = { [event.target.name]: event.target.value };

    await this.setState({ ...this.state, ...formData });
  }






  SubmitHandler(event) {
    event.preventDefault();

    axios
      .post(
        API_ADDRESS + "/UserJobShortDescription/EditUserShortDescription ",
        {
          id: this.state.info.id,
          jobTitle: this.state.info.jobTitle,
          employmentStatus: this.state.info.employmentStatus,
        },
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => toast.success("با موفقیت ذخیره شد"))
      .catch(() => toast.error("ذخیره با مشکل مواجه شد، دوباره امتحان کنید."))
      .finally(() => {
        this.cancel();
      });
  }

  returnGenderStatus = () => {
    var genderStatus = this.state.info2?.gender;
    // alert(this.state.info2?.gender);
    // if (!genderStatus) return;
    if (genderStatus == 0) return "مرد";
    if (genderStatus == 1) return "زن";
  };

  returnMarridStatus = () => {
    var marridStatus = this.state.info2?.isMarreid;
    // alert(this.state.info2?.gender);
    // if (!genderStatus) return;
    if (marridStatus) return "مجرد";
    if (!marridStatus) return "متاهل";
  };




  returnSalary = () => {

    var status = this.state.info8?.salary;
    // alert(status)
    // alert(this.state.info2?.gender);
    // if (!genderStatus) return;
    if (status == 0) return "کمتر از 1 میلیون";
    if (status == 1) return "بین 2.5 تا 3.5 میلیون";
    if (status == 2) return "بین 3.5 تا 5 میلیون";
    if (status == 3) return "بین 5 تا 8 میلیون";
    if (status == 4) return "بین 1 تا 2.5 میلیون";
    if (status == 5) return "بیشتر از یک میلیون";
  };




  returnTypeOfCooperation = () => {
    var status = this.state.info8?.typeOfCooperation
    // alert(status)
    if (status == 0) return "تمام وقت";
    if (status == 1) return "پاره وقت";
    if (status == 2) return "کارآموزی";
    if (status == 3) return "دورکاری";
  };



  returnSenioritylevel = () => {
    var status = this.state.info8?.senioritylevel
    // alert(status)
    if (status == 0) return "مهم نیست";
    if (status == 1) return "کمتر از سه سال";
    if (status == 2) return "بیبین 3 تا 7 سال";
    if (status == 3) return "بیشتر از 7 سال";

  };



  returnMarridStatus = () => {
    var marridStatus = this.state.info2?.isMarreid;
    // alert(this.state.info2?.gender);
    // if (!genderStatus) return;
    if (marridStatus) return "مجرد";
    if (!marridStatus) return "متاهل";
  };



  submitHandler = async (event) => {
    event.preventDefault();

    try {
      // return params;
      let { data } = await agent.CreateResome.editEmployeePersonalInformation(
        this.props.id
      );
      toast.success("رزومه با موفقیت ارسال شد");
    } catch (err) {
      if (err.response.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else toast.error(err.response.message[0]);
    }
  };

  SubmitPersonalInfo = async (event) => {
    event.preventDefault();

    try {
      // return params;
      let data1 = { ...this.state.info2 };
      if (data1.isMarreid == "false") data1.isMarreid = false;
      else data1.isMarreid = true;
      let { data } = await agent.CreateResome.editEmployeePersonalInformation(
        data1
      );
      console.log(data);
      toast.success("ثبت موفقیت آمیز");
      this.setState({ editMode1: false });
    } catch (err) {
      if (err.response.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else {
        for (let index = 0; index < err.response.data.message.length; index++) {
          toast.error(err.response.data.message[index]);
        }
      }
    }
  };

  SubmitAboutMen = async (event) => {
    event.preventDefault();

    try {
      // return params;
      let obj = { aboutMe: this.state.aboutMen }
      let { data } = await agent.CreateResome.AddEmployeeAboutMen(obj);
      toast.success("ثبت موفقیت آمیز");
      this.setState({ editMode2: false });
    } catch (err) {
      if (err.response?.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else {
        for (let index = 0; index < err.response.data.message.length; index++) {
          toast.error(err.response.data.message[index]);
        }
      }
    }
  };

  SubmitJobSkill = async (event) => {
    event.preventDefault();

    try {
      // return params;
      let currentJobSkill = this.state.currentJobSkill
      let obj = { jobSkillId: currentJobSkill?.id }
      let { data } = await agent.CreateResome.AddUserJobSkill(obj);

      // let userJobSkills = this.state.userJobSkills.concat({ id: currentJobSkill.id, jobSkillName: currentJobSkill.jobSkillName });
      let userJobSkills = this.state.userJobSkills.concat({ id: data.resul, jobSkillName: currentJobSkill.jobSkillName });
      this.setState({
        userJobSkills,
        editMode4: false
      });
      toast.success("ثبت موفقیت آمیز");
    } catch (err) {
      if (err.response?.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else {
        for (let index = 0; index < err.response.data.message.length; index++) {
          toast.error(err.response.data.message[index]);
        }
      }
    }
  };





  SubmitJobPreference = async (event) => {
    event.preventDefault();

    try {
      let obj = this.state.info8
      let { data } = await agent.CreateResome.AddUserJobPreference(obj);
      this.setState({
        editMode8: false
      });
      toast.success("ثبت موفقیت آمیز");
    } catch (err) {
      if (err.response?.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response?.status === 404) toast.error("خطای رخ داده ");
      else if (err.response?.status === 500) toast.error("مشکلی رخ داده ");
      else {
        for (let index = 0; index < err?.response?.data?.message?.length; index++) {
          toast.error(err.response.data.message[index]);
        }
      }
    }
  };


  deleJobSkills = async (id) => {
    // event.preventDefault();
    try {
      // // return params;
      // let currentJobSkill = this.state.currentJobSkill
      // let obj = { jobSkillId: currentJobSkill?.id }
      let { data } = await agent.CreateResome.DeleteUserJobSkill(id);

      this.setState({
        userJobSkills: this.state.userJobSkills.filter(
          item => item.id !== id,
        ),
      });

      // let userJobSkills = this.state.userJobSkills.concat({ id: currentJobSkill.id, jobSkillName: currentJobSkill.jobSkillName });
      // this.setState({
      //   userJobSkills,
      //   editMode4: false
      // });

      toast.success("حذف موفقیت آمیز");
      // this.setState({ editMode2: false });
    } catch (err) {
      if (err.response?.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
      else {
        for (let index = 0; index < err.response.data.message.length; index++) {
          toast.error(err.response.data.message[index]);
        }
      }
    }
  };














  // SubmitJobSkill = async (event) => {
  //   event.preventDefault();

  //   try {
  //     // return params;
  //     console.clear()
  //     console.log('11111111');

  //     console.log(this.state.currentJobSkill?.id);
  //     alert(1)
  //     let { data } = await agent.CreateResome.AddUserJobSkill(this.state.currentJobSkill.id);
  //     toast.success("ثبت موقیت آمیز");
  //     this.setState({ editMode2: false });
  //   } catch (err) {
  //     if (err.response?.status === 401) toast.error("لطفا وارد شوید.");
  //     else if (err.response.status === 404) toast.error("خطای رخ داده  ");
  //     else if (err.response.status === 500) toast.error("مشکلی رخ داده ");
  //     else {
  //       for (let index = 0; index < err.response.data.message.length; index++) {
  //         toast.error(err.response.data.message[index]);
  //       }
  //     }
  //   }
  // };




  // get cities=()=>{}
  render() {
    // let cities = [];

    // this.props.cities.map((id) => {
    //   cities.push({
    //     value: id.cityName,
    //     label: ` ${id.provinceName}، ${id.cityName} `,
    //   });
    // });

    return (
      <section className="container-fluid create-ad spx-2 spx-lg-10 smy-10 spt-10">
        <div className="row">
          <aside className="col-12 col-lg-8 smb-2 mb-lg-0">
            <h3 className="d-block text-right ir-b smb-3 c-dark">
              ویرایش پروفایل
            </h3>
            <div
              className="bg-white srounded-md sp-2 smb-3"
            >
              <div className="row">
                <div className="col-12 col-lg-3 d-lg-flex flex-column justify-content-center">
                  <img
                    style={{ width: "212px" }}
                    className="w-100 d-block srounded-sm"
                    src={avatarUrl + "/" + this.state.info2?.employeeAvatar || "/img/user-profile.png"
                    }
                    alt=""
                  />
                  <input
                    onChange={this.avatarHandler.bind(this)}
                    type="file"
                    className="d-none"
                    accept="image/x-png, image/jpeg"
                    id="avatar"
                  />
                  <label
                    htmlFor="avatar"
                    className="btn btn-light ir-r w-100 smt-1"
                  >
                    تغییر عکس
                  </label>

                </div>

                <div className="col-12 col-lg-9">
                  {!this.state.editMode ? (
                    <header className="d-flex justify-content-between align-items-center">
                      <h3 className="ir-b c-primary text-right d-block fs-m smb-2">
                        {this.state.info
                          ? this.state.info.userFullName
                          : "درحال بارگذاری..."}
                      </h3>

                      <button
                        onClick={this.editDesc.bind(this)}
                        type="button"
                        className="btn btn-light ir-r"
                      >
                        ویرایش
                      </button>
                    </header>
                  ) : (
                      <header className="d-flex justify-content-between align-items-center">
                        <h3 className="ir-b c-primary text-right d-block fs-m smb-2">
                          ویرایش اطلاعات
                      </h3>

                        <button
                          onClick={this.cancel.bind(this)}
                          type="button"
                          className="btn btn-light ir-r"
                        >
                          بازگشت
                      </button>
                      </header>
                    )}

                  {!this.state.editMode ? (
                    <div className="content d-lg-flex flex-column justify-content-center">
                      <ul className="list-group list-group-flush p-0">
                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            عنوان شغلی:
                            <span className="c-regular">
                              {this.state.info ? this.state.info.jobTitle : "-"}
                              {console.log(this.state.info)}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            وضعیت اشتغال:{" "}
                            <span className="c-regular">
                              {this.returnEmploymentStatus()}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            آخرین شرکت:
                            <span className="c-regular">
                              {this.state.info
                                ? this.state.info.lastCompanies
                                : "-"}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            آخرین مدرک تحصیلی:{" "}
                            <span className="c-regular">
                              {this.state.info
                                ? this.state.info.lastEducationBackground
                                : "-"}
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  ) : (
                      <div className="content d-lg-flex flex-column justify-content-center">
                        <form onSubmit={this.SubmitHandler.bind(this)}>
                          <ul className="list-group list-group-flush p-0">
                            <li className="list-group-item border-0 p-0">
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="fullName"
                                >
                                  نام و نام خانوادگی
                              </label>

                                <div className="form-group d-flex justify-content-center align-items-center">
                                  <input
                                    disabled
                                    name="fullName"
                                    value={this.state.info.userFullName || ""}
                                    id="fullName"
                                    className="form-control digit d-block fs-m text-right ir-r text-regular shadow-none"
                                    type="text"
                                    placeholder="مثال: نام و نام خانوادگی"
                                  />
                                </div>
                              </div>
                            </li>

                            <li className="list-group-item border-0 p-0">
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="jobTitle"
                                >
                                  عنوان شغلی
                              </label>

                                <div className="form-group d-flex justify-content-center align-items-center">
                                  <input
                                    onChange={(e) => {
                                      this.setState({
                                        info: {
                                          ...this.state.info,
                                          jobTitle: e.target.value,
                                        },
                                      });
                                    }}
                                    name="jobTitle"
                                    value={this.state.info.jobTitle || ""}
                                    id="jobTitle"
                                    className="form-control digit d-block fs-m text-right ir-r text-regular shadow-none"
                                    type="text"
                                    placeholder="مثال: برنامه نویس فرانت اند"
                                  />
                                </div>
                              </div>
                            </li>

                            <li className="list-group-item border-0 p-0">
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="employmentStatus"
                                >
                                  وضعیت اشتغال
                              </label>

                                <div>
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input

                                      onChange={this.radionHandler.bind(this)}
                                      checked={
                                        this.state.info.employmentStatus == 1
                                      }
                                      type="radio"
                                      value="1"
                                      id="status1"
                                      name="status"
                                      className="custom-control-input"
                                    />
                                    <label
                                      className="custom-control-label ir-r"
                                      htmlFor="status1"
                                    >
                                      جویای شغل
                                  </label>
                                  </div>

                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                      onChange={this.radionHandler.bind(this)}
                                      checked={
                                        this.state.info.employmentStatus == 2
                                      }
                                      type="radio"
                                      value="2"
                                      id="status2"
                                      name="status"
                                      className="custom-control-input"
                                    />
                                    <label
                                      className="custom-control-label ir-r"
                                      htmlFor="status2"
                                    >
                                      شاغل
                                  </label>
                                  </div>

                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                      onChange={this.radionHandler.bind(this)}
                                      checked={
                                        this.state.info.employmentStatus == 3
                                      }
                                      type="radio"
                                      value="3"
                                      id="status3"
                                      name="status"
                                      className="custom-control-input"
                                    />
                                    <label
                                      className="custom-control-label ir-r"
                                      htmlFor="status3"
                                    >
                                      به دنبال شغل بهتر
                                  </label>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>

                          <button
                            type="submit"
                            className="btn btn-success ir-r fs-m smt-2"
                          >
                            ذخیره
                        </button>
                        </form>
                      </div>
                    )}
                </div>
              </div>
            </div>
            {/* </aside> */}

            {/* <aside className="col-12 col-lg-8 smb-2 mb-lg-0 mt-4"> */}
            <h3 className="d-block text-right ir-b smb-3 c-dark">
              اطلاعات فردی
            </h3>
            <div
              className="bg-white srounded-md sp-2 smb-3"
            >
              <div className="row">
                <div className="col-12 col-lg-9">
                  {!this.state.editMode2 ? (
                    <header className="d-flex justify-content-between align-items-center">
                      {/* <h3 className="ir-b c-primary text-right d-block fs-m smb-2">
                        {this.state.info
                          ? this.state.info.userFullName
                          : "درحال بارگذاری..."}
                      </h3> */}

                      <button
                        // onClick={this.editDesc.bind(this)}
                        onClick={() => {
                          this.setState({ editMode2: true });
                        }}
                        type="button"
                        className="btn btn-light ir-r"
                      >
                        ویرایش
                      </button>
                    </header>
                  ) : (
                      <header className="d-flex justify-content-between align-items-center">
                        <h3 className="ir-b c-primary text-right d-block fs-m smb-2">
                          ویرایش اطلاعات
                      </h3>

                        <button
                          // onClick={this.cancel.bind(this)}
                          onClick={() => {
                            this.setState({ editMode2: false });
                          }}
                          type="button"
                          className="btn btn-light ir-r"
                        >
                          بازگشت
                      </button>
                      </header>
                    )}

                  {!this.state.editMode2 ? (
                    <div className="content d-lg-flex flex-column justify-content-center">
                      <ul className="list-group list-group-flush p-0">
                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            ایمیل:
                            <span className="c-regular">
                              {this.state.info2 ? this.state.info2?.email : "-"}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            شماره موبایل:
                            <span className="c-regular">
                              {this.state.info2
                                ? this.state.info2?.phoneNumber
                                : "-"}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            آدرس محل سکونت (اختیاری) :
                            <span className="c-regular">
                              {this.state.info2
                                ? this.state.info2?.address
                                : "-"}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            شهر :
                            <span className="c-regular">
                              {this.state.info2 ? this.state.info2?.city : "-"}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            وضعیت نظام :
                            <span className="c-regular">
                              {this.state.info2
                                ? this.state.info2?.military
                                : "-"}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            جنسیت :{" "}
                            <span className="c-regular">
                              {this.returnGenderStatus()}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            وضعیت تاهل :{" "}
                            <span className="c-regular">
                              {this.returnMarridStatus()}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            تاریخ معافیت :
                            <span className="c-regular">
                              {this.state.info2
                                ? this.state.info2?.exemptionExpirestionDate
                                : "-"}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            تاریخ دریافت کارت معافیت:
                            <span className="c-regular">
                              {this.state.info2
                                ? this.state.info2
                                  ?.exemptionExpirestionRecieveDate
                                : "-"}
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  ) : (
                      <div className="content d-lg-flex flex-column justify-content-center">
                        <form onSubmit={this.SubmitPersonalInfo.bind(this)}>
                          <ul className="list-group list-group-flush p-0">
                            <li className="list-group-item border-0 p-0">
                              <InputText
                                type="email"
                                id="email"
                                name="email"
                                label={"ایمیل"}
                                value={this.state.info2?.email || ""}
                                onChange={(e) => {
                                  this.setState({
                                    info2: {
                                      ...this.state.info2,
                                      email: e.target.value,
                                    },
                                  });
                                }}
                                placeholder="مثال:sia@gmail.com"
                              />
                            </li>

                            <li>
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="jobTitle"
                                >
                                  شهر
                              </label>

                                <div className="form-group ">
                                  <Select
                                    // value={this.state.cities.filter(
                                    //   (option) =>
                                    //     option.cityName !== this.state.info2?.city
                                    // )}
                                    onChange={(e) => {
                                      this.setState({
                                        info2: {
                                          ...this.state.info2,
                                          city: e.value,
                                        },
                                      });
                                    }}
                                    placeholder="انتخاب شهر"
                                    styles={{ fontFamily: "iransans-regular" }}
                                    // options={this.state.cities}

                                    options={this.state.cities.map((item) => {
                                      return {
                                        value: item.cityName,
                                        label: ` ${item.provinceName}، ${item.cityName} `,
                                      };
                                    })}
                                  />
                                </div>
                              </div>
                            </li>

                            <li className="list-group-item border-0 p-0">
                              <InputText
                                type="address"
                                id="text"
                                name="address"
                                label={"شماره موبایل"}
                                value={this.state.info2?.phoneNumber || ""}
                                onChange={(e) => {
                                  this.setState({
                                    info2: {
                                      ...this.state.info2,
                                      phoneNumber: e.target.value,
                                    },
                                  });
                                }}
                                placeholder="مثال:09115674333"
                              />
                            </li>

                            <li className="list-group-item border-0 p-0">
                              <InputText
                                type="string"
                                id="address"
                                name="address"
                                label={"آدرس"}
                                value={this.state.info2?.address || ""}
                                onChange={(e) => {
                                  this.setState({
                                    info2: {
                                      ...this.state.info2,
                                      address: e.target.value,
                                    },
                                  });
                                }}
                                placeholder="مثال: ساری خیابان فرهنگ"
                              />
                            </li>

                            <li className="list-group-item border-0 p-0">
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="employmentStatus"
                                >
                                  وضعیت تاهل
                              </label>

                                <div>
                                  <InputRadio
                                    checked={
                                      this.state.info2?.isMarreid == "true" ||
                                      this.state.info2?.isMarreid == true
                                    }
                                    label={"متاهل"}
                                    type="radio"
                                    value={true}
                                    id="status1"
                                    name="status"
                                    onChange={(e) => {
                                      this.setState({
                                        info2: {
                                          ...this.state.info2,
                                          isMarreid: e.target.value,
                                        },
                                      });
                                    }}
                                  />
                                  <InputRadio
                                    checked={
                                      this.state.info2?.isMarreid == "false" ||
                                      this.state.info2?.isMarreid == false
                                    }
                                    label={"مجرد"}
                                    type="radio"
                                    value={false}
                                    id="status2"
                                    name="status"
                                    onChange={(e) => {
                                      this.setState({
                                        info2: {
                                          ...this.state.info2,
                                          isMarreid: e.target.value,
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </li>

                            <li className="list-group-item border-0 p-0">
                              <InputText
                                type="text"
                                id="exemptionExpirestionDate"
                                name="exemptionExpirestionDate"
                                label={"تاریخ معافیت"}
                                value={
                                  this.state.info2?.exemptionExpirestionDate || ""
                                }
                                onChange={(e) => {
                                  this.setState({
                                    info2: {
                                      ...this.state.info2,
                                      exemptionExpirestionDate: e.target.value,
                                    },
                                  });
                                }}
                                placeholder="مثال: 1374/11/01"
                              />
                            </li>

                            <li className="list-group-item border-0 p-0">
                              <InputText
                                type="text"
                                id="exemptionExpirestionDate"
                                name="exemptionExpirestionDate"
                                label={"تاریخ دریافت کارت معافیت"}
                                value={
                                  this.state.info2
                                    ?.exemptionExpirestionRecieveDate || ""
                                }
                                onChange={(e) => {
                                  this.setState({
                                    info2: {
                                      ...this.state.info2,
                                      exemptionExpirestionRecieveDate:
                                        e.target.value,
                                    },
                                  });
                                }}
                                placeholder="مثال: 1374/11/01"
                              />
                            </li>
                          </ul>

                          <button
                            type="submit"
                            className="btn btn-success ir-r fs-m smt-2"
                          >
                            ذخیره
                        </button>
                        </form>
                      </div>
                    )}
                </div>
              </div>
            </div>
            {/* </aside> */}

            {/* <aside className="col-12 col-lg-8 smb-2 mb-lg-0 mt-4"> */}
            <h3 className="d-block text-right ir-b smb-3 c-dark">درباره من</h3>
            <div
              className="bg-white srounded-md sp-2 smb-3"
            >
              <div className="row">
                <div className="col-12 col-lg-9">
                  {!this.state.editMode3 ? (
                    <header className="d-flex justify-content-between align-items-center">
                      {/* <h3 className="ir-b c-primary text-right d-block fs-m smb-2">
                        {this.state.info
                          ? this.state.info.userFullName
                          : "درحال بارگذاری..."}
                      </h3> */}

                      <button
                        // onClick={this.editDesc.bind(this)}
                        onClick={() => {
                          this.setState({ editMode3: true });
                        }}
                        type="button"
                        className="btn btn-light ir-r"
                      >
                        ویرایش
                      </button>
                    </header>
                  ) : (
                      <header className="d-flex justify-content-between align-items-center">
                        <h3 className="ir-b c-primary text-right d-block fs-m smb-2">
                          ویرایش اطلاعات
                      </h3>

                        <button
                          // onClick={this.cancel.bind(this)}
                          onClick={() => {
                            this.setState({ editMode3: false });
                          }}
                          type="button"
                          className="btn btn-light ir-r"
                        >
                          بازگشت
                      </button>
                      </header>
                    )}

                  {!this.state.editMode3 ? (
                    <div className="content d-lg-flex flex-column justify-content-center">
                      <ul className="list-group list-group-flush p-0">
                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            درباره من:
                            <span className="c-regular">
                              {this.state.aboutMen
                                ? this.state?.aboutMen
                                : "-"}
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  ) : (
                      <div className="content d-lg-flex flex-column justify-content-center">
                        <form onSubmit={this.SubmitAboutMen.bind(this)}>
                          <ul className="list-group list-group-flush p-0">
                            <li className="list-group-item border-0 p-0">
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="jobTitle"
                                >
                                  درباره من
                              </label>

                                <div className="form-group d-flex justify-content-center align-items-center">
                                  <textarea
                                    style={{ minHeight: "200px" }}
                                    onChange={(e) => {
                                      this.setState({
                                        aboutMen: e.target.value,
                                      });
                                    }}
                                    name="aboutMen"
                                    value={this.state?.aboutMen || ""}
                                    className="form-control digit d-block fs-m text-right ir-r text-regular shadow-none"
                                    type="textarea"
                                    placeholder="از شخصیت و ویژگی‌های حرفه‌ای و شخصی خود بنویسید..."
                                  />
                                </div>
                              </div>
                            </li>
                          </ul>
                          <button
                            type="submit"
                            className="btn btn-success ir-r fs-m smt-2"
                          >
                            ذخیره
                        </button>
                        </form>
                      </div>
                    )}
                </div>
              </div>
            </div>
            {/* </aside> */}

            {/* <aside className="col-12 col-lg-8 smb-2 mb-lg-0 mt-4"> */}
            <h3 className="d-block text-right ir-b smb-3 c-dark">
              مهارت‌های حرفه‌ای
            </h3>
            <div
              className="bg-white srounded-md sp-2 smb-3"
            >
              <div className="row">
                <div className="col-12 col-lg-12">
                  {!this.state.editMode4 ? (
                    <header className="d-flex justify-content-between align-items-center">
                      {/* <h3 className="ir-b c-primary text-right d-block fs-m smb-2">
                        {this.state.info
                          ? this.state.info.userFullName
                          : "درحال بارگذاری..."}
                      </h3> */}

                      <button
                        // onClick={this.editDesc.bind(this)}
                        onClick={() => {
                          this.setState({ editMode4: true });
                        }}
                        type="button"
                        className="btn btn-light ir-r"
                      >
                        ویرایش
                      </button>
                    </header>
                  ) : (
                      <header className="d-flex justify-content-between align-items-center">
                        <h3 className="ir-b c-primary text-right d-block fs-m smb-2">
                          ویرایش اطلاعات
                      </h3>

                        <button
                          // onClick={this.cancel.bind(this)}
                          onClick={() => {
                            this.setState({ editMode4: false });
                          }}
                          type="button"
                          className="btn btn-light ir-r"
                        >
                          بازگشت
                      </button>
                      </header>
                    )}

                  {!this.state.editMode4 ? (
                    <div className="content d-lg-flex flex-column justify-content-center">
                      <ul className="list-group list-group-flush p-0">
                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            مهارت‌های حرفه‌ای :
                            {/* <span className="c-regular">
                              {this.state.info3
                                ? this.state.info3?.aboutMen
                                : "-"}
                            </span> */}

                          </span>
                        </li>

                      </ul>
                      <div className="p-1">
                        {this.state.userJobSkills?.map((item) => {
                          return (
                            <button
                              key={item.id}
                              className="btn btn-success ml-1 m-1"
                            >
                              {item.jobSkillName}
                              <i className="mr-1 fas fa-times" onClick={() => { this.deleJobSkills(item.id) }}></i>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                      <div className="content d-lg-flex flex-column justify-content-center">
                        <form onSubmit={this.SubmitJobSkill.bind(this)}>
                          <ul className="list-group list-group-flush p-0">

                            <li>
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="jobTitle"
                                >
                                  مهارت‌های حرفه‌ای

                                </label>

                                <div className="form-group ">
                                  <Select
                                    // userJobSkills: resuserJobSkill.data.resul,

                                    onChange={(e) => {
                                      // console.clear();
                                      // console.log(this.state.userJobSkills);
                                      // let userJobSkills = this.state.userJobSkills.concat({ id: e.value, jobSkillName: e.label });
                                      this.setState({
                                        currentJobSkill: { id: e.value, jobSkillName: e.label }
                                      });
                                    }}
                                    placeholder="مهارت شما..."
                                    styles={{ fontFamily: "iransans-regular" }}
                                    // options={this.state.cities}

                                    options={this.state?.jobSkills?.map((item) => {
                                      return {
                                        value: item.id,
                                        label: `${item.name}`,
                                      };
                                    })}
                                  />
                                </div>
                              </div>
                            </li>

                          </ul>
                          <button
                            type="submit"
                            className="btn btn-success ir-r fs-m smt-2"
                          >
                            ذخیره
                        </button>
                        </form>
                      </div>
                    )}
                </div>
              </div>
            </div>
            {/* </aside> */}

            {/* <aside className="col-12 col-lg-8 smb-2 mb-lg-0 mt-4"> */}
            <h3 className="d-block text-right ir-b smb-3 c-dark">
              ترجیحات شغلی
            </h3>
            <div
              className="bg-white srounded-md sp-2 smb-3"
            >
              <div className="row">
                <div className="col-12 col-lg-9">
                  {!this.state.editMode8 ? (
                    <header className="d-flex justify-content-between align-items-center">
                      {/* <h3 className="ir-b c-primary text-right d-block fs-m smb-2">
                        {this.state.info
                          ? this.state.info.userFullName
                          : "درحال بارگذاری..."}
                      </h3> */}

                      <button
                        // onClick={this.editDesc.bind(this)}
                        onClick={() => {
                          this.setState({ editMode8: true });
                        }}
                        type="button"
                        className="btn btn-light ir-r"
                      >
                        ویرایش
                      </button>
                    </header>
                  ) : (
                      <header className="d-flex justify-content-between align-items-center">
                        <h3 className="ir-b c-primary text-right d-block fs-m smb-2">
                          ویرایش اطلاعات
                      </h3>

                        <button
                          // onClick={this.cancel.bind(this)}
                          onClick={() => {
                            this.setState({ editMode8: false });
                          }}
                          type="button"
                          className="btn btn-light ir-r"
                        >
                          بازگشت
                      </button>
                      </header>
                    )}

                  {!this.state.editMode8 ? (
                    <div className="content d-lg-flex flex-column justify-content-center">
                      <ul className="list-group list-group-flush p-0">

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            شهر :
                            <span className="c-regular">
                              {this.state.info8 ? this.state.info8.city : "-"}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            میزان حقوق :
                            <span className="c-regular">
                              {this.state.info8
                                ? this.returnSalary(this.state.editMode8?.salary)
                                : "-"}
                            </span>
                          </span>
                        </li>

                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            دسته شغلی :
                            <span className="c-regular">
                              {this.state.info8 ? this.returnTypeOfCooperation(this.state.editMode8?.typeOfCooperation)
                                : "-"}
                            </span>
                          </span>
                        </li>



                        <li className="list-group-item border-0 pr-0">
                          <span className="ir-b c-grey sml-1">
                            سابقه کار :
                            <span className="c-regular">
                              {this.state.info8 ? this.returnSenioritylevel(this.state.editMode8?.returnSeniorityleve)
                                : "-"}
                            </span>
                          </span>
                        </li>

                      </ul>
                    </div>
                  ) : (
                      <div className="content d-lg-flex flex-column justify-content-center">
                        <form onSubmit={this.SubmitJobPreference.bind(this)}>
                          <ul className="list-group list-group-flush p-0">


                            <li>
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="jobTitle"
                                >
                                  شهر
                              </label>

                                <div className="form-group ">
                                  <Select
                                    // value={this.state.cities.filter(
                                    //   (option) =>
                                    //     option.label === this.state.info8.city
                                    // )}
                                    onChange={(e) => {
                                      this.setState({
                                        info8: {
                                          ...this.state.info8,
                                          city: e.value,
                                        },
                                      });
                                    }}
                                    placeholder="انتخاب شهر"
                                    styles={{ fontFamily: "iransans-regular" }}
                                    // options={this.state.cities}

                                    options={this.state.cities.map((item) => {
                                      return {
                                        value: item.cityName,
                                        label: ` ${item.provinceName}، ${item.cityName} `,
                                      };
                                    })}
                                  />
                                </div>
                              </div>
                            </li>

                            <li>
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="jobTitle"
                                >
                                  میزان حقوق
                              </label>

                                <div className="form-group ">
                                  <Select
                                    // isMulti

                                    isClearable
                                    onChange={async (e) => {
                                      this.setState({
                                        info8: {
                                          ...this.state.info8,
                                          salary: e.value,
                                        },
                                      });
                                    }}
                                    isSearchable={false}
                                    placeholder={"میزان حقوق"}
                                    options={salaries}
                                    styles={{ fontFamily: "iransans-regular" }}
                                  />
                                </div>
                              </div>
                            </li>

                            <li>
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="jobTitle"
                                >
                                  دسته شغلی
                              </label>

                                <div className="form-group ">
                                  <Select
                                    // isMulti
                                    // isClearable
                                    onChange={async (e) => {
                                      this.setState({
                                        info8: {
                                          ...this.state.info8,
                                          typeOfCooperation: e.value,
                                        },
                                      });
                                    }}
                                    isSearchable={false}
                                    placeholder={" دسته شغلی"}
                                    options={typeOfCooperation}
                                    styles={{ fontFamily: "iransans-regular" }}
                                  />
                                </div>
                              </div>
                            </li>




                            <li>
                              <div className="text-input srounded-sm">
                                <label
                                  className="ir-r text-regular text-right smb-1 label bg-white"
                                  htmlFor="jobTitle"
                                >
                                  سابقه کار
                              </label>

                                <div className="form-group ">
                                  <Select
                                    // isMulti
                                    // isClearable
                                    onChange={async (e) => {
                                      this.setState({
                                        info8: {
                                          ...this.state.info8,
                                          senioritylevel: e.value,
                                        },
                                      });
                                    }}
                                    isSearchable={false}
                                    placeholder={"سابقه کار"}
                                    options={expriences}
                                    styles={{ fontFamily: "iransans-regular" }}
                                  />
                                </div>
                              </div>
                            </li>

                            <li>

                              <div className="custom-control custom-radio custom-control-inline">
                                <input
                                  checked={
                                    this.state.info8?.insurance == "true" ||
                                    this.state.info8?.insurance == true
                                  }
                                  onChange={async (e) => {
                                    alert(e.target.value)
                                    await this.setState({
                                      info8: {
                                        ...this.state.info8,
                                        insurance: e.target.value,
                                      },
                                    });
                                    console.log(this.state.info8?.insurance);
                                  }}

                                  type="checkbox"
                                  value={false}
                                  // value={this.state.info8?.insurance}
                                  id="status1"
                                  name="status1"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label ir-r"
                                  htmlFor="status1"
                                >
                                  بیمه
                                  </label>
                              </div>



                            </li>




                          </ul>

                          <button
                            type="submit"
                            className="btn btn-success ir-r fs-m smt-2"
                          >
                            ذخیره
                        </button>
                        </form>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </aside>

          <aside className="col-12 col-lg-4">
            <SideBar resomePercent={this.state.resomePercent} />
          </aside>
        </div>
      </section>
    );
  }
}

const InputText = ({ value, name, placeHolder, label, onChange, ...rest }) => {
  return (
    <div className="text-input srounded-sm">
      <label
        className="ir-r text-regular text-right smb-1 label bg-white"
        htmlFor="jobTitle"
      >
        {label}
      </label>

      <div className="form-group d-flex justify-content-center align-items-center">
        <input
          onChange={onChange}
          name={name}
          value={value || ""}
          className="form-control digit d-block fs-m text-right ir-r text-regular shadow-none"
          type="text"
          placeholder={placeHolder}
        />
      </div>
    </div>
  );
};

const InputRadio = ({
  value,
  name,
  placeHolder,
  label,
  onChange,
  checked,
  id,
  ...rest
}) => {
  return (
    <>
      <div className="custom-control custom-radio custom-control-inline">
        <input
          onChange={onChange}
          checked={checked}
          type="radio"
          value={value}
          id={id}
          name={name}
          className="custom-control-input"
        />
        <label className="custom-control-label ir-r" htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};

// <div className="custom-control custom-radio custom-control-inline">
// <input
//   onChange={this.radionHandler.bind(this)}
//   {...rest}
//   checked={this.state.info.employmentStatus == 3}
//   type="radio"
//   value={value}
//   id="status3"
//   name="status"
//   className="custom-control-input"
// />
// <label className="custom-control-label ir-r" htmlFor="status3">
//   به دنبال شغل بهتر
// </label>
// </div>
