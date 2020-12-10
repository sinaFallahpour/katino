import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import API_ADDRESS from "../../API_ADDRESS"
import { numberSeparator } from "../../common"

export class Plans extends Component {
  state = {
    plans: [],
  }

  async componentDidMount() {
    await axios
      .get(API_ADDRESS + "plan/GetAllPlansForCompanies")
      .then((res) => {
        this.setState({ plans: res.data.resul })
      })
      .catch()
  }

  render() {
    return (
      <section className="dashboard container-fluid spx-2 smt-10 spx-lg-10">
        <div className="row">
          <div className="bg-white srounded-md sshadow w-100 sp-2">
            <nav className="navbar navbar-expand-lg pr-0 py-0">
              <div
                className="collapse navbar-collapse d-none d-lg-block"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item smr-lg-4">
                    <Link
                      className="nav-link position-relative ir-r fs-m p-0 active"
                      style={{ color: "#00BCD4 !important" }}
                      to="/"
                    >
                      تعرفه ها
                    </Link>
                  </li>

                  <li className="nav-item smr-lg-4">
                    <Link
                      className="nav-link position-relative c-grey ir-r fs-m p-0 active"
                      to="/"
                    >
                      تاریخچه حساب
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="row smt-3">
          {this.state.plans.map((item) => {
            return (
              <div key={item.id} className="col-12 col-lg-4 smb-2">
                <div className="bg-white srounded-md sshadow sp-2">
                  <h3 className="d-block text-center fs-l ir-b">
                    {item.title}
                  </h3>

                  {item.discount === 0 ? (
                    <span
                      className="d-block ir-b c-dark text-center smb-2 spy-3 text-success"
                      style={{ fontSize: "24px" }}
                    >{`${numberSeparator(item.price)} تومان`}</span>
                  ) : (
                      <React.Fragment>
                        <span
                          className="d-block ir-b c-dark text-center smt-5 smb-1 c-success"
                          style={{ fontSize: "24px" }}
                        >
                          {`${numberSeparator(
                            item.price * (1 - item.discount / 100)
                          )} تومان`}
                        </span>
                        <span
                          className="d-block ir-b c-dark text-center smb-2 spb-3 c-danger"
                          style={{
                            fontSize: "20px",
                            textDecoration: "line-through",
                          }}
                        >{`${numberSeparator(item.price)} تومان`}</span>
                      </React.Fragment>
                    )}

                  <ul className="list-group">
                    <li className="list-group-item ir-r text-center border-top-0 border-left-0 border-right-0">
                      {item.content}
                    </li>

                    <li className="list-group-item ir-r text-center border-top-0 border-left-0 border-right-0">
                      تعداد آگهی های قابل ثبت:
                      <strong>{` ${item.adverCount} عدد`}</strong>
                    </li>

                    {item.logo !== 0 ? (
                      <li className="list-group-item ir-r text-center border-left-0 border-right-0">
                        {`نمایش لوگوی شرکت در صفحه ی اصلی به مدت ${item.logo} روز`}
                      </li>
                    ) : (
                        ""
                      )}

                    {item.isUseResomeManegement === true ? (
                      <li className="list-group-item ir-r text-center border-left-0 border-right-0">
                        استفاده از مدیریت رزومه های ارسالی
                      </li>
                    ) : (
                        ""
                      )}

                    <li className="list-group-item ir-r text-center border-left-0 border-right-0">
                      {`مدت زمان استفاده: ${item.duration} روز`}
                    </li>

                    <li className="list-group-item ir-r text-center border-left-0 border-right-0">
                      {`مدت اعتبار هر آگهی: ${item.adverExpireTime} روز`}
                    </li>

                    <li className="list-group-item ir-r text-center border-left-0 border-right-0 border-bottom-0">
                      {item.immediateAdverCount !== 0
                        ? `${item.immediateAdverCount} عدد آگهی فوری`
                        : "بدون آگهی فوری"}
                    </li>
                  </ul>

                  <Link
                    className="btn btn-warning-light ir-r d-block mx-auto btn-lg smt-3"
                    to={`/Employer/Dashboard/Plans/${item.id}/Payment`}
                  >
                    انتخاب
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }
}
