import React from "react";
import { CheckBoxes } from "./CheckBoxes";

export function SideBar(props) {
let cities=[];

props.info.city.map(item=>cities.push({
  key:item.cityName,
  num:item.count
}));

  return (
    <div className="ad-info-sidebar">
      <div className="smb-2">
        <CheckBoxes
          title="وضعیت متقاضی"
          name="requestStatus"
          list={[
            {
              key: "در انتظار تعیین وضعیت",
              num: props.info.model.AsingResomeStatus_Pending,
            },
            {
              key: "تایید برای مصاحبه",
              num: props.info.model.AsingResomeStatus_AcceptedForInterview,
            },
            {
              key: "استخدام شده",
              num: props.info.model.AsingResomeStatus_Hired,
            },
            { key: "رد شده", num: props.info.model.AsingResomeStatus_Rejected },
          ]}
        />
      </div>

      <div className="smb-2">
        <CheckBoxes
          title="جنسیت"
          name="gender"
          list={[
            { key: "مهم نیست", num: props.info.model.Gender_NotImp },
            { key: "مرد", num: props.info.model.Gender_Male },
            { key: "زن", num: props.info.model.Gender_Female },
          ]}
        />
      </div>

      <div className="smb-2">
        <CheckBoxes
          title="شهر"
          name="city"
          list={cities}
        />
      </div>

      <div className="smb-0">
        <CheckBoxes
          title="سابقه کار"
          name="workExperience"
          list={[
            { key: "تازه کار", num: props.info.model.Senioritylevel_Junior },
            { key: "متخصص", num: props.info.model.Senioritylevel_Expert },
            { key: "مدیر", num: props.info.model.Senioritylevel_Manager },
            {
              key: "مدیر ارشد",
              num: props.info.model.Senioritylevel_SeniorManger,
            },
          ]}
        />
      </div>
    </div>
  );
}
