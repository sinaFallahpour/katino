import * as Yup from "yup";

const LanguageFormValidation = Yup.object({
  languageId: Yup.number("اطلاعات اشتباه وارد کرده اید")
    .min(1, "لطفا زبان خود را وارد کنید")
    .required("لطفا زبان خود را وارد کنید"),
  languageLevel: Yup.number("اطلاعات اشتباه وارد کرده اید")
    .min(1, "لطفا سطح زبان خود را وارد کنید")
    .required("لطفا سطح زبان خود را وارد کنید"),
});

export { LanguageFormValidation };
