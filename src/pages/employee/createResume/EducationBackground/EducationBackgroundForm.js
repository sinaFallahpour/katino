import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { EducationBackground } from "../../../../core/validation/EducationBackground";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AddEduBackground } from "../../../../core/api/education-background";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { MiniSpinner } from "../../../../components/spinner/MiniSpinner";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "../style.css";
import { DatePickerModern } from "../../../../core/utils/datepicker.util";
import Select from "react-select";

const EducationalBackgroundForm = ({
  DeleteForm,
  idOfForm,
  AllEduBackground,
  addItemToList,
}) => {
  const degreeOfEducationsList = [
    { value: 1, label: "مهم نیست" },
    { value: 2, label: "دیپلم" },
    { value: 3, label: "کاردانی" },
    { value: 4, label: "کارشناسی" },
    { value: 5, label: "کارشناسی ارشد" },
    { value: 6, label: "دکترا" },
  ];

  const initialData = {
    fieldOfStudy: "",
    universityName: "",
    degreeOfEducation: 0,
    startDate: "",
    endDate: "",
    description: "",
  };

  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [listOfData, setListOfData] = useState();

  useEffect(() => {
    setListOfData(AllEduBackground);
  }, [AllEduBackground]);

  const submitHandler = async (values) => {
    const tempo = { ...values, startDate: startDate, endDate: endDate };
    console.log(tempo);
    setLoading(true);
    try {
      const data = await AddEduBackground(tempo);

      const DataList = [...listOfData];
      DataList.push(tempo);
      addItemToList(DataList);
      Swal.fire({
        icon: "success",
        title: "تکمیل فرم با موفقیت انجام شد",
        showConfirmButton: false,
        timer: 1750,
      });
      DeleteForm(idOfForm);
      setLoading(false);
    } catch (err) {
      err.response?.data?.message?.map((e) => {
        toast.error(e);
      });
      setLoading(false);
    }
  };

  const MyTextAreaInput = ({ ...props }) => {
    const [, , helpers] = useField(props);
    return (
      <>
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
            minHeight: "100px",
            height: "100px",
          }}
          onBlur={(_, editor) => {
            const data = editor.getData();
            helpers.setValue(data);
          }}
        />
        <ErrorMessage
          component="div"
          className="errorMessage"
          name={props.name}
        />
      </>
    );
  };

  const MySelect = ({ label, options, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
      <div>
        <label className="ir-r d-block text-right smb-1">{label}</label>
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
    );
  };

  return (
    <>
      {loading && <MiniSpinner />}
      <Formik
        initialValues={initialData}
        validationSchema={EducationBackground}
        onSubmit={(values) => {
          submitHandler(values);
        }}
      >
        <section className="complete-register-form container-fluid spt-10 FormContainerAnimation">
          <aside className="form-container-bg  mx-auto">
            <Form>
              <div className=" srounded-md  smb-1 mt-4">
                {/* Info */}
                <div className="Field-Container col-12">
                  {/* fieldOfStudy   */}
                  <div className=" smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      رشته تحصیلی را وارد کنید
                    </label>
                    <div className="form-group mb-0">
                      <Field
                        name="fieldOfStudy"
                        className="form-control ir-r shadow-none"
                        placeholder="رشته تحصیلی"
                        type="text"
                      />
                      <ErrorMessage
                        component="div"
                        className="errorMessage"
                        name="fieldOfStudy"
                      />
                    </div>
                  </div>

                  {/* companyName */}
                  <div className=" smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      نام دانشگاه را وارد کنید
                    </label>
                    <div className="form-group mb-0">
                      <Field
                        name="universityName"
                        className="form-control ir-r shadow-none"
                        placeholder="نام دانشگاه"
                        type="text"
                      />
                      <ErrorMessage
                        component="div"
                        className="errorMessage"
                        name="universityName"
                      />
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="Field-Container col-12">
                  {/* degree  */}
                  <div className=" smb-2 ml-2">
                    <MySelect
                      name="degreeOfEducation"
                      placeholder="مدرک تحصیلی"
                      options={degreeOfEducationsList}
                      label="مدرک تحصیلی خود را وارد کنید"
                    />
                  </div>

                  {/* startDate */}
                  <div className=" smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      تاریخ شروع کار را وارد کنید
                    </label>
                    <div className="form-group mb-0 ">
                      <DatePickerModern
                        handleChange={setStartDate}
                        name="startDate"
                      />
                    </div>
                  </div>

                  {/* endDate */}
                  <div className=" smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      تاریخ پایان کار را وارد کنید
                    </label>
                    <div className="form-group mb-0">
                      <DatePickerModern
                        handleChange={setEndDate}
                        name="endDate"
                      />
                    </div>
                  </div>
                </div>

                {/* description */}
                <div className="col-12 smb-2">
                  <label className="ir-r d-block text-right smb-1">
                    توضیحات
                  </label>
                  <MyTextAreaInput name="description" />
                </div>

                {/* submit button  */}
                <div className="smt-3 col-12">
                  <button
                    type="submit"
                    className="btn btn-warning ir-r spx-4 text-white"
                    style={{
                      width: "100%",
                    }}
                  >
                    ثبت تحصیلات
                  </button>
                  <span
                    onClick={DeleteForm}
                    className="btn btn-danger ir-r spx-4 text-white mt-1"
                    style={{
                      width: "100%",
                    }}
                    id={idOfForm}
                  >
                    حذف فرم
                  </span>
                </div>
              </div>
            </Form>
          </aside>
        </section>
      </Formik>
    </>
  );
};

export { EducationalBackgroundForm };
