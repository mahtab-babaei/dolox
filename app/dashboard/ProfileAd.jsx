import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Renewal from "./Renewal";

const ProfileAd = ({ ad }) => {
  const [showRenewalPlans, setShoeRenewalPlans] = useState(false);
  const router = useRouter();

  return (
    <>
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
          <img
            className="h-24 w-24 max-w-[6rem] min-w-[6rem] object-cover mr-2 rounded-[16px] bg-gray-200"
            src={ad.images[0]?.image}
            width={100}
            height={100}
            alt="ad"
          />
          <div className="justify-between w-full text-white">
            <h2 className="p-4">{ad.model + " " + ad.brand}</h2>

            <div className="text-white text-center align-middle items-center w-full justify-end p-4 flex">
              {ad.price ? (
                <div>
                  <span className="px-2 text-xs"> تومان</span>
                  <span className="font-medium font-vazir-bold px-2 min-w-24">
                    {ad.price}
                  </span>
                </div>
              ) : (
                <span className="px-2 text-xs">قیمت توافقی</span>
              )}
            </div>
          </div>
        </div>
        <div className="md:border-r-2  flex-col flex items-center justify-center py-3 px-6 md:w-52 rounded-l-[6px]">
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => router.push(`/dashboard/managead/${ad.id}`)}
              className="w-full btn bg-white text-black border-none hover:text-white disabled:bg-white disabled:text-black disabled:opacity-50"
              disabled={ad.status !== "active"}
            >
              مدیریت آگهی
            </button>
            {ad.status === "expired" && (
              <button
                onClick={() => setShoeRenewalPlans(!showRenewalPlans)}
                className="w-full btn bg-white text-black border-none hover:text-white mt-2"
              >
                تمدید آگهی
              </button>
            )}
          </div>
          <h3 className=" font-vazir ! text-center font-xs pt-1 text-white">
            {ad.status === "pending" ? " درحال بررسی" : ""}
          </h3>
        </div>
      </div>
      {showRenewalPlans && <Renewal submitedAdID={ad.id} />}
    </>
  );
};

export default ProfileAd;
