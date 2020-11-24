import React from "react";

export function SideBar() {
  return (
    <div className="bg-white sbs-shadow srounded-md sp-2">
      <div>
        <span className="d-block text-right fs-s ir-b c-dark smb-1">
          وضعیت درخواست
        </span>

        <ul className="m-0 p-0">
          <li>
            <button className="btn ir-r fs-s"></button>
          </li>
        </ul>
      </div>
    </div>
  );
}
