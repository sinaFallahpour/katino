import React from "react";
import { JobSearchBox } from "../JobSearchBox";

export function SearchBox({ cities }) {
  return (
    <section className="h-search-box container-fluid spx-2 spx-lg-10 spy-5 d-flex justify-content-center align-items-center">
      <JobSearchBox cities={cities} />
    </section>
  );
}
