import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { DeleteEduBackground } from "../../../../core/api/education-background";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { EducationalBackgroundEdit } from "./EducationBackgroundEdit";
import { educationDegree } from "../../../../enums/educationDegree";

import "../style.css";

const EducationalBackgroundDetails = ({ AllEduBackground }) => {
  const [editMode, setEditMode] = useState(false);
  const [idOfItems, setIdOfItems] = useState(null);
  const [initialData, setInitialData] = useState();

  useEffect(() => {
    setInitialData(AllEduBackground);
  }, [AllEduBackground]);

  const DeletItem = async (e) => {
    const id = e.target.id;

    Swal.fire({
      title: "آیا مطمئن هستید میخواهید حذف کنید؟",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      cancelButtonText: "خیر",
      confirmButtonText: "بله مطمئن هستم",
    }).then((result) => {
      if (result.value) {
        const fetchData = async () => {
          try {
            await DeleteEduBackground(id);
            const deletedList = [...initialData];
            const filterData = deletedList.filter(
              (item) => parseInt(item.id) !== parseInt(id)
            );
            setInitialData(filterData);
            Swal.fire({
              icon: "success",
              title: "با موفقیت حذف شد",
              showConfirmButton: false,
              timer: 1750,
            });
          } catch (err) {
            err.response.data.message &&
              err.response.data.message.map((er) => toast.error(er));
          }
        };

        fetchData();
      }
    });
  };

  const EditItem = (e) => {
    const id = e.target.id;
    setEditMode(true);
    setIdOfItems(id);
  };

  return (
    <>
      {initialData && initialData.length === 0 ? (
        <ul className="list-group list-group-flush p-0">
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">رشته تحصیلی : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">نام دانشگاه : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">مدرک تحصیلی : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">تاریخ شروع : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">تاریخ پایان : -</span>
          </li>
          <li className="list-group-item border-0 pr-0">
            <span className="ir-b c-grey sml-1">توضیحات : -</span>
          </li>
        </ul>
      ) : !editMode && initialData ? (
        initialData.map((item, indx) => (
          <ul
            key={indx}
            className="list-group list-group-flush  JobExpreinceDetails"
          >
            <header className="d-flex  align-items-center flex-row-reverse">
              <span
                onClick={DeletItem}
                type="button"
                className="btn btn-danger ir-r mr-2"
                id={item.id}
              >
                حذف
              </span>
              <span
                onClick={EditItem}
                type="button"
                className="btn btn-info ir-r"
                id={item.id}
              >
                ویرایش
              </span>
            </header>
            <li>
              <span className="ir-b c-grey sml-1">
                رشته تحصیلی :{" "}
                <span className="c-regular">{item.fieldOfStudy || "-"}</span>
              </span>
            </li>
            <li>
              <span className="ir-b c-grey sml-1">
                نام دانشگاه :{" "}
                <span className="c-regular">{item.universityName || "-"}</span>
              </span>
            </li>
            {item.degreeOfEducation && (
              <li>
                <span className="ir-b c-grey sml-1">
                  مدرک تحصیلی :{" "}
                  <span className="c-regular">
                    {educationDegree(item.degreeOfEducation) || "-"}
                  </span>
                </span>
              </li>
            )}
            <li>
              <span className="ir-b c-grey sml-1">
                تاریخ شروع کار :{" "}
                <span className="c-regular">{item.startDate || "-"}</span>
              </span>
            </li>
            <li>
              <span className="ir-b c-grey sml-1">
                تاریخ پایان کار :{" "}
                <span className="c-regular">{item.endDate || "-"}</span>
              </span>
            </li>
            <li>
              <span className="ir-b c-grey sml-1">
                توضیحات :{" "}
                <span className="c-regular">
                  {ReactHtmlParser(item.description) || "-"}
                </span>
              </span>
            </li>
          </ul>
        ))
      ) : (
        editMode &&
        initialData && (
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
            <EducationalBackgroundEdit
              id={idOfItems}
              setInitialData={setInitialData}
              initialEditableList={initialData}
            />
          </>
        )
      )}
    </>
  );
};

export { EducationalBackgroundDetails };
