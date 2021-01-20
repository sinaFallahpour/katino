import React, { useState, useEffect } from "react";

import "../style.css";

const JobPreferenceDetails = ({ AllWorkExperience }) => {
  const [editMode, setEditMode] = useState(false);
  const [initialData, setInitialData] = useState();

  const returnSenioritylevel = (status) => {
    if (status == 0) return "مهم نیست";
    if (status == 1) return "کمتر از سه سال";
    if (status == 2) return "بیبین 3 تا 7 سال";
    if (status == 3) return "بیشتر از 7 سال";
  };

  const returnTypeOfCooperation = (status) => {
    if (status == 0) return "تمام وقت";
    if (status == 1) return "پاره وقت";
    if (status == 2) return "کارآموزی";
    if (status == 3) return "دورکاری";
  };

  const returnSalary = (status) => {
    if (status == 0) return "کمتر از 1 میلیون";
    if (status == 1) return "بین 2.5 تا 3.5 میلیون";
    if (status == 2) return "بین 3.5 تا 5 میلیون";
    if (status == 3) return "بین 5 تا 8 میلیون";
    if (status == 4) return "بین 1 تا 2.5 میلیون";
    if (status == 5) return "بیشتر از یک میلیون";
  };

  useEffect(() => {
    setInitialData([AllWorkExperience]);
  }, [AllWorkExperience]);

  return (
    <>
      {initialData && initialData.length === 0 ? (
        <ul className="list-group list-group-flush p-0">
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">شهر : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">میزان حقوق : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">نوع همکاری : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">دسته شغلی : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">سابقه کار : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">بیمه : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">ارتقا شغلی : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">
              انعطاف پذیر بودن ساعت کاری : -
            </span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">همراه با وعده غذایی : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">
              همراه با سرویس رفت و آمد : -
            </span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">مدرک تحصیلی : -</span>
          </li>
        </ul>
      ) : !editMode && initialData ? (
        initialData.map((item, indx) => (
          <ul key={indx} className="list-group list-group-flush p-0">
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                شهر :{" "}
                <span className="c-regular">{item ? item.city : "-"}</span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                میزان حقوق :{" "}
                <span className="c-regular">
                  {item ? returnSalary(item?.salary) : "-"}
                </span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                نوع همکاری :{" "}
                <span className="c-regular">
                  {item
                    ? returnTypeOfCooperation(item?.typeOfCooperation)
                    : "-"}
                </span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                سابقه کار :{" "}
                <span className="c-regular">
                  {item ? returnSenioritylevel(item?.senioritylevel) : "-"}
                </span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                دسته شغلی :{" "}
                <span className="c-regular">
                  {item?.categoryForJobPrefence ? (
                    <div className="p-1">
                      {item?.categoryForJobPrefence.map(
                        ({ categoryName }, indxItem) => {
                          return (
                            <button
                              key={indxItem}
                              className="btn btn-success  m-1 mb-0"
                            >
                              {categoryName}
                            </button>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    "-"
                  )}
                </span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                بیمه :{" "}
                <span className="c-regular">
                  {item?.insurance ? (
                    <i className="fas fa-check c-success"></i>
                  ) : (
                    <i className="fas fa-times c-danger"></i>
                  )}
                </span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                ارتقا شغلی :{" "}
                <span className="c-regular">
                  {item?.promotion ? (
                    <i className="fas fa-check c-success"></i>
                  ) : (
                    <i className="fas fa-times c-danger"></i>
                  )}
                </span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                انعطاف پذیر بودن ساعت کاری :{" "}
                <span className="c-regular">
                  {item?.flexibleWorkingTime ? (
                    <i className="fas fa-check c-success"></i>
                  ) : (
                    <i className="fas fa-times c-danger"></i>
                  )}
                </span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                همراه با وعده غذایی :{" "}
                <span className="c-regular">
                  {item?.hasMeel ? (
                    <i className="fas fa-check c-success"></i>
                  ) : (
                    <i className="fas fa-times c-danger"></i>
                  )}
                </span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                همراه با سرویس رفت و آمد :{" "}
                <span className="c-regular">
                  {item?.transportationService ? (
                    <i className="fas fa-check c-success"></i>
                  ) : (
                    <i className="fas fa-times c-danger"></i>
                  )}
                </span>
              </span>
            </li>
            <li className="list-group-item border-0 pr-0">
              <span className="ir-b c-grey sml-1">
                مدرک تحصیلی :{" "}
                <span className="c-regular">
                  {item?.educationCourses ? (
                    <i className="fas fa-check c-success"></i>
                  ) : (
                    <i className="fas fa-times c-danger"></i>
                  )}
                </span>
              </span>
            </li>
          </ul>
        ))
      ) : (
        <>
          <header className="d-flex justify-content-between align-items-center mt-1">
            <h3 className="ir-b c-primary text-right d-block fs-m smb-2"></h3>

            <span
              onClick={() => setEditMode(false)}
              type="button"
              className="btn btn-info ir-r"
            >
              بازگشت
            </span>
          </header>
        </>
      )}
    </>
  );
};

export { JobPreferenceDetails };
