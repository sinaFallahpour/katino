import React from "react";

import { adverCreatationStatus } from "../../../enums/adverCreatationStatus";
import {
  Container,
  Title,
  Decription,
  ButtonContainer,
  Detail,
  Status,
  DecriptionContainer,
} from "./MyRequest.styles";

const MyRequest = ({ resomeAsignForEmployee }) => {
  return (
    <>
      {resomeAsignForEmployee.length === 0 ? (
        <Container>درخواستی یافت نشد</Container>
      ) : (
        resomeAsignForEmployee.map((item) => (
          <Container key={item.adverId}>
            <Title>{item.adverTitle}</Title>
            <DecriptionContainer>
              <Decription>
                <i style={{ marginLeft: "5px" }} className="fa fa-building"></i>
                {item.companyName}
              </Decription>
              <Decription>
                <i style={{ marginLeft: "5px" }} className="fa fa-clock"></i>
                {item.asignDate}
              </Decription>
            </DecriptionContainer>
            <Decription>
              <i style={{ marginLeft: "7px" }} className="fa fa-undo"></i>
              ارسال شده برای شرکت {item.companyName}
            </Decription>
            <ButtonContainer>
              <Detail to={`/Employee/Dashboard/Requests/${item.asignId}`}>
                مشاهده جزئیات
              </Detail>
              <Status> {adverCreatationStatus(item.asingResomeStatus)} </Status>
            </ButtonContainer>
          </Container>
        ))
      )}
    </>
  );
};

export { MyRequest };
