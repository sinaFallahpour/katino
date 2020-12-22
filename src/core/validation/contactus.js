import * as Yup from "yup";

const ContactUs = Yup.object({
  fullName: Yup.string("لطفا از کارکتر استفاده کنید")
    .max(50, "کمتر از 50 کارکتر وارد کنید")
    .required("لطفا نام و نام خانوادگی مدیریت شرکت را وارد کنید"),
  email: Yup.string()
    .email("لطفا ایمیل را به درستی وارد کنید")
    .required("لطفا ایمیل را به درستی وارد کنید"),
  phoneNumber: Yup.string("لطفا از کارکتر استفاده کنید").max(
    15,
    "حداکثر 15 کارکتر"
  ),
  comment: Yup.string("لطفا از کارکتر استفاده کنید")
    .max(1500, "حداکثر 1500 کارکتر وارد کنید")
    .required("لطفا توضیحات خود را وارد کنید"),
});

export { ContactUs };
