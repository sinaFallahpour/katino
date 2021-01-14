import React, { Component } from "react";
import { cooperationType, salary, findCities } from "../../../enums";
import "react-toastify/dist/ReactToastify.css";
import style from "./Ad2.module.css";

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
      <>
        <div className={style.Ads2Container}>
          <div
            onClick={() => {
              this.props.handleChangeSelecetdId(this.props.id);
            }}
            className={`${
              this.props?.selectdIds?.includes(this.props.id)
                ? style.SelectedItem
                : style.UnSelectedItem
            } card ad srounded-sm sp-2 text-decoration-none`}
          >
            <header className="d-flex justify-content-between align-items-center smb-1">
              <div onClick={(e) => e.stopPropagation()}>
                <a
                  className="fs-m ir-b c-dark text-truncate"
                  href={`/JobDetails/${this.props.id}`}
                  dideo-checked="true"
                >
                  {this.props.title}
                </a>
              </div>

              <div onClick={(e) => e.stopPropagation()}>
                <i
                  onClick={() => {
                    this.props.handleMarkOtherAdv(this.props.id);
                  }}
                  className={`bookmarker-btn c-dark fs-l ${
                    this.props.item?.isMarked === false ? "far" : "fas"
                  } fa-bookmark`}
                ></i>
              </div>
            </header>

            <div className="card-body p-0">
              <div className="detail smb-1">
                <span className="ir-r c-grey fs-m sml-1">
                  <i className="fas fa-building ml-2"></i>
                  {this.props.companyName}
                </span>

                <span className="ir-r c-grey fs-m sml-1">
                  <i className="fas fa-map-marker-alt ml-2"></i>
                  {findCities(this.props.city)}
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

          <span className={style.Ads2Checkbox}>
            <input
              type="radio"
              onClick={() => {
                this.props.handleChangeSelecetdId(this.props.id);
              }}
              className={`${style.optionInput} ${style.radio}`}
              checked={this.props?.selectdIds?.includes(this.props.id)}
            />
          </span>
        </div>
      </>
    );
  }
}
