import React from "react";
import { Link } from "react-router-dom";

export function LandingFooter() {
  return (
    <footer className="g-footer d-none d-block container-fluid smt-10 spx-10 bg-white">
      <div className="row top spy-10 spx-2 sp-lg-10">
        <aside className="col-12 mt-4 col-lg-3 d-flex flex-column justify-content-start align-items-start">
          <h3 className="fs-m c-dark ir-b smb-2">کارجویان</h3>

          <Link className="fs-m c-regular ir-r smb-1" to="/Jobs">
            آگهی های استخدام
          </Link>
          <Link className="fs-m c-regular ir-r smb-1" to="/">
            ورود/ثبت نام کارجویان
          </Link>
          <Link className="fs-m c-regular ir-r smb-1" to="/">
            ایمیل های اطلاع رسانی
          </Link>
          <Link className="fs-m c-regular ir-r smb-1" to="/">
            رزومه ساز آنلاین
          </Link>
          <Link className="fs-m c-regular ir-r mb-0" to="/">
            آشنایی با شرکت ها
          </Link>
        </aside>

        <aside className="col-12 mt-4 col-lg-3 d-flex flex-column justify-content-start align-items-start">
          <h3 className="fs-m c-dark ir-b smb-2">کارفرمایان</h3>

          <Link className="fs-m c-regular ir-r smb-1" to="/">
            درج آگهی استخدام
          </Link>
          <Link className="fs-m c-regular ir-r smb-1" to="/">
            ورود به بخش کارفرمایان
          </Link>
          <Link className="fs-m c-regular ir-r smb-1" to="/">
            تعرفه انتشار آگهی
          </Link>
          <Link className="fs-m c-regular ir-r mb-0" to="/">
            سوالات متداول
          </Link>
        </aside>

        <aside className="col-12 mt-4 col-lg-3 d-flex flex-column justify-content-start align-items-start">
          <h3 className="fs-m c-dark ir-b smb-2">کاتینو</h3>

          <Link className="fs-m c-regular ir-r smb-1" to="/">
            تماس با کاتینو
          </Link>
          <Link className="fs-m c-regular ir-r smb-1" to="/">
            درباره کاتینو
          </Link>
          <Link className="fs-m c-regular ir-r smb-1" to="/">
            راهنمای استفاده برای کارجویان
          </Link>
          <Link className="fs-m c-regular ir-r mb-0" to="/">
            وبلاگ
          </Link>
        </aside>

        <aside className="col-12 mt-4 col-lg-3 d-flex flex-column justify-content-start align-items-start">
          <h3 className="fs-m c-dark ir-b smb-2">شبکه های اجتماعی</h3>

          <div className="social w-100 d-flex justify-content-between align-item-center smb-4">
            <Link className="fs-l c-regular" to="/">
              <i className="fab fa-instagram"></i>
            </Link>

            <Link className="fs-l c-regular" to="/">
              <i className="fab fa-telegram-plane"></i>
            </Link>

            <Link className="fs-l c-regular" to="/">
              <i className="fab fa-twitter"></i>
            </Link>

            <Link className="fs-l c-regular" to="/">
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>

          <div className="important-links d-flex justify-content-between align-items-center">
            <a
              className="il-item rounded-item bg-body srounded-md sp-1"
              href="#"
            >
              <img
                className="d-block w-100"
                src="/img/important-links/il-1.png"
                alt=""
              />
            </a>

            <a
              className="il-item rounded-item bg-body srounded-md sp-1"
              href="https://trustseal.enamad.ir/?id=183035&amp;Code=6AEoXkgszwZw2Xo6HMXE"
              referrerPolicy="origin"
              target="_blank"
            >
              <img
                className="d-block w-100"
                referrerPolicy="origin"
                src="https://trustseal.enamad.ir/Content/Images/Star/star1.png?v=5.0.0.47"
                alt=""
                id="6AEoXkgszwZw2Xo6HMXE"
              />
            </a>

            <a
              className="il-item rounded-item bg-body srounded-md sp-1"
              href="#"
            >
              <img
                className="d-block w-100"
                src="/img/important-links/il-3.png"
                alt=""
              />
            </a>
          </div>
        </aside>
      </div>

      <div className="row">
        <div className="col-12 border-top">
          <span className="d-block w-75 spy-2 ir-r c-regular text-center mx-auto">
            © 1399 - تمامی حقوق برای کاتینو محفوظ است.
          </span>
        </div>
      </div>
    </footer>
  );
}
