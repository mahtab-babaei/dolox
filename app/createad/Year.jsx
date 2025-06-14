import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepButtons from "../components/global/StepButtons";
import ErrorMessage from "../components/global/ErrorMessage";

const Year = ({ step, setStep, setYear, year }) => {
  const currentYear = new Date().getFullYear();

  // Validation schema
  const validationSchema = Yup.object().shape({
    produceYear: Yup.number()
      .typeError("سال باید شامل عدد باشد")
      .integer("سال باید عدد صحیح باشد")
      .min(1200, "سال نمی‌تواند قبل از 1200 باشد")
      .max(currentYear, `سال نمی‌تواند بیشتر از ${currentYear} باشد`)
      .required("لطفا سال تولید را وارد کنید"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      produceYear: year || "", // مقدار پیش‌فرض را مقدار year قرار بده
    },
    validationSchema,
    onSubmit: (values) => {
      setYear(values.produceYear);
      setStep(3);
    },
    validateOnChange: true,
    enableReinitialize: true,
  });

  if (step !== 2) return null;

  return (
    <div className="px-2 md:px-0 font-vazir">
      <div dir="rtl" className="pt-8 md:max-w-lg mx-auto">
        <StepButtons
          onSubmit={formik.handleSubmit}
          step={step}
          setStep={setStep}
        />

        <form onSubmit={formik.handleSubmit} className="px-4">
          <label className="mt-8 mb-1 border-none input input-bordered flex items-center gap-2 md:max-w-screen-sm mx-auto bg-neutral text-black">
            <input
              dir="rtl"
              type="text"
              className="grow placeholder:text-base-content"
              placeholder="سال تولید"
              maxLength="4"
              {...formik.getFieldProps("produceYear")} // مقدار را از Formik بگیر
            />
          </label>

          {formik.touched.produceYear && formik.errors.produceYear ? (
            <ErrorMessage>{formik.errors.produceYear}</ErrorMessage>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Year;
