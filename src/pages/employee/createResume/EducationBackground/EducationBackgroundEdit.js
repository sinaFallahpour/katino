import React, { useEffect, useState } from "react";
import { getWorkExperience } from "../../../../core/api/work-experience";

import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { JobExprience } from "../../../../core/validation/jobExprience";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { MiniSpinner } from "../../../../components/spinner/MiniSpinner";
import "../style.css";
import { DatePickerModern } from "../../../../core/utils/datepicker.util";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { EditWorkExperience } from "../../../../core/api/work-experience";

const EducationalBackgroundEdit = ({
  id,
  setInitialData,
  initialEditableList,
}) => {
  const initialData = {
    workTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  };
  const [initalData, setInitalData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWorkExperience(id);
      setInitalData(data.resul);
      setStartDate(data.resul.startDate);
      setEndDate(data.resul.endDate);
    };

    fetchData();
  }, []);

  const submitHandler = async (values) => {
    const tempo = { ...values, startDate: startDate, endDate: endDate };

    setLoading(true);
    try {
      await EditWorkExperience(tempo);
      const listOfData = [...initialEditableList];
      const editedList = listOfData.map((item) => {
        if (item.id === id) {
          return {
            workTitle: tempo.workTitle,
            companyName: tempo.companyName,
            startDate: tempo.startDate,
            endDate: tempo.endDate,
            description: tempo.description,
          };
        }
      });
      setInitialData(editedList);

      Swal.fire({
        icon: "success",
        title: "ویرایش با موفقیت انجام شد",
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
          data={initalData.description}
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

  return (
    <>
      {loading && <MiniSpinner />}
      <Formik
        initialValues={initalData}
        validationSchema={JobExprience}
        onSubmit={(values) => {
          submitHandler(values);
        }}
        enableReinitialize={true}
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
                      <DatePickerModern
                        handleChange={setStartDate}
                        name="startDate"
                        dateVal={startDate && startDate}
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
                        dateVal={endDate && endDate}
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
                    className="btn btn-success ir-r spx-4 text-white"
                    style={{
                      width: "100%",
                    }}
                  >
                    ویرایش اطلاعات
                  </button>
                </div>
              </div>
            </Form>
          </aside>
        </section>
      </Formik>
    </>
  );
};

export { EducationalBackgroundEdit };
