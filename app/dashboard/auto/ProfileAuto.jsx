import Link from "next/link";
import React from "react";

const ProfileAuto = ({ exhibition, picture }) => (
  <div className="my-2 rounded-[6px] flex justify-between flex-col md:flex-row bg-primary">
    <div className="flex flex-col md:flex-row items-center w-full md:justify-start justify-center">
      <img
        className="h-24 w-24 object-cover m-2 rounded-[16px] bg-gray-200"
        src={picture}
        width={96} 
        height={96}
        alt="ad"
      />
      <h2 className="px-4 text-white text-center">{exhibition.company_name}</h2>
    </div>
    <div className="md:border-r-2 flex flex-col sm:flex-row gap-2 items-center justify-center py-3 px-6 sm:min-w-[270px] rounded-l-[6px]">
      {["ثبت آگهی جدید", "مدیریت اتوگالری"].map((text, index) => (
        <Link
          key={index}
          href="/manageauto"
          className="btn bg-white text-black border-none hover:text-white"
        >
          {text}
        </Link>
      ))}
    </div>
  </div>
);

export default ProfileAuto;
