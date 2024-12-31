import React, { useState } from "react";
import { cities } from "@/utils/constants";
import DoubleSlider from "../auctions/DoubleSlider";

const PhoneAdsDrawer = ({
  setCity,
  setBrand,
  setYearRange,
  yearRange,
  setKmRange,
  setPriceRange,
  handleFilterApply,
  brands,
}) => {
  const [drawer, setdrawer] = useState(false);
  return (
    <div>
      <div className="flex justify-end md:hidden ">
        <button
          className="flex bg-white gap-2 text-base-content p-2 my-2 rounded-full items-center"
          onClick={() => setdrawer(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M15 7.98933H5.65027M2.35005 7.98933H1M2.35005 7.98933C2.35005 7.52944 2.52386 7.08839 2.83325 6.7632C3.14263 6.43801 3.56225 6.25532 3.99978 6.25532C4.43732 6.25532 4.85693 6.43801 5.16632 6.7632C5.4757 7.08839 5.64951 7.52944 5.64951 7.98933C5.64951 8.44922 5.4757 8.89027 5.16632 9.21546C4.85693 9.54065 4.43732 9.72334 3.99978 9.72334C3.56225 9.72334 3.14263 9.54065 2.83325 9.21546C2.52386 8.89027 2.35005 8.44922 2.35005 7.98933ZM15 13.2446H10.6502M10.6502 13.2446C10.6502 13.7046 10.4759 14.1462 10.1665 14.4715C9.85702 14.7967 9.43731 14.9795 8.99968 14.9795C8.56214 14.9795 8.14253 14.796 7.83314 14.4708C7.52376 14.1456 7.34995 13.7045 7.34995 13.2446M10.6502 13.2446C10.6502 12.7847 10.4759 12.3439 10.1665 12.0186C9.85702 11.6934 9.43731 11.5106 8.99968 11.5106C8.56214 11.5106 8.14253 11.6933 7.83314 12.0185C7.52376 12.3437 7.34995 12.7848 7.34995 13.2446M7.34995 13.2446H1M15 2.73401H12.6503M9.35005 2.73401H1M9.35005 2.73401C9.35005 2.27412 9.52386 1.83307 9.83325 1.50788C10.1426 1.18269 10.5622 1 10.9998 1C11.2164 1 11.431 1.04485 11.6311 1.13199C11.8313 1.21914 12.0131 1.34686 12.1663 1.50788C12.3195 1.6689 12.441 1.86005 12.5239 2.07043C12.6068 2.28081 12.6495 2.5063 12.6495 2.73401C12.6495 2.96172 12.6068 3.18721 12.5239 3.39759C12.441 3.60797 12.3195 3.79912 12.1663 3.96014C12.0131 4.12116 11.8313 4.24888 11.6311 4.33602C11.431 4.42317 11.2164 4.46802 10.9998 4.46802C10.5622 4.46802 10.1426 4.28533 9.83325 3.96014C9.52386 3.63495 9.35005 3.1939 9.35005 2.73401Z"
              stroke="#8B7676"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
          </svg>
          <p>فیلتر</p>
        </button>
      </div>
      {drawer && (
        <div className="text-black fixed w-screen h-screen top-0 left-0 z-50 bg-white pt-6 duration-300">
          <div className="flex items-center gap-2 justify-between px-8">
            <h2 className="text-xl">فیلترها</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 15 15"
              fill="none"
              onClick={() => setdrawer(false)}
            >
              <path
                d="M3.64016 2.27L7.50016 6.13L11.3402 2.29C11.425 2.19972 11.5272 2.12749 11.6406 2.07766C11.754 2.02783 11.8763 2.00141 12.0002 2C12.2654 2 12.5197 2.10536 12.7073 2.29289C12.8948 2.48043 13.0002 2.73478 13.0002 3C13.0025 3.1226 12.9797 3.24439 12.9333 3.35788C12.8869 3.47138 12.8178 3.57419 12.7302 3.66L8.84016 7.5L12.7302 11.39C12.895 11.5512 12.9916 11.7696 13.0002 12C13.0002 12.2652 12.8948 12.5196 12.7073 12.7071C12.5197 12.8946 12.2654 13 12.0002 13C11.8727 13.0053 11.7456 12.984 11.6268 12.9375C11.508 12.8911 11.4002 12.8204 11.3102 12.73L7.50016 8.87L3.65016 12.72C3.56567 12.8073 3.46473 12.8769 3.35316 12.925C3.2416 12.9731 3.12163 12.9986 3.00016 13C2.73495 13 2.48059 12.8946 2.29306 12.7071C2.10552 12.5196 2.00016 12.2652 2.00016 12C1.99783 11.8774 2.02058 11.7556 2.06701 11.6421C2.11344 11.5286 2.18257 11.4258 2.27016 11.34L6.16016 7.5L2.27016 3.61C2.10535 3.44876 2.0087 3.23041 2.00016 3C2.00016 2.73478 2.10552 2.48043 2.29306 2.29289C2.48059 2.10536 2.73495 2 3.00016 2C3.24016 2.003 3.47016 2.1 3.64016 2.27Z"
                fill="black"
              />
            </svg>
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
              <div className="collapse-title text-md font-medium">
                سال تولید
              </div>
              <div className="collapse-content">
                <div className="flex gap-4">
                  <div className="text-sm flex items-center gap-2">
                    <label>از سال</label>
                    <input
                      type="text"
                      className="input border-black border-2 max-w-24 text-black"
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
                      className="input  border-black border-2 max-w-24 text-black"
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
                  <DoubleSlider
                    max={100000}
                    min={10}
                    onChange={setPriceRange}
                  />
                </div>
              </div>
            </div>

            <button
              className="btn mx-auto bg-primary text-white outline-none border-none w-full mb-4"
              onClick={() => {
                setdrawer(false);
                handleFilterApply();
              }}
            >
              اعمال فیلتر
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneAdsDrawer;
