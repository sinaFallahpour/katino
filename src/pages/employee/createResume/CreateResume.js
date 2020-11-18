import React, { Component } from "react";
import axios from "axios";
import API_ADDRESS from "../../../API_ADDRESS";
import { toast } from "react-toastify";
import { SideBar } from "../../../components";
import Select from "react-select";

export class CreateResume extends Component {
  state = {
    hasImage: false,

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
  }

  async avatarHandler(event) {
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
      .then(() => this.setState({ hasImage: true }))
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

    console.log(this.state);
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
      .catch(() => toast.error("ذخیره با مشکل مواجه شد، دوباره امتحان کنید."));
  }

  render() {
    return (
      <section className="container-fluid create-ad spx-2 spx-lg-10 smy-10 spt-10">
        <div className="row">
          <aside className="col-12 col-lg-8 smb-2 mb-lg-0">
            <h3 className="d-block text-right ir-b smb-3 c-dark">
              ویرایش پروفایل
            </h3>
            <div className="bg-white srounded-md sp-2">
              <div className="row">
                <div className="col-12 col-lg-3 d-lg-flex flex-column justify-content-center">
                  <img
                    className="w-100 d-block srounded-sm"
                    src={
                      !this.state.hasImage
                        ? "/img/user-profile.png"
                        : this.state.avatarSRC
                    }
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
                          ویرایش اطلاعات{" "}
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
                                      // onChange={(e) => {
                                      //   this.setState({
                                      //     info: {
                                      //       ...this.state.info,
                                      //       employmentStatus: parseInt(
                                      //         e.target.value
                                      //       ),
                                      //     },
                                      //   });
                                      // }}
                                      onChange={this.radionHandler.bind(this)}
                                      checked={
                                        this.state.info.employmentStatus == 1
                                      }
                                      // employmentStatus: parseInt(event.target.value)

                                      // employmentStatus: parseInt(event.target.value)
                                      // onChange={this.radionHandler.bind(this)}
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
            <div className="bg-white srounded-md sp-2 mt-3">
              <div className="row">

                <div className="col-12 col-lg-12">
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
                          ویرایش اطلاعات{" "}
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
                                  htmlFor="jobTitle"
                                >
                                  عنوان شغلی
                              </label>

                                <div className="mb-2">
                                  <div className="form-group mb-0 ir-r srounded-md">
                                    {/* <label className="fs-regular ir-b c-dark">در کدام شهر؟</label> */}
                                    <Select
                                      className="w-100"
                                      placeholder="انتخاب شهر"
                                      styles={{ fontFamily: "iransans-regular", width: "100%" }}
                                      options={[]}
                                    />
                                  </div>
                                </div>


                                <div className="form-group d-flex justify-content-center align-items-center">

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
                                      // onChange={(e) => {
                                      //   this.setState({
                                      //     info: {
                                      //       ...this.state.info,
                                      //       employmentStatus: parseInt(
                                      //         e.target.value
                                      //       ),
                                      //     },
                                      //   });
                                      // }}
                                      onChange={this.radionHandler.bind(this)}
                                      checked={
                                        this.state.info.employmentStatus == 1
                                      }
                                      // employmentStatus: parseInt(event.target.value)

                                      // employmentStatus: parseInt(event.target.value)
                                      // onChange={this.radionHandler.bind(this)}
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

          </aside>

          <aside className="col-12 col-lg-4">
            <SideBar />
          </aside>
        </div>
      </section>
    );
  }
}
