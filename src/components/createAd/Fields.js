import React, { useEffect, useState } from "react"
import axios from "axios"
import API_ADDRESS from "../../API_ADDRESS"
import Select from "react-select"
import CKEditor from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { Link, useHistory } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage, useField } from "formik"
import { CreateAdValidate } from "../../core/validation/createAd"
import {
  cooperationType,
  salaries,
  sex,
  exprience,
  education,
  initialData,
} from "./createAdData"
import "./Field.style.css"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

export const Fields = () => {
  const [hasPlan, setHasPlan] = useState(false)
  const [planId, setPlanId] = useState()
  const [planDetails, setPlanDetails] = useState()
  const [categories, setCategories] = useState([])
  const [cities, setCities] = useState([])

  const history = useHistory()

  useEffect(() => {
    axios
      .post(
        API_ADDRESS + "Adver/GetUserPlanWhenCreateAdver",
        {},
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.resul.hasPlan === false) {
          setHasPlan(false)
          setPlanId(res.data.resul.allPlanFor.id)
          setPlanDetails(res.data.resul.allPlanFor)
        } else {
          setHasPlan(true)
        }
      })

    const fetchData = async () => {
      const categoriesies = []
      const cities = []
      await axios
        .get(API_ADDRESS + "Categories/GetAllCategories")
        .then((res) => {
          res.data.resul.map((item) => {
            categoriesies.push({ value: item.id, label: item.name })
          })
        })
      setCategories(categoriesies)

      await axios.get(API_ADDRESS + "Account/GetCities").then((res) => {
        res.data.resul.map((item) => {
          cities.push({
            value: item.cityDivisionCode,
            label: `${item.provinceName}، ${item.cityName}`,
          })
        })
      })
      setCities(cities)
    }

    fetchData()
  }, [])

  const submitHandler = (values) => {
    hasPlan === true &&
      axios
        .post(API_ADDRESS + "Adver/CreateAdver", values, {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
          },
        })
        .then((res) => {
          history.push("/Employer/Dashboard")
          Swal.fire({
            icon: "success",
            title: "ثبت آگهی با موفقیت ثبت شد",
            showConfirmButton: false,
            timer: 1750,
          })
        })
        .catch((err) => {
          err.response.data.message.map((er) => toast.error(er))
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

  const MyCheckbox = ({ ...props }) => {
    const [, meta] = useField({ ...props, type: "radio" })
    return (
      <>
        <div className="form-check form-check-inline">
          <label className="checkbox form-check-label">
            <Field
              className="form-check-input"
              type="radio"
              name="military"
              value={props.value}
            />
            {props.value}
          </label>
        </div>
      </>
    )
  }

  const MyTextAreaInput = ({ ...props }) => {
    const [, meta, helpers] = useField(props)
    return (
      <>
        <label className="checkbox form-check-label">{props.label}</label>
        <CKEditor
          className="cke_rtl"
          editor={ClassicEditor}
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
      <Formik
        initialValues={initialData}
        validationSchema={CreateAdValidate}
        onSubmit={(values) => {
          submitHandler(values)
        }}
      >
        <Form className="w-100">
          <div className="row">
            {/* title  */}
            <div className="col-12 smb-2">
              <label className="ir-r d-block text-right smb-1">
                عنوان آگهی
              </label>
              <div className="form-group mb-0">
                <Field
                  name="title"
                  className="form-control ir-r shadow-none"
                  placeholder="عنوان آگهی"
                  type="text"
                />
                <ErrorMessage
                  component="div"
                  className="errorMessage"
                  name="title"
                />
              </div>
            </div>

            {/* fieldOfActivity  */}
            <div className="col-12 col-lg-6 smb-2 ir-r">
              <label className="ir-r d-block text-right smb-1">
                دسته بندی شغلی
              </label>
              <MySelect
                name="fieldOfActivity"
                placeholder="دسته بندی مربوطه را جستجو کنید..."
                options={categories}
              />
            </div>

            {/* city  */}
            <div className="col-12 col-lg-6 smb-2 ir-r">
              <label className="ir-r d-block text-right smb-1">
                انتخاب استان و شهر
              </label>
              <MySelect
                name="city"
                placeholder="شهر مربوطه را جستجو کنید..."
                options={cities}
              />
            </div>

            {/* typeOfCooperation  */}
            <div className="col-12 col-lg-6 smb-2 ir-r">
              <label className="ir-r d-block text-right smb-1">
                نوع همکاری
              </label>
              <MySelect
                name="typeOfCooperation"
                placeholder="نوع همکاری را انتخاب کنید..."
                options={cooperationType}
              />
            </div>

            {/* salary  */}
            <div className="col-12 col-lg-6 smb-2 ir-r">
              <label className="ir-r d-block text-right smb-1">
                میزان حقوق
              </label>
              <MySelect
                name="salary"
                placeholder="میزان حقوق را انتخاب کنید..."
                options={salaries}
              />
            </div>

            {/* descriptionOfJob  */}
            <div className="col-12 smb-2 ir-r">
              <MyTextAreaInput label="توضیحات آگهی" name="descriptionOfJob" />
            </div>

            {/* gender  */}
            <div className="col-12 col-lg-6 smb-2 ir-r">
              <label className="ir-r d-block text-right smb-1">جنسیت</label>
              <MySelect
                name="gender"
                placeholder="جنسیت را انتخاب کنید..."
                options={sex}
              />
            </div>

            {/* work exprience  */}
            <div className="col-12 col-lg-6 smb-2 ir-r">
              <label className="ir-r d-block text-right smb-1">
                سابقه کار مرتبط
              </label>
              <MySelect
                name="workExperience"
                placeholder="سابقه کار مورد نیاز را انتخاب کنید..."
                options={exprience}
              />
            </div>

            {/* degreeOfEducation  */}
            <div className="col-12 col-lg-6 smb-2 ir-r">
              <label className="ir-r d-block text-right smb-1">
                حداقل مدرک تحصیلی
              </label>
              <MySelect
                name="degreeOfEducation"
                placeholder="حداقل مدرک تحصیلی مورد نیاز را انتخاب کنید..."
                options={education}
              />
            </div>

            {/* military  */}
            <div className="col-12 col-lg-6 smb-2 ir-r">
              <label className="ir-r d-block text-right smb-1">
                وضعیت نظام وظیفه
              </label>
              <MyCheckbox name="military" value="مهم نیست" />
              <MyCheckbox name="military" value="مشمول" />
              <MyCheckbox name="military" value="معاف" />
              <MyCheckbox name="military" value="دارای کارت پایان خدمت" />
              <ErrorMessage
                component="div"
                className="errorMessage"
                name="military"
              />
            </div>

            {/* submit button  */}
            <div className="smt-3 col-12">
              <div className="row d-lg-flex align-items-lg-center">
                {hasPlan === false ? (
                  <div className="col-12 col-lg-6 smb-2 mb-lg-0 ir-r">
                    هزینه انتشار آگهی برای 30 روز، 90,000 تومان می‌باشد.
                  </div>
                ) : (
                  ""
                )}

                <div className="col-12 col-lg-3 mt-0 smt-lg-3 smb-2 mb-lg-0 ir-r mr-auto">
                  <button
                    type="button"
                    className="btn btn-light ir-r d-block w-100"
                  >
                    ذخیره در پیش نویس
                  </button>
                </div>

                <div className="col-12 col-lg-3 mt-0 smt-lg-3 smb-2 mb-lg-0 ir-r ml-auto">
                  {hasPlan === false ? (
                    <Link
                      className="btn btn-warning ir-r d-block w-100"
                      to={`/Employer/Dashboard/Plans/${planId}/Payment`}
                    >
                      پرداخت هزینه
                    </Link>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-success ir-r d-block w-100"
                    >
                      فعالسازی و انتشار
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
