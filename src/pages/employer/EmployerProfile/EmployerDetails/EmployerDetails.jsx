import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";

import ADDRESS from "../../../../ADDRESS";
import API_ADDRESS from "../../../../API_ADDRESS";
import {
  EmployerDetailsContainer,
  EmployerDetailsHolder,
  LeftSideContainer,
  RightSideContainer,
  ImageContainer,
  Image,
  CompanyName,
  FullName,
  ContextContainer,
  Title,
  Description,
  FieldOfActivity,
} from "./EmployerDetails.style";

const EmployerDetails = ({ companies }) => {
  const [findCity, setFindCity] = useState();

  useEffect(() => {
    axios.get(API_ADDRESS + "Account/GetCities").then(({ data }) => {
      data.resul.map((item) => {
        companies.City === item.cityDivisionCode &&
          setFindCity(`${item.provinceName} - ${item.cityName}`);
      });
    });
  }, [companies]);

  return (
    <EmployerDetailsContainer>
      <EmployerDetailsHolder>
        <LeftSideContainer>
          <ImageContainer>
            <Image src={`${ADDRESS}img/CompanyLogo/${companies.Image}`} />
          </ImageContainer>
          <CompanyName>
            <FullName>{companies.PersianFullName}</FullName>
            <FullName>{companies.EngFullName}</FullName>
          </CompanyName>
        </LeftSideContainer>
        <RightSideContainer>
          <ContextContainer>
            <Title> مدیر عامل : </Title>
            <Description> {companies.ManagmentFullName} </Description>
          </ContextContainer>
          <ContextContainer>
            <Title> شهر و استان : </Title>
            <Description> {findCity} </Description>
          </ContextContainer>
          <ContextContainer>
            <Title> ایمیل : </Title>
            <Description> {companies.Email} </Description>
          </ContextContainer>
          <ContextContainer>
            <Title> شماره تماس : </Title>
            <Description> {companies.EmergencPhone} </Description>
          </ContextContainer>
          <ContextContainer>
            <Title> وب سایت : </Title>
            <Description> {companies.url} </Description>
          </ContextContainer>
          <ContextContainer>
            <Title> تعداد پرسنل : </Title>
            <Description> {companies.NumberOfStaff} </Description>
          </ContextContainer>
          <ContextContainer
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Title> حوزه فعالیت : </Title>
            <Description>
              {companies.FieldOfActivity &&
                companies.FieldOfActivity.map(({ label, value }) => (
                  <FieldOfActivity key={value}>{label}</FieldOfActivity>
                ))}
            </Description>
          </ContextContainer>
          <ContextContainer
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Title> توضیحات : </Title>
            <Description>
              {ReactHtmlParser(companies.ShortDescription)}
            </Description>
          </ContextContainer>
        </RightSideContainer>
      </EmployerDetailsHolder>
    </EmployerDetailsContainer>
  );
};

export { EmployerDetails };
