import React from "react";

import {
  NotFoundContainer,
  ImageContainer,
  Director,
  DirectorContainer,
} from "./notFoundPage.styles";

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <ImageContainer src="/img/not-found.jpg" />

      <DirectorContainer>
        <Director to="/">
          <i className="fa fa-caret-left"></i>
          <span> بازگشت به خانه </span>
        </Director>
      </DirectorContainer>
    </NotFoundContainer>
  );
};

export { NotFoundPage };
