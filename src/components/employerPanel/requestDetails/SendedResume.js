import React from "react";
import { Info } from "./Info";

export function SendedResume({ userShortInfoForResome }) {
  return (
    <div className="sended-resume sp-2 border">
      <div className="smb-2">

        {/* 
      "phoneNumber": "09116838658",
    "email": "user@example.com",
    "katinoProfile": 34,
    "userPdf": "1744795d-f6b8-42d5-8d50-4c3a03829f4e.pdf" */}

        <Info
          type="list"
          title="اطلاعات تماس"
          list={[
            { key: "شماره موبایل", value: userShortInfoForResome?.phoneNumber },
            { key: "ایمیل", value: userShortInfoForResome?.email },
            { key: "پروفایل کاتینو", value: userShortInfoForResome?.katinoProfile },
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
