import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '@/public/images/logo.png'

const DashboardAuto = ({ profile }) => {
  return (
    <div className="h-full w-full px-4">
      <div className="bg-white w-full max-w-screen-lg h-fit rounded-[34px] p-8 flex flex-col">
        <h1 className="text-xl ">آتوگالری های من</h1>
        {profile.exhibition.length === 0 && (
          <div className="h-96 flex justify-center items-center flex-col">
            <Image alt="logo" src={logo} className="w-40"/>
            <h3 className="font-vazir font-bold text-lg">
              همین حالا اولین آتوگالریتو ثبت کن{" "}
            </h3>
            <p className="font-vazir py-2">
              با ثبت اولین اتو گالری از ما 50 آگهی رایگان و پلکان رایگان هدیه
              بگیرید
            </p>
            <Link
              className="btn bg-secondary border-secondary text-white border-none"
              href="/createauto"
            >
              ثبت آتوگالری
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAuto;
