import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"

import {
  PaymentresContainer,
  ImgContainer,
  Img,
  ContextContainers,
  TitleSuccess,
  CodeTitle,
  CodeNumber,
  DirectorSuccess,
} from "./Payment.styles"

const EmployerSuccessPage = () => {
  const [trackingnumber, setTrackingNumber] = useState()
  const params = new URLSearchParams(window.location)

  useEffect(() => {
    setTrackingNumber(params.get("trackingnumber"))
  }, [params])

  return (
    <PaymentresContainer>
      <ImgContainer>
        <Img src="/img/paymentres.svg" alt="success-payment"></Img>
      </ImgContainer>
      <ContextContainers>
        <TitleSuccess> پرداخت با موفقیت انجام شد </TitleSuccess>
        <CodeTitle> : کد رهگیری </CodeTitle>
        <CodeNumber> {trackingnumber} </CodeNumber>
        <DirectorSuccess to="/Employer/CreateAd">
          <i className="fa fa-caret-left"></i>
          <span> بازگشت به خانه </span>
        </DirectorSuccess>
      </ContextContainers>
    </PaymentresContainer>
  )
}

export { EmployerSuccessPage }
