"use client";
import React from "react";
import DashboardPanel from "../DashboardPanel";
import Package from "@/app/createad/Package";

const AuctionSubscriptionPage = () => {
  return (
    <div className="bg-base-200 w-full py-40 px-4">
      <div className="flex justify-center base:justify-start gap-6 h-fit max-w-screen-xl mx-auto">
        <DashboardPanel />
        <div className="h-full w-full px-4">
          <div className="bg-white w-full max-w-screen-md h-fit rounded-[34px] p-8 flex flex-col">
            <div className="flex items-center gap-2 pb-6">
              <div className="h-[1px] w-full bg-black opacity-40" />
              <h2 className="text-2xl text-nowrap text-base-100">
                اشتراک دریافت مزایده
              </h2>
              <div className="h-[1px] w-full bg-black opacity-40" />
            </div>
            <Package />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionSubscriptionPage;
