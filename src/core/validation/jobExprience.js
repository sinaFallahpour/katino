import * as Yup from "yup";

const JobExprience = Yup.object({
  workTitle: Yup.string("لطفا از کارکتر استفاده کنید")
    .max(50, "حداکثر 50 کارکتر وارد کنید")
    .required("لطفا عنوان آگهی را وارد کنید"),
  companyName: Yup.string("لطفا از کارکتر استفاده کنید")
    .max(50, "حداکثر 50 کارکتر وارد کنید")
    .required("لطفا نام شرکت را وارد کنید"),
  startDate: Yup.string("لطفا از کارکتر استفاده کنید").max(
    300,
    "حداکثر 50 کارکتر وارد کنید"
  ),
  endDate: Yup.string("لطفا از کارکتر استفاده کنید").max(
    300,
    "حداکثر 50 کارکتر وارد کنید"
  ),
  description: Yup.string("لطفا از کارکتر استفاده کنید").max(
    50,
    "حداکثر 500 کارکتر وارد کنید"
  ),
});

export { JobExprience };
