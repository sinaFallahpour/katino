import React from "react";
import { Info } from "./Info";

export function Profile(props) {
  console.log(props.allInfo);

  let preferencesList = [
    props.allInfo?.userJobPreference?.educationCourses ? "دوره های آموزشی" : "",
    props.allInfo?.userJobPreference?.flexibleWorkingTime
      ? "ساعت کاری منعطف"
      : "",
    props.allInfo?.userJobPreference?.hasMeel ? "غذا به عهده‌ی شرکت" : "",
    props.allInfo?.userJobPreference?.insurance ? "بیمه" : "",
    props.allInfo?.userJobPreference?.promotion ? "امکان ترفیع سمت" : "",
    props.allInfo?.userJobPreference?.transportationService
      ? "سرویس رفت و آمد"
      : "",
    props.allInfo?.userJobPreference?.educationCourses ? "" : "",
    props.allInfo?.userJobPreference?.educationCourses ? "" : "",
    props.allInfo?.userJobPreference?.educationCourses ? "" : "",
  ];

  let preferences = "";

  preferencesList.map((item) => {
    if (item !== "") preferences += `${item} ،`;
  });

  preferences.slice(0, -1);

  const skillsArray = props.allInfo.userJobSkill;

  let skills = "";

  skillsArray?.map((item, index) => {
    if (index === skillsArray.length - 1) skills += item.jobSkillName;
    else skills += `${item.jobSkillName} - `;
  });

  const language = props.allInfo.listOfUserLanguage;

  let languageList = [];

  language?.map((item) =>
    languageList.push({
      key: item.languageName,
      value: languageLevel(item.languageLevel),
    })
  );

  const educationBackground = props.allInfo.userEducationalBackground;

  let educationList = [];

  educationBackground?.map((item) =>
    educationList?.push({
      fieldOfStudy: item.fieldOfStudy,
      universityName: item.universityName,
      startDate: item.startDate.substring(0, 4),
      endDate: item.endDate.substring(0, 4),
    })
  );

  const userWorkExperience = props.allInfo.userWorkExperience;

  let experiencesList = [];

  userWorkExperience.map((item) =>
    experiencesList.push({
      workTitle: item.workTitle,
      companyName: item.companyName,
      startDate: item.startDate.substring(0, 4),
      endDate: item.endDate.substring(0, 4),
    })
  );

  return (
    <div className="profile sp-2 border">
      <div className="smb-2">
        <Info
          type="list"
          title="اطلاعات فردی"
          list={[
            {
              key: "نام و نام خانوادگی",
              value: props.allInfo.userPersonalInfoForResome?.fullName || "-",
            },
            {
              key: "عنوان شغلی",
              value: props.allInfo.userPersonalInfoForResome?.jobTitle || "-",
            },
            {
              key: "وضعیت اشتغال",
              value: props.allInfo.userPersonalInfoForResome?.employmentStatus
                ? employmentStatus(
                    props.allInfo.userPersonalInfoForResome?.employmentStatus
                  )
                : "-",
            },
            {
              key: "آخرین شرکت",
              value:
                props.allInfo.userPersonalInfoForResome?.lastCompanies || "-",
            },
            {
              key: "آخرین مدرک تحصیلی",
              value:
                props.allInfo.userPersonalInfoForResome
                  ?.lastDegreeOfEducation || "-",
            },
            {
              key: "آدرس ایمیل",
              value: props.allInfo.userPersonalInfoForResome?.email || "-",
            },
            {
              key: "شماره موبایل",
              value:
                props.allInfo.userPersonalInfoForResome?.phoneNumber || "-",
            },
            {
              key: "شهر محل سکونت",
              value: props.allInfo.userPersonalInfoForResome?.city || "-",
            },
            {
              key: "آدرس محل سکونت",
              value: props.allInfo.userPersonalInfoForResome?.address || "-",
            },
            {
              key: "وضعیت تاهل",
              value: props.allInfo.userPersonalInfoForResome?.isMarried
                ? props.allInfo.userPersonalInfoForResome?.isMarried === true
                  ? "متاهل"
                  : "مجرد"
                : "-",
            },
            {
              key: "سال تولد",
              value: props.allInfo.userPersonalInfoForResome?.birthYear || "-",
            },
            {
              key: "جنسیت",
              value: props.allInfo.userPersonalInfoForResome?.gender
                ? gender(props.allInfo.userPersonalInfoForResome?.gender)
                : "-",
            },
            {
              key: "وضعیت خدمت سربازی",
              value: props.allInfo.userPersonalInfoForResome?.military || "-",
            },
          ]}
        />
      </div>

      <div className="smb-2">
        <Info
          type="paragraph"
          title="درباره من"
          text={props.allInfo.abouteMe || "-"}
        />
      </div>

      <div className="smb-2">
        <Info type="paragraph" title="مهارت های حرفه ای" text={skills} />
      </div>

      <div className="smb-2">
        <Info type="jobBackground" title="سوابق شغلی" list={experiencesList} />
      </div>

      <div className="smb-2">
        <Info type="eduBackground" title="سوابق تحصیلی" list={educationList} />
      </div>

      <div className="smb-2">
        <Info type="list" title="زبان ها" list={languageList} />
      </div>

      <div className="mb-0">
        <Info
          type="list"
          title="ترجیحات شغلی"
          list={[
            {
              key: "شهرهای مورد نظر برای کار",
              value: props.allInfo.userJobPreference?.city || "-",
            },
            {
              key: "دسته‌بندی شغلی و زمینه کاری",
              value:
                props.allInfo.userJobPreference?.userJobPreferenceCategories ||
                "-",
            },
            {
              key: "سطح ارشدیت در زمینه فعالیت",
              value: props.allInfo.userJobPreference?.senioritylevel
                ? senioritylevel(
                    props.allInfo.userJobPreference?.senioritylevel
                  )
                : "-",
            },
            {
              key: "نوع قراردادهای قابل قبول",
              value: props.allInfo.userJobPreference?.typeOfCooperation
                ? typeOfCooperation(
                    props.allInfo.userJobPreference?.typeOfCooperation
                  )
                : "-",
            },
            {
              key: "حقوق مورد نظر",
              value: props.allInfo.userJobPreference?.salary
                ? salary(props.allInfo.userJobPreference?.salary)
                : "-",
            },
            {
              key: "مزایای شغلی مورد علاقه",
              value: preferences,
            },
          ]}
        />
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

function languageLevel(id) {
  switch (id) {
    case 1:
      return "مبتدی";

    case 2:
      return "متوسط";

    case 3:
      return "حرفه ای";

    case 4:
      return "زبان بومی";
  }
}

function senioritylevel(id) {
  switch (id) {
    case 1:
      return "تازه کار";

    case 2:
      return "متخصص";

    case 3:
      return "مدیر";

    case 4:
      return "مدیر ارشد";
  }
}

function salary(id) {
  switch (id) {
    case 1:
      return "کمتر از 1 میلیون";

    case 2:
      return "بین 1 تا 2.5 میلیون";

    case 3:
      return "بین 2.5 تا 3.5 میلیون";

    case 4:
      return "بین 3.5 تا 5 میلیون";

    case 5:
      return "بین 5 تا 8 میلیون";

    case 6:
      return "بیشتر از 8 میلیون";

    case 7:
      return "توافقی";
  }
}

function typeOfCooperation(id) {
  switch (id) {
    case 1:
      return "تمام وقت";

    case 2:
      return "پارت تایم";

    case 3:
      return "کارآموزی";

    case 4:
      return "دورکاری";
  }
}
