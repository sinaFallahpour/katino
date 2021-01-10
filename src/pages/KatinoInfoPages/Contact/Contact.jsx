import React from "react";
import axios from "axios";
import API_ADDRESS from "../../../API_ADDRESS";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { ContactUs } from "../../../core/validation/contactus";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "./ContractUs.styles.css";

const ContactPage = () => {
  const initialData = {
    fullName: "",
    email: "",
    comment: "",
    phoneNumber: "",
  };

  const MyTextAreaInput = ({ ...props }) => {
    const [, meta, helpers] = useField(props);
    return (
      <>
        <label className="checkbox form-check-label LabelOfInput">
          {props.label}
        </label>
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

  const submitHandler = (values) => {
    axios
      .post(API_ADDRESS + "Setting/CreateContactUs", values)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "پیام شما با موفقیت ثبت شد",
          showConfirmButton: false,
          timer: 1750,
        });
      })
      .catch((err) => {
        err.response.data.message &&
          err.response.data.message.map((er) => toast.error(er));
      });
  };

  return (
    <>
      <section className="container-fluid create-ad spx-2 spx-lg-10 smy-10 spt-10">
        <div className="row">
          <aside className="col-12 col-lg-10 mx-auto">
            <div className="bg-white sbs-shadow srounded-md sp-2">
              <header className="header d-lg-flex w-100 justify-content-lg-between align-items-lg-center">
                <h2 className="ir-b fs-s c-dark text-right smb-2 mb-lg-0">
                  تیکت های پشتیبانی
                </h2>

                <div>
                  <a
                    className="d-block d-lg-inline-block shadow-none ir-r fs-s c-regular btn border srounded-sm smb-2 mb-lg-0"
                    href="tel:01133333333"
                  >
                    تماس تلفنی
                  </a>
                </div>
              </header>
              <hr />

              <Formik
                initialValues={initialData}
                validationSchema={ContactUs}
                onSubmit={(values) => {
                  submitHandler(values);
                }}
              >
                <Form className="w-100">
                  <div className="row">
                    {/* fullName  */}
                    <div className="col-12 smb-2">
                      <label className="ir-r d-block text-right smb-1 LabelOfInput">
                        نام و نام خانوادگی
                      </label>
                      <div className="form-group mb-0">
                        <Field
                          name="fullName"
                          className="form-control ir-r shadow-none"
                          placeholder="نام و نام خانوادگی خود را وارد کنید"
                          type="text"
                        />
                        <ErrorMessage
                          component="div"
                          className="errorMessage"
                          name="fullName"
                        />
                      </div>
                    </div>

                    {/* email  */}
                    <div className="col-12 smb-2">
                      <label className="ir-r d-block text-right smb-1  LabelOfInput">
                        ایمیل
                      </label>
                      <div className="form-group mb-0">
                        <Field
                          name="email"
                          className="form-control ir-r shadow-none email-input"
                          placeholder="ایمیل خود را وارد کنید"
                          type="text"
                        />
                        <ErrorMessage
                          component="div"
                          className="errorMessage"
                          name="email"
                        />
                      </div>
                    </div>

                    {/* PhoneNumber  */}
                    <div className="col-12 smb-2">
                      <label className="ir-r d-block text-right smb-1">
                        شماره تماس
                      </label>
                      <div className="form-group mb-0">
                        <Field
                          name="phoneNumber"
                          className="form-control ir-r shadow-none email-input"
                          placeholder="شماره تماس خود را وارد کنید"
                          type="text"
                        />
                        <ErrorMessage
                          component="div"
                          className="errorMessage"
                          name="phoneNumber"
                        />
                      </div>
                    </div>

                    {/* descriptionOfJob  */}
                    <div className="col-12 smb-2 ir-r">
                      <MyTextAreaInput label="توضیحات آگهی" name="comment" />
                    </div>

                    {/* submit button  */}
                    <div className="smt-3 col-12">
                      <div className="row d-lg-flex align-items-lg-center">
                        <div className="col-12 col-lg-3 mt-0 smt-lg-3 smb-2 mb-lg-0 ir-r ml-auto">
                          <button
                            type="submit"
                            className="btn btn-success ir-r d-block w-100"
                          >
                            ارسال پیام
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export { ContactPage };
