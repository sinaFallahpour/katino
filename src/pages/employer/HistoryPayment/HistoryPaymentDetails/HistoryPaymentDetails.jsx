import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import API_ADDRESS from "../../../../API_ADDRESS";
import { MiniSpinner } from "../../../../components/spinner/MiniSpinner";
import {
  DetailsContainer,
  DetailsContent,
  DetailsContext,
  DetailsTitle,
  Title,
  Result,
} from "./HistoryPaymentDetails.styles";

const EmployerHistoryPaymentDetails = ({ idNumber }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    idNumber &&
      axios
        .get(
          API_ADDRESS + `Account/GetOrderDetails?orderId=${idNumber}`,
          {},
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("JWT")}`,
            },
          }
        )
        .then(({ data }) => {
          setData(data.resul);
          console.log(data.resul);

          setLoading(false);
        })
        .catch((err) => {
          err?.response?.data?.message.map((e) => {
            toast.error(e);
          });

          setLoading(false);
        });
  }, []);

  const calculateTax = (number) => {
    let finalNUmber = (number * 9) / 100;
    return finalNUmber;
  };

  return (
    <>
      {loading ? (
        <MiniSpinner />
      ) : data ? (
        <DetailsContainer>
          <DetailsContent className="modalContaierOfAdver">
            <DetailsContext>
              <DetailsTitle>صورت حساب سفارش #{idNumber}</DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle>
                <Title> شماره سفارش</Title>
                <Result>#{idNumber}</Result>
              </DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle>
                <Title> نوع طرح </Title>
                <Result>{data.planName}</Result>
              </DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle>
                <Title> تاریخ خرید </Title>
                <Result>{data.date}</Result>
              </DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle>
                <Title> پرداخت به </Title>
                <Result>{data.payTo}</Result>
              </DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle>
                <Title> وضعیت پرداخت </Title>
                <Result>{data.issuccess}</Result>
              </DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle>
                <Title> نوع پرداخت </Title>
                <Result>{data.orderType}</Result>
              </DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle>
                <Title> مبلغ خام سفارش </Title>
                <Result>{data.price} تومان</Result>
              </DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle>
                <Title> مبلغ تخفیف </Title>
                <Result>{data.discount} تومان</Result>
              </DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle>
                <Title> مبلغ پرداخت با تخفیف </Title>
                <Result>{data.priceWithDiscount} تومان</Result>
              </DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle>
                <Title> مالیات بر ارزش افزوده (9%) </Title>
                <Result>{calculateTax(data.priceWithDiscount)} تومان</Result>
              </DetailsTitle>
            </DetailsContext>

            <DetailsContext>
              <DetailsTitle style={{ fontWeight: "bold", color: "#444" }}>
                <Title> مبلغ نهایی </Title>
                <Result> {data.priceWithTax} تومان</Result>
              </DetailsTitle>
            </DetailsContext>
          </DetailsContent>
        </DetailsContainer>
      ) : (
        <DetailsContainer>
          <DetailsContent className="modalContaierOfAdver">
            <DetailsContext>
              <DetailsTitle>موردی یافت نشد</DetailsTitle>
            </DetailsContext>
          </DetailsContent>
        </DetailsContainer>
      )}
    </>
  );
};

export { EmployerHistoryPaymentDetails };
