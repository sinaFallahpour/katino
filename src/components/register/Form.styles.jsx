import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  font-family: iransans-regular;
`;

export const Tab = styled(Link)`
  transition: 0.4s;
  flex-grow: 1;
  padding: 10px 5px;
  text-align: center;
  color: ${({ active }) =>
    active === "#ffc107" ? "#212529" : active ? "#fff" : "#444"};
  background-color: ${({ active }) => (active ? active : "#ccc")};
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: none !important;

  &:first-child {
    border-radius: 0 8px 0 0;
  }
  &:last-child {
    border-radius: 8px 0 0 0;
    border-right: 1px solid #999;
  }

  &:hover {
    color: ${({ active }) =>
      active === "#ffc107" ? "#212529" : active ? "#fff" : "#444"};
  }
`;
