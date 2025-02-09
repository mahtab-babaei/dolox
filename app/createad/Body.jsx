import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepButtons from "../components/global/StepButtons";
import ErrorMessage from "../components/global/ErrorMessage";

const Body = ({
  step,
  setStep,
  colors,
  setBody,
  category,
  bodyCondition,
  bodyColor,
  gearType,
  frontChassisCondition,
  backChassisCondition,
  gastype,
  insurance,
  seatCondition,
}) => {
  const validationSchema = Yup.object({
    bodyCondition: Yup.string().required("وضعیت بدنه را انتخاب کنید"),
    bodyColor: Yup.string().required("رنگ بدنه را انتخاب کنید"),
    gearType: Yup.string().required("نوع دنده را انتخاب کنید"),
    frontChassisCondition: Yup.string().required(
      "وضعیت شاسی جلو را انتخاب کنید"
    ),
    backChassisCondition: Yup.string().required(
      "وضعیت شاسی عقب را انتخاب کنید"
    ),
    gastype: Yup.string().required("نوع سوخت  را انتخاب کنید"),
    seatCondition: Yup.string().required("وضعیت صندلی‌ها را انتخاب کنید"),
    insurance: Yup.string().required("اعتبار بیمه را انتخاب کنید"),
  });

  const formik = useFormik({
    initialValues: {
      bodyCondition: bodyCondition || "",
      bodyColor: bodyColor || "",
      gearType: gearType || "",
      frontChassisCondition: frontChassisCondition || "",
      seatCondition: seatCondition || "",
      backChassisCondition: backChassisCondition || "",
      gastype: gastype || "",
      insurance: insurance || "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setBody(values);
      setStep(4);
    },
    enableReinitialize: true,
  });
  if (step !== 3) return null;
  // console.log(colors)
  return (
    <div>
      <div className="px-2 md:px-0 font-vazir">
        <div dir="rtl" className="md:max-w-lg mx-auto pt-8">
          <StepButtons
            onSubmit={formik.handleSubmit}
            step={step}
            setStep={setStep}
          />

          <form onSubmit={formik.handleSubmit} className="px-4 pt-6 text-base">
            {/* Body Condition */}
            {category !== "موتورسیکلت" && (
              <label className="form-control w-full pb-4">
                <select
                  id="bodyCondition"
                  className={`select text-base  border-none w-full bg-neutral font-vazir ${
                    formik.values.bodyCondition === ""
                      ? "text-base-content"
                      : "text-black"
                  }`}
                  {...formik.getFieldProps("bodyCondition")}
                >
                  <option
                    className="text-black"
                    value=""
                    label="انتخاب وضعیت بدنه"
                  />

                  <option className="text-black" value="بدون رنگ">
                    بدون رنگ
                  </option>

                  <option className="text-black" value="صافکاری بدون رنگ">
                    صافکاری بدون رنگ
                  </option>

                  <option className="text-black" value="یه لکه رنگ">
                    یه لکه رنگ
                  </option>

                  <option className="text-black" value="دو لکه رنگ">
                    دو لکه رنگ
                  </option>

                  <option className="text-black" value="سه لکه رنگ">
                    سه لکه رنگ
                  </option>

                  <option className="text-black" value="چند لکه رنگ">
                    چند لکه رنگ
                  </option>

                  <option className="text-black" value="کامل رنگ">
                    کامل رنگ
                  </option>

                  <option className="text-black" value="دور رنگ">
                    دور رنگ
                  </option>

                  <option className="text-black" value="تصادفی">
                    تصادفی
                  </option>

                  <option className="text-black" value="اتاق تعویض">
                    اتاق تعویض
                  </option>

                  <option className="text-black" value="سوخته">
                    سوخته
                  </option>

                  <option className="text-black" value="اوراقی">
                    اوراقی
                  </option>
                </select>
                {formik.touched.bodyCondition && formik.errors.bodyCondition ? (
                  <ErrorMessage>{formik.errors.bodyCondition}</ErrorMessage>
                ) : null}
              </label>
            )}
            {/* Body Color */}
            <label className="form-control w-full pb-4">
              <select
                id="bodyColor"
                className={`select text-base  border-none w-full  bg-neutral font-vazir ${
                  formik.values.bodyColor === ""
                    ? "text-base-content"
                    : "text-black"
                }`}
                {...formik.getFieldProps("bodyColor")}
              >
                <option
                  className="text-black"
                  value=""
                  label="انتخاب رنگ بدنه"
                />
                {colors.map((item, index) => (
                  <option
                    className="text-black"
                    key={index}
                    value={item.name}
                    label={item.name}
                  />
                ))}
              </select>
              {formik.touched.bodyColor && formik.errors.bodyColor ? (
                <ErrorMessage>{formik.errors.bodyColor}</ErrorMessage>
              ) : null}
            </label>
            {/* Gear Type */}
            <label className="form-control w-full pb-4">
              <select
                id="gearType"
                className={`select text-base  border-none w-full  bg-neutral font-vazir ${
                  formik.values.gearType === ""
                    ? "text-base-content"
                    : "text-black"
                }`}
                {...formik.getFieldProps("gearType")}
              >
                <option
                  className="text-black"
                  value=""
                  label="انتخاب نوع دنده"
                />
                <option className="text-black" value="دستی" label="دستی" />
                <option
                  className="text-black"
                  value="اتوماتیک"
                  label="اتوماتیک"
                />
              </select>
              {formik.touched.gearType && formik.errors.gearType ? (
                <ErrorMessage>{formik.errors.gearType}</ErrorMessage>
              ) : null}
            </label>
            {/* Chassis Condition */}
            {category !== "موتورسیکلت" && (
              <>
                <label className="form-control w-full pb-4">
                  <select
                    id="frontChassisCondition"
                    className={`select text-base  border-none w-full  bg-neutral font-vazir ${
                      formik.values.frontChassisCondition === ""
                        ? "text-base-content"
                        : "text-black"
                    }`}
                    {...formik.getFieldProps("frontChassisCondition")}
                  >
                    <option
                      className="text-black"
                      value=""
                      label="انتخاب وضعیت شاسی جلو"
                    />
                    <option className="text-black" value="ضربه خورده">
                      ضربه خورده
                    </option>

                    <option className="text-black" value="سالم">
                      سالم
                    </option>

                    <option className="text-black" value="رنگ شده">
                      رنگ شده
                    </option>
                  </select>
                  {formik.touched.frontChassisCondition &&
                  formik.errors.frontChassisCondition ? (
                    <ErrorMessage>
                      {formik.errors.frontChassisCondition}
                    </ErrorMessage>
                  ) : null}
                </label>

                <label className="form-control w-full pb-4">
                  <select
                    id="backChassisCondition"
                    className={`select text-base  border-none w-full  bg-neutral font-vazir ${
                      formik.values.backChassisCondition === ""
                        ? "text-base-content"
                        : "text-black"
                    }`}
                    {...formik.getFieldProps("backChassisCondition")}
                  >
                    <option
                      className="text-black"
                      value=""
                      label="انتخاب وضعیت شاسی عقب"
                    />
                    <option className="text-black" value="ضربه خورده">
                      ضربه خورده
                    </option>
                    <option className="text-black" value="سالم">
                      سالم
                    </option>
                    <option className="text-black" value="رنگ شده">
                      رنگ شده
                    </option>
                  </select>
                  {formik.touched.backChassisCondition &&
                  formik.errors.backChassisCondition ? (
                    <ErrorMessage>
                      {formik.errors.backChassisCondition}
                    </ErrorMessage>
                  ) : null}
                </label>
              </>
            )}
            {/* Seat Condition */}
            {category === "سواری" && (
              <label className="form-control w-full pb-4">
                <select
                  id="seatCondition"
                  className={`select text-base  border-none w-full  bg-neutral font-vazir ${
                    formik.values.seatCondition === ""
                      ? "text-base-content"
                      : "text-black"
                  }`}
                  {...formik.getFieldProps("seatCondition")}
                >
                  <option
                    className="text-black"
                    value=""
                    label="انتخاب وضعیت صندلی‌ها"
                  />
                  <option className="text-black" value="leather">
                    روکش چرم
                  </option>
                  <option className="text-black" value="none">
                    بدون روکش
                  </option>
                  <option className="text-black" value="fabric">
                    روکش پارچه ای
                  </option>
                </select>
                {formik.touched.seatCondition && formik.errors.seatCondition ? (
                  <ErrorMessage>{formik.errors.seatCondition}</ErrorMessage>
                ) : null}
              </label>
            )}
            {/* gas type */}
            {category !== "ماشین‌آلات سنگین" && (
              <label className="form-control w-full pb-4">
                <select
                  id="gastype"
                  className={`select text-base  border-none w-full  bg-neutral font-vazir ${
                    formik.values.gastype === ""
                      ? "text-base-content"
                      : "text-black"
                  }`}
                  {...formik.getFieldProps("gastype")}
                >
                  <option
                    className="text-black"
                    value=""
                    label="انتخاب نوع سوخت"
                  />
                  <option className="text-black" value="بنزین">
                    بنزین
                  </option>
                  <option className="text-black" value="گازوئیل">
                    گازوئیل
                  </option>
                  <option className="text-black" value="هیبریدی">
                    هیبریدی
                  </option>
                  <option className="text-black" value="برقی">
                    برقی
                  </option>
                  <option className="text-black" value="دوگانه کارخانه">
                    دوگانه کارخانه
                  </option>
                  <option className="text-black" value="دوگانه دستی">
                    دوگانه دستی
                  </option>
                </select>
                {formik.touched.gastype && formik.errors.gastype ? (
                  <ErrorMessage>{formik.errors.gastype}</ErrorMessage>
                ) : null}
              </label>
            )}
            {/* Insurance Condition */}
            {category !== "موتورسیکلت" && (
              <label className="form-control w-full">
                <select
                  id="insurance"
                  className={`select text-base  border-none w-full  bg-neutral font-vazir ${
                    formik.values.insurance === ""
                      ? "text-base-content"
                      : "text-black"
                  }`}
                  {...formik.getFieldProps("insurance")}
                >
                  <option
                    value=""
                    label="مقدار اعتبار بیمه خودرو را انتخاب کنید"
                    className="text-black"
                  />
                  <option
                    className="text-black"
                    value="0"
                    label="بدون اعتبار"
                  />
                  <option className="text-black" value=" 1 " label=" 1 ماه" />
                  <option className="text-black" value="1" label="1 ماه " />
                  <option className="text-black" value="2" label="2 ماه " />
                  <option className="text-black" value="3" label="3 ماه " />
                  <option className="text-black" value="4" label="4 ماه " />
                  <option className="text-black" value="5" label="5 ماه " />
                  <option className="text-black" value="6" label="6 ماه " />
                  <option className="text-black" value="7" label="7 ماه " />
                  <option className="text-black" value="8" label="8 ماه " />
                  <option className="text-black" value="9" label="9 ماه " />
                  <option className="text-black" value="10" label="10 ماه " />
                  <option className="text-black" value="11" label="11 ماه " />
                  <option className="text-black" value="12" label="12 ماه " />
                </select>
                {formik.touched.insurance && formik.errors.insurance ? (
                  <ErrorMessage>{formik.errors.insurance}</ErrorMessage>
                ) : null}
              </label>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
