import styled from "styled-components";

export const EmployerDetailsContainer = styled.div``;
export const EmployerDetailsHolder = styled.div`
  padding: 15px;
  text-align: center;
  font-family: iransans-regular;
  font-size: 1.2rem;
  border-radius: 10px;
  margin: 20px auto;
  display: flex;
  flex-direction: row-reverse;

  & > div {
    margin: 15px;
    box-sizing: border-box;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
  }

  @media only screen and (max-width: 767px) {
    flex-direction: column;

    & > div {
      width: 100%;
    }
  }
  @media only screen and (max-width: 480px) {
  }
`;

//left side
export const LeftSideContainer = styled.div`
  background: #fff;

  width: 25%;
  margin: 0 auto;
`;

export const ImageContainer = styled.div`
  height: 250px;
  width: 100%;
  margin-bottom: 10px;

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  objectfit: cover;
`;
export const CompanyName = styled.div`
  color: #444;
  padding-bottom: 5px;
`;
export const FullName = styled.div`
  color: #444;
  padding: 5px;
`;

//right side
export const RightSideContainer = styled.div`
  background: #fff;
  display: flex;
  width: 75%;
  flex-wrap: wrap;
  height: auto !important ;
  margin: 0 auto;

  & > div {
    width: 50%;
  }

  @media only screen and (max-width: 580px) {
    flex-direction: column;

    & > div {
      width: 100%;
    }
  }
`;
export const ContextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 5px;
  height: auto;
  margin: 0;
`;
export const Title = styled.h4`
  color: #333;
  padding: 5px;
  font-size: 1rem;
`;
export const Description = styled.span`
  color: #555;
  padding: 5px;
  font-size: 1rem;
  display: inline-block;
`;
export const FieldOfActivity = styled.span`
  color: #fff;
  padding: 5px 8px;
  font-size: 0.8rem;
  background-color: #28a745;
  display: inline-block;
  border-radius: 5px;
  margin: 5px;
`;
