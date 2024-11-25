import { forgetpwReq } from "@/utils/Request";
import { ImageURL } from "@/utils/URL";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import * as Yup from "yup";
import ErrorMessage from "../components/global/ErrorMessage";

const ForgetPasswordSection = ({ setphonenumber, setStep }) => {
  const [errorMessage, setErrorMessage] = useState(""); // Define error message state

  const formik = useFormik({
    initialValues: {
      phonenumber: "",
    },
    validationSchema: Yup.object({
      phonenumber: Yup.string()
        .matches(/^09\d{9}$/, "شماره تلفن نامعتبر است")
        .required("شماره تلفن لازم است"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await forgetpwReq(values.phonenumber);
        if (response.success) {
          setphonenumber(values.phonenumber);
          setStep(1);
        } else if (response.message) {
          setErrorMessage(response.message);
        }
      } catch (error) {
        setErrorMessage("شماره تلفن وجود ندارد");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="mx-auto md:py-64 py-40 px-2 bg-base-200">
      <div className="mx-auto max-w-screen-xl text-black">
        <div className="flex bg-white md:max-w-2xl max-w-sm mx-auto rounded-[34px] flex-col md:flex-row">
          <div className="md:w-1/2 p-8 text-xl">
            <h1>تغییر رمز ورود</h1>
            <form
              onSubmit={formik.handleSubmit}
              className='font-vazir'
            >
              <label
                className="form-control w-full max-w-xs"
                htmlFor="phonenumber"
              >
                <div className="label">
                  <span className="label-text">شماره تلفن</span>
                </div>
                <input
                  dir="ltr"
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="0922222222"
                  className="input focus:outline-secondary border-none w-full max-w-xs bg-base-200 font-vazir"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phonenumber}
                />
                {formik.touched.phonenumber && formik.errors.phonenumber ? (
                  <ErrorMessage>
                    {formik.errors.phonenumber}
                  </ErrorMessage>
                ) : null}
              </label>

              {errorMessage && (
                <ErrorMessage>{errorMessage}</ErrorMessage>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="btn bg-secondary border-none text-white h-10 mt-2"
                  disabled={formik.isSubmitting} // Disable button while submitting
                >
                  {formik.isSubmitting ? "در حال ارسال..." : "ارسال کد"}
                </button>
              </div>
            </form>
          </div>
          <div className="md:w-1/2 bg-gradient-red flex items-center flex-col justify-center p-4 md:rounded-l-[34px] rounded-b-[34px] md:rounded-br-[0px]">
            <Image
              className="px-4"
              src={ImageURL + "logincar.png"}
              width={252.29}
              height={91}
              alt="hero image"
            />
            <h2 className="w-full text-center pt-2 text-sm text-white">
              دولوکس، جایی برای فروش رایگان خودروهای شما!
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPasswordSection;
