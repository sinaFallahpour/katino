import React from "react";
import { ImmediateAds } from "./ImmediateAds";
import { ResumeQuality } from "./ResumeQuality";

export function SideBar() {
  return (
    <React.Fragment>
      <div className="smb-2">
        <ResumeQuality percent="70" />
      </div>

      <div className="mb-0">
        <ImmediateAds />
      </div>
    </React.Fragment>
  );
}
