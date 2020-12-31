import styled from "styled-components";
import ADDRESS from "../ADDRESS";

export const FilterContainer = styled.div`
  width: 100vw;
  height: auto;
  padding: 40px 0;
  padding-top: 80px;
  position: relative;
  margin-bottom: 0px !important;

  &:before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: ${({ LandingImg }) =>
      LandingImg && `url(${ADDRESS}img/setting/${LandingImg})`};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.7;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }

  @media only screen and (max-width: 480px) {
    padding: 15px 0;
    padding-top: 80px;
  }
`;
