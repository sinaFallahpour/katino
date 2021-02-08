import styled from "styled-components";
import ADDRESS from "../../ADDRESS";

export const SearchBoxContainer = styled.section`
  margin-top: 80px;
  min-height: 400px;
  background: ${({ LandingImg }) =>
      LandingImg && `url(${ADDRESS}img/setting/${LandingImg})`}
    no-repeat center;
  background-size: cover;
  display: flex;
  align-items: flex-start !important;

  & > * {
    margin: 0 10px;
  }

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center !important;
    & > * {
      margin: 10px 0;
      width: 80%;
    }
  }
`;
export const RightSide = styled.section`
  display: flex;
  flex-direction: column;
  color: #fff;
`;
export const Seperator = styled.section`
  height: 300px;
  width: 1px;
  border-radius: 5px;
  background: #fff;

  @media only screen and (max-width: 767px) {
    height: 1px;
    width: 80%;
  }
`;
export const LeftSide = styled.section`
  display: flex;
  flex-direction: column;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 5px 8px;
`;
export const Title = styled.section`
  font-size: 1.6rem;
  font-family: iransans-bold;
  padding-bottom: 10px;
`;
export const Description = styled.section`
  font-size: 1rem;
  padding: 10px 0;
  font-family: iransans-regular;
`;
