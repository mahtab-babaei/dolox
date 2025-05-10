import { getBrandsByType } from "../page";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Brands = ({ brands, setBrand, setStep, step, category, setCategory }) => {
  const [brandsData, setBrandsData] = useState(brands);
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await getBrandsByType(category);
        if (!res.error && Array.isArray(res.data)) {
          setBrandsData(res.data);
        } else {
          setBrandsData([]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrandsData([]); // Set to an empty array if there is an error
      }
    };

    fetchBrands();
  }, [category]);

  useEffect(() => {
    if (searchInput.trim() === "") {
      // If search input is empty, clear the searchData
      setSearchData([]);
    } else {
      // Filter brands based on search input
      const filteredBrands = brandsData.filter((brand) =>
        brand.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchData(filteredBrands);
    }
  }, [searchInput, brandsData]);
  if (step !== 0) return <></>;
  return (
    <div>
      <div className="px-2 md:px-0">
        <div className="flex bg-gradient-red mx-auto justify-between max-w-md w-full text-white rounded-[50px] px-7 py-1 mt-8">
          <div
            className={`font-vazir-bold w-full text-center py-2 rounded-full cursor-pointer ${
              category === "سواری" ? "text-black bg-white" : ""
            }`}
            onClick={() => setCategory("سواری")}
          >
            سواری
          </div>
          <div
            className={`font-vazir-bold w-full text-center py-2 rounded-full cursor-pointer ${
              category === "موتورسیکلت" ? "text-black bg-white " : ""
            }`}
            onClick={() => setCategory("موتورسیکلت")}
          >
            موتور
          </div>
          <div
            className={`font-vazir-bold w-full text-center py-2 rounded-full cursor-pointer ${
              category === "ماشین‌آلات سنگین" ? "text-black bg-white" : ""
            }`}
            onClick={() => setCategory("ماشین‌آلات سنگین")}
          >
            سنگین
          </div>
        </div>
        <div dir="ltr" className="py-8 md:max-w-lg mx-auto">
          <label className="input flex items-center gap-2 md:max-w-screen-sm mx-auto placeholder-base-content bg-base-300 rounded-[25px] text-black">
            <input
              dir="rtl"
              type="text"
              className="grow md:text-base"
              placeholder="جست وجو"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z"
                fill="black"
              />
            </svg>
          </label>
        </div>
        {(searchInput.trim() === "" ? brandsData : searchData)?.map(
          (brand, index) => (
            <div key={index} className="px-8 cursor-pointer">
              <div
                className="flex justify-between mt-2"
                onClick={() => {
                  setBrand(brand.name);
                  setStep(1);
                }}
              >
                <div className="flex gap-2">
                  <Image
                    className="object-contain"
                    src={brand.logo}
                    alt="brand icon"
                    width={25}
                    height={25}
                  />
                  <h2 className="font-vazir-bold text-black">{brand.name}</h2>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <path
                    d="M6.73232 0.264138C6.90372 0.433317 7 0.662742 7 0.901961C7 1.14118 6.90372 1.37061 6.73232 1.53978L2.2068 6.00545L6.73232 10.4711C6.89886 10.6413 6.99101 10.8691 6.98893 11.1057C6.98684 11.3422 6.89069 11.5685 6.72118 11.7358C6.55167 11.903 6.32237 11.9979 6.08266 12C5.84295 12.002 5.612 11.9111 5.43958 11.7468L0.267679 6.64327C0.0962842 6.47409 0 6.24467 0 6.00545C0 5.76623 0.0962842 5.5368 0.267679 5.36762L5.43958 0.264138C5.61102 0.0950107 5.84352 0 6.08595 0C6.32837 0 6.56087 0.0950107 6.73232 0.264138Z"
                    fill="black"
                  />
                </svg>
              </div>
              {index !== brandsData.length - 1 && (
                <div className="border-t-2 w-full my-2" />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Brands;
