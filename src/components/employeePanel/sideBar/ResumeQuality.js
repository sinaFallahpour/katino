import React from "react";

export function ResumeQuality({ resomePercent, percent }) {
  return (
    <div className="resume-quality bg-white srounded-md sbs-content sp-2">
      <span className="d-block text-right c-dark smb-2 ir-b">
        کیفیت رزومه‌ی شما
      </span>

      <hr />

      {resomePercent && (
        <>
          <div className="holder mx-auto position-relative">
            <div
              className="quality position-absolute"
              style={{
                height: `${percent}%`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.4rem",
                color: "#444",
                fontFamily: "iransans-bold",
              }}
            >
              <span>{percent}%</span>
            </div>
          </div>
          <span className="percent-text text-right smt-2 c-regular d-block  ir-r fs-l">{`${percent}% از پروفایل شما تکمیل شده است.`}</span>
        </>
      )}

      {resomePercent && resomePercent?.checkUserInfo !== 0 && (
        <div className="field d-flex align-items-center justify-content-start smt-2">
          <span className=" ir-r sml-1 fs-m rounded text-danger">{`${resomePercent?.checkUserInfo}%`}</span>
          <span
            className="d-block text-right ir-r text-danger"
            style={{ fontSize: "16px !important" }}
          >
            لطفا قسمت اطلاعات فردی را کامل کنید
          </span>
        </div>
      )}
      {resomePercent && resomePercent?.aboutMe !== 0 && (
        <div className="field d-flex align-items-center justify-content-start smt-2">
          <span className=" ir-r sml-1 fs-m rounded text-danger">{`${resomePercent?.aboutMe}%`}</span>
          <span
            className="d-block text-right ir-r text-danger"
            style={{ fontSize: "16px !important" }}
          >
            لطفا قسمت درباره من را کامل کنید
          </span>
        </div>
      )}

      {resomePercent && resomePercent?.userJobSkillId !== 0 && (
        <div className="field d-flex align-items-center justify-content-start smt-2">
          <span className=" ir-r sml-1 fs-m rounded text-danger">{`${resomePercent?.userJobSkillId}%`}</span>
          <span
            className="d-block text-right ir-r text-danger"
            style={{ fontSize: "16px !important" }}
          >
            لطفا قسمت مهارت های حرفه ایی را کامل کنید
          </span>
        </div>
      )}

      {resomePercent && resomePercent?.userJobPreferencesId !== 0 && (
        <div className="field d-flex align-items-center justify-content-start smt-2">
          <span className=" ir-r sml-1 fs-m rounded text-danger">{`${resomePercent?.userJobPreferencesId}%`}</span>
          <span
            className="d-block text-right ir-r text-danger"
            style={{ fontSize: "16px !important" }}
          >
            لطفا ترجیحات شغلی خود را وارد کنید
          </span>
        </div>
      )}

      {resomePercent && resomePercent?.userWorkExperienceId !== 0 && (
        <div className="field d-flex align-items-center justify-content-start smt-2">
          <span className=" ir-r sml-1 fs-m rounded text-danger">{`${resomePercent?.userWorkExperienceId}%`}</span>
          <span
            className="d-block text-right ir-r text-danger"
            style={{ fontSize: "16px !important" }}
          >
            لطفا قسمت تجربه کاری را کامل کنید
          </span>
        </div>
      )}

      {resomePercent && resomePercent?.userLanguageId !== 0 && (
        <div className="field d-flex align-items-center justify-content-start smt-2">
          <span className=" ir-r sml-1 fs-m rounded text-danger">{`${resomePercent?.userLanguageId}%`}</span>
          <span
            className="d-block text-right ir-r text-danger"
            style={{ fontSize: "16px !important" }}
          >
            لطفا زبان های خود را وارد کنید
          </span>
        </div>
      )}

      {resomePercent && resomePercent?.educationalBackgroundId !== 0 && (
        <div className="field d-flex align-items-center justify-content-start smt-2">
          <span className=" ir-r sml-1 fs-m rounded text-danger">{`${resomePercent?.educationalBackgroundId}%`}</span>
          <span
            className="d-block text-right ir-r text-danger"
            style={{ fontSize: "16px !important" }}
          >
            لطفا قسمت تحصیلات را کامل کنید
          </span>
        </div>
      )}
    </div>
  );
}
