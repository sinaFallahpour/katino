import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { EducationBackground } from "../../../../core/validation/EducationBackground";
import { AddEduBackground } from "../../../../core/api/education-background";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { MiniSpinner } from "../../../../components/spinner/MiniSpinner";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "../style.css";
import Select from "react-select";

const LanguageForm = ({
  DeleteForm,
  idOfForm,
  getAllLanguageForCurrentUser,
  addItemToList,
  GetAllLanguages,
}) => {
  const LanguageLevelOption = [
    { value: 1, label: "مبتدی" },
    { value: 2, label: "متوسط" },
    { value: 3, label: "حرفه ای" },
    { value: 4, label: "زبان بومی" },
  ];

  const initialData = {
    languageId: 0,
    languageLevel: 0,
  };

  const [loading, setLoading] = useState(false);
  const [listOfData, setListOfData] = useState();
  const [allLanguages, setAllLAnguages] = useState();

  useEffect(() => {
    setListOfData(getAllLanguageForCurrentUser);
  }, [getAllLanguageForCurrentUser]);

  // useEffect(() => {
  //   setAllLAnguages();
  //   console.log();
  // }, []);

  const submitHandler = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      await AddEduBackground(values);
      const DataList = [...listOfData];
      DataList.push(values);
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

  const MySelect = ({ label, options, ...props }) => {
    const [field, , helpers] = useField(props);
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
                {/* languageId */}
                <div className="col-12 smb-2">
                  <MySelect
                    name="languageId"
                    placeholder="سطح"
                    label="سطح زبان خود را وارد کنید"
                  />
                </div>

                {/* languageLevel */}
                <div className="col-12 smb-2">
                  <MySelect
                    name="languageLevel"
                    placeholder="سطح"
                    options={LanguageLevelOption}
                    label="سطح زبان خود را وارد کنید"
                  />
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

export { LanguageForm };
