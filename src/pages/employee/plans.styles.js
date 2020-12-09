import styled from "styled-components"

export const PlaneContainer = styled.div`
  width: 100%;
`
export const PlanesHolder = styled.div`
  width: 1200px;
  margin: 20px auto;
  border: transparent;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  font-family: iransans-regular;

  @media only screen and (max-width: 1280px) {
    width: 910px;
  }
  @media only screen and (max-width: 960px) {
    width: 747px;
  }
  @media only screen and (max-width: 767px) {
    width: 460px;
    flex-direction: column;
  }
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`
export const ImageContainer = styled.div`
  width: 50%;
  height: 100%;

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`
export const Img = styled.img`
  width: 100%;
  height: 100%;
`

export const TariffContainer = styled.div`
  width: 40%;
  border-radius: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: cennter;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`
export const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 1.6rem;
`
export const Price = styled.span`
  text-align: center;
  color: #269740;
  font-size: 1.3rem;
  margin: 10px 0;
`
export const Description = styled.span`
  text-align: center;
  color: #666;
  font-size: 1rem;
  margin: 0;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
`
export const Button = styled.button`
  display: inline-block;
  transition: 0.4s;
  margin: 15px;
  padding: 10px;
  padding-bottom: 15px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background: transparent;
  font-size: 1.5rem;
  color: #333;
  text-align: center;

  &:hover {
    background-color: #ccc;
  }
`
