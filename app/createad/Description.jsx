import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepButtons from "../components/global/StepButtons";

const Description = ({
  step,
  setStep,
  setKilometer,
  setDescription,
  category,
  setWheelnumber,
  setWeight,
  setMaxweight,
}) => {
  const formik = useFormik({
    initialValues: {
      description: "",
      status: "صفر", // Default selection
      kilometer: "",
      wheelnumber: "",
      weight: "",
      maxweight: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("توضیحات الزامی است"),
      status: Yup.string().required("لطفا یک گزینه را انتخاب کنید"),
      kilometer: Yup.number().min(0, "کیلومتر نمی‌تواند منفی باشد").nullable(),
    }),
    onSubmit: (values) => {
      setDescription(values.description);
      setKilometer(values.status === "صفر" ? 0 : values.kilometer);
      setWheelnumber(values.wheelnumber);
      setWeight(values.weight);
      setMaxweight(values.weight);
      console.log(
        values.description,
        values.status === "صفر" ? 0 : values.kilometer
      );
      setStep(5);
    },
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
              <span className="label-text">
                در توضیحات به نکات چشم گیر اشاره کنید
              </span>
            </div>
            <textarea
              className="textarea h-36 min-h-min flex items-center gap-2 mx-auto placeholder-base-content bg-base-200 text-black w-full"
              placeholder="توضیحات"
              {...formik.getFieldProps("description")}
            ></textarea>
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            ) : null}
          </label>

          <div className="form-control w-full mt-4">
            <div className="flex">
              <label className="flex items-center ml-4">
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
              <label className="flex items-center">
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
              <label className="form-control w-full relative">
                <div className="label">
                  <span className="label-text">کارکرد</span>
                </div>
                <input
                  id="kilometer"
                  dir="ltr"
                  type="number"
                  placeholder="200000"
                  className="input focus:outline-secondary border-none w-full bg-base-200 font-vazir"
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
                  <div className="text-red-500 text-sm">
                    {formik.errors.kilometer}
                  </div>
                ) : null}
                <span className="absolute top-12 right-6">کیلومتر</span>
              </label>
            )}
            {category === "ماشین‌آلات سنگین" && (
              <div>
                <label className="form-control w-full relative">
                  <div className="label">
                    <span className="label-text">تعداد چرخ</span>
                  </div>
                  <input
                    id="wheelnumber"
                    dir="ltr"
                    type="number"
                    placeholder="200000"
                    className="input focus:outline-secondary border-none w-full bg-base-200 font-vazir"
                    {...formik.getFieldProps("wheelnumber")}
                    onBlur={(e) => {
                      const value = e.target.value;
                      formik.setFieldValue(
                        "wheelnumber",
                        value ? parseInt(value, 10) : ""
                      ); // Removes leading zeros
                    }}
                  />
                  {formik.touched.wheelnumber && formik.errors.wheelnumber ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.wheelnumber}
                    </div>
                  ) : null}
                  {/* <span className='absolute top-12 right-6'>تعداد چرخ</span> */}
                </label>
                <label className="form-control w-full relative">
                  <div className="label">
                    <span className="label-text">وزن خودرو</span>
                  </div>
                  <input
                    id="weight"
                    dir="ltr"
                    type="number"
                    placeholder="200000"
                    className="input focus:outline-secondary border-none w-full bg-base-200 font-vazir"
                    {...formik.getFieldProps("weight")}
                    onBlur={(e) => {
                      const value = e.target.value;
                      formik.setFieldValue(
                        "weight",
                        value ? parseInt(value, 10) : ""
                      ); // Removes leading zeros
                    }}
                  />
                  {formik.touched.weight && formik.errors.weight ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.weight}
                    </div>
                  ) : null}
                  <span className="absolute top-12 right-6">تن</span>
                </label>
                <label className="form-control w-full relative">
                  <div className="label">
                    <span className="label-text">حداکثر وزن مجاز </span>
                  </div>
                  <input
                    id="maxweight"
                    dir="ltr"
                    type="number"
                    placeholder="200000"
                    className="input focus:outline-secondary border-none w-full bg-base-200 font-vazir"
                    {...formik.getFieldProps("maxweight")}
                    onBlur={(e) => {
                      const value = e.target.value;
                      formik.setFieldValue(
                        "maxweight",
                        value ? parseInt(value, 10) : ""
                      ); // Removes leading zeros
                    }}
                  />
                  {formik.touched.maxweight && formik.errors.maxweight ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.maxweight}
                    </div>
                  ) : null}
                  <span className="absolute top-12 right-6">تن</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
