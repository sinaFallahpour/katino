import React from "react";
import { Link } from "react-router-dom";
import "./companyDetails.styles.css";

const CompanySideBar = (props) => {
  // name={this.state.company.companyPersianName}
  // enName={this.state.company.companyEngName}
  // ={this.state.company.numberOfStaff}

  return (
    <div className="sideBarHolder">
      <div>
        <i class="fa fa-user"></i>{" "}
        {props.managementFullName ? props.managementFullName : "---"}
      </div>
      <div>
        <i class="fa fa-envelope"></i> {props.email ? props.email : "---"}
      </div>
      <div className="LinkOfCompany">
        <i class="fa fa-globe"></i> {props.website ? props.website : "---"}
      </div>
      <div>
        <i class="fa fa-mobile"></i> {props.mobile ? props.mobile : "---"}
      </div>
      <div>
        <i class="fa fa-phone"></i>{" "}
        {props.phoneNumber ? props.phoneNumber : "---"}
      </div>
      <div>
        <i class="fa fa-users"></i>{" "}
        {props.numberOfStaff ? props.numberOfStaff : "---"}
      </div>
      <div>
        {props.isActive ? (
          <span className="c-success">
            <i class="far fa-thumbs-up"></i> فعال
          </span>
        ) : (
          <span className="c-danger">
            <i class="far fa-thumbs-down"></i> غیرفعال
          </span>
        )}
      </div>
    </div>
  );
};

export { CompanySideBar };
