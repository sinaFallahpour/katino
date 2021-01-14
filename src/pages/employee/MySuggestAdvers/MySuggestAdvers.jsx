import React, { useState, useEffect } from "react";
import agent from "../../../core/agent";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-responsive-pagination";
import { toast } from "react-toastify";
import { useLocation, useHistory } from "react-router-dom";
import { Ad2 } from "../../../components/home/ads/Ad2";

const MySuggestAdvers = (props) => {
  const [currentPage, setCurentPage] = useState(1);
  const pageSize = 10;
  const [pageCount, setPageCount] = useState(0);
  const [adsList, setAdsList] = useState([]);
  const [isMarked, setIsMarked] = useState();

  const pathName = useLocation().pathname;
  const url = useLocation().search;
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    let cp = params.get("currentPage");
    let pz = params.get("pageSize");

    !cp && params.set("currentPage", 1);
    !pz && params.set("pageSize", pageSize);

    !cp && !pz && history.replace(`${pathName}?${params.toString()}`);
  }, []);

  useEffect(() => {
    let cp = params.get("currentPage");
    let pz = params.get("pageSize");
    let curentPage = "";
    let pageSizee = "";

    if (cp && pz) {
      curentPage = params.get("currentPage");
      pageSizee = params.get("pageSize");
    } else {
      !cp && params.set("currentPage", 1);
      !pz && params.set("pageSize", pageSize);

      !cp && !pz && history.replace(`${pathName}?${params.toString()}`);

      curentPage = 1;
      pageSizee = pageSize;
    }

    setCurentPage(parseInt(curentPage));

    const fetchData = async () => {
      try {
        const { data } = await agent.CreateResome.SuggestionAdverForUser({
          page: parseInt(curentPage),
          pageSize: parseInt(pageSizee),
        });
        console.log(data.resul);
        setAdsList([]);
        setAdsList(data.resul.listOfData);
        setPageCount(data.resul.pageCount);
      } catch (ex) {
        toast.error(ex.message);
      }
    };

    fetchData();
  }, [url]);

  const handlePaginate = (number) => {
    setCurentPage(number);
    const params = new URLSearchParams(window.location.search);
    params.set("currentPage", number);
    history.replace(`${pathName}?${params.toString()}`);
  };

  const handleMarkSuggestion = async (adverId) => {
    try {
      let currentAdver = adsList.find((c) => c.id == adverId);
      if (currentAdver.isMarked) {
        const MarkedList = adsList.map((el) =>
          el.id === adverId ? Object.assign({}, el, { isMarked: false }) : el
        );
        setAdsList(MarkedList);
        await agent.Adver.unmarkAdvder(adverId);
      } else {
        const MarkedList = adsList.map((el) =>
          el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
        );
        setAdsList(MarkedList);
        await agent.Adver.markAdvder(adverId);
      }
    } catch (ex) {
      setIsMarked(!isMarked);
      if (ex?.response?.data) {
        toast.error(ex.response?.data?.message[0]);

        const MarkedList = adsList.map((el) =>
          el.id === adverId
            ? Object.assign({}, el, { isMarked: !el.isMarked })
            : el
        );
        setAdsList(MarkedList);
      }
    }
  };

  return (
    <div className="bg-white srounded-md sbs-content sp-2">
      {adsList &&
        adsList.map((item, index) => (
          <div key={index} className={index !== 0 ? "smt-2" : "mt-0"}>
            <Ad2
              id={item.id}
              title={item.title}
              companyName={item.companyName}
              city={item.city}
              salary={item.salary}
              type={item.typeOfCooperation}
              typeOfCooperation={item.typeOfCooperation}
              item={item}
              handleMarkOtherAdv={handleMarkSuggestion}
              selectdIds={props.selectdIds}
              handleChangeSelecetdId={props.handleChangeSelecetdId}
            />
          </div>
        ))}
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
  );
};

export { MySuggestAdvers };
