import React, { Component } from "react";
import { toast } from "react-toastify";
import agent from "../../core/agent";
import StickyBox from "react-sticky-box";

export class SendResume extends Component {
  state = {};

  componentDidMount() {}

  submitHandler = async (event) => {
    event.preventDefault();

    try {
      await agent.Adver.asignResomeToAdver(this.props.id);
      toast.success("رزومه با موفقیت ارسال شد");
    } catch (err) {
      console.log(err.response);
      if (err.response?.status === 401) toast.error("لطفا وارد شوید.");
      else if (err.response?.status === 404) toast.error("خطای رخ داده  ");
      else if (err.response?.status === 500) toast.error("مشکلی رخ داده ");
      else toast.error(err.response?.data?.message[0]);
    }
  };

  render() {
    return (
      <StickyBox offsetTop={100} offsetBottom={50}>
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
      </StickyBox>
    );
  }
}
