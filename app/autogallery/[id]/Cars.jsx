import React from "react";
import AdsItem from "@/app/components/global/AdsItem";

const Cars = ({ cars }) => {
  return (
    <>
      <div className="bg-white rounded-3xl text-xl sm:text-2xl p-4 text-center">
        خودروها
      </div>
      <div className="grid grid-cols-1 base:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {cars.map((car, index) => (
          <AdsItem key={index} bgColor="white" fillColor="black" ad={car} />
        ))}
      </div>
    </>
  );
};

export default Cars;
