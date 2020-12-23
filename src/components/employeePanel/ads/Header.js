import React from "react";

export function Header(props) {
  if (props.type === "Requests") {
    return (
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="ir-b p-0 m-0 fs-m">{props.title}</h1>
      </header>
    );
  } else if (props.type === "Bookmarks" || props.type === "Recommanded") {
    return (
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="ir-b p-0 m-0 fs-m">{props.title}</h1>
        <form>
          <button
            disabled={props?.selectdIds?.length == 0}
            className="btn btn-warning ir-r d-flex align-items-center"
            type="button"
            onClick={props.handleAsignResomeToListOfAdvers}
          >
            <i className="fas fa-check sml-1"></i>
            ارسال گروهی رزومه
          </button>
        </form>
      </header>
    );
  }
}
