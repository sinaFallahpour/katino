import React, { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { useHistory } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage, useField } from "formik"
import CKEditor from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import Select from "react-select"

import { EditProfileEmployerVal } from "../../../core/validation/editProfileEmployer"
import ADDRESS from "../../../ADDRESS"
import API_ADDRESS from "../../../API_ADDRESS"
import { MiniSpinner } from "../../../components/spinner/MiniSpinner"
import "./../Field.style.css"

const EditProfileEmployer = () => {
  const initialD = {
    ManagmentFullName: "",
    PersianFullName: "",
    EngFullName: "",
    EmergencPhone: "",
    Image: "",
    url: "",
    FieldOfActivity: "",
    NumberOfStaff: 0,
    Email: "",
    City: "",
    ShortDescription: "",
  }

  const [initialData, setInitialData] = useState(initialD)
  const [fieldOptions, setFieldOptions] = useState("")
  const [cities, setCities] = useState()
  const [profilePicUrl, setProfilePicUrl] = useState("")
  const [PicUrl, setPicUrl] = useState("")
  const [imageError, setImageError] = useState("")
  const [selectedValue, setSelectedValue] = useState([])
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  useEffect(() => {
    let fieldOptions = []
    let cities = []
    axios.get(API_ADDRESS + "Categories/GetAllCategories").then((res) => {
      res.data.resul.map((item) => {
        fieldOptions.push({
          value: item.id,
          label: item.name,
        })
      })

      setFieldOptions(fieldOptions)
    })

    axios.get(API_ADDRESS + "Account/GetCities").then((res) => {
      res.data.resul.map((item) => {
        cities.push({
          value: item.cityDivisionCode,
          label: `${item.provinceName}، ${item.cityName}`,
        })
      })
      setCities(cities)
    })
  }, [])

  useEffect(() => {
    axios.get(API_ADDRESS + "Account/LoadEmployerProfile").then((res) => {
      setSelectedValue(res.data.resul.fieldOfActivity?.map((item) => item.id))

      setInitialData({
        ManagmentFullName: res.data.resul.managmentFullName || "",
        PersianFullName: res.data.resul.persianFullName || "",
        EngFullName: res.data.resul.engFullName || "",
        EmergencPhone: res.data.resul.emergencPhone || "",
        Image: res.data.resul.image || "",
        url: res.data.resul.url || "",
        FieldOfActivity:
          res.data.resul.fieldOfActivity?.map((item) => {
            return {
              value: item.id,
              label: item.name,
            }
          }) || "",
        NumberOfStaff: res.data.resul.numberOfStaff || 0,
        Email: res.data.resul.email || "",
        City: parseInt(res.data.resul.cities) || "",
        ShortDescription: res.data.resul.shortDescription || "",
      })
    })
  }, [])

  const convertObjToFormData = (obj) => {
    const fd = new FormData()
    for (let key in obj) {
      if (key !== "FieldOfActivity") {
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
    if (files?.length === 0) {
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
    reader.onload = () => {
      setProfilePicUrl(reader.result)
    }
  }

  const submitHandler = (values) => {
    setLoading(true)

    let tempo = { ...values, Image: PicUrl, FieldOfActivity: selectedValue }
    const correctFormat = convertObjToFormData(tempo)

    axios
      .post(API_ADDRESS + "Account/EditEmployerProfile", correctFormat, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("JWT")}`,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "ویرایش اطلاعات با موفقیت انجام شد",
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

  const MultiMySelect = ({ label, options, ...props }) => {
    const [field, , helpers] = useField(props)

    return (
      <div>
        <Select
          {...field}
          {...props}
          options={options}
          onChange={(e) =>
            Array.isArray(e)
              ? e.map((x) => {
                  setSelectedValue((prev) => [...new Set(prev), x.value])
                  helpers.setValue((prev) => [...new Set(prev), x.value])
                })
              : []
          }
          value={
            options
              ? options.filter((obj) => selectedValue.includes(obj.value))
              : []
          }
          className="basic-multi-select"
          classNamePrefix="select"
          isMulti
        />
        <ErrorMessage
          component="div"
          className="errorMessage"
          name={props.name}
        />
      </div>
    )
  }

  const MySelect = ({ label, options, ...props }) => {
    const [field, , helpers] = useField(props)
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

  const MyTextAreaInput = ({ ...props }) => {
    const [, , helpers] = useField(props)
    return (
      <>
        <label className="checkbox form-check-label">{props.label}</label>
        <CKEditor
          className="cke_rtl"
          editor={ClassicEditor}
          data={initialData.ShortDescription}
          config={{
            toolbar: [
              "|",
              "bold",
              "italic",
              "numberedList",
              "bulletedList",
              "|",
              "undo",
              "redo",
            ],
            removePlugins: ["Heading", "Link"],
            language: "fa",
          }}
          onBlur={(_, editor) => {
            const data = editor.getData()
            helpers.setValue(data)
          }}
        />
        <ErrorMessage
          component="div"
          className="errorMessage"
          name={props.name}
        />
      </>
    )
  }

  return (
    <>
      {loading && MiniSpinner()}
      <Formik
        initialValues={initialData}
        validationSchema={EditProfileEmployerVal}
        onSubmit={(values) => {
          submitHandler(values)
        }}
        enableReinitialize={true}
      >
        <section className="complete-register-form container-fluid spx-2 spx-lg-10 smy-10 spt-10">
          <div className="row">
            <aside className="col-12 col-lg-5 mx-auto">
              <Form className="w-100">
                <div className="bg-white srounded-md sp-2 smb-2">
                  <h1 className="fs-l c-dark d-block text-center smb-5 ir-bl">
                    ویرایش اطلاعات شرکت
                  </h1>

                  {/* ManagmentFullName   */}
                  <div className="col-12 smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      لطفا نام و نام خانوادگی مدیریت شرکت وارد کنید
                    </label>
                    <div className="form-group mb-0">
                      <Field
                        name="ManagmentFullName"
                        className="form-control ir-r shadow-none"
                        placeholder="نام و نام خانوادگی مدیریت شرکت"
                        type="text"
                      />
                      <ErrorMessage
                        component="div"
                        className="errorMessage"
                        name="ManagmentFullName"
                      />
                    </div>
                  </div>

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
                        <i className=" fas fa-camera "></i> بارگزاری عکس
                      </label>
                      <input
                        id="Image "
                        type="file"
                        onChange={(event) => {
                          preview(event.currentTarget.files)
                        }}
                        className="form-control"
                      />

                      {profilePicUrl ? (
                        <img
                          src={profilePicUrl}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        initialData.Image && (
                          <img
                            src={`${ADDRESS}img/CompanyLogo/${initialData.Image}`}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        )
                      )}

                      {imageError && (
                        <div className="errorMessage">{imageError}</div>
                      )}
                    </div>
                  </div>

                  {/* Email  */}
                  <div className="col-12 smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      لطفا ایمیل شرکت را وارد کنید
                    </label>
                    <div className="form-group mb-0">
                      <Field
                        name="Email"
                        className="form-control ir-r shadow-none"
                        placeholder="ایمیل شرکت"
                        type="text"
                      />
                      <ErrorMessage
                        component="div"
                        className="errorMessage"
                        name="Email"
                      />
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
                    <MultiMySelect
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

                  {/* City  */}
                  <div className="col-12 smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      شهر مقرر شرکت را وارد کنید
                    </label>
                    <MySelect
                      name="City"
                      placeholder="شهر را انتخاب کنید"
                      options={cities}
                    />
                  </div>

                  {/* ShortDescription  */}
                  <div className="col-12 smb-2 ir-r">
                    <MyTextAreaInput
                      label="توضیحات آگهی"
                      name="ShortDescription"
                    />
                  </div>

                  {/* submit button  */}
                  <div className="smt-3 col-12">
                    <button
                      type="submit"
                      className="btn btn-success ir-r spx-4"
                    >
                      بروزرسانی
                    </button>
                  </div>
                </div>
              </Form>
            </aside>
          </div>
        </section>
      </Formik>
    </>
  )
}

export { EditProfileEmployer }
