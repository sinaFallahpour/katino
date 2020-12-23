import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  padding: 15px;
  box-sizing: border-box;
  background: #fff;

  font-family: iransans-regular;
  background: #eee;
  padding: 15px;
  border-radius: 10px;
  direction: rtl;
`;
export const Title = styled.div`
  font-size: 1.2rem;
  color: #007bff;
  text-align: right;
`;

export const DecriptionContainer = styled.span`
  display: flex;
`;
export const Decription = styled.div`
  font-size: 0.9rem;
  color: #999;
  padding: 4px 0;
  margin-left: 7px;
  text-align: right;
`;

export const ButtonContainer = styled.div`
  margin: 5px 0;
  padding: 5px 0;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`;
export const Detail = styled(Link)`
  font-size: 0.9rem;
  background: #007bff;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #fff;
  }
`;
export const DownloadLink = styled.a`
  font-size: 0.9rem;
  background: #007bff;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #fff;
  }
`;
export const Status = styled.span`
  font-size: 0.9rem;
  background: #888;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  margin: 0 5px;
  cursor: default;
`;
