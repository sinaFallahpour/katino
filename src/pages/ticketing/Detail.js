import React, { Component } from "react";
import * as service from "../../components/tickets";
import { Link } from "react-router-dom";
import validator from "validator";
import { toast } from 'react-toastify';

import agent, { mainUrl } from "../../core/agent";

export class Detail extends Component {
  state = {
    details: {},
    id: null,
    fileName: "انتخاب و آپلود فایل ضمیمه",
    answer: '',
    answerFile: null
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    await service
      .getTicketInfo(id)
      .then((res) => this.setState({ details: res.data.resul, id }));
  }



  submitTicketAnswer = async (event) => {
    event.preventDefault();

    try {
      // return params;
      let datas = new FormData();
      datas.append('Id', this.state.id);
      datas.append('Answer', this.state.answer);
      datas.append('AnswerFile', this.state.answerFile);

      let { data } = await agent.Ticket.answerTicker(datas);
      // console.log(data)
      // let data1 = { ...this.state.info2 };
      // if (data1.isMarreid == "false") data1.isMarreid = false;
      // else data1.isMarreid = true;
      // let { data } = await agent.CreateResome.editEmployeePersonalInformation(
      //   data1
      // );
      this.props.history.push("/Tickets");
      toast.success("ثبت موفقیت آمیز");
      // this.setState({ editMode1: false });
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



  fileHandler = (event) => {
    this.setState({ answerFile: event.target.files[0] });
  };

  render() {
    return (
      <section className="ticket-detail container-fluid spx-2 spx-lg-10 smt-10 spt-3">
        <div className="row">
          <aside className="col-12 col-lg-6 mx-auto">
            <div className="sbs-shadow srounded-md bg-white sp-2">
              <header className="header d-flex flex-column flex-lg-row justify-content-between align-items-center">
                <h2 className="fs-m c-dark ir-b text-center text-lg-right w-50 text-truncate smb-2 mb-lg-0">{`#${this.state.details.id} ${this.state.details.subject}`}</h2>
                <div>
                  {this.state.details.receiverFile && (<a href={`${mainUrl}img/ticket/${this.state.details.receiverFile}`} target="_blank" className="btn btn-success ml-2">دانلود فابل</a>)}


                  <Link
                    className="ir-r fs-s btn bg-white shadow-none border"
                    to="/Tickets"
                  >
                    بازگشت
</Link>
                </div>

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

                  <form onSubmit={this.submitTicketAnswer}>
                    <textarea
                      className="form-control ir-r fs-s mt-0 smb-2 srounded-sm shadow-none sp-1"
                      style={{ resize: "none" }}
                      id="message"
                      placeholder="پیام شما..."
                      rows="4"
                      onChange={(e) => this.setState({ answer: e.target.value })}
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
