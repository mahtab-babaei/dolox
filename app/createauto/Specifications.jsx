import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepButtons from "../components/global/StepButtons";
import ErrorMessage from "../components/global/ErrorMessage";

const Specifications = ({
  step,
  setStep,
  setContactName,
  contactName = "",
  setCompanyName,
  companyName = "",
  setDescription,
  description = "",
  isSellDomestic,
  setIsSellDomestic,
  isSellChinese,
  setIsSellChinese,
  isSellForeign,
  setIsSellForeign,
}) => {
  // validation schema
  const validationSchema = Yup.object({
    contactName: Yup.string().required("لطفا نام دارنده اتوگالری را وارد کنید"),
    companyName: Yup.string().required("لطفا نام اتوگالری را وارد کنید"),
    description: Yup.string().required("لطفا درباره اتوگالری توضیح دهید"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      contactName: contactName || "",
      companyName: companyName || "",
      description: description || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setContactName(values.contactName);
      setCompanyName(values.companyName);
      setDescription(values.description);
      setStep(2);
    },
    validateOnChange: true,
    enableReinitialize: true,
  });

  const renderError = (field) =>
    formik.touched[field] &&
    formik.errors[field] && <ErrorMessage>{formik.errors[field]}</ErrorMessage>;

  if (step !== 1) return null;

  return (
    <div className="px-2 md:px-0 font-vazir">
      <div dir="rtl" className="pt-2 md:max-w-lg mx-auto">
        <StepButtons
          onSubmit={formik.handleSubmit}
          step={step}
          setStep={setStep}
        />

        <form onSubmit={formik.handleSubmit} className="px-4">
          <label className="input mt-8 mb-1 flex items-center gap-2 md:max-w-screen-sm mx-auto bg-neutral">
            <input
              dir="rtl"
              type="text"
              className="grow placeholder:text-base-content text-black"
              placeholder="نام دارنده اتوگالری"
              {...formik.getFieldProps("contactName")}
            />
          </label>
          {renderError("contactName")}

          <label className="input mt-8 mb-1 flex items-center gap-2 md:max-w-screen-sm mx-auto bg-neutral">
            <input
              dir="rtl"
              type="text"
              className="grow placeholder:text-base-content text-black"
              placeholder="نام اتوگالری"
              {...formik.getFieldProps("companyName")}
            />
          </label>
          {renderError("companyName")}

          <label className="form-control">
            <textarea
              className="text-base text-black textarea mt-8 mb-1 h-40 flex items-center gap-2 md:max-w-screen-sm mx-auto bg-neutral placeholder:text-base-content w-full"
              placeholder="درباره اتوگالری"
              {...formik.getFieldProps("description")}
            ></textarea>
            {renderError("description")}
          </label>

          <div className="flex gap-2 mt-8">
            <input
              type="checkbox"
              checked={isSellDomestic}
              onChange={() => setIsSellDomestic(!isSellDomestic)}
              className="checkbox border-orange-400 [--chkbg:theme(colors.secondary)] [--chkfg:white]"
            />
            <p className="text-black">خودروی ایرانی میفروشم</p>
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="checkbox"
              checked={isSellChinese}
              onChange={() => setIsSellChinese(!isSellChinese)}
              className="checkbox border-orange-400 [--chkbg:theme(colors.secondary)] [--chkfg:white]"
            />
            <p className="text-black">خودروی چینی میفروشم</p>
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="checkbox"
              checked={isSellForeign}
              onChange={() => setIsSellForeign(!isSellForeign)}
              className="checkbox border-orange-400 [--chkbg:theme(colors.secondary)] [--chkfg:white]"
            />
            <p className="text-black">خودروی خارجی میفروشم</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Specifications;
