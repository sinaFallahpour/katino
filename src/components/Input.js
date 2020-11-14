import React from "react";
import Select from "react-select";

export function Input(props) {
  switch (props.type) {
    case "phoneNumber":
      return (
        <div className="text-input srounded-sm">
          <label
            className="ir-r text-regular text-right smb-1 label bg-white"
            htmlFor={props.id}
          >
            {props.label}
            <span
              className={
                props.priority === "required"
                  ? "text-danger d-inline"
                  : "d-none"
              }
            >
              *
            </span>
          </label>

          <div className="form-group d-flex justify-content-center align-items-center">
            <input
              name={props.name}
              onChange={props.onChange}
              id={props.id}
              maxLength="11"
              minLength="11"
              className="form-control digit d-block fs-m text-right ir-r text-regular shadow-none"
              type="tel"
              placeholder={props.placeholder}
            />
          </div>
        </div>
      );
      break;

    case "verification":
      return (
        <div className="form-group text-input srounded-sm">
          <label
            className="ir-r text-regular text-right smb-1 label bg-white"
            htmlFor={props.id}
          >
            {props.label}
          </label>

          <input
            onChange={props.onChange}
            id={props.id}
            name={props.name}
            maxLength="6"
            className="form-control digit d-block fs-m text-right ir-r text-regular"
            type="text"
            placeholder={props.placeholder}
          />
        </div>
      );
      break;

    case "text":
      return (
        <div className="form-group text-input srounded-sm">
          <label
            className="ir-r text-regular text-right smb-1 label bg-white"
            htmlFor={props.id}
          >
            {props.label}
            <span
              className={
                props.priority === "required"
                  ? "text-danger d-inline"
                  : "d-none"
              }
            >
              *
            </span>
          </label>

          <input
            name={props.name}
            onChange={props.onChange}
            id={props.id}
            className="form-control digit d-block fs-m text-right ir-r text-regular"
            type="text"
            placeholder={props.placeholder}
            maxLength={props.maxLength}
          />
        </div>
      );
      break;

    case "uploadLogo":
      return (
        <div className="form-group text-input srounded-sm smb-3">
          <span
            className="ir-r text-regular text-right smb-1 label bg-white d-block"
            htmlFor={props.id}
          >
            {props.label}
            <span
              className={
                props.priority === "required"
                  ? "text-danger d-inline"
                  : "d-none"
              }
            >
              *
            </span>
          </span>

          <label
            className="ir-r sp-1 border srounded-sm text-regular text-right smb-1 label bg-white d-flex justify-content-between align-items-center"
            htmlFor={props.id}
          >
            <div>
              <i className="fas fa-image sml-1"></i>
              لوگوی شرکت
            </div>

            <span className="btn btn-success">انتخاب</span>
          </label>

          <input
            name={props.name}
            onChange={props.onChange}
            accept="image/png, image/jpeg"
            id={props.id}
            className="d-none"
            type="file"
            placeholder={props.placeholder}
          />
        </div>
      );
      break;

    case "selection":
      return (
        <div className="form-group text-input srounded-sm smb-3">
          <label
            className="ir-r text-regular text-right smb-1 label bg-white"
            htmlFor={props.id}
          >
            {props.label}
            <span
              className={
                props.priority === "required"
                  ? "text-danger d-inline"
                  : "d-none"
              }
            >
              *
            </span>
          </label>

          <Select
            onChange={(e) => {
              props.onChange(e);
            }}
            id={props.id}
            label={props.name}
            value={props.value}
            className="ir-r"
            isSearchable={false}
            placeholder={props.placeholder}
            options={props.options}
          />
        </div>
      );
      break;
  }
}
