import React from "react";
import { CheckBoxes } from "./CheckBoxes";

export function SideBar(props) {
  console.log(props.info)

  return (
    <div className="ad-info-sidebar">
      <div className="smb-2">
        <CheckBoxes
          title="وضعیت متقاضی"
          name="requestStatus"
          list={[
            {
              key: "در انتظار تعیین وضعیت",
              num: props.info.AsingResomeStatus_Pending,
            },
            {
              key: "تایید برای مصاحبه",
              num: props.info.AsingResomeStatus_AcceptedForInterview,
            },
            {
              key: "استخدام شده",
              num: props.info.AsingResomeStatus_Hired,
            },
            { key: "رد شده", num: props.info.AsingResomeStatus_Rejected },
          ]}
        />
      </div>

      <div className="smb-2">
        <CheckBoxes
          title="جنسیت"
          name="gender"
          list={[
            { key: "مهم نیست", num: props.info.Gender_NotImp },
            { key: "مرد", num: props.info.Gender_Male },
            { key: "زن", num: props.info.Gender_Female },
          ]}
        />
      </div>

      <div className="smb-2">
        <CheckBoxes
          title="استان"
          name="province"
          list={[{ key: "مازندران", num: 1 }]}
        />
      </div>

      <div className="smb-2">
        <CheckBoxes
          title="سابقه کار"
          name="workExperience"
          list={[
            { key: "تازه کار", num: props.info.Senioritylevel_Junior },
            { key: "متخصص", num: props.info.Senioritylevel_Expert },
            { key: "مدیر", num: props.info.Senioritylevel_Manager },
            {
              key: "مدیر ارشد",
              num: props.info.Senioritylevel_SeniorManger,
            },
          ]}
        />
      </div>

      {/* <div className="mb-0">
        <CheckBoxes title="سابقه کار" />
      </div> */}
    </div>
  );
}
