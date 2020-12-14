import React, { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { useHistory } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage, useField } from "formik"
import Select from "react-select"

import { CompleteRegister } from "../../core/validation/completeRegister"
import API_ADDRESS from "../../API_ADDRESS"
import "./Field.style.css"

const CompleteProfile = () => {
  const initialData = {
    PersianFullName: "",
    EngFullName: "",
    EmergencPhone: "",
    Image: "",
    url: "",
    FieldOfActivity: "",
    NumberOfStaff: "",
  }
  const [fieldOptions, setFieldOptions] = useState("")
  const [profilePicUrl, setProfilePicUrl] = useState("")
  const [PicUrl, setPicUrl] = useState("")
  const [imageError, setImageError] = useState("")

  const history = useHistory()

  useEffect(() => {
    // let categories
    let fieldOptions = []
    axios.get(API_ADDRESS + "Categories/GetAllCategories").then((res) => {
      res.data.resul.map((item) => {
        fieldOptions.push({
          value: item.id,
          label: item.name,
        })
      })

      setFieldOptions(fieldOptions)

      // categories = res.data.resul;
      // this.setState({
      //   completeProfile: {
      //     ...this.state,
      //     categories: res.data.resul,
      //   },
      // });
    })
  }, [])

  const convertObjToFormData = (obj) => {
    const fd = new FormData()
    for (let key in obj) {
      if (obj[key] !== "FieldOfActivity") {
        fd.append(key, obj[key])
      }
    }

    obj["FieldOfActivity"].map((e) => {
      fd.append("FieldOfActivity", e)
    })

    return fd
  }

  const preview = (files) => {
    setImageError("")
    if (files.length === 0) {
      setProfilePicUrl(null)
      return
    }

    var mimeType = files[0].type
    if (mimeType.match(/image\/*/) == null) {
      setImageError("فرمت درست را وارد کنید")
      return
    }

    setPicUrl(files[0])
    var reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = (event) => {
      setProfilePicUrl(reader.result)
    }
  }

  const submitHandler = (values) => {
    let tempo = { ...values, Image: PicUrl, FieldOfActivity: [1, 2] }
    console.log(tempo)
    const correctFormat = convertObjToFormData(tempo)
    axios
      .post(API_ADDRESS + "Account/CompanySubmitRegistrstion", correctFormat, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("JWT")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          history.push("/Employer/Dashboard")
        }
        Swal.fire({
          icon: "success",
          title: "تکمیل فرم با موفقیت انجام شد",
          showConfirmButton: false,
          timer: 1750,
        })
        console.log(res, "res")
      })
      .catch((err) => {
        if (err.response.status === 400 && err.response) {
          err.response.data.message.map((e) => {
            toast.error(e)
          })
        }
        err.response.data.message.map((e) => {
          toast.error(e)
        })
      })
  }

  const MySelect = ({ label, options, ...props }) => {
    const [field, meta, helpers] = useField(props)
    return (
      <div>
        <Select
          {...field}
          {...props}
          options={options}
          value={
            options
              ? options.find((option) => option.value === field.value)
              : ""
          }
          onChange={(option) => helpers.setValue(option.value)}
        />
        <ErrorMessage
          component="div"
          className="errorMessage"
          name={props.name}
        />
      </div>
    )
  }

  return (
    <Formik
      initialValues={initialData}
      validationSchema={CompleteRegister}
      onSubmit={(values) => {
        submitHandler(values)
      }}
    >
      <section className="complete-register-form container-fluid spx-2 spx-lg-10 smy-10 spt-10">
        <div className="row">
          <aside className="col-12 col-lg-5 mx-auto">
            <Form className="w-100">
              <div className="bg-white srounded-md sp-2 smb-2">
                <h1 className="fs-l c-dark d-block text-center smb-5 ir-bl">
                  تکمیل پروفایل شرکت
                </h1>

                {/* PersianFullName  */}
                <div className="col-12 smb-2">
                  <label className="ir-r d-block text-right smb-1">
                    لطفا نام شرکت را به فارسی وارد کنید
                  </label>
                  <div className="form-group mb-0">
                    <Field
                      name="PersianFullName"
                      className="form-control ir-r shadow-none"
                      placeholder="نام شرکت به فارسی"
                      type="text"
                    />
                    <ErrorMessage
                      component="div"
                      className="errorMessage"
                      name="PersianFullName"
                    />
                  </div>
                </div>

                {/* EngFullName  */}
                <div className="col-12 smb-2">
                  <label className="ir-r d-block text-right smb-1">
                    لطفا نام شرکت را به انگلیسی وارد کنید
                  </label>
                  <div className="form-group mb-0">
                    <Field
                      name="EngFullName"
                      className="form-control ir-r shadow-none"
                      placeholder="نام شرکت به انگلیسی"
                      type="text"
                    />
                    <ErrorMessage
                      component="div"
                      className="errorMessage"
                      name="EngFullName"
                    />
                  </div>
                </div>

                {/* Image  */}
                <div className="col-12 smb-2">
                  <label className="ir-r d-block text-right smb-1">
                    لطفا لوگوی شرکت خود را وارد کنید
                  </label>
                  <div className="form-group mb-0">
                    <label className="uploadPic" htmlFor="Image ">
                      <i class=" fas fa-camera "></i> بارگزاری عکس
                    </label>
                    <input
                      id="Image "
                      type="file"
                      onChange={(event) => {
                        preview(event.currentTarget.files)
                      }}
                      className="form-control"
                    />
                    {profilePicUrl && (
                      <img
                        src={profilePicUrl}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    {imageError && (
                      <div className="errorMessage">{imageError}</div>
                    )}
                  </div>
                </div>

                {/* EmergencPhone  */}
                <div className="col-12 smb-2">
                  <label className="ir-r d-block text-right smb-1">
                    لطفا شماره تماس شرکت را وارد کنید
                  </label>
                  <div className="form-group mb-0">
                    <Field
                      name="EmergencPhone"
                      className="form-control ir-r shadow-none"
                      placeholder="شماره تماس شرکت"
                      type="text"
                    />
                    <ErrorMessage
                      component="div"
                      className="errorMessage"
                      name="EmergencPhone"
                    />
                  </div>
                </div>

                {/* url */}
                <div className="col-12 smb-2">
                  <label className="ir-r d-block text-right smb-1">
                    لطفا وبسایت شرکت را وارد کنید
                  </label>
                  <div className="form-group mb-0">
                    <Field
                      name="url"
                      className="form-control ir-r shadow-none"
                      placeholder="وبسایت شرکت"
                      type="text"
                    />
                    <ErrorMessage
                      component="div"
                      className="errorMessage"
                      name="url"
                    />
                  </div>
                </div>

                {/* FieldOfActivity */}
                <div className="col-12 smb-2">
                  <label className="ir-r d-block text-right smb-1">
                    حوزه فعالیت شرکت
                  </label>
                  <MySelect
                    name="FieldOfActivity"
                    placeholder="حوزه فعالیت خود را انتخاب کنید"
                    options={fieldOptions}
                  />
                </div>

                {/* NumberOfStaff */}
                <div className="col-12 smb-2">
                  <label className="ir-r d-block text-right smb-1">
                    تعداد پرسنل
                  </label>
                  <MySelect
                    name="NumberOfStaff"
                    placeholder="محدوده تعداد پرنسل شرکت را انتخاب کنید"
                    options={[
                      { value: 1, label: "بین 2 تا 10 نفر" },
                      { value: 2, label: "بین 11 تا 50 نفر" },
                      { value: 3, label: "بین 51 تا 200 نفر" },
                      { value: 4, label: "بین 201 تا 500 نفر" },
                      { value: 5, label: "بین 501 تا 1000 نفر" },
                      { value: 6, label: "بیشتر از 1000 نفر" },
                    ]}
                  />
                </div>

                {/* submit button  */}
                <div className="smt-3 col-12">
                  <button type="submit" className="btn btn-warning ir-r spx-4">
                    تایید
                  </button>
                </div>
              </div>
            </Form>
          </aside>
        </div>
      </section>
    </Formik>
  )
}

export { CompleteProfile }
