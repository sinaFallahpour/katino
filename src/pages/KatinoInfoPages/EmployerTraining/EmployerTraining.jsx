import React, { useEffect, useState } from "react";
import { GetEmployeeHelper } from "../../../core/api/employee-helper";
import { toast } from "react-toastify";
import { MiniSpinner } from "../../../components/spinner/MiniSpinner";
import ReactHtmlParser from "react-html-parser";
import {
  EmployerTrainingContainer,
  Title,
  Description,
} from "./EmployerTraining.styles";

const EmployerTraining = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        const data = await GetEmployeeHelper();
        setData(data.resul);
      };
      fetchData();
      setLoading(false);
    } catch (err) {
      err?.response?.data?.message.map((e) => {
        toast.error(e);
      });

      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && <MiniSpinner />}
      <EmployerTrainingContainer>
        <Title>راهنمای استفاده برای کارجویان</Title>
        <Description> {data && ReactHtmlParser(data)} </Description>
      </EmployerTrainingContainer>
    </>
  );
};

export { EmployerTraining };
