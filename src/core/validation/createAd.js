import * as Yup from "yup"

const CreateAdValidate = Yup.object({
  title: Yup.string().required("لطفا عنوان آگهی را وارد کنید"),
  fieldOfActivity: Yup.string().required("لطفا دسته بندی شغلی را انتخاب کنید"),
  city: Yup.string().required("لطفا شهر خود را انتخاب کنید"),
  typeOfCooperation: Yup.number()
    .min(1, "لطفا نوع همکاری را انتخاب کنید")
    .required("لطفا نوع همکاری را انتخاب کنید"),
  salary: Yup.number()
    .min(1, "لطفا میزان حقوق را انتخاب کنید")
    .required("لطفا میزان حقوق را انتخاب کنید"),
  gender: Yup.number()
    .min(1, "لطفا جنسیت را انتخاب کنید")
    .required("لطفا جنسیت را انتخاب کنید"),
  workExperience: Yup.number()
    .min(1, "لطفا میزان سابقه کار را انتخاب کنید")
    .required("لطفا میزان سابقه کار را انتخاب کنید"),
  degreeOfEducation: Yup.number()
    .min(1, "لطفا مدرک تحصیلی را انتخاب کنید")
    .required("لطفا مدرک تحصیلی را انتخاب کنید"),
  descriptionOfJob: Yup.string().required("لطفا توضیحات آگهی را پر کنید"),
  military: Yup.string().required("لطفا وضعیت سربازی را انتخاب کنید"),
})

export { CreateAdValidate }
