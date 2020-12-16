import styled from "styled-components"

export const ShebaContainer = styled.div`
  height: 74vh;
  padding-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const CardNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  direction: ltr;
  font-family: iransans-regular;
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  direction: ltr;
  font-family: iransans-regular;

  & > * {
    margin: 10px 0;
  }
`

export const CardNumberText = styled.span`
  margin: 0 5px;
  font-size: 1.8rem;
`

export const CardNumberInput = styled.input`
  background: #ccc;
  border: none;
  border-radius: 7px;
  outline: none;
  padding: 6px 6px;
  width: 300px;
  font-size: 1.4rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 480px) {
    width: 220px;
  }

  @media only screen and (max-width: 290px) {
    width: 80%;
  }
`

export const Button = styled.button`
  color: #fff;
  background-color: #28a745;
  padding: 8px;
  border-radius: 5px;
  border: none;

  &:focus {
    outline: none;
  }
`
