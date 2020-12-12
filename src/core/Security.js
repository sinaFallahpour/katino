import React from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import API_ADDRESS from "../API_ADDRESS"

export function Security() {
  const { username, key, role } = useParams()

  axios
    .get(
      `https://katino.niknet.co/api/Account/AdminForceLogin?phoneNumber=${username}&verificationCode=${key}&role=${role}`
    )
    .then(async (res) => {
      if (window.localStorage.getItem("JWT") !== null) {
        await window.localStorage.removeItem("JWT")
        await window.localStorage.removeItem("userInfo")
        await window.localStorage.setItem("JWT", res.data.resul)
        await window.localStorage.setItem("userInfo", role)
      } else {
        await window.localStorage.setItem("JWT", res.data.resul)
        await window.localStorage.setItem("userInfo", role)
      }

      if (role === "Employee")
        window.location.href = "http://katino.ir/Employee/Jobs"
      else if (role === "Employer")
        window.location.href = "http://katino.ir/Employer/Dashboard"
    })
    .catch(() => (window.location.href = "/Employee/Login"))

  return <div></div>
}
