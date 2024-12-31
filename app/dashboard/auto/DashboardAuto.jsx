import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import ProfileAuto from "./ProfileAuto";

const DashboardAuto = ({ profile }) => {
  return (
    <div className="h-full w-full px-4">
      <div className="bg-white w-full max-w-screen-lg h-fit rounded-[34px] p-8 flex flex-col">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
          <h1 className="text-xl text-black">اتوگالری های من</h1>
          <Link
            className="btn bg-secondary border-secondary text-white border-none"
            href="/createauto"
          >
            ثبت اتوگالری
          </Link>
        </div>
        {profile.exhibition === null ? (
          <div className="h-96 flex justify-center items-center flex-col">
            <Image alt="logo" src={logo} className="w-40" />
            <h3 className="font-vazir font-bold text-lg">
              همین حالا اولین اتوگالریتو ثبت کن{" "}
            </h3>
            <p className="font-vazir py-2">
              با ثبت اولین اتو گالری از ما 50 آگهی رایگان و پلکان رایگان هدیه
              بگیرید
            </p>
            <Link
              className="btn bg-secondary border-secondary text-white border-none"
              href="/createauto"
            >
              ثبت اتوگالری
            </Link>
          </div>
        ) : (
          profile.exhibition.map((exhibitionItem) => (
            <ProfileAuto
              picture={profile.picture}
              key={exhibitionItem.id}
              exhibition={exhibitionItem}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardAuto;
