import * as Yup from "yup";
const faRegex = /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/;
const enRegex = /^[ A-Za-z]+$/;
const numRegex = /^-?[0-9][0-9,\.]+$/;

const CompleteRegister = Yup.object({
  ManagmentFullName: Yup.string("لطفا از کارکتر استفاده کنید").required(
    "لطفا نام و نام خانوادگی مدیریت شرکت را وارد کنید"
  ),
  PersianFullName: Yup.string()
    .matches(faRegex, "فقط حروف فارسی وارد کنید")
    .required("لطفا نام فارسی شرکت را وارد کنید"),
  EngFullName: Yup.string()
    .matches(enRegex, "فقط حروف انگلیسی وارد کنید")
    .required("لطفا نام لاتین شرکت را وارد کنید"),
  EmergencPhone: Yup.string()
    .matches(numRegex, "فقط عدد وارد کنید")
    .min(5, "حداقل 5 عدد")
    .max(20, "حداکثر 20 عدد")
    .required("لطفا شماره تماس شرکت را وارد کنید"),
  url: Yup.string().max(40, "حداکثر 40 عدد"),
  Email: Yup.string()
    .email("لطفا ایمیل را به درستی وارد کنید")
    .required("لطفا ایمیل را به درستی وارد کنید"),
  NumberOfStaff: Yup.number()
    .min(0, "لطفا تعداد پرسنل را انتخاب کنید")
    .required("لطفا تعداد پرسنل را انتخاب کنید"),
});

export { CompleteRegister };
