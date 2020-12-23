import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cooperationType, salary, findCities } from "../../../enums";
import agent from "../../../core/agent";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-responsive-pagination";
import { toast } from "react-toastify";
import { useLocation, useHistory } from "react-router-dom";

const MySuggestAdvers = ({}) => {
  const [mark, setMark] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    let curentPage = params.get("currentPage");
    let pageSizee = params.get("pageSize");

    setCurentPage(parseInt(curentPage));

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await agent.CreateResome.SuggestionAdverForUser({
          page: parseInt(curentPage),
          pageSize: parseInt(pageSizee),
        });
        console.log(data.resul);
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

  const handlePaginate = (number) => {
    setCurentPage(number);
    const params = new URLSearchParams(window.location.search);
    params.set("currentPage", number);
    history.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="bg-white srounded-md sbs-content sp-2">
      {adsList &&
        adsList.map((item) => (
          <div className="card ad srounded-sm sp-2 text-decoration-none">
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
