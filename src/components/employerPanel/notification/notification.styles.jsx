import styled from "styled-components";

export const NotifContainre = styled.div`
  border-radius: 15px;
  background: #fff;
  height: 100px;
  overflow: hidden;
  display: flex;
  margin: 15px 5px;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
`;
export const NotifIcon = styled.span`
  width: 30px;
  background: #ddd;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const NotifContext = styled.div`
  max-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  font-family: iransans-regular;
  padding: 5px 0;
  margin: 0 5px;
`;

export const Title = styled.span`
  font-size: 1.2rem;
  color: #555;
  padding: 2px 5px;
  box-sizing: border-box;
`;
export const Description = styled.span`
  font-size: 1rem;
  color: #888;
  padding: 2px 5px;
  box-sizing: border-box;
`;
export const Status = styled.span`
  max-height: 100%;
  overflow: auto;
  color: #888;
  padding: 2px 5px;
  box-sizing: border-box;
`;
