import React from "react";

export default function CheckBoxes(props) {
  return (
    <div className="bg-white srounded-md sbs-shadow sp-2">
      <span className="d-block text-right c-dark fs-s ir-b mb-0">
        {props.title}
      </span>

      <hr className="smy-1" />

      {console.log(props.list)}
      <div className="checkboxes">
        {props.list.map((item, index) => (
          <div
            key={index}
            className={
              index !== props.list.length
                ? "form-check smb-1"
                : "form-check mb-0"
            }
          >
            <input
              className="form-check-input"
              type="checkbox"
              onChange={(e) => props.handleSabegheKar(e)}
              value={item.enum}
              id={props.name + index}
            />
            <label
              className="form-check-label d-flex justify-content-between align-items-center ir-r fs-s"
              htmlFor={props.name + index}
            >
              {item.key}

              <span className="ir-r fs-s bg-light d-block number text-center srounded-sm">
                {item.num}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
