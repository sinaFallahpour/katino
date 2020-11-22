import React from "react";
import { Plan } from "./Plan";

export function Plans(props) {
  return (
    <React.Fragment>
      <h2 className="d-block text-center c-dark ir-b fs-l smb-5">تعرفه ها</h2>

      <div className="row spx-lg-5">
        {props.items.map((item, index) => (
          <div
            key={index}
            className={`col-12 col-lg-4 ${
              index !== props.items.length ? "smb-3 mb-lg-0" : "mb-0"
            }`}
          >
            <Plan
              title={item.title}
              price={item.price}
              content={item.content}
              adverCount={item.adverCount}
              logo={item.logo}
              isUseResomeManegement={item.isUseResomeManegement}
              duration={item.duration}
              adverExpireTime={item.adverExpireTime}
              immediateAdverCount={item.immediateAdverCount}
              discount={item.discount}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
