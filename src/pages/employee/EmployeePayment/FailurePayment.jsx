import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import {
  PaymentresContainer,
  ImgContainer,
  Img,
  ContextContainers,
  TitleDanger,
  CodeTitle,
  CodeNumber,
  DirectorDanger,
} from "./Payment.styles";

const EmployeeFailurePage = () => {
  const [trackingnumber, setTrackingNumber] = useState();
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    setTrackingNumber(params.get("trackingnumber"));
  }, [params]);

  return (
    <PaymentresContainer>
      <ImgContainer>
        <Img src="/img/paymentres.svg" alt="faile-payment"></Img>
      </ImgContainer>
      <ContextContainers>
        <TitleDanger> پرداخت ناموفق </TitleDanger>
        <CodeTitle> : کد رهگیری </CodeTitle>
        <CodeNumber> {trackingnumber} </CodeNumber>
        <DirectorDanger to="/">
          <i className="fa fa-caret-left"></i>
          <span> بازگشت به خانه </span>
        </DirectorDanger>
      </ContextContainers>
    </PaymentresContainer>
  );
};

export { EmployeeFailurePage };
