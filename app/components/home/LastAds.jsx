"use client";
import React, { useState } from "react";
import AdsItem from "../global/AdsItem";
import Link from "next/link";
import { filterRent, filterSales } from "@/utils/Cal";

const LastAds = ({ ads }) => {
  const [category, setCategory] = useState("همه");
  const [filteredAds, setFilteredAds] = useState(ads);

  const categories = ["همه", "فروشی", "اجاره ای"];

  const handleCategoryChange = (category) => {
    setCategory(category);
    let newAds;
    if (category === "همه") {
      newAds = ads;
    } else if (category === "فروشی") {
      newAds = filterSales(ads);
    } else if (category === "اجاره ای") {
      newAds = filterRent(ads);
    }
    setFilteredAds(newAds);
  };

  return (
    <section className="mx-autopt-32 bg-base-100 px-5 pt-16 pb-24">
      <div className="mx-auto max-w-screen-xl text-white">
        <h2 className="text-2xl md:text-3xl w-full text-center md:pt-16">
          آخرین اگهی ها
        </h2>
        <div className="flex justify-between items-center">
          <div className="w-full flex gap-4 md:justify-start justify-center py-4">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`!font-vazir cursor-pointer py-2 px-4 rounded-lg text-secondary ${
                  category === cat ? "bg-secondary !text-white" : "border border-secondary"
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
          <Link href="/" className="text-secondary hidden md:block">بیشتر</Link>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center text-center mt-6 gap-4">
          {filteredAds.slice(0, 3).map((ad, index) => (
            <AdsItem
              key={index}
              bgColor="accent-light"
              textColor="white"
              fillColor="white"
              ad={ad}
            />
          ))}
        </div>
        <div className="text-center py-10">
          <Link href="/" className="text-secondary md:hidden">بیشتر</Link>
        </div>
      </div>
    </section>
  );
};

export default LastAds;
