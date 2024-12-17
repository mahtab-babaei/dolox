import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Phone = ({step, setStep, setPhone}) => {
  // validation schema
  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("لطفا شماره تلفن را وارد کنید"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setPhone(values.phoneNumber);
      setStep(1);
    },
    validateOnChange: true,
  });

  if (step !== 0) return null;

  return (
    <div className="px-2 md:px-0 font-vazir">
      <div dir="rtl" className="pt-8 md:max-w-lg mx-auto">
        <div dir="ltr" className="justify-between w-full flex items-center">
          <button
            className="btn btn-sm bg-secondary text-white border-none"
            onClick={formik.handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
            >
              <path
                d="M9.242 15.9735C8.84789 15.9746 8.45747 15.8975 8.09339 15.7466C7.7293 15.5957 7.39878 15.374 7.121 15.0945L0 7.97345L7.121 0.852453C8.254 -0.281547 10.23 -0.281547 11.363 0.852453C11.929 1.41645 12.242 2.16945 12.242 2.97145C12.242 3.71745 11.972 4.42245 11.478 4.97345H16.314C17.968 4.97345 19.314 6.31945 19.314 7.97345C19.314 9.62745 17.968 10.9735 16.314 10.9735H11.478C11.971 11.5225 12.242 12.2255 12.242 12.9715C12.2436 13.3661 12.1667 13.7571 12.0158 14.1217C11.8649 14.4864 11.643 14.8173 11.363 15.0955C11.085 15.3746 10.7544 15.5959 10.3903 15.7466C10.0263 15.8973 9.636 15.9744 9.242 15.9735ZM2.828 7.97345L8.535 13.6805C8.72537 13.8625 8.97861 13.9641 9.242 13.9641C9.50539 13.9641 9.75863 13.8625 9.949 13.6805C10.138 13.4915 10.242 13.2395 10.242 12.9725C10.242 12.7055 10.138 12.4555 9.951 12.2675L6.656 8.97345H16.314C16.5715 8.96193 16.8146 8.85155 16.9927 8.66527C17.1709 8.47899 17.2703 8.23119 17.2703 7.97345C17.2703 7.71572 17.1709 7.46791 16.9927 7.28163C16.8146 7.09536 16.5715 6.98497 16.314 6.97345H6.656L9.949 3.68045C10.0422 3.58795 10.1162 3.47793 10.1668 3.35671C10.2173 3.2355 10.2434 3.10549 10.2434 2.97416C10.2435 2.84283 10.2177 2.71279 10.1673 2.5915C10.1169 2.47022 10.0431 2.36009 9.95 2.26745C9.75971 2.08499 9.50633 1.98304 9.2427 1.98285C8.97907 1.98267 8.72554 2.08426 8.535 2.26645L2.828 7.97345Z"
                fill="white"
              />
            </svg>
            <span className="font-vazir">ادامه</span>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="px-4">
          <label className="mt-8 border-none input input-bordered flex items-center gap-2 md:max-w-screen-sm mx-auto placeholder-base-content bg-base-300 text-black">
            <input
              dir="rtl"
              type="text"
              className="grow"
              placeholder="شماره تماس دارنده اتوگالری"
              maxLength="11"
              {...formik.getFieldProps("phoneNumber")}
            />
          </label>

          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-red-500 mt-2">{formik.errors.phoneNumber}</div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Phone;
