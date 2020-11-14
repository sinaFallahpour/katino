import React, { Component } from "react";
import API_ADDRESS from "../../API_ADDRESS";
import axios from "axios";
import { toast } from "react-toastify";

export class Header extends Component {
  state = {
    markAd: false,
  };

  adMarker = () => {
    if (this.state.markAd === false) {
      axios
        .post(API_ADDRESS + `Adver/MarkAdvder?adverId=${this.props.id}`, {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          },
        })
        .then(() => this.setState({ markAd: true }))
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
      <header className="d-flex justify-content-between align-items-center smb-3">
        <h3 className="ir-b c-dark text-right fs-l mb-0">{this.props.title}</h3>

        <i
          onClick={this.adMarker}
          className={`bookmarker-btn c-dark fs-l ${
            this.state.markAd === false ? "far" : "fas"
          } fa-bookmark`}
        ></i>
      </header>
    );
  }
}
