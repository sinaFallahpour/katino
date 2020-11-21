import React from "react";
import { adverStatus } from "../../enums";
import {Link} from "react-router-dom";

export function AdStatus(props) {
  let asignments = {
    status_1: 0,
    status_2: 0,
    status_3: 0,
    status_4: 0,
  };

  props.asignStatusWithCounts.map((item) => {
    switch (item.asingResomeStatus) {
      case 1:
        asignments.status_1 = item.count;
        break;

      case 2:
        asignments.status_2 = item.count;
        break;

      case 3:
        asignments.status_3 = item.count;
        break;

      case 4:
        asignments.status_4 = item.count;
        break;
    }
  });

  return (
    <div className="card  srounded-sm sp-2">
      <div className="row">
        <header className="col-12 smb-2">
          <div className="d-lg-flex justify-content-lg-between align-items-lg-center">
            <div className="smb-2 mb-lg-0">
              <Link to={`/Employer/AdInfo/${props.id}`}><span className="ir-b c-dark">{props.title}</span></Link>
              <span className="c-grey ir-r smr-1 bg-body srounded-sm sp-05">
                {adverStatus(props.adverStatus)}
              </span>
            </div>

            <div>
              <button className="btn btn-light sml-1 ir-r">بیشتر</button>
              <button className="btn btn-light sml-1 ir-r">ویرایش</button>
              {/* <button className="btn btn-light ml-0 ir-r">
                <i className="far fa-bookmark"></i>
              </button> */}
            </div>
          </div>

          <span className="ir-r c-regular smt-2">
            {props.adminDescription
              ? `پیام سیستم: ${props.adminDescription}`
              : ""}
          </span>
        </header>

        <div className="col-12 col-lg-6 smb-2 c-primary d-flex justify-content-start align-items-center">
          <span className="ir-r text-center d-block badge badge-warning fs-m p-0">
            {asignments.status_1}
          </span>
          <span className="ir-r smr-1 c-warning">در انتظار تعیین وضعیت</span>
        </div>

        <div className="col-12 col-lg-6 smb-2 c-primary d-flex justify-content-start align-items-center">
          <span className="ir-r text-center d-block badge badge-primary fs-m p-0">
            {asignments.status_3}
          </span>
          <span className="ir-r smr-1 c-primary">تایید برای مصاحبه</span>
        </div>

        <div className="col-12 col-lg-6 smb-2 c-primary d-flex justify-content-start align-items-center">
          <span className="ir-r text-center d-block badge badge-success fs-m p-0">
            {asignments.status_4}
          </span>
          <span
            className="ir-r smr-1 c-success"
            style={{
              color: "#50D86A",
            }}
          >
            استخدام شده
          </span>
        </div>

        <div className="col-12 col-lg-6 smb-2 c-primary d-flex justify-content-start align-items-center">
          <span className="ir-r text-center badge badge-danger fs-m p-0 d-block c-danger srounded-sm">
            {asignments.status_2}
          </span>
          <span className="ir-r smr-1 c-danger">رد شده</span>
        </div>
      </div>
    </div>
  );
}
