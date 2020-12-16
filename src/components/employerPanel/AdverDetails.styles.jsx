import styled from "styled-components"

export const DetailsContainer = styled.div`
  margin: 150px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-family: iransans-regular;
`

export const DetailsContent = styled.div`
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 15px 30px;
  width: 880px;
`
export const DetailsContext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5px;
  flex-wrap: wrap;

  & > div {
    margin: 2px;
    background: rgba(0, 0, 0, 0.2);
    padding: 8px 10px;
    border-radius: 5px;
    text-align: center;
    width: 250px;
  }

  @media only screen and (max-width: 420px) {
    width: 100%;
    flex-direction: column;
    margin: 5px;
  }
`
export const DetailsTitle = styled.div`
  font-size: 1.1rem;
  font-weigh: bold;
`
export const DetailsDes = styled.div`
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.1) !important;
`
