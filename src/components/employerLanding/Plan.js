import React from "react";
import { numberSeparator } from "../../common";

export function Plan(props) {
  return (
    <div className="bg-white srounded-md sshadow sp-2">
      <h3 className="d-block text-center fs-l ir-b">{props.title}</h3>

      {props.discount === 0 ? (
        <span
          className="d-block ir-b c-dark text-center smb-2 spy-3 text-success"
          style={{ fontSize: "24px" }}
        >{`${numberSeparator(props.price)} تومان`}</span>
      ) : (
        <React.Fragment>
          <span
            className="d-block ir-b c-dark text-center smt-5 smb-1 c-success"
            style={{ fontSize: "24px" }}
          >
            {`${numberSeparator(
              props.price * (1 - props.discount / 100)
            )} تومان`}
          </span>
          <span
            className="d-block ir-b c-dark text-center smb-2 spb-3 c-danger"
            style={{
              fontSize: "20px",
              textDecoration: "line-through",
            }}
          >{`${numberSeparator(props.price)} تومان`}</span>
        </React.Fragment>
      )}

      <ul className="list-group">
        <li className="list-group-item ir-r text-center border-top-0 border-left-0 border-right-0">
          {props.content}
        </li>

        <li className="list-group-item ir-r text-center border-top-0 border-left-0 border-right-0">
          تعداد آگهی های قابل ثبت:
          <strong>{` ${props.adverCount} عدد`}</strong>
        </li>

        {props.logo !== 0 ? (
          <li className="list-group-item ir-r text-center border-left-0 border-right-0">
            {`نمایش لوگوی شرکت در صفحه ی اصلی به مدت ${props.logo} روز`}
          </li>
        ) : (
          ""
        )}

        {props.isUseResomeManegement === true ? (
          <li className="list-group-item ir-r text-center border-left-0 border-right-0">
            استفاده از مدیریت رزومه های ارسالی
          </li>
        ) : (
          ""
        )}

        <li className="list-group-item ir-r text-center border-left-0 border-right-0">
          {`مدت زمان استفاده: ${props.duration} روز`}
        </li>

        <li className="list-group-item ir-r text-center border-left-0 border-right-0">
          {`مدت اعتبار هر آگهی: ${props.adverExpireTime} روز`}
        </li>

        <li className="list-group-item ir-r text-center border-left-0 border-right-0 border-bottom-0">
          {props.immediateAdverCount !== 0
            ? `${props.immediateAdverCount} عدد آگهی فوری`
            : "بدون آگهی فوری"}
        </li>
      </ul>
    </div>
  );
}
