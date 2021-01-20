import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ADDRESS from "../../ADDRESS";
import ReactHtmlParser from "react-html-parser";
import "./company.style.css";

export function Company(props) {
  let fields = "";

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
            alt={props.name}
          />
        </div>

        <div className="options d-flex justify-content-start justify-content-lg-end align-items-center smt-2 mt-lg-0">
          {props.rate ? rate(props.rate) : ""}
        </div>
      </header>

      <div className="cartContextContainer">
        <div>
          <i className="fa fa-building"></i> {props.name ? props.name : "---"}
        </div>
        <div>
          <i className="fas fa-tasks"></i> {fields ? fields : "---"}
        </div>
        <div>
          <i className="fas fa-map-marker-alt c-regular fs-s sml-1"></i>{" "}
          {props.city ? props.city : "---"}
        </div>
      </div>

      {props.description && (
        <div className="DescriptionContainer">
          {ReactHtmlParser(props.description)}
        </div>
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
