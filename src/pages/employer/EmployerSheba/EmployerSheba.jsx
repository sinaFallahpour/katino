import React, { useEffect, useRef, useState } from "react"

import {
  CardNumberInput,
  ShebaContainer,
  CardNumberContainer,
  CardNumberText,
  Button,
  FormContainer,
} from "./EmployerSheba.styles"
import { Formik, Form, useField, ErrorMessage } from "formik"
import { ShebaValidate } from "../../../core/validation/shebaValidate"
import axios from "axios"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import API_ADDRESS from "../../../API_ADDRESS"
import { MiniSpinner } from "../../../components/spinner/MiniSpinner"
import "../Field.style.css"

const EmployerSheba = () => {
  const [shebaNumber, setShebaNumber] = useState({
    shebaNumber: "",
  })
  const [loading, setLoading] = useState(false)
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
    setLoading(true)
    axios
      .get(
        API_ADDRESS + `Account/LoadShebaCode`,
        {},
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => {
        const loadedSheba = res.data.resul.substring(2)
        setShebaNumber({
          shebaNumber: loadedSheba,
        })
        setLoading(false)
      })
      .catch((err) => {
        err?.response?.data?.message.map((e) => {
          toast.error(e)
        })

        setLoading(false)
      })
  }, [])

  const submitHandler = (values) => {
    setLoading(true)

    axios
      .post(
        API_ADDRESS +
          `Account/UpdateShebaCode?shebeCode=${"IR" + values.shebaNumber}`,
        {},
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "شماره شبا با موفقیت انجام شد",
          showConfirmButton: false,
          timer: 1750,
        })
        setLoading(false)
      })
      .catch((err) => {
        if (err.response.status === 400 && err.response) {
          err.response.data.message.map((e) => {
            toast.error(e)
          })
        }

        setLoading(false)
      })
  }

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <>
        <CardNumberText> IR </CardNumberText>
        <CardNumberInput ref={inputRef} {...field} {...props} />
      </>
    )
  }

  return (
    <>
      {loading && MiniSpinner()}
      <ShebaContainer>
        <Formik
          initialValues={shebaNumber}
          validationSchema={ShebaValidate}
          onSubmit={(values) => {
            console.log("sss")
            submitHandler(values)
          }}
          enableReinitialize={true}
        >
          <Form>
            <FormContainer>
              <CardNumberContainer>
                <MyTextInput name="shebaNumber" />
              </CardNumberContainer>
              <ErrorMessage
                component="div"
                className="errorMessage"
                name="shebaNumber"
              />
              <Button type="submit"> ثبت شماره شبا </Button>
            </FormContainer>
          </Form>
        </Formik>
      </ShebaContainer>
    </>
  )
}

export { EmployerSheba }
