import React, { Component } from "react";
import { Link } from "react-router-dom";
import { cooperationType, salary } from "../../../enums";
import axios from "axios";
import API_ADDRESS from "../../../API_ADDRESS";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Ad extends Component {
  state = {
    desc: "",
    markAd: false,
  };

  componentDidMount() {
    if (this.props.descriptionOfJob) {
      let string = this.props.descriptionOfJob;
      string = string.substr(0, 200);
      this.setState({ desc: string });
    }
  }

  adMarker = () => {
    if (this.state.markAd === false) {
      axios
        .post(
          API_ADDRESS + `Adver/MarkAdvder?adverId=${this.props.id}`,
          {},
          {
            headers: {
              Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
            },
          }
        )
        .then(() => {
          this.setState({ markAd: true });
          toast.success("با موفقیت نشان شد.");
        })
        .catch((err) => {
          toast.warn("لطفا وارد شوید.");
        });
    } else {
      axios
        .post(API_ADDRESS + `Adver/UnMarkAdvder?adverId=${this.props.id}`, {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          },
        })
        .then(() => this.setState({ markAd: false }))
        .catch();
    }
  };

  render() {
    return (
      <div className="card ad srounded-sm sp-2 text-decoration-none">
        <header className="d-flex justify-content-between align-items-center smb-1">
          <Link
            className="fs-m ir-b c-dark text-truncate"
            to={`/JobDetails/${this.props.id}`}
          >
            {this.props.title}
          </Link>
          <i
            onClick={this.adMarker}
            className={`bookmarker-btn c-dark fs-l ${
              this.state.markAd === false ? "far" : "fas"
            } fa-bookmark`}
          ></i>
        </header>

        <div className="card-body p-0">
          <div className="detail smb-1">
            <Link className="ir-r c-grey fs-m sml-1" to="/">
              <i className="fas fa-building ml-2"></i>
              {this.props.companyName}
            </Link>

            <span className="ir-r c-grey fs-m sml-1">
              <i className="fas fa-map-marker-alt ml-2"></i>
              {this.props.city}
            </span>

            <span className="ir-r text-success fs-m sml-1">
              {` میزان حقوق: ${salary(this.props.salary)} تومان `}
            </span>

            <span className="ir-r c-grey fs-m ml-0">{` نوع قرار داد: ${cooperationType(
              this.props.typeOfCooperation
            )} `}</span>
          </div>

          <p
            className="d-block text-right ir-r fs-m mb-0 c-regular"
            dangerouslySetInnerHTML={{ __html: `${this.state.desc}...` }}
          ></p>
        </div>
      </div>
    );
  }
}
