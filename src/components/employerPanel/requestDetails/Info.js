import React from "react";
import { mainUrl } from "../../../core/agent";

export function Info(props) {
  const Downloader = (e) => {
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "00.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {props.type && (
        <div className="info-box border bg-white srounded-sm">
          {props.pdfUrl && props.type === "file" && (
            <div
              className="ir-b spx-2 spy-1 fs-s title d-flex justify-content-between align-items-center"
              style={{ borderRadius: "5px 5px 0 0", background: "#EDEDED" }}
            >
              {props.title}

              {props.type === "file" ? (
                <button
                  className="btn bg-white border srounded-sm ir-r fs-s p-2"
                  href={mainUrl + `PDF/resomePDF/${props.pdfUrl}`}
                  onClick={Downloader}
                >
                  دانلود
                </button>
              ) : (
                ""
              )}
            </div>
          )}

          {props.type === "list" ? (
            <ul className="m-0 p-0">
              {props.list.map((item, index) => (
                <li
                  key={index}
                  className={`ir-r sp-2 fs-s text-right ${
                    index !== props.list.length ? "border-top" : ""
                  }`}
                >
                  {`${item.key}: ${item.value}`}
                </li>
              ))}
            </ul>
          ) : props.type === "paragraph" ? (
            <p className="ir-r text-justify sp-2 spy-1 mb-0 fs-s">
              {props.text}
            </p>
          ) : props.type === "eduBackground" ? (
            <ul className="m-0 p-0">
              {props.list.map((item, index) => (
                <li
                  key={index}
                  className={`ir-r sp-2 fs-s text-right ${
                    index !== props.list.length ? "border-top" : ""
                  }`}
                >
                  <span className="ir-b fs-s c-regular text-right d-block smb-1">
                    {item.fieldOfStudy}
                  </span>
                  <p className="ir-r fs-s c-regular text-right d-block mb-0">
                    {`${item.universityName}، از ${item.startDate} تا ${item.endDate}`}
                  </p>
                </li>
              ))}
            </ul>
          ) : props.type === "jobBackground" ? (
            <ul className="m-0 p-0">
              {props.list.map((item, index) => (
                <li
                  key={index}
                  className={`ir-r sp-2 fs-s text-right ${
                    index !== props.list.length ? "border-top" : ""
                  }`}
                >
                  <span className="ir-b fs-s c-regular text-right d-block smb-1">
                    {item.workTitle}
                  </span>
                  <p className="ir-r fs-s c-regular text-right d-block mb-0">
                    {`${item.companyName}، از ${item.startDate} تا ${item.endDate}`}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
