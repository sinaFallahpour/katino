import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../core/agent";
import { citiesService } from "../../components/citiesService";

export class CreateTicketEmployee extends Component {
  state = {
    details: {},
    id: null,
    fileName: "انتخاب و آپلود فایل ضمیمه",
    content: "",
    ticketPriorityStatus: 1,
    file: null,
    subject: null,
    cities: [],
    City: "",
  };

  componentDidMount() {
    citiesService.getCities().then((res) => {
      let cities = [];
      cities.push({
        value: "",
        label: `پشتیبانی فنی`,
      });
      res.data.resul.map((item) => {
        cities.push({
          value: item.cityName,
          label: ` ${item.provinceName}، ${item.cityName} `,
        });
      });

      this.setState({ cities });
    });
  }

  submitTicketAnswer = async (event) => {
    event.preventDefault();
    try {
      // return params;
      let datas = new FormData();

      datas.append("Subject", this.state.subject);
      datas.append("TicketPriorityStatus", this.state.ticketPriorityStatus);
      datas.append("Content", this.state.content);
      datas.append("File", this.state.file);
      datas.append("City", this.state.City);

      let { data } = await agent.Ticket.createTicket(datas);
      this.props.history.push("/Employee/Tickets");
      toast.success("ثبت موفقیت آمیز");
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
    this.setState({ file: event.target.files[0] });
  };

  render() {
    return (
      <section className="ticket-detail container-fluid spx-2 spx-lg-10 smt-10 spt-3">
        <div className="row">
          <aside className="col-12 col-lg-6 mx-auto">
            <div className="sbs-shadow srounded-md bg-white sp-2">
              <header className="header d-flex flex-column flex-lg-row justify-content-between align-items-center">
                <h2 className="fs-m c-dark ir-b text-center text-lg-right w-50 text-truncate smb-2 mb-lg-0">
                  ثبت تیکت جدید
                </h2>

                <Link
                  className="ir-r fs-s btn bg-white shadow-none border"
                  to="/Employee/Tickets"
                >
                  بازگشت
                </Link>
              </header>

              <hr className="smy-2" />

              <span className="d-block text-right ir-b fs-s smb-1 c-regular">
                {this.state.details.receiverFullName}
              </span>

              <form onSubmit={this.submitTicketAnswer}>
                <input
                  className="form-control ir-r fs-s mt-0 smb-2 srounded-sm shadow-none sp-1"
                  style={{ resize: "none" }}
                  id="subject"
                  placeholder="موضوع پیام"
                  rows="4"
                  onChange={(e) => this.setState({ subject: e.target.value })}
                />

                <select
                  className="form-control ir-r fs-s mt-0 smb-2 srounded-sm shadow-none"
                  style={{ resize: "none" }}
                  id="subject"
                  placeholder="اولویت"
                  rows="4"
                  onChange={(e) =>
                    this.setState({ ticketPriorityStatus: e.target.value })
                  }
                >
                  <option value="1">فوری</option>
                  <option value="2">جهت اطلاع</option>
                  <option value="3">عادی</option>
                </select>

                <select
                  className="form-control ir-r fs-s mt-0 smb-2 srounded-sm shadow-none"
                  style={{ resize: "none" }}
                  id="subject"
                  placeholder="اولویت"
                  rows="4"
                  onChange={(e) => this.setState({ City: e.target.value })}
                >
                  {!this.state?.cities?.length !== 0 &&
                    this.state?.cities?.map(({ value, label }) => (
                      <option value={value}>{label}</option>
                    ))}
                </select>

                <textarea
                  className="form-control ir-r fs-s mt-0 smb-2 srounded-sm shadow-none sp-1"
                  style={{ resize: "none" }}
                  id="message"
                  placeholder="پیام شما..."
                  rows="4"
                  onChange={(e) => this.setState({ content: e.target.value })}
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

                <button type="submit" className="ir-r btn btn-primary">
                  ثبت
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    );
  }
}
