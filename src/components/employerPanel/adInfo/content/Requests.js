import React from "react";
import ADDRESS from "../../../../ADDRESS";

export function Requests(props) {
  return (
    <div className="bg-white sbs-shadow srounded-md sp-2 table-responsive">
      <table className="table mb-0">
        <thead>
          <tr>
            <th
              className="ir-b c-regular text-right fs-s border-top-0"
              scope="col"
            >
              نام متقاضی
            </th>
            <th
              className="ir-b c-regular text-right fs-s border-top-0"
              scope="col"
            >
              وضعیت
            </th>
            <th
              className="ir-b c-regular text-right fs-s border-top-0"
              scope="col"
            >
              تاریخ
            </th>
            <th
              className="ir-b c-regular text-right fs-s border-top-0"
              scope="col"
            >
              جزئیات
            </th>
          </tr>
        </thead>
        <tbody>
          {props.resumes.map((item,index) => (
            <tr key={index}>
              <td className="d-flex align-items-center justify-content-start border-0">
                <img
                  className="sml-1 srounded-sm"
                  src={`${ADDRESS}img/employeeAvatar/${item.userAvatar}`}
                  height="40"
                  alt="employee avatar"
                />
                <div className="texts">
                  <span className="d-block fs-s text-right ir-b c-dark">
                    {item.fullName}
                  </span>
                  <span className="d-block fs-s text-right ir-r c-regular">
                    {item.jobTitle}
                  </span>
                </div>
              </td>
              <td className="border-0">
                <span className="ir-r c-regular bg-light srounded-sm sp-1 fs-s">
                  {asingResomeStatus(item.asingResomeStatus)}
                </span>
              </td>
              <td className="border-0 ir-r fs-s">{item.date}</td>
              <td className="border-0">
                <div className="btn">
                  <i
                    className={`fas fa-comment ${
                      item.hasComment === true ? "c-dark" : "c-grey"
                    }`}
                  ></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function asingResomeStatus(number) {
  switch (number) {
    case 1:
      return "در حال بررسی";

    case 2:
      return "پذیرفته شده";

    case 3:
      return "رد شده";

    case 4:
      return "برگشت خورده";
  }
}
