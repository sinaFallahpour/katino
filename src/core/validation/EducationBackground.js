import * as Yup from "yup";

const EducationBackground = Yup.object({
  fieldOfStudy: Yup.string("لطفا از کارکتر استفاده کنید")
    .max(50, "حداکثر 50 کارکتر وارد کنید")
    .required("لطفا رشته تحصیلی را وارد کنید"),
  universityName: Yup.string("لطفا از کارکتر استفاده کنید")
    .max(50, "حداکثر 50 کارکتر وارد کنید")
    .required("لطفا نام دانشگاه را وارد کنید"),
  degreeOfEducation: Yup.string("لطفا از کارکتر استفاده کنید").max(
    50,
    "حداکثر 50 کارکتر وارد کنید"
  ),
  startDate: Yup.string("لطفا از کارکتر استفاده کنید").max(
    300,
    "حداکثر 50 کارکتر وارد کنید"
  ),
  endDate: Yup.string("لطفا از کارکتر استفاده کنید").max(
    300,
    "حداکثر 50 کارکتر وارد کنید"
  ),
  description: Yup.string("لطفا از کارکتر استفاده کنید")
    .max(50, "حداکثر 500 کارکتر وارد کنید")
    .required("لطفا توضیحات را وارد کنید"),
});

export { EducationBackground };
