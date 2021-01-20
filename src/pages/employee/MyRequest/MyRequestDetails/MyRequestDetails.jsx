import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetAwnserAndQuestion } from "../../../../core/api/asign-resome-details";
import {
  Container,
  Title,
  Decription,
  ButtonContainer,
  DownloadLink,
  Status,
  DecriptionContainer,
} from "./MyRequestDetails.styles";
import "./MyRequestDetails.css";
import { mainUrl } from "../../../../core/agent";
import { adverCreatationStatus } from "../../../../enums/adverCreatationStatus";

const MyRequestDetails = () => {
  const [data, setData] = useState();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAwnserAndQuestion(params.id);
      setData(data.resul);
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="employee-dashboard spx-2 spx-lg-10 container-fluid smt-10 spt-3">
        <div className="row">
          <aside className="col-12 col-lg-9 smb-2 mb-lg-0">
            <div className="smb-2">
              <div className="bg-white srounded-md force-border pb-1">
                <div className="row" style={{ position: "relative" }}>
                  <div className="col-12 col-lg-4 smb-2 mb-lg-0">
                    <span className="btn ir-r d-block w-100 tabs-option c-primary selected-option">
                      درخواست های من
                    </span>
                  </div>
                  <Link to="/Employee/Dashboard/Requests" className="comeback">
                    بازگشت
                  </Link>
                </div>
                {data && (
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="main-timeline">
                          <div className="timeline">
                            <a href="#" className="timeline-content">
                              <Container>
                                <Title>عنوان آگهی : {data.adverTitle}</Title>
                                <Decription>
                                  <i
                                    style={{ marginLeft: "7px" }}
                                    className="fa fa-newspaper"
                                  ></i>
                                  وضعیت آگهی :{" "}
                                  {adverCreatationStatus(
                                    data.asingResomeStatus
                                  ) || "-"}
                                </Decription>
                                <DecriptionContainer>
                                  <Decription>
                                    <i
                                      style={{ marginLeft: "5px" }}
                                      className="fa fa-building"
                                    ></i>
                                    {data.companyName}
                                  </Decription>
                                  <Decription>
                                    <i
                                      style={{ marginLeft: "5px" }}
                                      className="fa fa-clock"
                                    ></i>
                                    {data.asignDate}
                                  </Decription>
                                </DecriptionContainer>
                                <Decription>
                                  <i
                                    style={{ marginLeft: "5px" }}
                                    className="fa fa-phone"
                                  ></i>
                                  {data.phoneNumber}
                                </Decription>
                                <Decription>
                                  <i
                                    style={{ marginLeft: "7px" }}
                                    className="fa fa-undo"
                                  ></i>
                                  ارسال شده برای شرکت {data.companyName}
                                </Decription>
                                <Decription>
                                  <i
                                    style={{ marginLeft: "7px" }}
                                    className="fa fa-address-card"
                                  ></i>
                                  وضعیت رزومه :{" "}
                                  {data.completedResomePercent === 0 ? (
                                    <span style={{ color: "red" }}> ناقص </span>
                                  ) : (
                                    <span style={{ color: "green" }}>کامل</span>
                                  )}
                                </Decription>
                              </Container>
                            </a>
                          </div>
                          <div className="timeline">
                            <a href="#" className="timeline-content">
                              <Container>
                                <Title>مشاهده فایل ها</Title>
                                <ButtonContainer>
                                  {data.pdfFile && (
                                    <DownloadLink
                                      target="_blank"
                                      href={`${mainUrl}PDF/resomePDF/${data.pdfFile}`}
                                    >
                                      دانلود pdf
                                    </DownloadLink>
                                  )}
                                  {data.katinoPdfFile && (
                                    <DownloadLink
                                      target="_blank"
                                      href={`${mainUrl}PDF/resomePDF/${data.katinoPdfFile}`}
                                    >
                                      دانلود pdf کاتینو
                                    </DownloadLink>
                                  )}
                                </ButtonContainer>
                              </Container>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export { MyRequestDetails };
