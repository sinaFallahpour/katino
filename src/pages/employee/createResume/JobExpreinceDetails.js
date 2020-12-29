import React, { useEffect, useState } from "react";

const JobExpreinceDetails = ({ AllWorkExperience }) => {
  console.log(AllWorkExperience);

  return (
    <>
      {AllWorkExperience && AllWorkExperience !== [] ? (
        <ul className="list-group list-group-flush p-0">
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">عنوان کار : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">نام شرکت : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">تاریخ شروع کار : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">تاریخ پایان کار : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">توضیحات : -</span>
          </li>
        </ul>
      ) : (
        AllWorkExperience &&
        AllWorkExperience.map((item) => (
          <ul className="list-group list-group-flush p-0">
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                عنوان کار :{" "}
                <span className="c-regular">{item.workTitle || "-"}</span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                نام شرکت :{" "}
                <span className="c-regular">{item.companyName || "-"}</span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                تاریخ شروع کار :{" "}
                <span className="c-regular">{item.startDate || "-"}</span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                تاریخ پایان کار :{" "}
                <span className="c-regular">{item.endDate || "-"}</span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                توضیحات :{" "}
                <span className="c-regular">{item.description || "-"}</span>
              </span>
            </li>
          </ul>
        ))
      )}
    </>
  );
};

export { JobExpreinceDetails };
