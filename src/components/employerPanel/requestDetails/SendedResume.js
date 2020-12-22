import React from "react";
import { Info } from "./Info";

export function SendedResume({ userShortInfoForResome }) {
  return (
    <div className="sended-resume sp-2 border">
      <div className="smb-2">
        <Info
          type="list"
          title="اطلاعات تماس"
          list={[
            {
              key: "شماره موبایل",
              value: userShortInfoForResome?.phoneNumber || "",
            },
            { key: "ایمیل", value: userShortInfoForResome?.email || "" },
            {
              key: "پروفایل کاتینو",
              value: userShortInfoForResome?.katinoProfile || "",
            },
          ]}
        />
      </div>

      <div className="mb-0">
        <Info
          pdfUrl={userShortInfoForResome?.userPdf}
          type="file"
          title="دانلود رزومه پیوست شده"
        />
      </div>
    </div>
  );
}
