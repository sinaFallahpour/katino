import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { JobExprience } from "../../../core/validation/jobExprience";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AddWorkExperience } from "../../../core/api/work-experience";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Calendar, DatePicker } from "react-persian-datepicker";
import "react-persian-datepicker/lib/styles/basic.css";
import moment from "moment-jalaali";
import { MiniSpinner } from "../../../components/spinner/MiniSpinner";
import "./style.css";

const JobExpreinceForm = ({ DeleteForm, idOfForm }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const initialData = {
    workTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  };
  let styles = {
    calendarContainer: "calendarContainer",
    dayPickerContainer: "dayPickerContainer",
    monthsList: "monthsList",
    daysOfWeek: "daysOfWeek",
    dayWrapper: "dayWrapper",
    selected: "selected",
    heading: "heading",
    next: "next",
    prev: "prev",
    title: "title",
    currentMonth: "currentMonth",
  };
  const submitHandler = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      await AddWorkExperience(values);

      Swal.fire({
        icon: "success",
        title: "تکمیل فرم با موفقیت انجام شد",
        showConfirmButton: false,
        timer: 1750,
      });
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

  const DatePickerInput = ({ ...props }) => {
    const [, , helpers] = useField(props);
    const selectedName =
      props.name === "startDate"
        ? startDate
        : props.name === "endDate" && endDate;
    return (
      <>
        <DatePicker
          calendarStyles={styles}
          className="form-control ir-r shadow-none "
          // value={selectedName}
          value={moment(selectedName, "jYYYY/jMM/jDD")}
          onChange={(date) => {
            helpers.setValue(date);
            props.name === "startDate" && setStartDate(date._d);
            props.name === "endtDate" && setEndDate(date._d);
            console.log(date._d);
          }}
          name={props.name}
        />
        <ErrorMessage
          component="div"
          className="errorMessage"
          name={props.name}
        />
      </>
    );
  };

  return (
    <>
      {loading && <MiniSpinner />}
      <Formik
        initialValues={initialData}
        validationSchema={JobExprience}
        onSubmit={(values) => {
          submitHandler(values);
        }}
      >
        <section className="complete-register-form container-fluid  spt-10">
          <aside className="form-container-bg  mx-auto">
            <Form>
              <div className=" srounded-md  smb-1 mt-4">
                <div className="Field-Container col-12">
                  {/* workTitle   */}
                  <div className=" smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      عنوان آگهی را وارد کنید
                    </label>
                    <div className="form-group mb-0">
                      <Field
                        name="workTitle"
                        className="form-control ir-r shadow-none"
                        placeholder="عنوان آگهی"
                        type="text"
                      />
                      <ErrorMessage
                        component="div"
                        className="errorMessage"
                        name="workTitle"
                      />
                    </div>
                  </div>

                  {/* companyName */}
                  <div className=" smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      نام شرکت را وارد کنید
                    </label>
                    <div className="form-group mb-0">
                      <Field
                        name="companyName"
                        className="form-control ir-r shadow-none"
                        placeholder="نام شرکت"
                        type="text"
                      />
                      <ErrorMessage
                        component="div"
                        className="errorMessage"
                        name="companyName"
                      />
                    </div>
                  </div>
                </div>
                <div className="Field-Container col-12">
                  {/* startDate */}
                  <div className=" smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      تاریخ شروع کار را وارد کنید
                    </label>
                    <div className="form-group mb-0 ">
                      <DatePickerInput name="startDate" />
                    </div>
                  </div>

                  {/* endDate */}
                  <div className=" smb-2">
                    <label className="ir-r d-block text-right smb-1">
                      تاریخ پایان کار را وارد کنید
                    </label>
                    <div className="form-group mb-0">
                      <DatePickerInput name="endDate" />
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
                    ثبت تجربه کاری
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

export { JobExpreinceForm };
