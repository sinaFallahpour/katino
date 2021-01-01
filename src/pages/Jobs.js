import React, { useMemo, useEffect, useReducer, useState } from "react";
import agent from "../core/agent";
import { GetLandingPage } from "../core/api/landing-page";
import Pagination from "react-responsive-pagination";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import { FilterContainer } from "./Job.styles";
import { MiniSpinner } from "../components/spinner/MiniSpinner";
import {
  JobSearchBox,
  citiesService,
  Ad,
  Filters,
  searchAdverFilter,
} from "../components";

export const Jobs = () => {
  const [initialValue, dispatchUrl] = useReducer(
    (s, a) => ({
      ...s,
      [a.name]: a.payload,
    }),
    {}
  );
  const [loading, setLoading] = useState(false);
  const [landingImg, setLandingImg] = useState(false);
  const [currentPage, setCurentPage] = useState(1);
  const pageSize = 14;
  const [cities, setCities] = useState([]);
  const [adsList, setAdsList] = useState([]);
  const [pageCount, setPageCount] = useState(20);
  const pathName = useLocation().pathname;
  const url = useLocation().search;
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const keys = urlParams.entries();
    for (let [key, value] of keys) {
      dispatchUrl({ name: key, payload: value });
    }

    let cp = params.get("currentPage");
    let pz = params.get("pageSize");

    !cp && params.set("currentPage", 1);
    !pz && params.set("pageSize", pageSize);

    !cp && !pz && history.replace(`${pathName}?${params.toString()}`);

    citiesService.getCities().then((res) => setCities(res.data.resul));

    GetLandingPage().then((res) =>
      res?.resul?.map((item) => {
        item.key === "Landing_Img" && setLandingImg(item.value);
      })
    );
  }, []);

  useEffect(() => {
    let key = params.get("key");
    let city = params.get("city");
    let curentPage = params.get("currentPage");
    let pageSizee = params.get("pageSize");
    let category = params.get("category");
    let salary = params.get("salary");
    let typeOfCooperation = params.get("typeOfCooperation");
    let workExperience = params.get("workExperience");

    setCurentPage(parseInt(curentPage));

    const SearchParams = {
      key: key,
      category: category,
      city: city,
      typeOfCooperation: parseInt(typeOfCooperation),
      workExperience: parseInt(workExperience),
      salary: parseInt(salary),
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await searchAdverFilter(
          parseInt(curentPage),
          parseInt(pageSizee),
          SearchParams
        );
        setAdsList([]);
        setAdsList(data.resul.listOfData);
        setPageCount(data.resul.pageCount);
        setLoading(false);
      } catch (ex) {
        toast.error(ex.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const InitialUrlValue = useMemo(() => {
    return initialValue;
  }, [initialValue]);

  const handleUrl = (name, value) => {
    value ? params.set(name, value) : params.delete(name);
  };

  const handleFilter = async (inp) => {
    handleUrl("category", inp.category);
    handleUrl("salary", inp.salary);
    handleUrl("typeOfCooperation", inp.typeOfCooperation);
    handleUrl("workExperience", inp.workExperience);

    history.replace(`${pathName}?${params.toString()}`);
  };

  const handleSearch = async (inp) => {
    handleUrl("key", inp.key);
    handleUrl("city", inp.city);

    history.replace(`${pathName}?${params.toString()}`);
  };

  const handleMarkOtherAdv = async (adverId) => {
    try {
      let currentAdver = adsList.find((c) => c.id == adverId);
      if (currentAdver.isMarked) {
        const newList = adsList.map((el) =>
          el.id === adverId ? Object.assign({}, el, { isMarked: false }) : el
        );
        setAdsList(newList);

        await agent.Adver.unmarkAdvder(adverId);
      } else {
        const newList = adsList.map((el) =>
          el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
        );
        setAdsList(newList);

        await agent.Adver.markAdvder(adverId);
      }
    } catch (ex) {
      ex.response?.data?.message &&
        ex.response?.data?.message?.map((err) =>
          toast.error(ex.response?.data?.message[0])
        );

      const newList = adsList.map((el) =>
        el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
      );
      setAdsList(newList);
    }
  };

  const handlePaginate = (number) => {
    setCurentPage(number);
    const params = new URLSearchParams(window.location.search);
    params.set("currentPage", number);
    history.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      {loading && <MiniSpinner />}
      <div className="search-jobs spt-5">
        <FilterContainer
          LandingImg={landingImg}
          className="container-fluid spx-2 spx-lg-10 "
        >
          <JobSearchBox
            InitialUrlValue={InitialUrlValue}
            handleFilter={handleSearch}
            handleSearch={handleSearch}
            cities={cities}
          />

          <Filters
            InitialUrlValue={InitialUrlValue}
            handleFilter={handleFilter}
          />
        </FilterContainer>
        <div className="container-fluid spx-2 spx-lg-10 smt-5">
          <hr className="smb-5" />

          <div className="row bg-white srounded-md sp-2">
            {adsList.length !== 0 ? (
              adsList.map((item, index) => (
                <div
                  key={index}
                  className={
                    index + 1 !== adsList.length
                      ? "col-12 smb-2"
                      : "col-12 mb-0"
                  }
                >
                  <Ad
                    id={item.id}
                    title={item.title}
                    companyName={item.companyName}
                    city={item.city}
                    salary={item.salary}
                    typeOfCooperation={item.typeOfCooperation}
                    descriptionOfJob={item.descriptionOfJob}
                    item={item}
                    handleMarkOtherAdv={handleMarkOtherAdv}
                  />
                </div>
              ))
            ) : (
              <div
                style={{
                  width: "100%",
                  fontSize: "1.4rem",
                  textAlign: "center",
                  fontFamily: "iransans-regular",
                  color: "#555",
                }}
              >
                آگهی یافت نشد{" "}
              </div>
            )}
          </div>
          {adsList && (
            <nav className="smt-3 w-50 mx-auto">
              <Pagination
                current={currentPage}
                total={pageCount}
                onPageChange={handlePaginate}
              />
            </nav>
          )}
        </div>
      </div>
    </>
  );
};
