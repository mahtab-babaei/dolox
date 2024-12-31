import Link from "next/link";
import React from "react";

const AdFeatures = () => {
  return (
    <div className="bg-white py-4 px-8 rounded-2xl">
      <h1 className="text-center mb-8 text-black">مشخصات فنی</h1>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col items-center">
          <span className="text-base-content font-vazir">حجم موتور</span>
          <span className="font-vazir-bold">1.4 لیتر</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-base-content font-vazir">پیشرانه</span>
          <span className="font-vazir-bold">6 سیلندر</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-base-content font-vazir">شتاب</span>
          <span className="font-vazir-bold">15.1 ثانیه</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-base-content font-vazir">مصرف ترکیبی</span>
          <span className="font-vazir-bold">6.4 لیتر در صد کیلومتر</span>
        </div>
      </div>
      <Link
        href="#"
        className="font-vazir text-center text-secondary flex justify-center gap-1 items-center mt-8"
      >
        اطلاعات بیشتر
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
      </Link>
    </div>
  );
};

export default AdFeatures;
