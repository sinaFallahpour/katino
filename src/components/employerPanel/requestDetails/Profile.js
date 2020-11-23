import React from "react";
import { Info } from "./Info";

export function Profile(props) {
  console.log(props.allInfo);
  const skillsArray = props.allInfo.userJobSkill;
  
  let skills = "";

  skillsArray.map((item, index) => {
    if (index === skillsArray.length-1) skills += item.jobSkillName;
    else skills += `${item.jobSkillName} - `;
  });

  console.log("skills", skills);

  return (
    <div className="profile sp-2 border">
      <div className="smb-2">
        <Info
          type="list"
          title="اطلاعات فردی"
          list={[
            {
              key: "نام و نام خانوادگی",
              value: props.allInfo.userPersonalInfoForResome.fullName,
            },
            {
              key: "عنوان شغلی",
              value: props.allInfo.userPersonalInfoForResome.jobTitle,
            },
            {
              key: "وضعیت اشتغال",
              value: employmentStatus(
                props.allInfo.userPersonalInfoForResome.employmentStatus
              ),
            },
            {
              key: "آخرین شرکت",
              value: props.allInfo.userPersonalInfoForResome.lastCompanies,
            },
            {
              key: "آخرین مدرک تحصیلی",
              value:
                props.allInfo.userPersonalInfoForResome.lastDegreeOfEducation,
            },
            {
              key: "آدرس ایمیل",
              value: props.allInfo.userPersonalInfoForResome.email,
            },
            {
              key: "شماره موبایل",
              value: props.allInfo.userPersonalInfoForResome.phoneNumber,
            },
            {
              key: "شهر محل سکونت",
              value: props.allInfo.userPersonalInfoForResome.city,
            },
            {
              key: "آدرس محل سکونت",
              value: props.allInfo.userPersonalInfoForResome.address,
            },
            {
              key: "وضعیت تاهل",
              value:
                props.allInfo.userPersonalInfoForResome.isMarried === true
                  ? "متاهل"
                  : "مجرد",
            },
            {
              key: "سال تولد",
              value: props.allInfo.userPersonalInfoForResome.birthYear,
            },
            {
              key: "جنسیت",
              value: gender(props.allInfo.userPersonalInfoForResome.gender),
            },
            {
              key: "وضعیت خدمت سربازی",
              value: props.allInfo.userPersonalInfoForResome.military,
            },
          ]}
        />
      </div>

      <div className="smb-2">
        <Info
          type="paragraph"
          title="درباره من"
          text={props.allInfo.abouteMe}
        />
      </div>

      <div className="smb-2">
        <Info type="paragraph" title="مهارت های حرفه ای" text={skills} />
      </div>

      <div className="smb-2">
        <Info type="list" title="سوابق شغلی" list={[{}]} />
      </div>

      <div className="smb-2">
        <Info type="list" title="زبان ها" list={[{}]} />
      </div>

      <div className="mb-0">
        <Info type="list" title="ترجیحات شغلی" list={[{}]} />
      </div>
    </div>
  );
}

function employmentStatus(id) {
  switch (id) {
    case 1:
      return "جویای کار";

    case 2:
      return "شاغل";

    case 3:
      return "به دنبال شغل بهتر";
  }
}

function gender(id) {
  switch (id) {
    case 1:
      return "مهم نیست";

    case 2:
      return "مرد";

    case 3:
      return "زن";
  }
}
