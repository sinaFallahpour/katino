import React from "react";
import { Ad2 } from "../../home/ads/Ad2";

export function NotRequested(props) {
  return (
    <div className="bg-white srounded-md sbs-content sp-2">
      {props.items === [] ? (
        <p className="ir-r text-center d-block fs-m c-regular">
          آگهی ای برای نمایش وجود ندارد
        </p>
      ) : (
        props.items.map((item, index) => {
          return (
            <div key={index} className={index !== 0 ? "smt-2" : "mt-0"}>
              <Ad2
                id={item.id}
                title={item.title}
                companyName={item.companyName}
                city={item.city}
                salary={item.salary}
                type={item.typeOfCooperation}
                typeOfCooperation={item.typeOfCooperation}
                item={item}
                handleMarkOtherAdv={props.handleMarkOtherAdv}
                selectdIds={props.selectdIds}
                handleChangeSelecetdId={props.handleChangeSelecetdId}
              />
            </div>
          );
        })
      )}
    </div>
  );
}
