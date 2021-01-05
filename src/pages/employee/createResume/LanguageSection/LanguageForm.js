import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, useField } from "formik";
import { LanguageFormValidation } from "../../../../core/validation/languageForm";
import { AddLanguage } from "../../../../core/api/user-language";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { MiniSpinner } from "../../../../components/spinner/MiniSpinner";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "../style.css";
import Select from "react-select";
import agent from "../../../../core/agent";

const LanguageForm = ({
  DeleteForm,
  idOfForm,
  getAllLanguageForCurrentUser,
  addItemToList,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await agent.CreateResome.GetAllLanguages();

        const convertedList = await data.resul.map(({ id, name }) => ({
          value: id,
          label: name,
        }));

        setAllLAnguages(convertedList);
      } catch (err) {
        err.response?.data?.message?.map((e) => {
          toast.error(e);
        });
      }
    };

    fetchData();
  }, []);

  const submitHandler = async (values) => {
    const CityName = allLanguages?.filter(({ value, label }) => {
      if (value === values.languageId) {
        return label;
      }
    });
    const temo = { ...values, languageName: CityName[0].label };

    setLoading(true);
    try {
      await AddLanguage(values);
      const DataList = [...listOfData];
      DataList.push(temo);
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
        validationSchema={LanguageFormValidation}
        onSubmit={(values) => {
          submitHandler(values);
        }}
      >
        <section className="complete-register-form container-fluid spt-10 FormContainerAnimation">
          <aside className="form-container-bg  mx-auto">
            <Form>
              <div className=" srounded-md  smb-1 mt-4">
                {/* languageId */}
                <div className="Field-Container col-12">
                  <div className=" smb-2">
                    <MySelect
                      name="languageId"
                      placeholder="زبان"
                      label="زبان خود را وارد کنید"
                      options={allLanguages && allLanguages}
                    />
                  </div>

                  {/* languageLevel */}
                  <div className=" smb-2">
                    <MySelect
                      name="languageLevel"
                      placeholder="سطح"
                      options={LanguageLevelOption}
                      label="سطح زبان خود را وارد کنید"
                    />
                  </div>
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
                    ثبت زبان
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
