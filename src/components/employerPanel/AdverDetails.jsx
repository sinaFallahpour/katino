import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import API_ADDRESS from "../../API_ADDRESS"
import { MiniSpinner } from "../spinner/MiniSpinner"
import {
  DetailsContainer,
  DetailsContent,
  DetailsContext,
  DetailsTitle,
  DetailsDes,
} from "./AdverDetails.styles"
import { cooperationType } from "../../enums/cooperationType"
import { educationDegree } from "../../enums/educationDegree"
import { workExperience } from "../../enums/workExperience"
import { gender } from "../../enums/gender"
import { salary } from "../../enums/salary"
import { adverStatus } from "../../enums/adverStatus"

const AdverDetails = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [findCity, setFindCity] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    setLoading(true)
    params.id &&
      axios
        .get(
          API_ADDRESS + `Adver/AdverDetails`,
          { params: { id: parseInt(params.id) } },
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("JWT")}`,
            },
          }
        )
        .then(({ data }) => {
          const cityId = data.resul.city
          setData(data.resul)
          console.log(data.resul)

          axios.get(API_ADDRESS + "Account/GetCities").then((res) => {
            res.data.resul.map((item) => {
              parseInt(cityId) === item.cityDivisionCode &&
                setFindCity(`${item.provinceName} - ${item.cityName}`)
            })
          })

          setLoading(false)
        })
        .catch((err) => {
          err.response.data.message &&
            err?.response?.data?.message.map((e) => {
              toast.error(e)
            })

          setLoading(false)
        })
  }, [])

  const stringToHTML = (str) => {
    var parser = new DOMParser()
    var doc = parser.parseFromString(str, "text/html")
    return doc.body
  }

  return (
    <>
      {loading && MiniSpinner()}

      {data ? (
        <DetailsContainer>
          <DetailsContent>
            <DetailsContext>
              <DetailsTitle> نام شرکت </DetailsTitle>
              <DetailsDes>{data.companyName}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> توضیحات شرکت </DetailsTitle>
              <DetailsDes>data.companyDescription</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> وضعیت آگهی </DetailsTitle>
              <DetailsDes>{adverStatus(data.adverStatus)}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> عنوان آگهی </DetailsTitle>
              <DetailsDes>{data.title}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> توضیحات آگهی </DetailsTitle>
              <DetailsDes>{data.descriptionOfJob}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> حوزه فعالیت </DetailsTitle>
              <DetailsDes>{data.feildOfActivity}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> وضعیت آگهی </DetailsTitle>
              <DetailsDes>{data.isImmediate}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> وضعیت خدمت سربازی </DetailsTitle>
              <DetailsDes>{data.military}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> میزان حقوق </DetailsTitle>
              <DetailsDes>{salary(data.salary)}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> جنسیت </DetailsTitle>
              <DetailsDes>{gender(data.gender)}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> میزان تحصیلات </DetailsTitle>
              <DetailsDes>{educationDegree(data.degreeOfEducation)}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> میزان سابق کار </DetailsTitle>
              <DetailsDes>{workExperience(data.workExperience)}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> نوع همکاری </DetailsTitle>
              <DetailsDes>{cooperationType(data.typeOfCooperation)}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> استان - شهر </DetailsTitle>
              <DetailsDes>{findCity}</DetailsDes>
            </DetailsContext>
            <DetailsContext>
              <DetailsTitle> وضعیت ارسال رزومه </DetailsTitle>
              <DetailsDes>
                {data.isAsignResomeToThisAdver
                  ? "رزومه ارسال شده"
                  : "روزمه ارسال نشده"}
              </DetailsDes>
            </DetailsContext>
          </DetailsContent>
        </DetailsContainer>
      ) : (
        "موردی یافت نشد"
      )}
    </>
  )
}

export { AdverDetails }
