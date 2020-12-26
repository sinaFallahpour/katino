import React from "react";
import { JobSearchBox2 } from "../JobSearchBox2";
import { SearchBoxContainer } from "./SearchBox.styles";

export function SearchBox({ cities, LandingImg }) {
  return (
    <SearchBoxContainer
      LandingImg={LandingImg}
      className="container-fluid spx-2 spx-lg-10 spy-5 d-flex justify-content-center align-items-center"
    >
      <JobSearchBox2 cities={cities} />
    </SearchBoxContainer>
  );
}
