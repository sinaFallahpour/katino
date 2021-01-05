import React, { useEffect, useState } from "react";

import { Formik, Form, ErrorMessage, useField } from "formik";
import { LanguageFormValidation } from "../../../../core/validation/languageForm";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { MiniSpinner } from "../../../../components/spinner/MiniSpinner";
import agent from "../../../../core/agent";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { getLanguage, editLanguage } from "../../../../core/api/user-language";
import Select from "react-select";
import "../style.css";

const LanguageEdit = ({ id, setInitialData, initialEditableList }) => {
  const initialData = {
    languageId: 0,
    languageLevel: 0,
  };
  const LanguageLevelOption = [
    { value: 1, label: "مبتدی" },
    { value: 2, label: "متوسط" },
    { value: 3, label: "حرفه ای" },
    { value: 4, label: "زبان بومی" },
  ];

  const [initalDataList, setInitalData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [allLanguages, setAllLAnguages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = id && (await getLanguage(id));
        res && setInitalData(res.resul);

        const { data } = await agent.CreateResome.GetAllLanguages();
        const convertedList = await data.resul.map(({ id, name }) => ({
          value: id,
          label: name,
        }));
        setAllLAnguages(convertedList);

        const idOfCity = await convertedList.filter(
          ({ label }) => label === res.resul.languageName
        );
        const idOfCityName = (await idOfCity) ? idOfCity[0]?.value : null;

        idOfCityName &&
          setInitalData({
            ...allLanguages,
            languageId: idOfCityName,
            id: res.resul.id,
          });
      } catch (err) {
        err.response?.data?.message?.map((e) => {
          toast.error(e);
        });
      }
    };

    fetchData();
  }, []);

  const submitHandler = async (values) => {
    setLoading(true);
    const listOfCities = [...allLanguages];
    const languageName = listOfCities.filter(
      ({ value }) => value === values.languageId
    );
    console.log(values);
    try {
      await editLanguage(values);
      const listOfData = [...initialEditableList];
      const editedList = listOfData.map((item) => {
        if (item.id === parseInt(id)) {
          return {
            id: values.id,
            languageId: values.languageId,
            languageLevel: values.languageLevel,
            languageName: languageName[0].label,
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
        initialValues={initalDataList}
        validationSchema={LanguageFormValidation}
        onSubmit={(values) => {
          submitHandler(values);
        }}
        enableReinitialize={true}
      >
        <section className="complete-register-form container-fluid  spt-10">
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

export { LanguageEdit };
