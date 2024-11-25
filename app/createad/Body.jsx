import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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
        <div dir="rtl" className="py-2 md:max-w-lg mx-auto">
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

            <button
              onClick={() => setStep(2)}
              className="btn-sm text-secondary bg-transparent shadow-none border-none"
            >
              <span className="font-vazir font-bold">قبلی</span>
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="px-4">
            {/* Body Condition */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">وضعیت بدنه</span>
              </div>
              <select
                id="bodyCondition"
                className="input focus:outline-secondary border-none w-full  bg-base-200 font-vazir"
                {...formik.getFieldProps("bodyCondition")}
              >
                <option value="" label="انتخاب رنگ بدنه" />

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
