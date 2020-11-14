import React from "react";
import { Link } from "react-router-dom";
import ADDRESS from "../../ADDRESS";

export function Company(props) {
  let fields = "";

  props.filedOfActivity.map((item, index) => {
    if (index === 0) fields += item;
    else fields += `، ${item}`;
  });

  return (
    <div className="company-card sp-2 bg-white srounded-md">
      <header className="header d-lg-flex justify-content-lg-between align-items-lg-end">
        <img
          className="logo srounded-md"
          src={
            props.logo
              ? `${ADDRESS}img/CompanyLogo/${props.logo}`
              : "/img/sample-logo.svg"
          }
          title={props.name}
        />

        <div className="details d-lg-flex align-items-lg-end justify-content-lg-between spr-lg-2 smt-2 mt-lg-0">
          <div className="texts">
            <h3 className="ir-b c-dark fs-m">{props.name}</h3>
            <p className="ir-b c-grey fs-s mb-0">{fields}</p>
          </div>

          <div className="options d-flex justify-content-start justify-content-lg-end align-items-center smt-2 mt-lg-0">
            {props.rate ? rate(props.rate) : ""}

            {props.city ? (
              <div className="location ir-r c-regular d-flex justify-content-start align-items-center smr-2">
                <i className="fas fa-map-marker-alt c-regular fs-s sml-1"></i>
                {props.city}
              </div>
            ) : (
              ""
            )}

            {props.website ? (
              <a
                className="website ir-r c-regular d-flex justify-content-start align-items-center text-decoration-none smr-2"
                href={`http://${props.website}`}
                target="_blank"
              >
                <i className="fas fa-globe c-regular fs-s sml-1"></i>
                {props.website}
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </header>

      <div className="content d-flex flex-column align-items-start justify-content-start smt-5">
        <p className="description text-justify ir-r c-regular spt-1 d-flex flex-column align mb-0">
          {props.description ? props.description : ""}
        </p>

        {props.hasLink ? (
          <Link
            className="text-decoration-none c-warning smt-2 ir-r"
            to={`/Company/${props.enName}`}
          >
            اطلاعات بیشتر
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function rate(num) {
  switch (num) {
    case 1:
      return (
        <div className="rate-stars d-flex flex-row-reverse">
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-grey"></i>
          <i className="fas fa-star c-grey"></i>
          <i className="fas fa-star c-grey"></i>
          <i className="fas fa-star c-grey"></i>
        </div>
      );
      break;

    case 2:
      return (
        <div className="rate-stars d-flex flex-row-reverse">
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-grey"></i>
          <i className="fas fa-star c-grey"></i>
          <i className="fas fa-star c-grey"></i>
        </div>
      );
      break;

    case 3:
      return (
        <div className="rate-stars d-flex flex-row-reverse">
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-grey"></i>
          <i className="fas fa-star c-grey"></i>
        </div>
      );
      break;

    case 4:
      return (
        <div className="rate-stars d-flex flex-row-reverse">
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-grey"></i>
        </div>
      );
      break;

    case 5:
      return (
        <div className="rate-stars d-flex flex-row-reverse">
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-gold"></i>
          <i className="fas fa-star c-gold"></i>
        </div>
      );
      break;
  }
}
