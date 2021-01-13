import React, { useEffect, useState } from "react";
import StickyBox from "react-sticky-box";

export function SideBar(props) {
  const [comment, setComment] = useState("");

  const [isRejected, setIsRejected] = useState(false);

  const [description, setDescription] = useState("");
  const [asignStatus, setAsignStatus] = useState(null);

  const returnStyle = (status) => {
    if (status == props.asignResomeStatus) {
      return {
        color: "#212529",
        "background-color": "#e2e6ea",
        "border-color": "#dae0e5",
      };
    }
  };

  useEffect(() => {
    setAsignStatus(props.asignResomeStatus);
  }, [props]);

  const doNothing = () => {};

  // SubmitYadDasht
  return (
    <StickyBox offsetTop={100} offsetBottom={50}>
      <div className="bg-white sbs-shadow srounded-md sp-2">
        <span className="d-block text-right fs-s ir-b c-dark smb-1">
          وضعیت درخواست
        </span>

        {asignStatus && (
          <ul className="m-0 p-0">
            {/* reject  */}
            <li className="smb-1">
              <button
                style={returnStyle(2)}
                onClick={() => {
                  if (props.editable == true) {
                    setIsRejected(true);
                    props.changeAsignResomeStatus(null, 2);
                    return;
                  }
                  setIsRejected(true);
                  doNothing();
                }}
                className="btn btn-light w-100 ir-r fs-s shadow-none sp-1 d-flex align-items-center justify-content-start"
              >
                <i className="fas fa-thumbs-down sml-1"></i>
                رد شده
              </button>
            </li>

            {/* accept  */}
            <li className="smb-1">
              <button
                style={returnStyle(3)}
                onClick={(e) => {
                  if (props.editable == true) {
                    setIsRejected(false);
                    props.changeAsignResomeStatus(null, 3);
                    return;
                  }
                  setIsRejected(true);
                  doNothing();
                }}
                // onClick={(e) => { props.changeAsignResomeStatus(null, 3) }}
                className="btn btn-light w-100 ir-r fs-s shadow-none sp-1 d-flex align-items-center justify-content-start"
              >
                <i className="fas fa-thumbs-up sml-1"></i>
                تایید برای مصاحبه
              </button>
            </li>

            {/* has been employed */}
            <li className="mb-0">
              <button
                style={returnStyle(4)}
                onClick={(e) => {
                  if (props.editable == true) {
                    setIsRejected(false);
                    props.changeAsignResomeStatus(null, 4);
                    return;
                  }
                  setIsRejected(true);
                  doNothing();
                }}
                className="btn btn-light w-100 ir-r fs-s shadow-none sp-1 d-flex align-items-center justify-content-start"
              >
                <i className="fas fa-handshake sml-1"></i>
                استخدام شده
              </button>
            </li>
          </ul>
        )}

        {isRejected == true && props.editable == true ? (
          <>
            <form className="d-block w-100 smb-2">
              <textarea
                className="form-control shadow-none smb-1 ir-r fs-s sp-1"
                style={{ resize: "none", height: 100 }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>

              <button
                onClick={(e) => {
                  if (props.editable == true) {
                    // setIsRejected(true)
                    props.changeAsignResomeStatus(description, 2);
                    return;
                  }
                  doNothing();
                }}
                type="button"
                className="ir-r btn btn-danger spx-2 fs-s"
              >
                ثبت
              </button>
            </form>
            <span className="d-block text-right fs-s ir-b c-dark smt-2 smb-1">
              علت رد شدن
            </span>
          </>
        ) : null}

        <span className="d-block text-right fs-s ir-b c-dark smt-2 smb-1">
          ثبت یادداشت
        </span>

        <form
          className="d-block w-100 smb-2"
          onSubmit={(e) => {
            props.SubmitYadDasht(e, comment);
          }}
        >
          <textarea
            className="form-control shadow-none smb-1 ir-r fs-s sp-1"
            style={{ resize: "none", height: 100 }}
            onChange={(e) => {
              setComment(e.target.value);
            }}
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
            {/* assignId={this.state.currentResume.asignResomeId} assignId={this.state.currentResume.asignResomeId} YadDashts={this.state.YadDashts}={this.state.YadDashts} */}
            {/* assignId={this.state.currentResume.asignResomeId} YadDashts={this.state.YadDashts} */}
            <p
              className="ir-r fs-s text-right mb-0"
              style={{ lineHeight: "1.44em" }}
            >
              {props.YadDashts}
            </p>
          </li>
        </ul>
      </div>
    </StickyBox>
  );
}
