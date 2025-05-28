import React from "react";
import exhibitionImage from "@/public/images/sampleautogallery.png";
import Link from "next/link";
import Image from "next/image";

const AdExhibition = ({ exhibitionId, logo, autoDescription, companyName }) => {
  return (
    <div className="grid md:flex bg-white text-black p-8 rounded-2xl w-full gap-4 items-center">
      {logo ? (
        <img
          alt="exhibitionImage"
          className="rounded-lg md:max-w-56 mx-auto"
          src={logo}
        />
      ) : (
        <Image
          src={exhibitionImage}
          className="rounded-lg md:max-w-56 mx-auto"
        />
      )}
      <div className="w-full">
        <h1 className="flex justify-center md:justify-start mb-2 text-[18px]">
          {companyName}
        </h1>
        <div className="text-center md:text-right">
          <span className="font-vazir text-sm">
            {autoDescription}
            <Link
              href={`/autogallery/${exhibitionId}`}
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
