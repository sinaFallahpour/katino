import React from "react";
import { Company } from "./Company";
import ADDRESS from "../../../ADDRESS";

export function Companies({ logos }) {
  return (
    <section className="companies container-fluid spx-2 spx-lg-10 smy-10">
      <div className="row">
        {logos.map((item) => (
          <div
            key={item.id}
            className="col-6 col-lg-2 smb-2 mb-lg-0 sp-2 sp-lg-3"
          >
            <Company
              image={`${ADDRESS}img/CompanyLogo/${item.companyLogo}`}
              companyName={item.companyName}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
