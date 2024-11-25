import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileAd = ({ ad }) => {
  return (
    <div
      className={`my-2 rounded-[6px] flex justify-between md:flex-row flex-col ${
        ad.status === "active"
          ? "bg-primary"
          : ad.status === "pending"
          ? "bg-warning"
          : "bg-gray-500"
      }`}
    >
      <div className="flex justify-between w-full  items-center">
        <Image
          className="h-24 w-24 max-w-[6rem] min-w-[6rem] object-cover mr-2 rounded-[16px] bg-gray-200"
          src={ad.images[0]?.image}
          width={100}
          height={100}
          alt="ad"
        ></Image>
        <div className=" justify-between w-full  text-white">
          <h2 className="p-4">{ad.model + " " + ad.brand}</h2>

          <div className="text-white text-center align-middle items-center w-full justify-end p-4 flex">
            <div>
              <span className="px-2 text-xs"> تومان</span>
              <span className=" font-medium font-vazir-bold px-2 min-w-24">
                {ad.price}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="md:border-r-2  flex-col flex items-center justify-center py-3 px-6 md:w-52 rounded-l-[6px]">
        <Link
          href="/managead"
          className="btn bg-white text-black border-none hover:text-white"
        >
          مدیریت اگهی
        </Link>
        <h3 className=" font-vazir ! text-center font-xs pt-1 text-white">
          {ad.status === "pending" ? " درحال بررسی" : ""}
        </h3>
      </div>
    </div>
  );
};

export default ProfileAd;
