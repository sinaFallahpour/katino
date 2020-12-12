import React, { Component, useEffect, useRef, useState } from "react"
import agent from "../core/agent"
import Swal from "sweetalert2"
import Pagination from "react-responsive-pagination"
import { toast } from "react-toastify"
import { useHistory, useLocation } from "react-router-dom"

import { MiniSpinner } from "../components/spinner/MiniSpinner"
import {
  JobSearchBox,
  citiesService,
  Ad,
  Filters,
  searchAdverFilter,
} from "../components"

export const Jobs = () => {
  const TableContainer = useRef()
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurentPage] = useState(1)
  const pageSize = 14
  const [cities, setCities] = useState([])
  const [adsList, setAdsList] = useState([])
  const [pageCount, setPageCount] = useState(20)
  const pathName = useLocation().pathname
  const url = useLocation().search
  const history = useHistory()
  const params = new URLSearchParams(window.location.search)

  useEffect(() => {
    let cp = params.get("currentPage")
    let pz = params.get("pageSize")

    !cp && params.set("currentPage", 1)
    !pz && params.set("pageSize", pageSize)

    !cp && !pz && history.replace(`${pathName}?${params.toString()}`)

    citiesService.getCities().then((res) => setCities(res.data.resul))
  }, [])

  useEffect(() => {
    let key = params.get("key")
    let city = params.get("city")
    let curentPage = params.get("currentPage")
    let pageSizee = params.get("pageSize")
    let category = params.get("category")
    let salary = params.get("salary")
    let typeOfCooperation = params.get("typeOfCooperation")
    let workExperience = params.get("workExperience")

    setCurentPage(parseInt(curentPage))

    const SearchParams = {
      key: key,
      category: category,
      city: city,
      typeOfCooperation: parseInt(typeOfCooperation),
      workExperience: parseInt(workExperience),
      salary: parseInt(salary),
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await searchAdverFilter(
          parseInt(curentPage),
          parseInt(pageSizee),
          SearchParams
        )
        setAdsList([])
        setAdsList(data.resul.listOfData)
        setPageCount(data.resul.pageCount)
        setLoading(false)
      } catch (ex) {
        toast.error(ex.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  const handleFilter = async (inp) => {
    inp.category && params.set("category", inp.category)
    inp.city && params.set("city", inp.city)
    inp.salary && params.set("salary", inp.salary)
    inp.typeOfCooperation &&
      params.set("typeOfCooperation", inp.typeOfCooperation)
    inp.workExperience && params.set("workExperience", inp.workExperience)

    history.replace(`${pathName}?${params.toString()}`)
  }

  const handleSearch = async (inp) => {
    inp.key && params.set("key", inp.key)
    inp.city && params.set("city", inp.city)

    history.replace(`${pathName}?${params.toString()}`)
  }

  const handleMarkOtherAdv = async (adverId) => {
    try {
      let currentAdver = adsList.find((c) => c.id == adverId)
      if (currentAdver.isMarked) {
        // this.setState({ isMarked: false });

        this.setState({
          adsList: adsList.map((el) =>
            el.id === adverId ? Object.assign({}, el, { isMarked: false }) : el
          ),
        })
        await agent.Adver.unmarkAdvder(adverId)
      } else {
        this.setState({
          adsList: this.state.adsList.map((el) =>
            el.id === adverId ? Object.assign({}, el, { isMarked: true }) : el
          ),
        })

        await agent.Adver.markAdvder(adverId)
      }
    } catch (ex) {
      this.setState({ isMarked: !this.state.isMarked })

      if (ex?.response?.data) {
        toast.error(ex.response?.data?.message[0])
        this.setState({
          data: this.state.adsList.map((el) =>
            el.id === adverId
              ? Object.assign({}, el, { isMarked: !el.isMarked })
              : el
          ),
        })
      }
    }
  }

  const handlePaginate = (number) => {
    setCurentPage(number)
    const params = new URLSearchParams(window.location.search)
    params.set("currentPage", number)
    history.replace(`${pathName}?${params.toString()}`)
  }

  return (
    <>
      {loading && <MiniSpinner />}
      <div className="search-jobs spt-10">
        <div className="container-fluid spx-2 spx-lg-10 smt-10">
          <JobSearchBox handleSearch={handleSearch} cities={cities} />

          <Filters handleFilter={handleFilter} />

          <hr className="smy-5" />

          <div className="row bg-white srounded-md sp-2">
            {adsList
              ? adsList.map((item, index) => (
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
              : "شغلی یافت نشد"}
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
  )
}
