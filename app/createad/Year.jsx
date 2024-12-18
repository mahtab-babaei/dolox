import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import StepButtons from "../components/global/StepButtons";

const Year = ({ step, setStep, setYear }) => {
  // Validation schema
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
      produceYear: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // If the form is valid
      // toast.success('سال با موفقیت تایید شد!')
      setYear(values.produceYear);
      setStep(3);
    },
    validateOnChange: true,
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
          <label className="mt-8 border-none input input-bordered flex items-center gap-2 md:max-w-screen-sm mx-auto placeholder-base-content bg-base-300 text-black">
            <input
              dir="rtl"
              type="text"
              className="grow"
              placeholder="سال تولید"
              maxLength="4"
              {...formik.getFieldProps("produceYear")}
            />
          </label>

          {formik.touched.produceYear && formik.errors.produceYear ? (
            <div className="text-red-500 mt-2">{formik.errors.produceYear}</div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Year;
