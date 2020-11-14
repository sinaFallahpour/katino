import React, { Component } from "react";
import axios from "axios";
import API_ADDRESS from ".././../API_ADDRESS";
import { EmployerFooter } from "./EmployerFooter";
import { EmployeeFooter } from "./EmployeeFooter";
import { LandingFooter } from "./LandingFooter";

export class Navbar extends Component {
  state = {
    role: {},
  };

  componentDidMount() {
    axios
      .get(API_ADDRESS + "Account/GetUserRole", {
        headers: { Authorization: `bearer ${localStorage.getItem("JWT")}` },
      })
      .then((res) => this.setState({ ...this.state, role: res.data.resul }));
  }

  render() {
    if (this.state.role === "Employer") {
      return <EmployerFooter />;
    } else if (this.state.role === "Employee") {
      return <EmployeeFooter />;
    } else {
      return <LandingFooter />;
    }
  }
}
