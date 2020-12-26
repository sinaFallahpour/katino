import React, { useEffect, useState } from "react";

import { GetPolicy } from "../../../core/api/policy";
import { toast } from "react-toastify";
import { MiniSpinner } from "../../../components/spinner/MiniSpinner";
import { PolicyContainer, Title, Description } from "./Policy.styles";
import ReactHtmlParser from "react-html-parser";

const PolicyPage = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        const data = await GetPolicy();
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
      <PolicyContainer>
        <Title>قوانین ما</Title>
        <Description>{data && ReactHtmlParser(data)}</Description>
      </PolicyContainer>
    </>
  );
};

export { PolicyPage };
