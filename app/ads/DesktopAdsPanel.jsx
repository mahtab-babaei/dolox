"use client";
import React from "react";
import { cities } from "@/utils/constants";
import DoubleSlider from "../auctions/DoubleSlider";

const DesktopAdsPanel = ({
  setCity,
  setBrand,
  setYearRange,
  yearRange,
  setKmRange,
  setPriceRange,
  handleFilterApply,
  brands,
}) => {
  return (
    <div className="text-black pr-2">
      <div className="bg-white h-full mt-2 pt-10 rounded-[15px]">
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-full bg-black opacity-40" />
          <h2 className="text-xl">فیلتر</h2>
          <div className="h-[1px] w-full bg-black opacity-40" />
        </div>

        <div className="px-4 font-vazir">
          <div className="collapse collapse-arrow ">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium">شهر</div>
            <div className="collapse-content">
              <select
                className="select select-bordered w-full text-black bg-white border-black border-2 selected font-vazir"
                onChange={(e) => setCity(e.target.value)}
                defaultValue=""
              >
                <option disabled value=""></option>
                {cities.map((city, index) => (
                  <option
                    className="font-vazir"
                    key={index}
                    value={city === "همه شهر ها" ? "" : city}
                  >
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-[1px] w-full bg-black opacity-40" />

          <div className="collapse collapse-arrow ">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium">برند</div>
            <div className="collapse-content">
              <select
                className="select select-bordered w-full text-black bg-white border-black border-2 selected font-vazir"
                onChange={(e) => setBrand(e.target.value)}
                defaultValue=""
              >
                <option defaultValue="">همه برند ها</option>
                {brands.map((brand) => (
                  <option
                    className="font-vazir"
                    key={brand.id}
                    value={brand.name}
                  >
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-[1px] w-full bg-black opacity-40" />

          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium">سال تولید</div>
            <div className="collapse-content">
              <div className="flex gap-4">
                <div className="text-sm flex items-center gap-2">
                  <label>از سال</label>
                  <input
                    type="text"
                    className="input border-black border-2 max-w-16 text-black"
                    onChange={(e) =>
                      setYearRange((prev) => ({
                        ...prev,
                        min: Number(e.target.value),
                      }))
                    }
                    value={yearRange.min}
                  />
                </div>
                <div className="text-sm flex items-center gap-2">
                  <label>تا سال</label>
                  <input
                    type="text"
                    className="input  border-black border-2 max-w-16 text-black"
                    onChange={(e) =>
                      setYearRange((prev) => ({
                        ...prev,
                        max: Number(e.target.value),
                      }))
                    }
                    value={yearRange.max}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-black opacity-40" />

          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium">کارکرد</div>
            <div className="collapse-content">
              <div className="h-20 flex justify-center">
                <DoubleSlider
                  min={8000}
                  max={1000000}
                  onChange={setKmRange}
                  hideValues={true}
                />
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-black opacity-40" />

          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium">قیمت ها</div>
            <div className="collapse-content">
              <div className=" h-20 flex justify-center">
                <DoubleSlider max={100000} min={10} onChange={setPriceRange} />
              </div>
            </div>
          </div>

          <button
            onClick={handleFilterApply}
            className="btn mx-auto bg-primary text-white outline-none border-none w-full mb-4"
          >
            اعمال فیلتر
          </button>
          <div className="mt-auto rounded-t-3xl h-4 bg-base-200 w-24 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default DesktopAdsPanel;
