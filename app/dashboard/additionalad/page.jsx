"use client";
import React from "react";
import DashboardPanel from "../DashboardPanel";
import Package from "@/app/createad/Package";

const AdditionalAdPage = () => {
  return (
    <div className="flex justify-start  bg-base-200 w-full pt-40 pb-10 px-4">
        <DashboardPanel />
        <div className="h-full w-full px-4">
          <div className="bg-white w-full max-w-screen-md h-fit rounded-[34px] p-8 flex flex-col">
            <div className="flex items-center gap-2 pb-6">
              <div className="h-[1px] w-full bg-black opacity-40" />
              <h2 className="text-2xl text-nowrap text-base-100">آگهی اضافه</h2>
              <div className="h-[1px] w-full bg-black opacity-40" />
            </div>
            <Package />
          </div>
        </div>
    </div>
  );
};

export default AdditionalAdPage;
