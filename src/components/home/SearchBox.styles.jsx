import styled from "styled-components";
import ADDRESS from "../../ADDRESS";

export const SearchBoxContainer = styled.section`
  margin-top: 80px;
  min-height: 400px;
  background: ${({ LandingImg }) =>
      LandingImg && `url(${ADDRESS}img/setting/${LandingImg})`}
    no-repeat center;
  background-size: cover;
`;
