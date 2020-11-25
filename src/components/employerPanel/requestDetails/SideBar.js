import React from "react";
import StickyBox from "react-sticky-box";

export function SideBar() {
  return (
    <StickyBox offsetTop={100} offsetBottom={50}>
      <div className="bg-white sbs-shadow srounded-md sp-2">
        <span className="d-block text-right fs-s ir-b c-dark smb-1">
          وضعیت درخواست
        </span>

        <ul className="m-0 p-0">
          <li className="smb-1">
            <button className="btn btn-light w-100 ir-r fs-s shadow-none sp-1 d-flex align-items-center justify-content-start">
              <i className="fas fa-thumbs-down sml-1"></i>
              نامناسب
            </button>
          </li>

          <li className="smb-1">
            <button className="btn btn-light w-100 ir-r fs-s shadow-none sp-1 d-flex align-items-center justify-content-start">
              <i className="fas fa-thumbs-up sml-1"></i>
              تایید برای مصاحبه
            </button>
          </li>

          <li className="mb-0">
            <button className="btn btn-light w-100 ir-r fs-s shadow-none sp-1 d-flex align-items-center justify-content-start">
              <i className="fas fa-handshake sml-1"></i>
              استخدام شده
            </button>
          </li>
        </ul>

        <span className="d-block text-right fs-s ir-b c-dark smt-2 smb-1">
          ثبت یادداشت
        </span>

        <form className="d-block w-100 smb-2">
          <textarea
            className="form-control shadow-none smb-1 ir-r fs-s sp-1"
            style={{ resize: "none", height: 100 }}
          ></textarea>

          <button type="submit" className="ir-r btn btn-primary spx-2 fs-s">
            ثبت
          </button>
        </form>

        <span className="d-block text-right fs-s ir-b c-dark smt-2 smb-1">
          سایر یادداشت
        </span>

        <ul className="m-0 p-0" style={{ maxHeight: 200, overflowY: "auto" }}>
          <li className="border srounded-sm sp-1">
            <p
              className="ir-r fs-s text-right mb-0"
              style={{ lineHeight: "1.44em" }}
            >
              رزومه‌ی خوبی است.
            </p>
          </li>
        </ul>
      </div>
    </StickyBox>
  );
}
