"use client";
import { loginReq } from "@/utils/Requests";
import { ImageURL } from "@/utils/URL";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies"; // Import nookies for setting cookies
import { useState } from "react";
import * as Yup from "yup";
import ErrorMessage from "../components/global/ErrorMessage";

const LoginSection = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Message state
  const [showPassword, setShowPassword] = useState(false); // Password visibility state

  const eyeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z"
        className="fill-base-content"
      />
    </svg>
  );

  const eyeSlashIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z"
        className="fill-base-content"
      />
      <path
        d="M18 5L6 19"
        className="stroke-base-content"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );

  const formik = useFormik({
    initialValues: {
      phonenumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      phonenumber: Yup.string()
        .matches(/^09\d{9}$/, "شماره تلفن نامعتبر است")
        .required("شماره تلفن لازم است"),
      password: Yup.string()
        .min(6, "رمز عبور باید حداقل 6 حرف باشد")
        .matches(/[a-zA-Z]/, "رمز عبور باید شامل حداقل یک حرف باشد")
        .matches(/\d/, "رمز عبور باید شامل حداقل یک عدد باشد")
        .matches(/[A-Z]/, "رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
        .required("رمز عبور لازم است"),
    }),
    onSubmit: async (values) => {
      setLoading(true); // Start loading
      setMessage(""); // Clear previous message
      try {
        // Sending login request to the backend
        const response = await loginReq(values.phonenumber, values.password);
        console.log(response);

        if (response.error) {
          setMessage(response.message); // Display error message
        } else if (response.access && response.refresh) {
          // Save access and refresh tokens in cookies using nookies
          setCookie(null, "access", response.access, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/", // Accessible across the entire app
            secure: true, // Always use secure cookies
          });

          setCookie(null, "refresh", response.refresh, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
            secure: true, // Always use secure cookies
          });

          // Redirect to dashboard
          router.push("/dashboard");
          router.refresh();
          console.log("Login successful");
        }
      } catch (error) {
        // Handle errors from the backend
        setMessage(error.message); // Display connection error message
      } finally {
        setLoading(false); // Stop loading
      }
    },
  });

  return (
    <section className="mx-auto md:py-64 py-40 px-2 bg-base-200">
      <div className="mx-auto max-w-screen-xl text-black">
        <div className="flex bg-white md:max-w-2xl max-w-sm mx-auto !rounded-[34px] flex-col md:flex-row">
          <div className="md:w-1/2 p-8 text-xl">
            <h1>وارد شوید</h1>
            <form onSubmit={formik.handleSubmit} className="font-vazir">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">شماره تلفن</span>
                </div>
                <input
                  id="phonenumber"
                  dir="ltr"
                  type="text"
                  placeholder="0922222222"
                  className="input focus:outline-secondary border-none w-full max-w-xs bg-base-200 font-vazir disabled:bg-base-200"
                  {...formik.getFieldProps("phonenumber")}
                  disabled={loading} // Disable input while loading
                />
                {formik.touched.phonenumber && formik.errors.phonenumber ? (
                  <ErrorMessage>{formik.errors.phonenumber}</ErrorMessage>
                ) : null}
              </label>

              <label className="form-control w-full max-w-xs relative">
                <div className="label">
                  <span className="label-text">رمز عبور</span>
                </div>
                <input
                  id="password"
                  dir="ltr"
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز خود را وارد کنید"
                  className="input focus:outline-secondary border-none w-full max-w-xs bg-base-200 font-vazir disabled:bg-base-200"
                  {...formik.getFieldProps("password")}
                  disabled={loading} // Disable input while loading
                />
                {/* Password visibility toggle button */}
                <button
                  type="button"
                  className="absolute top-12 right-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? eyeSlashIcon : eyeIcon}
                </button>

                {formik.touched.password && formik.errors.password ? (
                  <ErrorMessage>{formik.errors.password}</ErrorMessage>
                ) : null}
              </label>

              <p className="text-xs font-vazir text-gray-400 mt-2">{message}</p>
              <p className="text-xs font-vazir text-gray-400 mt-2">
                هنوز ثبت نام نکردید؟
                <Link
                  href="/register"
                  className="text-secondary px-2 font-vazir"
                >
                  ثبت نام
                </Link>
              </p>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="btn bg-secondary border-none text-white !min-h-1 h-10 mt-2 disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-xs text-white" />
                  ) : (
                    "ورود"
                  )}
                </button>
                <Link
                  href="/forgetpassword"
                  className="text-secondary px-2 font-vazir text-xs"
                >
                  فراموشی رمز
                </Link>
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

export default LoginSection;
