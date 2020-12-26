import React, { useEffect, useState } from "react";
import { AboutUsContainer, Title, Description } from "./AboutUs.style";
import { GetAboutUs } from "../../../core/api/aboutus";
import { toast } from "react-toastify";
import { MiniSpinner } from "../../../components/spinner/MiniSpinner";
import ReactHtmlParser from "react-html-parser";

const AboutUsPage = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        const data = await GetAboutUs();
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
      <AboutUsContainer>
        <Title>درباره ما</Title>
        <Description>{data && ReactHtmlParser(data)}</Description>
      </AboutUsContainer>
    </>
  );
};

export { AboutUsPage };
