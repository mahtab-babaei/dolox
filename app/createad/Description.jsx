import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepButtons from "../components/global/StepButtons";
import ErrorMessage from "../components/global/ErrorMessage";

const Description = ({
  step,
  setStep,
  setKilometer,
  setDescription,
  kilometer,
  description,
}) => {
  const formik = useFormik({
    initialValues: {
      description: description || "",
      status: kilometer && kilometer !== 0 ? "کارکرده" : "صفر",
      kilometer: kilometer || "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("توضیحات الزامی است"),
      status: Yup.string().required("لطفا یک گزینه را انتخاب کنید"),
      kilometer: Yup.number().min(0, "کیلومتر نمی‌تواند منفی باشد").nullable(),
    }),
    onSubmit: (values) => {
      setDescription(values.description);
      setKilometer(values.status === "صفر" ? 0 : values.kilometer);
      console.log(
        values.description,
        values.status === "صفر" ? 0 : values.kilometer
      );
      setStep(5);
    },
    enableReinitialize: true,
  });

  if (step !== 4) return null;

  return (
    <div>
      <div className="px-2 md:px-0 font-vazir">
        <div dir="rtl" className="pb-2 pt-8 md:max-w-lg mx-auto px-4">
          <StepButtons
            onSubmit={formik.handleSubmit}
            step={step}
            setStep={setStep}
          />

          <label className="form-control pt-6">
            <div className="label">
              <span className="label-text text-base-content">
                در توضیحات به نکات چشم گیر اشاره کنید
              </span>
            </div>
            <textarea
              className="textarea text-base h-36 min-h-min flex items-center gap-2 mx-auto placeholder:text-base-content bg-neutral text-black w-full"
              placeholder="توضیحات"
              {...formik.getFieldProps("description")}
            ></textarea>
            {formik.touched.description && formik.errors.description ? (
              <ErrorMessage>{formik.errors.description}</ErrorMessage>
            ) : null}
          </label>

          <div className="form-control w-full mt-4">
            <div className="flex mb-4">
              <label className="flex items-center ml-4 text-black">
                <input
                  type="radio"
                  name="status"
                  value="صفر"
                  className="radio"
                  onChange={formik.handleChange}
                  checked={formik.values.status === "صفر"}
                />
                <span className="mr-2">صفر</span>
              </label>
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  name="status"
                  value="کارکرده"
                  className="radio"
                  onChange={formik.handleChange}
                  checked={formik.values.status === "کارکرده"}
                />
                <span className="mr-2">کارکرده</span>
              </label>
            </div>

            {formik.values.status === "کارکرده" && (
              <label className="form-control w-full relative mb-4">
                <input
                  id="kilometer"
                  dir="ltr"
                  type="number"
                  placeholder="200000"
                  className="input text-black focus:outline-secondary border-none w-full bg-base-200 font-vazir"
                  {...formik.getFieldProps("kilometer")}
                  onBlur={(e) => {
                    const value = e.target.value;
                    formik.setFieldValue(
                      "kilometer",
                      value ? parseInt(value, 10) : ""
                    ); // Removes leading zeros
                  }}
                />
                {formik.touched.kilometer && formik.errors.kilometer ? (
                  <ErrorMessage>{formik.errors.kilometer}</ErrorMessage>
                ) : null}
                <span className="absolute top-3 right-6">کیلومتر</span>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
