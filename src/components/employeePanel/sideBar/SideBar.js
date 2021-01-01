import React from "react";
import { ResumeQuality } from "./ResumeQuality";
import ReactSticky from "react-sticky-box";

export function SideBar({ resomePercent }) {
  return (
    <ReactSticky offsetTop={100} offsetBottom={50}>
      <div className="smb-2">
        <ResumeQuality
          percent={resomePercent?.compeletePercent}
          resomePercent={resomePercent}
        />
      </div>
    </ReactSticky>
  );
}
