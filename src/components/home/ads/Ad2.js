import React, { Component } from "react";
import { Link } from "react-router-dom";
import { cooperationType, salary } from "../../../enums";
import "react-toastify/dist/ReactToastify.css";

export class Ad2 extends Component {
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

  render() {
    return (
      <div className="card ad srounded-sm sp-2 text-decoration-none">
        <header className="d-flex justify-content-between align-items-center smb-1">
          <a
            class="fs-m ir-b c-dark text-truncate"
            href={`/JobDetails/${this.props.id}`}
            dideo-checked="true"
          >
            {this.props.title}
          </a>

          <i
            // onClick={this.adMarker}
            onClick={() => {
              this.props.handleMarkOtherAdv(this.props.id);
            }}
            className={`bookmarker-btn c-dark fs-l ${
              this.props.item?.isMarked === false ? "far" : "fas"
            } fa-bookmark`}
          ></i>
        </header>

        <div className="card-body p-0">
          <input
            type="checkbox"
            onChange={() => {
              this.props.handleChangeSelecetdId(this.props.id);
            }}
            checked={this.props?.selectdIds?.includes(this.props.id)}
          />
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
