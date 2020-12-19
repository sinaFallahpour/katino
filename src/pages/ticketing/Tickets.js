import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as service from "../../components/tickets";

export class Tickets extends Component {
  state = {
    list: [],
  };

  async componentDidMount() {
    await service
      .getTickets()
      .then((res) => this.setState({ list: res.data.resul }));
  }

  render() {
    return (
      <section className="tickets container-fluid spx-2 spx-lg-10 smt-10 spt-3">
        <div className="row">
          <aside className="col-12">
            <div className="bg-white sbs-shadow srounded-md sp-2">
              <header className="header d-lg-flex w-100 justify-content-lg-between align-items-lg-center">
                <h2 className="ir-b fs-s c-dark text-right smb-2 mb-lg-0">
                  تیکت های پشتیبانی
                </h2>

                <div>
                  <a
                    className="d-block d-lg-inline-block shadow-none ir-r fs-s c-regular btn border srounded-sm smb-2 mb-lg-0"
                    href="tel:01133333333"
                  >
                    تماس تلفنی
                  </a>

                  <Link
                    className="d-block d-lg-inline-block shadow-none ir-r fs-s btn btn-primary srounded-sm mb-0 mr-0 mr-lg-2"
                    to="/createTicket"
                  >
                    تیکت جدید
                    <i className="fas fa-plus smr-1"></i>
                  </Link>
                </div>
              </header>

              <hr className="smy-2" />

              {this.state.list.length === 0 ? (
                <span className="ir-r fs-s c-regular text-center d-block">
                  تیکتی برای نمایش وجود ندارد.
                </span>
              ) : (
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th
                          className="ir-b c-regular fs-s border-top-0"
                          scope="col"
                        >
                          #
                        </th>
                        <th
                          className="ir-b c-regular fs-s border-top-0"
                          scope="col"
                        >
                          عنوان تیکت
                        </th>
                        <th
                          className="ir-b c-regular fs-s border-top-0"
                          scope="col"
                        >
                          اولویت
                        </th>
                        <th
                          className="ir-b c-regular fs-s border-top-0"
                          scope="col"
                        >
                          تاریخ ارسال
                        </th>
                        <th
                          className="ir-b c-regular fs-s border-top-0"
                          scope="col"
                        >
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.list.map((item, index) => (
                        <tr key={index}>
                          <td className="ir-r c-regular fs-s">{`#${item.id}`}</td>
                          <td>
                            <span className="ir-r c-regular fs-s w-100 text-truncate">
                              {item.subject}
                            </span>
                          </td>
                          <td>
                            {item.ticketPriorityStatus === 1 ? (
                              <span className="ir-r fs-s bg-danger-light c-danger py-1 px-2 srounded-sm">
                                فوری
                              </span>
                            ) : item.ticketPriorityStatus === 2 ? (
                              <span className="ir-r fs-s bg-light c-regular py-1 px-2 srounded-sm">
                                معمولی
                              </span>
                            ) : item.ticketPriorityStatus === 3 ? (
                              <span className="ir-r fs-s bg-primary-light c-primary py-1 px-2 srounded-sm">
                                جهت اطلاع
                              </span>
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="ir-r c-regular fs-s">
                            {item.createDate.substring(0, 10)}
                          </td>
                          <td className="ir-r c-regular fs-s">
                            <Link
                              className="ir-r c-regular fs-s btn btn-light shadow-none sml-1"
                              to={`/Tickets/${item.id}`}
                            >
                              مشاهده
                            </Link>

                            {item.hasAnswer === true ? (
                              <Link
                                className="ir-r fs-s btn btn-primary-light shadow-none"
                                to={`/Tickets/${item.id}`}
                              >
                                پاسخ
                              </Link>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    );
  }
}
