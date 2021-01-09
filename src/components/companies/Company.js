import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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

  const linkCheck = () => {
    if (!props.enName) {
      toast.error("شرکت مورد نظر صفحه ای ندارد");
    }
  };

  return (
    <Link
      to={props.enName ? `/Company/${props.enName}` : `/BestCompanies`}
      onClick={linkCheck}
      className="cartContainer bg-white srounded-md"
    >
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
          <i class="fa fa-building"></i> {props.name ? props.name : "---"}
        </div>
        <div>
          <i className="fas fa-tasks"></i> {fields ? fields : "---"}
        </div>
        <div>
          <i className="fas fa-map-marker-alt c-regular fs-s sml-1"></i>{" "}
          {props.city ? props.city : "---"}
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

      {props.description && (
        <div className="DescriptionContainer">{props.description}</div>
      )}
    </Link>
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
