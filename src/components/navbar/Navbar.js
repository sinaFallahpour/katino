import React, { Component } from "react";
import { EmployerNavbar } from "./EmployerNavbar";
import { EmployeeNavbar } from "./EmployeeNavbar";
import { LandingNavbar } from "./LandingNavbar";

export class Navbar extends Component {
  state = { userInfo: "" };
  async componentDidMount() {
    await this.setState({ userInfo: this.props.userInfo });
  }
  render() {
    if (this.props.userInfo == "Employer") {
      return <EmployerNavbar />;
    } else if (this.props.userInfo == "Employee") {
      return <EmployeeNavbar />;
    } else {
      return <LandingNavbar />;
    }
  }
}
