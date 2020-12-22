import styled from "styled-components";

export const FrequentQContainer = styled.div`
  max-width: 1100px;
  margin: 80px auto;
  padding: 50px;
  font-family: iransans-regular;
`;
export const TitleTopic = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #444;
  padding: 20px 0;
  text-align: center;
`;

export const TicketContainer = styled.div`
  height: auto;
  padding: 0;
`;
export const NotifContainre = styled.div`
  border-radius: 15px;
  background: #fff;
  height: auto;
  overflow: hidden;
  display: flex;
  margin: 15px 5px;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
`;
export const NotifIcon = styled.span`
  padding: 8px;
  background: #ddd;
  height: auto;
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
  max-height: 200px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
`;
