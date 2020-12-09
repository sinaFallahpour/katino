import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import API_ADDRESS from "../../API_ADDRESS"
import { numberSeparator } from "../../common"
import {
  PlaneContainer,
  PlanesHolder,
  ImageContainer,
  Img,
  TariffContainer,
  Title,
  Price,
  Description,
  Button,
} from "./plans.styles"

export class EmployeePlans extends Component {
  state = {
    plans: [],
  }

  async componentDidMount() {
    await axios
      .get(API_ADDRESS + "plan/GetAllPlansForCompanies")
      .then((res) => {
        this.setState({ plans: res.data.resul })
      })
      .catch()
  }

  render() {
    return (
      <section className="dashboard container-fluid spx-2 smt-10 spx-lg-10">
        <div className="row">
          <div className="bg-white srounded-md sshadow w-100 sp-2">
            <nav className="navbar navbar-expand-lg pr-0 py-0">
              <div
                className="collapse navbar-collapse d-none d-lg-block"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item smr-lg-4">
                    <Link
                      className="nav-link position-relative ir-r fs-m p-0 active"
                      style={{ color: "#00BCD4 !important" }}
                      to="/"
                    >
                      تعرفه ها
                    </Link>
                  </li>

                  <li className="nav-item smr-lg-4">
                    <Link
                      className="nav-link position-relative c-grey ir-r fs-m p-0 active"
                      to="/"
                    >
                      تاریخچه حساب
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="row smt-3">
          <PlaneContainer>
            <PlanesHolder>
              <ImageContainer>
                <Img src="/img/cart.png"></Img>
              </ImageContainer>
              <TariffContainer>
                <Title> طرح نقره ای </Title>
                <Price> 10,000,000 تومان </Price>
                <Description> تعداد ارسال رزومه : نامحدود </Description>
                <Description> مدت زمان استفاده : یک ساله </Description>
                <Button> خرید </Button>
              </TariffContainer>
            </PlanesHolder>
          </PlaneContainer>
        </div>
      </section>
    )
  }
}
