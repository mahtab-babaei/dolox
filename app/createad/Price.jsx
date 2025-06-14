import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import StepButtons from "../components/global/StepButtons";
import ErrorMessage from "../components/global/ErrorMessage";

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

const Price = ({
  isEdit,
  step,
  setStep,
  setPrice,
  setInstallments,
  setRentorsale,
  price,
  rentorsale,
  installments,
}) => {
  const [category, setCategory] = useState("نقدی");
  const [isRent, setIsRent] = useState(false);

  // Initial value in edit page
  useEffect(() => {
    if (isEdit) {
      if (installments) {
        setCategory("اقساط");
      } else if (!price) {
        setCategory("توافقی");
      } else {
        setCategory("نقدی");
      }
    }
    setIsRent(rentorsale === "rent");
  }, []);

  const formik = useFormik({
    initialValues: {
      price: price || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const finalPrice =
        category === "توافقی"
          ? null
          : values.price === ""
          ? null
          : values.price;

      setPrice(finalPrice);
      setRentorsale(isRent ? "rent" : "sale");
      setStep(6);
    },

    enableReinitialize: true,
  });

  useEffect(() => {
    setInstallments(category === "اقساط");
  }, [category]);

  if (step !== 5) return null;

  return (
    <div>
      <div className="px-2 md:px-0 font-vazir">
        <div dir="rtl" className="pb-2 pt-8 md:max-w-lg mx-auto px-4">
          <StepButtons
            onSubmit={formik.handleSubmit}
            step={step}
            setStep={setStep}
          />

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
                  <span className="label-text text-black">قیمت</span>
                </div>
                <input
                  id="price"
                  dir="ltr"
                  type="number"
                  placeholder="200000"
                  className="input text-black focus:outline-secondary border-none w-full bg-base-200 font-vazir placeholder:text-base-content"
                  value={formik.values.price || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="absolute top-12 right-6">تومان</span>
                {formik.touched.price && formik.errors.price ? (
                  <ErrorMessage>{formik.errors.price}</ErrorMessage>
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
            <p className="text-black">خودرو را اجاره می دهم</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
