import React from "react";

export function Info(props) {
  return (
    <div className="info-box border bg-white srounded-sm">
      <div
        className="ir-b spx-2 spy-1 fs-s title d-flex justify-content-between align-items-center"
        style={{ borderRadius: "5px 5px 0 0", background: "#EDEDED" }}
      >
        {props.title}

        {props.type === "file" ? (
          <a
            className="btn bg-white border srounded-sm ir-r fs-s p-2"
            href="#"
            target="_blank"
          >
            دانلود
          </a>
        ) : (
          ""
        )}
      </div>

      {props.type === "list" ? (
        <ul className="m-0 p-0">
          {props.list.map((item, index) => (
            <li
              key={index}
              className={`ir-r spx-2 spy-1 fs-s text-right ${
                index !== props.list.length ? "border-top" : ""
              }`}
            >
              {`${item.key}: ${item.value}`}
            </li>
          ))}
        </ul>
      ) : props.type === "paragraph" ? (
        <p className="ir-r text-justify spx-2 spy-1 mb-0 fs-s">{props.text}</p>
      ) : (
        ""
      )}
    </div>
  );
}
