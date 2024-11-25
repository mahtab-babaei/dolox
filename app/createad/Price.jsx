import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

// Yup schema for price validation
const validationSchema = Yup.object().shape({
  price: Yup.number()
    .nullable()
    .test(
      "is-positive",
      "قیمت باید بیشتر از ۰ باشد",
      (value) => value === null || value > 0
    ),
});

const Price = ({ step, setStep, setPrice, setInstallments, setRentorsale }) => {
  const [category, setCategory] = useState("نقدی");
  const [isRent, setIsRent] = useState(false); // For rent or sale option

  const formik = useFormik({
    initialValues: {
      price: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (category === "توافقی") {
        setPrice(null); // Set price to null if "توافقی" is selected
      } else {
        setPrice(values.price); // Set the price if نقدی or اقساط is selected
      }
      setRentorsale(isRent ? "sale" : "rent"); // Set if rent or sale is chosen
      setStep(6); // Proceed to next step
    },
  });

  useEffect(() => {
    setInstallments(category === "اقساط");
  }, [category]);

  if (step !== 5) return null;
  return (
    <div>
      <div className="px-2 md:px-0 font-vazir">
        <div dir="rtl" className="py-2 md:max-w-lg mx-auto px-4">
          <div dir="ltr" className="justify-between w-full flex items-center ">
            <button
              type="submit"
              className="btn btn-sm bg-secondary text-white border-none"
              onClick={formik.handleSubmit} // Use Formik submit handler
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
              className="btn-sm text-secondary bg-transparent shadow-none border-none"
              onClick={() => setStep(step - 1)}
            >
              <span className="font-vazir font-bold">قبلی</span>
            </button>
          </div>

          {/* Price category selection */}
          <div className="flex bg-gradient-red mx-auto justify-between max-w-md w-full text-white rounded-[50px] px-7 py-1 mt-8 ">
            <div
              className={`font-vazir-bold w-full text-center py-2 rounded-full cursor-pointer ${
                category === "نقدی" ? "text-black bg-white " : ""
              }`}
              onClick={() => setCategory("نقدی")}
            >
              نقدی
            </div>
            <div
              className={`font-vazir-bold w-full text-center py-2 rounded-full cursor-pointer ${
                category === "اقساط" ? "text-black bg-white " : ""
              }`}
              onClick={() => setCategory("اقساط")}
            >
              اقساط
            </div>
            <div
              className={`font-vazir-bold w-full text-center py-2 rounded-full cursor-pointer ${
                category === "توافقی" ? "text-black bg-white " : ""
              }`}
              onClick={() => {
                setCategory("توافقی");
                formik.setFieldValue("price", null); // Set price to null for توافقی
              }}
            >
              توافقی
            </div>
          </div>

          {/* Price input field */}
          {category !== "توافقی" && (
            <div className="form-control w-full mt-4">
              <label className="form-control w-full relative">
                <div className="label">
                  <span className="label-text">قیمت</span>
                </div>
                <input
                  id="price"
                  dir="ltr"
                  type="number"
                  placeholder="200000"
                  className="input focus:outline-secondary border-none w-full bg-base-200 font-vazir"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="absolute top-12 right-6">تومان</span>
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.price}
                  </div>
                ) : null}
              </label>
            </div>
          )}

          {/* Rent option */}
          <div className="flex gap-2 mt-2">
            <input
              type="checkbox"
              checked={isRent}
              onChange={() => setIsRent(!isRent)}
              className="checkbox border-orange-400 [--chkbg:theme(colors.secondary)] [--chkfg:white]"
            />
            <p>خودرو را اجاره هم می دهم</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
