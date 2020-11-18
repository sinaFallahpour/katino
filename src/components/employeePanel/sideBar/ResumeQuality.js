import React from "react";

export function ResumeQuality(props) {
  return (
    <div className="resume-quality bg-white srounded-md sbs-content sp-2">
      <span className="d-block text-right c-dark smb-2 ir-b">
        کیفیت رزومه‌ی شما
      </span>

      <hr />

      <div className="holder mx-auto position-relative">
        <div className="quality position-absolute" style={{ height: `${props.percent}%` }}></div>
      </div>
      <span class="percent-text smt-2 c-regular d-block text-center ir-r fs-l">{`${props.percent}% از پروفایل شما تکمیل شده است.`}</span>

      {/* <div className="field d-flex align-items-center justify-content-start smt-2">
        <span className="border ir-r p-1 sml-1 fs-m rounded">{`${props.percent}%`}</span>
        <span className="d-block text-right ir-r fs-m">لطفا قسمت درباره من را کامل کنید</span>
      </div> */}

      {/* 
      {props.resomePercent?.aboutMe != 0 ?
        <div className="field d-flex align-items-center justify-content-start smt-2">
          <span className="border ir-r p-1 sml-1 fs-m rounded">{`${props.resomePercent?.aboutMe}%`}</span>
          <span className="d-block text-right ir-r fs-m">لطفا قسمت درباره من را کامل کنید</span>
        </div>
        :
        null
      }


      {props.resomePercent?.aboutMe != 0 ?
        <div className="field d-flex align-items-center justify-content-start smt-2">
          <span className="border ir-r p-1 sml-1 fs-m rounded">{`${props.resomePercent?.userJobSkillId}%`}</span>
          <span className="d-block text-right ir-r fs-m">لطفا قسمت مهارت های حرفه ایی را کامل کنید</span>
        </div>
        :
        null
      }



      {props.resomePercent?.aboutMe != 0 ?
        <div className="field d-flex align-items-center justify-content-start smt-2">
          <span className="border ir-r p-1 sml-1 fs-m rounded">{`${props.resomePercent?.userWorkExperienceId}%`}</span>
          <span className="d-block text-right ir-r fs-m">لطفا قسمت مهارت های حرفه ایی را کامل کنید</span>
        </div>
        :
        null
      }



      <div className="field d-flex align-items-center justify-content-start smt-2">
        <span className="border ir-r p-1 sml-1 fs-m rounded">{`${props.percent}%`}</span>
        <span className="d-block text-right ir-r fs-m">لطفا زبان های خود را وارد کنید</span>
      </div>

      <div className="field d-flex align-items-center justify-content-start smt-2">
        <span className="border ir-r p-1 sml-1 fs-m rounded">{`${props.percent}%`}</span>
        <span className="d-block text-right ir-r fs-m">لطفا زبان های خود را وارد کنید</span>
      </div>

      <div className="field d-flex align-items-center justify-content-start smt-2">
        <span className="border ir-r p-1 sml-1 fs-m rounded">{`${props.percent}%`}</span>
        <span className="d-block text-right ir-r fs-m">لطفا زبان های خود را وارد کنید</span>
      </div>

      <div className="field d-flex align-items-center justify-content-start smt-2">
        <span className="border ir-r p-1 sml-1 fs-m rounded">{`${props.percent}%`}</span>
        <span className="d-block text-right ir-r fs-m">لطفا زبان های خود را وارد کنید</span>
      </div>
 */}

      {/* resomePercent */}


    </div>
  );
}
