import React from "react";
import Package from "../createad/Package";

const Renewal = ({ submitedAdID }) => {
  return (
    <div className="bg-white p-8 rounded-[34px]">
      <div className="flex items-center gap-2 pb-6">
        <div className="h-[1px] w-full bg-black opacity-40" />
        <h2 className="text-2xl text-nowrap text-base-100">تمدید آگهی</h2>
        <div className="h-[1px] w-full bg-black opacity-40" />
      </div>
      <Package submitedAdID={submitedAdID} />
    </div>
  );
};

export default Renewal;
