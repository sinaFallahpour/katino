import styled from "styled-components";

export const UploadContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 7px;
  padding: 40px 0;
  text-align: center;
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
  font-family: iransans-regular;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border: 2px dashed #888 !important;
  }
  &:active {
    border: 2px dashed #888 !important;
  }
`;

export const Title = styled.div`
  color: #444;
  font-family: iransans-regular;
  font-size: 1rem;
  padding: 8px 0;
  margin-top: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
