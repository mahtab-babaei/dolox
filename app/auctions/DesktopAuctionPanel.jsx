import { cities } from "@/utils/constants";
import React from "react";
import DoubleSlider from "./DoubleSlider";

const DesktopAuctionPanel = ({
  loading,
  expireTime,
  setPriceRange,
  setQuery,
  query,
  setCity,
  setCategory,
  setActiveAuctions,
  activeAuctions,
  handleFilterApply,
}) => {
  return (
    <div className="text-black pr-2">
      <div className="bg-primary h-28 flex justify-center items-center text-white flex-col rounded-[21px] ">
        {loading ? (
          <span className="loading loading-spinner loading-lg text-white"></span>
        ) : expireTime ? (
          <>
            <h2 className="text-xl">اشتراک دیدن مزایده</h2>
            <p className="pt-4">{expireTime}</p>
          </>
        ) : (
          <>
            <h2 className="text-xl">پلن فعال شما</h2>
            <p className="pt-4">تست رایگان 15 روزه</p>
          </>
        )}
      </div>

      <div className="bg-white h-full mt-2 pt-10 rounded-[15px]">
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-full bg-black opacity-40" />
          <h2 className="text-xl">فیلتر</h2>
          <div className="h-[1px] w-full bg-black opacity-40" />
        </div>

        <div className="px-4 font-vazir">
          <div className="collapse collapse-arrow ">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium">جست وجو</div>
            <div className="collapse-content">
              <input
                type="text"
                placeholder="اینجا تایپ کنید"
                className="input w-full max-w-full text-black bg-white border-black border-2 font-vazir"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="h-[1px] w-full bg-black opacity-40" />

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
            <div className="collapse-title text-md font-medium">دسته بندی</div>
            <div className="collapse-content">
              <select
                className="select select-bordered w-full text-black bg-white border-black border-2 selected font-vazir"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue=""
              >
                <option className="font-vazir" disabled value="">
                  همه
                </option>
                <option className="font-vazir" value="متفرقه">
                  متفرقه
                </option>
                <option className="font-vazir" value="ملک">
                  ملک
                </option>
                <option className="font-vazir" value="ماشین">
                  ماشین
                </option>
              </select>
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

          <div className="h-[1px] w-full bg-black opacity-40" />
          <div className="flex py-4 gap-1">
            <input
              type="checkbox"
              className="checkbox [--chkbg:theme(colors.secondary)]"
              checked={activeAuctions}
              onChange={() => setActiveAuctions(!activeAuctions)}
            />
            <p className="font-vazir">نمایش مزایده های جاری</p>
          </div>
          <button
            onClick={handleFilterApply}
            className="btn  mx-auto bg-primary text-white outline-none border-none w-full mb-4"
          >
            اعمال فیلتر
          </button>
          <div className="mt-auto rounded-t-3xl h-4 bg-base-200 w-24 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default DesktopAuctionPanel;
