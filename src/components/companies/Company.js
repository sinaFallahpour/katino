import React from "react";
import { Link } from "react-router-dom";
import ADDRESS from "../../ADDRESS";
import "./company.style.css";

export function Company(props) {
  let fields = "";

  // city={this.state.company.city}
  // description={this.state.company.description}
  // email={this.state.company.email}
  // website={this.state.company.url}
  // logo={this.state.company.image}
  // rate={this.state.company.rate}
  // isActive={this.state.company.isActive}
  // mobile={this.state.company.mobile}
  // phoneNumber={this.state.company.phoneNumber}
  // managementFullName={this.state.company.managementFullName}
  // numberOfStaff={this.state.company.numberOfStaff}
  // hasLink={false}

  props.filedOfActivity.map((item, index) => {
    if (index === 0) fields += item;
    else fields += `، ${item}`;
  });

  return (
    <div className="cartContainer bg-white srounded-md">
      <header className="cartHeaderContainer">
        <div className="logoContainer ">
          <img
            src={
              props.logo
                ? `${ADDRESS}img/CompanyLogo/${props.logo}`
                : "/img/sample-logo.svg"
            }
            title={props.name}
          />
        </div>

        <div className="options d-flex justify-content-start justify-content-lg-end align-items-center smt-2 mt-lg-0">
          {props.rate ? rate(props.rate) : ""}
        </div>
      </header>

      <div className="cartContextContainer">
        <div>
          <i className="fas fa-map-marker-alt c-regular fs-s sml-1"></i>
          {props.name}
        </div>
        <div>
          <i className="fas fa-map-marker-alt c-regular fs-s sml-1"></i>
          {props.enName}
        </div>
        <div>
          <i className="fas fa-map-marker-alt c-regular fs-s sml-1"></i>
          {fields}
        </div>

        {props.city ? (
          <div className="location ir-r c-regular d-flex justify-content-start align-items-center smr-2">
            <i className="fas fa-map-marker-alt c-regular fs-s sml-1"></i>
            {props.city}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="cartContentContainer">
        {props.description && (
          <p className="description text-justify ir-r c-regular spt-1 d-flex flex-column align mb-0">
            {props.description}
          </p>
        )}

        {props.hasLink ? (
          <Link
            className="text-decoration-none c-warning smt-1 ir-r"
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

// {props.website ? (
//   <a
//     className="website ir-r c-regular d-flex justify-content-start align-items-center text-decoration-none smr-2"
//     href={`http://${props.website}`}
//     target="_blank"
//   >
//     <i className="fas fa-globe c-regular fs-s sml-1"></i>
//     {props.website}
//   </a>
// ) : (
//   ""
// )}

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
