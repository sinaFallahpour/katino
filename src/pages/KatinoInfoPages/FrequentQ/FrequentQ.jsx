import React, { useState, useEffect } from "react";

import {
  FrequentQContainer,
  Title,
  TitleTopic,
  Description,
  TicketContainer,
  NotifContainre,
  NotifIcon,
  NotifContext,
} from "./FrequentQ.styles";
import { GetAwnserAndQuestion } from "../../../core/api/awnser-and-qusttion.api";
import { toast } from "react-toastify";
import { MiniSpinner } from "../../../components/spinner/MiniSpinner";

const FrequentQ = () => {
  const [dataList, setData] = useState([]);
  const [loading, setLoaing] = useState(false);

  useEffect(() => {
    setLoaing(true);
    const fetchData = async () => {
      try {
        const data = await GetAwnserAndQuestion();
        setData(data);
        setLoaing(false);
      } catch (err) {
        err.response.data.message &&
          err.response.data.message.map((er) => {
            toast.error(er);
          });
        setLoaing(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <MiniSpinner />}
      <FrequentQContainer>
        <TitleTopic>سئوالات متداول</TitleTopic>

        <TicketContainer className=" sbs-shadow srounded-md sp-2">
          {dataList.length !== 0 ? (
            dataList.map((item) => (
              <NotifContainre key={item.id}>
                <NotifIcon>
                  <i
                    class="fa fa-bell fa-1.5x c-primary"
                    aria-hidden="true"
                  ></i>
                </NotifIcon>
                <NotifContext>
                  <Title>{item.question}</Title>
                  <Description>توضیحات : {item.answer}</Description>
                </NotifContext>
              </NotifContainre>
            ))
          ) : (
            <span className="ir-r fs-s c-regular text-center d-block">
              سئوالی برای نمایش وجود ندارد.
            </span>
          )}
        </TicketContainer>
      </FrequentQContainer>
    </>
  );
};

export { FrequentQ };
