import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepButtons from "../components/global/StepButtons";

const Body = ({ step, setStep, colors, setBody }) => {
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
      bodyCondition: "",
      bodyColor: "",
      gearType: "",
      frontChassisCondition: "",
      seatCondition: "",
      backChassisCondition: "",
      gastype: "",
      insurance: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setBody(values);
      setStep(4);
    },
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

          <form onSubmit={formik.handleSubmit} className="px-4 pt-6">
            {/* Body Condition */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">وضعیت بدنه</span>
              </div>
              <select
                id="bodyCondition"
                className="input focus:outline-secondary border-none w-full  bg-base-200 font-vazir"
                {...formik.getFieldProps("bodyCondition")}
              >
                <option value="" label="انتخاب وضعیت بدنه" />

                <option value="بدون رنگ">بدون رنگ</option>

                <option value="صافکاری بدون رنگ">صافکاری بدون رنگ</option>

                <option value="یه لکه رنگ">یه لکه رنگ</option>

                <option value="دو لکه رنگ">دو لکه رنگ</option>

                <option value="سه لکه رنگ">سه لکه رنگ</option>

                <option value="چند لکه رنگ">چند لکه رنگ</option>

                <option value="کامل رنگ">کامل رنگ</option>

                <option value="دور رنگ">دور رنگ</option>

                <option value="تصادفی">تصادفی</option>

                <option value="اتاق تعویض">اتاق تعویض</option>

                <option value="سوخته">سوخته</option>

                <option value="اوراقی">اوراقی</option>
              </select>
              {formik.touched.bodyCondition && formik.errors.bodyCondition ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.bodyCondition}
                </div>
              ) : null}
            </label>

            {/* Body Color */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">رنگ بدنه</span>
              </div>
              <select
                id="bodyColor"
                className="input focus:outline-secondary border-none w-full  bg-base-200 font-vazir"
                {...formik.getFieldProps("bodyColor")}
              >
                <option value="" label="انتخاب رنگ بدنه" />
                {colors.map((item, index) => (
                  <option key={index} value={item.name} label={item.name} />
                ))}
              </select>
              {formik.touched.bodyColor && formik.errors.bodyColor ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.bodyColor}
                </div>
              ) : null}
            </label>

            {/* Gear Type */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">نوع دنده</span>
              </div>
              <select
                id="gearType"
                className="input focus:outline-secondary border-none w-full  bg-base-200 font-vazir"
                {...formik.getFieldProps("gearType")}
              >
                <option value="" label="انتخاب نوع دنده" />
                <option value="دستی" label="دستی" />
                <option value="اتوماتیک" label="اتوماتیک" />
              </select>
              {formik.touched.gearType && formik.errors.gearType ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.gearType}
                </div>
              ) : null}
            </label>

            {/* Chassis Condition */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text"> وضعیت شاسی جلو</span>
              </div>
              <select
                id="frontChassisCondition"
                className="input focus:outline-secondary border-none w-full  bg-base-200 font-vazir"
                {...formik.getFieldProps("frontChassisCondition")}
              >
                <option value="" label="انتخاب وضعیت شاسی" />
                <option value="ضربه خورده">ضربه خورده</option>

                <option value="سالم">سالم</option>

                <option value="رنگ شده">رنگ شده</option>
              </select>
              {formik.touched.frontChassisCondition &&
              formik.errors.frontChassisCondition ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.frontChassisCondition}
                </div>
              ) : null}
            </label>
            {/* Chassis Condition */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">وضعیت شاسی عقب</span>
              </div>
              <select
                id="backChassisCondition"
                className="input focus:outline-secondary border-none w-full  bg-base-200 font-vazir"
                {...formik.getFieldProps("backChassisCondition")}
              >
                <option value="" label="انتخاب وضعیت شاسی" />
                <option value="ضربه خورده">ضربه خورده</option>
                <option value="سالم">سالم</option>
                <option value="رنگ شده">رنگ شده</option>
              </select>
              {formik.touched.backChassisCondition &&
              formik.errors.backChassisCondition ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.backChassisCondition}
                </div>
              ) : null}
            </label>
            {/* Seat Condition */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">وضعیت صندلی‌ها</span>
              </div>
              <select
                id="seatCondition"
                className="input focus:outline-secondary border-none w-full  bg-base-200 font-vazir"
                {...formik.getFieldProps("seatCondition")}
              >
                <option value="" label="انتخاب وضعیت صندلی‌ها" />
                <option value="leather">روکش چرم</option>
                <option value="none">بدون روکش</option>
                <option value="fabric">روکش پارچه ای</option>
              </select>
              {formik.touched.seatCondition && formik.errors.seatCondition ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.seatCondition}
                </div>
              ) : null}
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">سوخت</span>
              </div>
              <select
                id="gastype"
                className="input focus:outline-secondary border-none w-full  bg-base-200 font-vazir"
                {...formik.getFieldProps("gastype")}
              >
                <option value="" label="انتخاب نوع سوخت" />
                <option value="بنزین">بنزین</option>
                <option value="گازوئیل">گازوئیل</option>
                <option value="هیبریدی">هیبریدی</option>
                <option value="برقی">برقی</option>
                <option value="دوگانه کارخانه">دوگانه کارخانه</option>
                <option value="دوگانه دستی">دوگانه دستی</option>
              </select>
              {formik.touched.gastype && formik.errors.gastype ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.gastype}
                </div>
              ) : null}
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">اعتبار بیمه</span>
              </div>
              <select
                id="insurance"
                className="input focus:outline-secondary border-none w-full  bg-base-200 font-vazir"
                {...formik.getFieldProps("insurance")}
              >
                <option
                  value=""
                  label="مقدار اعتبار بیمه خودرو را انتخاب کنید"
                />
                <option value="0" label="بدون اعتبار" />
                <option value=" 1 " label=" 1 ماه" />
                <option value="1" label="1 ماه " />
                <option value="2" label="2 ماه " />
                <option value="3" label="3 ماه " />
                <option value="4" label="4 ماه " />
                <option value="5" label="5 ماه " />
                <option value="6" label="6 ماه " />
                <option value="7" label="7 ماه " />
                <option value="8" label="8 ماه " />
                <option value="9" label="9 ماه " />
                <option value="10" label="10 ماه " />
                <option value="11" label="11 ماه " />
                <option value="12" label="12 ماه " />
              </select>
              {formik.touched.insurance && formik.errors.insurance ? (
                <div className="text-red-500 text-sm pt-1">
                  {formik.errors.insurance}
                </div>
              ) : null}
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
