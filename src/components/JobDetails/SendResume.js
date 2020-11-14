import React, { Component } from "react";
import axios from "axios";
import API_ADDRESS from "../../API_ADDRESS";
import { toast } from "react-toastify";

export class SendResume extends Component {
  state = {};

  componentDidMount() {}

  submitHandler(event) {
    event.preventDefault();

    axios
      .post(
        API_ADDRESS + `​/AsignResomeToAdver?adverId=${this.props.id}`,
        {},
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          },
        }
      )
      .then(() => toast.success("رزومه با موفقیت ارسال شد"))
      .catch((err) => {
        if (err.response.status === 401) toast.error("لطفا وارد شوید.");
        else if (err.response.status === 404)
          toast.error("رزومه‌ی خود را وارد نکرده اید یا از.");
        else if (err.response.status === 500) toast.error("مشکلی رخ داده است.");
        else toast.error(err.response.message[0]);
      });
  }

  render() {
    return (
      <div className="send-resume bg-white srounded-md sp-2">
        <form onSubmit={this.submitHandler.bind(this)}>
          <h3 className="ir-b c-dark fs-m smb-2">ارسال رزومه به این آگهی</h3>

          <p className="d-block c-regular text-justify fs-m ir-r smb-2">
            برای ارسال رزومه ی خود به این آگهی تنها کافیست بر روی دکمه ی زیر
            کلیک کنید.
          </p>

          <button type="submit" className="btn btn-success ir-r w-100">
            ارسال رزومه
          </button>
        </form>
      </div>
    );
  }
}
