import React, { Component } from "react"
import { EmployerNavbar } from "./EmployerNavbar"
import { EmployeeNavbar } from "./EmployeeNavbar"
import { LandingNavbar } from "./LandingNavbar"

export class Navbar extends Component {
  state = { userInfo: "" }

  async componentDidMount() {
    const role = localStorage.getItem("userInfo")
    await this.setState({ userInfo: role })
  }

  render() {
    if (this.state.userInfo == "Employer") {
      return <EmployerNavbar />
    } else if (this.state.userInfo == "Employee") {
      return <EmployeeNavbar />
    } else {
      return <LandingNavbar />
    }
  }
}
