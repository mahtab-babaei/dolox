"use client";
import React, { useEffect, useState } from "react";
import AutoGalleryItem from "../components/global/AutoGalleryItem";
import DekstopAutogalleryPanel from "./DekstopAutogalleryPanel";
import { fetchAutosByFilter } from "./page";
import PhoneAUtogalleryDrawer from "./PhoneAUtogalleryDrawer";

const TotalAutogalleries = ({ initialData }) => {
  const [autosData, setAutosData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sellsDomestic, setSellsDomestic] = useState(false);
  const [sellsChinese, setSellsChinese] = useState(false);
  const [sellsForeign, setSellsForeign] = useState(false);

  const handleFilterApply = async () => {
    setLoading(true);
    const filterData = {
      city,
      page: 1,
      sellsDomestic,
      sellsChinese,
      sellsForeign,
    };

    console.log("Flitereddata:", filterData);
    const filteredAutos = await fetchAutosByFilter(filterData);
    setAutosData(filteredAutos?.data.results || []);
    setLoading(false);
  };

  return (
    <div className="bg-base-200 pt-40 px-2 flex gap-2 justify-center">
      <div className="h-full max-w-xs hidden md:block">
        <DekstopAutogalleryPanel
          setCity={setCity}
          sellsDomestic={sellsDomestic}
          setSellsDomestic={setSellsDomestic}
          sellsChinese={sellsChinese}
          setSellsChinese={setSellsChinese}
          sellsForeign={sellsForeign}
          setSellsForeign={setSellsForeign}
          handleFilterApply={handleFilterApply}
        />
      </div>

      <div className="max-w-screen-lg w-full p-1 min-h-screen">
        <PhoneAUtogalleryDrawer
          setCity={setCity}
          sellsDomestic={sellsDomestic}
          setSellsDomestic={setSellsDomestic}
          sellsChinese={sellsChinese}
          setSellsChinese={setSellsChinese}
          sellsForeign={sellsForeign}
          setSellsForeign={setSellsForeign}
          handleFilterApply={handleFilterApply}
        />
        {loading ? (
          <p className="text-center font-vazir pt-10 text-base text-base-content">
            در حال بارگذاری...
          </p>
        ) : autosData.length === 0 ? (
          <p className="text-center font-vazir pt-10 text-base text-base-content">
            نتیجه‌ای یافت نشد.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {autosData.map((autoGallery, index) => (
              <AutoGalleryItem key={index} autoGallery={autoGallery} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalAutogalleries;
