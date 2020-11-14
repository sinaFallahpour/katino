import React from "react";
import { ImmediateAds } from "./ImmediateAds";
import { ResumeQuality } from "./ResumeQuality";

export function SideBar() {
  return (
    <React.Fragment>
      <div className="smb-2">
        <ResumeQuality />
      </div>

      <div className="mb-0">
        <ImmediateAds />
      </div>
    </React.Fragment>
  );
}
