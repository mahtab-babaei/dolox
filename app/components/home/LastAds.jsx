"use client";
import React, { useState } from "react";
import AdsItem from "../global/AdsItem";
import Link from "next/link";
import { filterRent, filterSales } from "@/utils/Cal";

const LastAds = ({ ads }) => {
  const [category, setcategory] = useState("همه");
  const [lastads, setLastAds] = useState(ads);
  return (
    <section className="mx-autopt-32 bg-base-100 px-5 pb-64">
      <div className="mx-auto max-w-screen-xl text-white">
        <h2 className="text-2xl md:text-3xl w-full text-center md:pt-16">
          آخرین اگهی ها
        </h2>
        <div className="flex justify-between items-center">
          <div className="w-full flex gap-4 md:justify-start justify-center py-4">
            <div
              className={`!font-vazir cursor-pointer py-2 px-4 rounded-lg text-secondary ${
                category === "همه"
                  ? "bg-secondary !text-white"
                  : "border border-secondary "
              } `}
              onClick={() => {
                setLastAds(ads);
                setcategory("همه");
              }}
            >
              همه
            </div>
            <div
              className={`!font-["vazir"] cursor-pointer py-2 px-4 rounded-[8px] text-secondary ${
                category === "فروشی"
                  ? "bg-secondary !text-white "
                  : "border border-secondary "
              }} `}
              onClick={() => {
                setLastAds(filterSales(ads));
                setcategory("فروشی");
              }}
            >
              فروشی
            </div>
            <div
              className={`!font-vazir cursor-pointer py-2 px-4 rounded-[8px] text-secondary ${
                category === "اجاره ای"
                  ? "bg-secondary !text-white "
                  : "border border-secondary "
              }} `}
              onClick={() => {
                setLastAds(filterRent(ads));
                setcategory("اجاره ای");
              }}
            >
              اجاره ای
            </div>
          </div>
          <Link href="/" className="text-secondary hidden md:block">
            بیشتر
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center text-center mt-6 gap-4">
          <AdsItem ad={lastads[0]} />
          <AdsItem ad={lastads[1]} />
          <AdsItem ad={lastads[2]} />
        </div>

        <div className="text-center py-10">
          <Link href="/" className="text-secondary md:hidden ">
            بیشتر
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LastAds;
