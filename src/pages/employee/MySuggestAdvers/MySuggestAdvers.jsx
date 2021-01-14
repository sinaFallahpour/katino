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
              handleMarkOtherAdv={props.handleMarkOtherAdv}
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

{
  /* <div className="card ad srounded-sm sp-2 text-decoration-none">
<header className="d-flex justify-content-between align-items-center smb-1">
  <a
    className="fs-m ir-b c-dark text-truncate"
    href={`/JobDetails/${item.id}`}
    dideo-checked="true"
  >
    {item.title}
  </a>

  <i
    // onClick={this.adMarker}
    onClick={() => {
      console.log("amo sam");
    }}
    className={`bookmarker-btn c-dark fs-l ${
      mark === false ? "far" : "fas"
    } fa-bookmark`}
  ></i>
</header>
<div className="card-body p-0">
  <input type="checkbox" />
  <div className="detail smb-1">
    <Link className="ir-r c-grey fs-m sml-1" to="/">
      <i className="fas fa-building ml-2"></i>
      {item.companyName}
    </Link>

    <span className="ir-r c-grey fs-m sml-1">
      <i className="fas fa-map-marker-alt ml-2"></i>
      {findCities(item.city)}
    </span>

    <span className="ir-r text-success fs-m sml-1">
      {` میزان حقوق: ${salary(item.salary)} تومان `}
    </span>

    <span className="ir-r c-grey fs-m ml-0">{` نوع قرار داد: ${cooperationType(
      item.typeOfCooperation
    )} `}</span>
  </div>

  <p
    className="d-block text-right ir-r fs-m mb-0 c-regular"
    dangerouslySetInnerHTML={{ __html: `...` }}
  ></p>
</div>
</div> */
}
