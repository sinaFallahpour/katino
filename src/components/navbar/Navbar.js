import React, { Component } from "react";
import { EmployerNavbar } from "./EmployerNavbar";
import { EmployeeNavbar } from "./EmployeeNavbar";
import { LandingNavbar } from "./LandingNavbar";
import { GetLandingPage } from "../../core/api/landing-page";

export class Navbar extends Component {
  state = { userInfo: "", Logo: "" };

  async componentDidMount() {
    const role = localStorage.getItem("userInfo");
    await this.setState({ userInfo: role });

    GetLandingPage().then((res) =>
      res?.resul?.map((item) => {
        item.key === "Logo" && this.setState({ Logo: item.value });
      })
    );
  }

  render() {
    if (this.state.userInfo == "Employer") {
      return <EmployerNavbar Logo={this.state.Logo} />;
    } else if (this.state.userInfo == "Employee") {
      return <EmployeeNavbar Logo={this.state.Logo} />;
    } else {
      return <LandingNavbar Logo={this.state.Logo} />;
    }
  }
}
