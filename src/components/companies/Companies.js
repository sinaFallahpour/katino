import React from "react";
import { Company } from "./Company";

export function Companies(props) {
  return (
    <div className="row companies smr-2 sml-2 position-relative">
      {props.companies &&
        props.companies.map((item, index) => (
          <div key={index} className="col-12 p-0 c-item">
            <Company
              filedOfActivity={item.filedOfActivity}
              name={item.companyPersianName}
              website={item.url}
              logo={item.image}
              city={item.city}
              rate={item.rate}
              enName={item.companyEngName}
              description={item.description}
              hasLink={true}
            />
          </div>
        ))}
    </div>
  );
}
