import styled from "styled-components"
import { Link } from "react-router-dom"

export const PaymentresContainer = styled.section`
  direction: ltr;
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  font-family: iranSans;

  & > section {
    width: 40%;
  }

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    & > section {
      width: 100%;
    }
  }
`
export const ImgContainer = styled.section`
  box-sizing: border-box;
  flex-grow: 3;

  @media only screen and (max-width: 767px) {
    flex-grow: unset;
    height: 50vh;
  }
`
export const Img = styled.img`
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 480px) {
    object-fit: cover;
  }
`
export const ContextContainers = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  box-sizing: border-box;
  flex-grow: 1;
  background-color: transparent;

  @media only screen and (max-width: 767px) {
    align-items: center;
    padding: 0px !important;
    justify-content: flex-start;
    box-sizing: border-box;
    flex-grow: unset;
  }
`
export const TitleSuccess = styled.h1`
  padding: 0;
  margin: 5px;
  font-size: 2.5rem;
  text-align: center;
  color: #28a745 !important;

  @media only screen and (max-width: 960px) {
    font-size: 2.3rem;
  }

  @media only screen and (max-width: 480px) {
    font-size: 1.8rem;
  }
`
export const TitleDanger = styled.h1`
  padding: 0;
  margin: 5px;
  font-size: 2.5rem;
  text-align: center;
  color: #c33341 !important;

  @media only screen and (max-width: 960px) {
    font-size: 2.3rem;
  }

  @media only screen and (max-width: 480px) {
    font-size: 1.8rem;
  }
`
export const CodeTitle = styled.h2`
  padding: 0;
  margin: 5px;
  margin-top: 25px;
  font-size: 2.1rem;
  color: #333;

  @media only screen and (max-width: 960px) {
    font-size: 2rem;
  }

  @media only screen and (max-width: 767px) {
    font-size: 1.4rem;
  }

  @media only screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
`
export const CodeNumber = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
  color: #555;

  @media only screen and (max-width: 960px) {
    font-size: 1rem;
  }
`
export const DirectorSuccess = styled(Link)`
  transition: 0.2s;
  padding: 8px 12px;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: #28a745 !important;
  color: #ffffff !important;

  &:hover {
    background-color: #269740 !important;
    text-decoration: none;
  }

  & > span {
    margin: 0 8px;

    display: inline-block;
    border: 1px solid transparent;
  }

  @media only screen and (max-width: 480px) {
    padding: 7px 10px;
    font-size: 1rem;
  }
`
export const DirectorDanger = styled(Link)`
  transition: 0.2s;
  padding: 8px 12px;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: #dc3545 !important;
  color: #ffffff !important;

  &:hover {
    background-color: #c33341 !important;
    text-decoration: none;
  }
  & > span {
    margin: 0 8px;

    display: inline-block;
    border: 1px solid transparent;
  }
  @media only screen and (max-width: 480px) {
    padding: 7px 10px;
    font-size: 1rem;
  }
`
