import React, { useState } from "react"
import { adverStatus } from "../../enums"
import { Link } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { MiniSpinner } from "../spinner/MiniSpinner"
import API_ADDRESS from "../../API_ADDRESS"
import { AdverDetails } from "./AdverDetails"

export function AdStatus(props) {
  const [loading, setLoading] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [adverId, setAdverId] = useState()

  let asignments = {
    status_1: 0,
    status_2: 0,
    status_3: 0,
    status_4: 0,
  }

  props.asignStatusWithCounts.map((item) => {
    switch (item.asingResomeStatus) {
      case 1:
        asignments.status_1 = item.count
        break

      case 2:
        asignments.status_2 = item.count
        break

      case 3:
        asignments.status_3 = item.count
        break

      case 4:
        asignments.status_4 = item.count
        break
    }
  })

  const activeAdverDraft = () => {
    setLoading(true)
    axios
      .post(
        API_ADDRESS + `Adver/AddAdverFromDraft?adverId=${props.id}`,
        {},
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => {
        window.location.reload()
        Swal.fire({
          icon: "success",
          title: "آگهی با موفقیت فعال شد",
          showConfirmButton: false,
          timer: 1750,
        })
        setLoading(false)
      })
      .catch((err) => {
        err?.response?.data?.message.map((e) => {
          toast.error(e)
        })

        setLoading(false)
      })
  }

  function goto(event) {
    if (event.target.id !== "modalContaierOfAdver") {
      setToggle(false)
    }
  }
  document.body.addEventListener("click", goto)
  return (
    <>
      {loading && MiniSpinner()}
      {toggle && <AdverDetails adverId={adverId} />}
      <div className="card  srounded-sm sp-2">
        <div className="row">
          <header className="col-12 smb-2">
            <div className="d-lg-flex justify-content-lg-between align-items-lg-center">
              <div className="smb-2 mb-lg-0">
                <Link to={`/Employer/AdInfo/${props.id}`}>
                  <span className="ir-b c-dark"> {props.title} </span>
                </Link>
                <span className="c-grey ir-r smr-1 bg-body srounded-sm sp-05">
                  {adverStatus(props.adverStatus)}
                </span>

                {props.adverStatus !== 2 && (
                  <span
                    className={`text-white  ir-r smr-1 srounded-sm sp-05 
                ${props.adverCreatationStatus === 1 && "bg-success"}
                ${props.adverCreatationStatus === 3 && "bg-success"}
                ${props.adverCreatationStatus === 2 && "bg-danger"}
                ${props.adverCreatationStatus === 4 && "bg-danger"}
                `}
                    style={{ display: "inline-block" }}
                  >
                    {props.adverCreatationStatus === 1 && "درحال بررسی"}
                    {props.adverCreatationStatus === 2 && "رد شده"}
                    {props.adverCreatationStatus === 3 && "پذیرفته شده"}
                    {props.adverCreatationStatus === 4 && "برگشت خورده"}
                  </span>
                )}
              </div>

              <div>
                <span
                  className="btn btn-light sml-1 ir-r"
                  onClick={() => {
                    setToggle(true)
                    setAdverId(props.id)
                  }}
                >
                  بیشتر
                </span>

                {props.adverCreatationStatus === 1 && (
                  <Link
                    to={`/Employer/editAdver?AdverId=${props.id}`}
                    className="btn btn-light sml-1 ir-r"
                  >
                    ویرایش
                  </Link>
                )}
                {props.adverCreatationStatus === 4 && (
                  <Link
                    to={`/Employer/editAdver?AdverId=${props.id}`}
                    className="btn btn-light sml-1 ir-r"
                  >
                    ویرایش
                  </Link>
                )}

                {props.adverStatus === 2 && (
                  <button
                    onClick={activeAdverDraft}
                    className="text-white bg-success btn btn-light sml-1 ir-r"
                  >
                    فعال کردن
                  </button>
                )}
              </div>
            </div>

            <span className="ir-r c-regular smt-2">
              {props.adverCreatationStatus === 2 && props.adminDescription
                ? `پیام سیستم: ${props.adminDescription}`
                : ""}
              {props.adverCreatationStatus === 4 && props.adminDescription
                ? `پیام سیستم: ${props.adminDescription}`
                : ""}
            </span>
          </header>

          <div className="col-12 col-lg-6 smb-2 c-primary d-flex justify-content-start align-items-center">
            <span className="ir-r text-center d-block badge badge-warning fs-m p-0">
              {asignments.status_1}
            </span>
            <span className="ir-r smr-1 c-warning">در انتظار تعیین وضعیت</span>
          </div>

          <div className="col-12 col-lg-6 smb-2 c-primary d-flex justify-content-start align-items-center">
            <span className="ir-r text-center d-block badge badge-primary fs-m p-0">
              {asignments.status_3}
            </span>
            <span className="ir-r smr-1 c-primary">تایید برای مصاحبه</span>
          </div>

          <div className="col-12 col-lg-6 smb-2 c-primary d-flex justify-content-start align-items-center">
            <span className="ir-r text-center d-block badge badge-success fs-m p-0">
              {asignments.status_4}
            </span>
            <span
              className="ir-r smr-1 c-success"
              style={{
                color: "#50D86A",
              }}
            >
              استخدام شده
            </span>
          </div>

          <div className="col-12 col-lg-6 smb-2 c-primary d-flex justify-content-start align-items-center">
            <span className="ir-r text-center badge badge-danger fs-m p-0 d-block c-danger srounded-sm">
              {asignments.status_2}
            </span>
            <span className="ir-r smr-1 c-danger">رد شده</span>
          </div>
        </div>
      </div>
    </>
  )
}
