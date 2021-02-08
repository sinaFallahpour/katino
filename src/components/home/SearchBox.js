import React from "react";
import { JobSearchBox2 } from "../JobSearchBox2";
import { Link } from "react-router-dom";
import auth from "../../core/authService";
import {
  SearchBoxContainer,
  RightSide,
  LeftSide,
  Title,
  Description,
  Seperator,
} from "./SearchBox.styles";

export function SearchBox({ cities, LandingImg }) {
  console.log(auth.getCurrentUser());
  return (
    <SearchBoxContainer
      LandingImg={LandingImg}
      className="container-fluid spx-2 spx-lg-10 spy-5 d-flex justify-content-center align-items-center"
    >
      <RightSide>
        <Title> به دنبال کار می گردید؟ </Title>
        <JobSearchBox2 cities={cities} />
      </RightSide>
      <Seperator />
      <LeftSide>
        <Title> در جستجوی نیروی کار هستید؟ </Title>
        <Description>
          آگهی شغلی خود را بر روی سایت قرار دهید و بهترین کارجویان را بیابید.
        </Description>
        <Description>
          <Link
            className="btn btn-warning ir-r d-none d-block sml-1"
            to={
              auth.getCurrentUser().role === "Employer"
                ? "/Employer/CreateAd"
                : "/Employer/Login"
            }
          >
            <i className="fas fa-briefcase "></i>
            {"  "}
            ثبت آگهی استخدام
          </Link>
        </Description>
      </LeftSide>
    </SearchBoxContainer>
  );
}
