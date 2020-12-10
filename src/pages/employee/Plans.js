import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import API_ADDRESS from "../../API_ADDRESS"
import { numberSeparator } from "../../common"
import agent from "../../core/agent"

import { toast } from "react-toastify"

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
    id: null,
    title: null,
    price: null,
    duration: null,
    adverCount: null,
  }

  // async componentDidMount() {
  //   // await axios
  //   //   .get(API_ADDRESS + "plan/GetAllPlansForCompanies")
  //   //   .then((res) => {
  //   //     this.setState({ plans: res.data.resul })
  //   //   })
  //   //   .catch()
  // }

  async componentDidMount() {
    const { data } = await agent.Plans.plan()
    await this.setState({
      id: data.resul.id,
      title: data.resul.title,
      price: data.resul.price,
      duration: data.resul.duration,
      adverCount: data.resul.adverCount,
    })
  }

  goToDargah = async () => {
    // event.preventDefault();
    try {
      const { data } = await agent.Plans.gotoDargah(this.state.id)
      window.location.href = data?.resul?.gatewayTransporter?.descriptor?.url
    } catch (err) {
      console.log(err)
      if (err.response?.status === 401) toast.error("لطفا وارد شوید.")
      else if (err.response?.status === 404) toast.error("خطای رخ داده ")
      else if (err.response?.status === 500) toast.error("مشکلی رخ داده ")
      else {
        for (
          let index = 0;
          index < err?.response?.data?.message?.length;
          index++
        ) {
          toast.error(err.response.data.message[index])
        }
      }
    }

    // axios
    //   .post(
    //     API_URL +
    //       `paymentPlan?planId=${this.props.id}${
    //         this.state.giftCode !== 0
    //           ? `&giftCartId=${this.state.giftCode}`
    //           : ""
    //       }`,
    //     {},
    //     {
    //       headers: {
    //         Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     window.location.href =
    //       res?.data?.resul?.gatewayTransporter?.descriptor?.url
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     if (err.response?.status === 401) toast.error("لطفا وارد شوید.")
    //     else if (err.response?.status === 404) toast.error("خطای رخ داده ")
    //     else if (err.response?.status === 500) toast.error("مشکلی رخ داده ")
    //     else {
    //       for (
    //         let index = 0;
    //         index < err?.response?.data?.message?.length;
    //         index++
    //       ) {
    //         toast.error(err.response.data.message[index])
    //       }
    //     }

    //     // this.setState({ errMessage: err.response?.data?.message[0] })
    //   })
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
                <Title> {this.state.title} </Title>
                <Price> {this.state.price} تومان </Price>
                <Description>
                  {" "}
                  تعداد ارسال رزومه : {this.state.adverCount}{" "}
                </Description>
                <Description>
                  {" "}
                  مدت زمان استفاده : {this.state.duration}{" "}
                </Description>
                <Button onClick={this.goToDargah}> خرید </Button>
              </TariffContainer>
            </PlanesHolder>
          </PlaneContainer>
        </div>
      </section>
    )
  }
}
