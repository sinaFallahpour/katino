import React, { Component, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserAds } from "../../components/employerPanel"
import * as service from "../../components/employerPanel"

import agent from "../../core/agent"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

export const Dashboard = () => {
  const [userAds, setUserAds] = useState()
  const [key, setKey] = useState()
  const [adverStatus, setAdverStatus] = useState()
  const [adverCreatationStatus, setAdverCreatationStatus] = useState()

  useEffect(() => {
    let params = new URLSearchParams(window.location.search)
    const adverStatus = params.get("adverStatus")

    const fetcData = async () => {
      if (adverStatus) {
        const { data } = await agent.Adver.GetAllAdverByStatusForCurrectUser(
          adverStatus
        )
        setUserAds(data.resul)
        return
      }
      const { data } = await agent.Adver.getAllAdverForCurrectUser()

      setUserAds(data.resul)
      setAdverStatus(adverStatus)
      return
    }

    fetcData()
  }, [])

  const handleFilter = async () => {
    const filterKey = key
    try {
      const { data } = await agent.Adver.SearchAdverForCurrectUser(filterKey)
      setUserAds(data.resul)
    } catch (ex) {
      toast.error("خطایی رخ داده")
    }
  }

  const handleChangeKey = (e) => {
    setKey(e.target.value)
  }

  return (
    <section className="dash-employer container-fluid spx-2 smt-10 spx-lg-10">
      <div className="row">
        <div className="bg-white srounded-md sshadow w-100 sp-2">
          <nav className="navbar navbar-expand-lg pr-0 py-0">
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item smr-lg-4">
                  <a
                    href="/Employer/Dashboard"
                    className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0"
                  >
                    همه آگهی ها
                  </a>

                  {/* <Link
                      className="nav-link position-relative c-main ir-r fs-m p-0 smb-1 mb-lg-0 active"
                      to="/Employer/Dashboard"
                    >
                      همه آگهی ها
                    </Link> */}
                </li>

                <li className="nav-item smr-lg-4">
                  <a
                    href="/Employer/Dashboard?adverStatus=1"
                    className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0"
                  >
                    فعال
                  </a>

                  {/* <Link
                      className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0 active"
                      to={`/Employer/Dashboard?adverStatus=1`}

                    >
                      فعال
                    </Link> */}
                </li>

                <li className="nav-item smr-lg-4">
                  <a
                    href="/Employer/Dashboard?adverStatus=2"
                    className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0"
                  >
                    پیش نویس
                  </a>
                </li>

                <li className="nav-item smr-lg-4">
                  <a
                    href="/Employer/Dashboard?adverStatus=3"
                    className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0"
                  >
                    آرشیو
                  </a>
                </li>

                <li className="nav-item smr-lg-4">
                  <a
                    href="/Employer/Dashboard?adverStatus=4"
                    className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0"
                  >
                    پایان یافته
                  </a>
                </li>

                <li className="nav-item smr-lg-4">
                  <a
                    href="/Employer/Dashboard?adverStatus=5"
                    className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0"
                  >
                    غیر فعال
                  </a>
                </li>

                <li className="nav-item smr-lg-4">
                  <a
                    href="/Employer/Dashboard?adverStatus=6"
                    className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0"
                  >
                    منقضی شده
                  </a>

                  {/* <Link
                      className="nav-link position-relative c-grey ir-r fs-m p-0 smb-1 mb-lg-0"
                      to={`/Employer/Dashboard?adverStatus=6`}
                    >
                      منقضی شده
                    </Link> */}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="row smt-3">
        <div className="bg-white srounded-md sshadow sp-2 w-100">
          <div className="col-12">
            <div className="form-group">
              <input
                onChange={handleChangeKey}
                onKeyUp={handleFilter}
                className="ir-r form-control srounded-sm shadow-none"
                placeholder="جستجو در آگهی ها"
              />
            </div>
          </div>

          <hr className="smy-2" />

          <UserAds
            handleChangeKey={handleChangeKey}
            handleFilter={handleFilter}
            ads={userAds}
          />
        </div>
      </div>
    </section>
  )
}
