import styled from "styled-components"
import { Link } from "react-router-dom"

export const NotFoundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`
export const ImageContainer = styled.img`
  width: 80%;
  height: 100%;
  object-fit: cover;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`

export const DirectorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 10vw;
`

export const Director = styled(Link)`
  transition: 0.2s;
  padding: 8px 12px;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  text-decoration: none;
  background-color: rgb(0, 130, 194) !important;
  color: #ffffff !important;

  &:hover {
    background-color: rgb(0, 112, 166) !important;
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
