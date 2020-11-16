import React, { Component } from "react";
import agent from "../core/agent";
import Swal from "sweetalert2";

import {
  JobSearchBox,
  citiesService,
  // LatestAds,
  Ad,
  Pagination,
  Filters,
  latestAdvers,
  searchAdver,
} from "../components";
import { toast } from "react-toastify";

export class Jobs extends Component {
  state = {
    cities: [],
    adsList: [],
    pageCount: 1,

    curentPage: 1,
  };

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);

    let key = params.get("key");
    let city = params.get("city");

    if (key || city) {
      console.log(searchAdver(key, city, 1, 10));
      searchAdver(key, city, 1, 10).then((res) => {
        this.setState({
          adsList: res.data.resul.listOfData,
          pageCount: res.data.resul.pageCount,
        });
      });
    } else
      latestAdvers(1, 10).then((res) => {
        this.setState({
          adsList: res.data.resul.listOfData,
          pageCount: res.data.resul.pageCount,
        });
      });

    citiesService
      .getCities()
      .then((res) => this.setState({ cities: res.data.resul }));
  }

  // handleFilter = (label) => {};

  handleFilter = async (inp) => {
    this.returnLoading("صبر کنید...");
    console.log(inp);
    try {
      const { data } = await agent.Adver.filterAdver(
        inp,
        10,
        this.state.curentPage
      );

      console.log(data);

      this.setState({
        adsList: data.resul.listOfData,
        pageCount: data.resul.pageCount,
      });

      // data.resul.pageCount;
      // data.resul.listOfData
    } catch (ex) {
      toast.error("خطایی رخ داده");
      // Swal.fire("خطایی رخ داده");
    } finally {
      Swal.close();
    }

    // toast.error(data.message, {
    //   autoClose: 10000,
    // });
  };

  handleSearch = async (inp) => {
    console.log(inp);
    this.returnLoading("صبر کنید...");
    console.log(inp);
    console.log(9090909);
    try {
      let { city, key } = inp;
      var params = new URLSearchParams();
      // if (!rowsPerPage) rowsPerPage = 10;
      // if (!currentPage) currentPage = 0;
      params.append("page", this.state.curentPage);
      params.append("pageSize", 10);
      params.append("key", key);
      params.append("city", city);

      // return params;
      const { data } = await agent.Adver.searchAdver(params);
      this.setState({
        adsList: data.resul.listOfData,
        pageCount: data.resul.pageCount,
      });
    } catch (ex) {
      console.log(ex.response);

      if (ex.response?.data) toast.error(ex.response?.data.message[0]);
    } finally {
      Swal.close();
    }
  };

  returnLoading = (title) => {
    Swal.fire({
      title: title,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
    Swal.showLoading();
  };

  handleMarkOtherAdv = async (adverId) => {
    try {
      let currentAdver = this.state.adsList.find((c) => c.id == adverId);
      console.log(currentAdver);
      if (currentAdver.isMarked) {
        // this.setState({ isMarked: false });

        this.setState({
          adsList: this.state.adsList.map((el) =>
            el.id === adverId ? Object.assign({}, el, { isMarked: false }) : el
          ),
        });
        await agent.Adver.unmarkAdvder(adverId);
      } else {
        this.setState({
          adsList: this.state.adsList.map((el) =>
            el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
          ),
        });

        await agent.Adver.markAdvder(adverId);
      }
    } catch (ex) {
      this.setState({ isMarked: !this.state.isMarked });

      if (ex?.response?.data) {
        toast.error(ex.response?.data?.message[0]);
        this.setState({
          data: this.state.adsList.map((el) =>
            el.id === adverId
              ? Object.assign({}, el, { isMarked: !el.isMarked })
              : el
          ),
        });
      }
    }
  };

  paginate = () => {
    for (let index = 1; index <= this.state.pageCount; index++) {
      return (
        <li
          // onClick={this.}
          className="page-item"
        >
          <a
            className="page-link shadow-none sp-1 border-0 ir-r c-grey"
            href="#"
          >
            {index}
          </a>
        </li>
      );
    }
  };

  render() {
    return (
      <div className="search-jobs spt-10">
        <div className="container-fluid spx-2 spx-lg-10 smt-10">
          <JobSearchBox
            handleSearch={this.handleSearch}
            cities={this.state.cities}
          />

          <Filters handleFilter={this.handleFilter} />

          <hr className="smy-5" />

          <div className="row bg-white srounded-md sp-2">
            {this.state.adsList
              ? this.state.adsList.map((item, index) => (
                  <div
                    key={item.id}
                    className={
                      index + 1 !== this.state.adsList.length
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
                      handleMarkOtherAdv={this.handleMarkOtherAdv}
                    />
                  </div>
                ))
              : ""}
          </div>

          {/* <div className="row bg-white srounded-md sp-2">

         {this.state.adsList?this.state.adsList.map((item,index)=>
            )}
      </div> */}

          <nav className="smt-3 w-50 mx-auto">
            <ul className="pagination bg-white srounded-md sshadow d-flex justify-content-center align-items-center sp-1">
              <li className="page-item">
                <a
                  className="page-link shadow-none spx-2 border-0 ir-r c-grey"
                  href="#"
                >
                  <i className="fas fa-chevron-right"></i>
                </a>
              </li>

              {this.paginate()}

              <li className="page-item">
                <a
                  className="page-link shadow-none spx-2 border-0 c-grey"
                  href="#"
                >
                  <i className="fas fa-chevron-left"></i>
                </a>
              </li>
            </ul>
          </nav>

          {/* {this.state.pageCount > 1 ? (
            <Pagination pageCount={this.state.pageCount} />
          ) : (
            ""
          )} */}
        </div>
      </div>
    );
  }
}
