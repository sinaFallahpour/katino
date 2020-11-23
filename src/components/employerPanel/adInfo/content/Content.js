import React from "react";
import { ContentHeader } from "./ContentHeader";
import { Requests } from "./Requests";

export function Content(props) {
  return (
    <React.Fragment>
      <ContentHeader />

      <hr className="smy-2" />

      <Requests adId={props.id} resumes={props.resumes} />
    </React.Fragment>
  );
}
