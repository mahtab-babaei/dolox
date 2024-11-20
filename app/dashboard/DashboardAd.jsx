import React from "react";
import Link from "next/link";
import ProfileAd from "./ProfileAd";

const DashboardAd = ({ profile }) => {
  return (
    <div className="h-full w-full px-4">
      <div className="bg-white w-full max-w-screen-lg h-fit rounded-[34px] p-8 flex flex-col">
        <h1 className="text-xl ">آگهی های من</h1>
        {profile.cars.results.length === 0 ? (
          <div className="h-96 flex justify-center items-center flex-col">
            <h3 className="font-vazir font-bold text-lg">
              شما هنوز آگهی ندارید
            </h3>
            <p className="font-vazir py-2">همین حالا ثبت آگهی کنید !</p>
            <Link
              className="btn bg-secondary border-secondary text-white border-none"
              href="/createad"
            >
              ثبت رایگان آگهی
            </Link>
          </div>
        ) : (
          profile.cars.results.map((car, index) => (
            <ProfileAd key={index} ad={car} />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardAd;
