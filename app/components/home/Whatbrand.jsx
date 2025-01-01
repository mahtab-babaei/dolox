"use client";
import { getBrandsByType } from "@/app/page";
import { ImageURL } from "@/utils/URL";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const WhatBrand = ({ initBrands }) => {
  const [category, setcategory] = useState("سواری");
  const [brands, setbrands] = useState(initBrands || []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const fetchedBrands = await getBrandsByType(category);
        setbrands(Array.isArray(fetchedBrands) ? fetchedBrands : []);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setbrands([]);
      }
    };

    fetchBrands();
  }, [category]);

  return (
    <section className="mx-auto   bg-base-200 px-2 pb-36">
      <div className="mx-auto max-w-screen-xl text-black relative">
        <div className="flex justify-center">
          <Image
            className="mx-auto absolute md:-top-72 -top-36"
            src={ImageURL + "carbanner4.png"}
            width={884}
            height={390}
            alt="brand image"
          />
        </div>
        <h2 className=" text-3xl w-full text-center md:pt-52 pt-48 pb-6">
          دنبال چه برندی هستی ؟!
        </h2>
        <div className="flex bg-gradient-red  mx-auto justify-between max-w-md w-full text-white rounded-[50px] px-7 py-4 mt-4 ">
          <div
            className={`font-vazir-bold w-full text-center py-2 rounded-full cursor-pointer ${
              category === "سواری" ? "text-black bg-white " : ""
            }`}
            onClick={() => setcategory("سواری")}
          >
            سواری
          </div>
          <div
            className={`font-vazir-bold w-full text-center py-2 rounded-full cursor-pointer ${
              category === "موتورسیکلت" ? "text-black bg-white " : ""
            }`}
            onClick={() => setcategory("موتورسیکلت")}
          >
            موتور
          </div>
          <div
            className={`font-vazir-bold w-full text-center py-2 rounded-full cursor-pointer ${
              category === "ماشین‌آلات سنگین" ? "text-black bg-white " : ""
            }`}
            onClick={() => setcategory("ماشین‌آلات سنگین")}
          >
            سنگین
          </div>
        </div>
        <div className="grid lg:grid-cols-6  md:grid-cols-5 sm:grid-cols-4 grid-cols-4 items-center text-center mt-8 gap-6 gap-y-16 px-2  ">
          {brands.map((brand, index) => (
            <Link key={index} href="/">
              <Image
                className="mx-auto"
                src={brand.logo}
                width={100}
                height={100}
                alt="brand image"
              />
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatBrand;
