import React from "react";
import { cities } from "@/utils/constants";

const DekstopAutogalleryPanel = ({
  setCity,
  sellsDomestic,
  setSellsDomestic,
  sellsChinese,
  setSellsChinese,
  sellsForeign,
  setSellsForeign,
  handleFilterApply
}) => {
  return (
    <div className="text-black text-nowrap pr-2">
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
                    defaultValue=""
                  >
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-[1px] w-full bg-black opacity-40" />

          <div className="flex py-4 gap-1">
            <input
              type="checkbox"
              className="checkbox [--chkbg:theme(colors.secondary)]"
              checked={sellsDomestic}
              onChange={() => setSellsDomestic(!sellsDomestic)}
            />
            <p className="font-vazir">فروشنده خودروهای ایرانی</p>
          </div>

          <div className="h-[1px] w-full bg-black opacity-40" />

          <div className="flex py-4 gap-1">
            <input
              type="checkbox"
              className="checkbox [--chkbg:theme(colors.secondary)]"
              checked={sellsChinese}
              onChange={() => setSellsChinese(!sellsChinese)}
            />
            <p className="font-vazir">فروشنده خودروهای چینی</p>
          </div>

          <div className="h-[1px] w-full bg-black opacity-40" />

          <div className="flex py-4 gap-1">
            <input
              type="checkbox"
              className="checkbox [--chkbg:theme(colors.secondary)]"
              checked={sellsForeign}
              onChange={() => setSellsForeign(!sellsForeign)}
            />
            <p className="font-vazir">فروشنده خودروهای خارجی</p>
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

export default DekstopAutogalleryPanel;
