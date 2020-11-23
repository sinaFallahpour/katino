import React from "react";
import { Info } from "./Info";

export function SendedResume(props) {
  return (
    <div className="sended-resume sp-2 border">
      <div className="smb-2">
      <Info
        type="list"
        title="اطلاعات تماس"
        list={[
          { key: "شماره موبایل", value: "09113246246" },
          { key: "ایمیل", value: "example@mail.com" },
          { key: "پروفایل کاتینو", value: "" },
        ]}
      />
      </div>

      <div className="mb-0">
      <Info
        type="file"
        title="دانلود رزومه پیوست شده"
      />
      </div>
    </div>
  );
}
