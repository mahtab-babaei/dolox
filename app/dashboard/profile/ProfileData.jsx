"use client";
import React from "react";
import { toast } from "react-hot-toast";
import ErrorMessage from "@/app/components/global/ErrorMessage";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cities } from "@/utils/constants";
import DashboardPanel from "../DashboardPanel";
import { useState } from "react";

const ProfileData = ({ data }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: data?.first_name || "",
      lastName: data?.last_name || "",
      email: data?.email || "",
      phonenumber: data?.user?.phone_number || "",
      city: data?.city || "",
      gender: data?.gender || "",
      profilePicture: data?.picture || null,
      profilePicutreFile: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("نام الزامی است"),
      lastName: Yup.string().required("نام خانوادگی الزامی است"),
      email: Yup.string()
        .email("ایمیل نامعتبر است")
        .required("ایمیل الزامی است"),
      phonenumber: Yup.string().required("شماره تلفن الزامی است"),
      city: Yup.string().required("شهر الزامی است"),
      gender: Yup.string().required("جنسیت الزامی است"),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const response = await fetch("/api/profile/update", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("خطایی رخ داد.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("profilePicture", event.currentTarget.files[0]);
    formik.setFieldValue("profilePicutreFile", event.currentTarget.files[0]);
  };
  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10 px-4 ">
      <DashboardPanel />
      <div className=" h-full w-full px-4 ">
        <form
          onSubmit={formik.handleSubmit}
          className=" bg-white md:max-w-xl max-w-screen-lg text-black h-fit rounded-[34px] p-8 flex flex-col  "
        >
          <div className="flex items-center justify-between ">
            <h1 className="text-xl font-digirastin">مشخصات کاربری</h1>
            {/* Submit Button */}
            {JSON.stringify(formik.values) !==
              JSON.stringify(formik.initialValues) && (
              <button
                type="submit"
                className="btn bg-secondary border-secondary text-white border-none"
                disabled={loading}
              >
                {loading ? <span className="loading"></span> : "ذخیره"}
              </button>
            )}
          </div>
          <div className="flex font-vazir  pt-6 md:flex-row flex-col  md:gap-16">
            {/* Name */}
            <div className=" md:w-1/2 ">
              <label className="form-control w-full max-w-sm">
                <div className="label">
                  <span className="label-text">نام</span>
                </div>
                <input
                  id="firstName"
                  type="text"
                  placeholder="نام"
                  className="input focus:outline-secondary border-none w-full max-w-sm bg-base-200 font-vazir disabled:bg-base-200"
                  {...formik.getFieldProps("firstName")}
                  disabled={loading}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
                ) : null}
              </label>

              {/* Last Name */}
              <label className="form-control w-full max-w-sm">
                <div className="label">
                  <span className="label-text">نام خانوادگی</span>
                </div>
                <input
                  id="lastName"
                  type="text"
                  placeholder="نام خانوادگی"
                  className="input focus:outline-secondary border-none w-full max-w-sm bg-base-200 font-vazir disabled:bg-base-200"
                  {...formik.getFieldProps("lastName")}
                  disabled={loading}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
                ) : null}
              </label>

              {/* Email */}
              <label className="form-control w-full max-w-sm">
                <div className="label">
                  <span className="label-text">ایمیل</span>
                </div>
                <input
                  dir="ltr"
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="input focus:outline-secondary border-none w-full max-w-sm bg-base-200 font-vazir disabled:bg-base-200"
                  {...formik.getFieldProps("email")}
                  disabled={loading}
                />
                {formik.touched.email && formik.errors.email ? (
                  <ErrorMessage>{formik.errors.email}</ErrorMessage>
                ) : null}
              </label>

              {/* Phone Number */}
              <label className="form-control w-full max-w-sm">
                <div className="label">
                  <span className="label-text">شماره تلفن</span>
                </div>
                <input
                  id="phonenumber"
                  dir="ltr"
                  type="text"
                  placeholder="09222222222"
                  className="input focus:outline-secondary border-none w-full max-w-sm bg-base-200 font-vazir disabled:bg-base-200"
                  {...formik.getFieldProps("phonenumber")}
                  disabled={true}
                />
                {formik.touched.phonenumber && formik.errors.phonenumber ? (
                  <ErrorMessage>{formik.errors.phonenumber}</ErrorMessage>
                ) : null}
              </label>

              {/* City */}
              <label className="form-control w-full max-w-sm">
                <div className="label">
                  <span className="label-text">شهر</span>
                </div>
                <select
                  id="city"
                  className="input focus:outline-secondary border-none w-full max-w-sm bg-base-200 font-vazir disabled:bg-base-200"
                  {...formik.getFieldProps("city")}
                  disabled={loading}
                >
                  <option value="" label="انتخاب شهر" />
                  {cities?.map((city, index) => (
                    <option key={index} value={city} label={city} />
                  ))}
                </select>
                {formik.touched.city && formik.errors.city ? (
                  <ErrorMessage>{formik.errors.city}</ErrorMessage>
                ) : null}
              </label>

              {/* Gender */}
              <div className="form-control w-full max-w-sm">
                <div className="label">
                  <span className="label-text">جنسیت</span>
                </div>
                <div className="flex">
                  <label className="flex items-center ml-4">
                    <input
                      type="radio"
                      name="gender"
                      value="مرد"
                      checked={formik.values.gender === "مرد"}
                      onChange={formik.handleChange}
                      className="radio"
                    />
                    <span className="mr-2">آقا</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="زن"
                      checked={formik.values.gender === "زن"}
                      onChange={formik.handleChange}
                      className="radio"
                    />
                    <span className="mr-2">خانم</span>
                  </label>
                </div>
                {formik.touched.gender && formik.errors.gender ? (
                  <ErrorMessage>{formik.errors.gender}</ErrorMessage>
                ) : null}
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex md:w-1/2  ">
              <div className="w-fit flex flex-col items-center text-center">
                <div className="label ">
                  <span className="label-text">عکس پروفایل</span>
                </div>
                <label className=" w-32 h-32 border-dashed border-2 rounded-lg flex justify-center items-center cursor-pointer">
                  {formik.values.profilePicture ? (
                    typeof formik.values.profilePicture === "string" ? (
                      <img
                        width={200}
                        height={200}
                        src={formik.values.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        width={200}
                        height={200}
                        src={URL.createObjectURL(formik.values.profilePicture)}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )
                  ) : (
                    <span className="text-xs text-center">
                      برای آپلود عکس ها را اینجا رها کنید
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="label-text text-xs ">
                  برای تغییر عکس روی عکس بالا کلید کنید ویا عکس را داخل آن
                  بیندازید
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileData;
