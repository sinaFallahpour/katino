import * as Yup from "yup"

const ShebaValidate = Yup.object({
  shebaNumber: Yup.string("لطفا از کارکتر استفاده کنید")
    .min(24, "لطفا 24 عدد وارد کنید")
    .max(24, "لطفا 24 عدد وارد کنید")
    .required("لطفا شماره شبا را وارد کنید"),
})

export { ShebaValidate }
