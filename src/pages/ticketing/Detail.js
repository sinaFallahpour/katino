import React, { Component } from "react";
import * as service from "../../components/tickets";
import { Link } from "react-router-dom";
import validator from "validator";

export class Detail extends Component {
  state = {
    details: {},

    fileName: "انتخاب و آپلود فایل ضمیمه",
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    await service
      .getTicketInfo(id)
      .then((res) => this.setState({ details: res.data.resul }));
  }

  fileHandler = (event) => {
    this.setState({ fileName: event.target.value });
  };

  render() {
    return (
      <section className="ticket-detail container-fluid spx-2 spx-lg-10 smt-10 spt-3">
        <div className="row">
          <aside className="col-12 col-lg-6 mx-auto">
            <div className="sbs-shadow srounded-md bg-white sp-2">
              <header className="header d-flex flex-column flex-lg-row justify-content-between align-items-center">
                <h2 className="fs-m c-dark ir-b text-center text-lg-right w-50 text-truncate smb-2 mb-lg-0">{`#${this.state.details.id} ${this.state.details.subject}`}</h2>

                <Link
                  className="ir-r fs-s btn bg-white shadow-none border"
                  to="/Tickets"
                >
                  بازگشت
                </Link>
              </header>

              <hr className="smy-2" />

              <div className="first-content">
                <span className="d-block text-right ir-b fs-s smb-1 c-regular">
                  {this.state.details.senderFullName}
                </span>
                <span className="d-block text-right ir-r fs-s smb-1 c-regular">
                  {this.state.details.content}
                </span>
                <span className="d-block text-right ir-r fs-s mb-0 c-light">
                  {this.state.details.createDate}
                </span>
              </div>

              {this.state.details.answer !== null ? (
                <React.Fragment>
                  <hr className="smy-2" />

                  <div className="first-content">
                    <span className="d-block text-right ir-b fs-s smb-1 c-regular">
                      {this.state.details.receiverFullName}
                    </span>
                    <span className="d-block text-right ir-r fs-s smb-1 c-regular">
                      {this.state.details.answer}
                    </span>
                    <span className="d-block text-right ir-r fs-s mb-0 c-light">
                      {this.state.details.answerDate}
                    </span>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}

              {this.state.details.hasAnswer === true ? (
                <React.Fragment>
                  <hr className="smy-2" />

                  <span className="d-block text-right ir-b fs-s smb-1 c-regular">
                    {this.state.details.receiverFullName}
                  </span>

                  <form noValidate>
                    <textarea
                      className="form-control ir-r fs-s mt-0 smb-2 srounded-sm shadow-none sp-1"
                      style={{ resize: "none" }}
                      id="message"
                      placeholder="پیام شما..."
                      rows="4"
                    ></textarea>

                    <input
                      className="d-none"
                      id="file"
                      type="file"
                      accept="image/jpeg,image/gif,image/png,application/pdf,.doc,.docx"
                      onChange={this.fileHandler}
                    />

                    <div className="d-flex justify-content-start align-items-center smb-2">
                      <label
                        htmlFor="file"
                        className="ir-r btn btn-light fs-s shadow-none border sp-1"
                      >
                        {this.state.fileName}
                      </label>
                    </div>

                    <button type="submit" className="ir-r btn btn-primary">ثبت</button>
                  </form>
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
          </aside>
        </div>
      </section>
    );
  }
}
