import React from "react";
import Image from "next/image";
import exhibitionImage from "@/public/images/sampleautogallery.png";
import Link from "next/link";

const AdExhibition = () => {
  return (
    <div className="grid md:flex bg-white p-8 rounded-2xl w-full gap-4 items-center">
      <div className="flex justify-center">
        <Image
          alt="exhibitionImage"
          className="rounded-lg"
          src={exhibitionImage}
        />
      </div>
      <div className="w-[90%]">
        <h1 className="flex justify-center md:justify-start mb-2 text-[18px]">
          اتوگالری علیزاده
        </h1>
        <div className="text-center md:text-right">
          <span className="font-vazir text-sm">
            اتوگالری علیزاده با داشتن تیمی مجرب و حرفه‌ای، تمام تلاش خود را برای
            ارائه خدماتی با کیفیت و بهینه به مشتریان خود می‌کند. همچنین، با
            داشتن دسترسی به موجودی خودروهای متنوع و با کیفیت، توانسته است
            نیازهای مختلف مشتریان را برآورده کند.
            <Link
              href="#"
              className="font-vazir text-secondary flex gap-1 items-center justify-center md:justify-start"
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
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdExhibition;
