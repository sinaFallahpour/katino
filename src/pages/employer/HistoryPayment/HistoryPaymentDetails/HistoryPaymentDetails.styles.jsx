import styled from "styled-components";

export const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-family: iransans-regular;
  overflow: show;
  margin: auto;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;

  ::before {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99;
  }
`;

export const DetailsContent = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 0;
  max-width: 500px;
  max-height: 400px;
  overflow: auto;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);
  z-index: 99999;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px 0 0 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #999;
  }

  @media only screen and (max-width: 768px) {
    max-height: 350px;
    margin: 15px;
  }
  @media only screen and (max-width: 420px) {
    max-height: 260px;
    margin: 15px;
  }
`;
export const DetailsContext = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  flex-wrap: wrap;
  width: 100%;
  padding: 2px 8px;

  & > i {
    color: rgb(80, 216, 106);
  }

  &:nth-child(odd) {
    background-color: #ddd;
  }

  @media only screen and (max-width: 420px) {
    width: 100%;
    flex-direction: column;
    margin: 5px;
  }
`;
export const DetailsTitle = styled.div`
  font-size: 1.1rem;
  font-weigh: bold;
  margin: 2px;
  padding: 8px 10px;
  border-radius: 5px;
  text-align: right;
  width: 100%;
  color: #666;

  display: flex;
  justify-content: space-between;
`;
export const Title = styled.div``;
export const Result = styled.div``;
