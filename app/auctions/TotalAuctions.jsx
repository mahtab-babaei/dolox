"use client";
import React, { useEffect, useState } from "react";
import AuctionItem from "./AuctionItem";
import DesktopAuctionPanel from "./DesktopAuctionPanel";
import PhoneAuctionDrawer from "./PhoneAuctionDrawer";
import { fetchAuctionsByFilter } from "./page";

const TotalAuctions = () => {
  const [auctionsData, setAuctionsData] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min: 10,
    max: 100000,
  });
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [activeAuctions, setActiveAuctions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialAuctions = async () => {
      setLoading(true);
      const initialData = await fetchAuctionsByFilter({
        category: "",
        priceRange: { min: 10, max: 100000 },
        city: "",
        query: "",
        page: 1,
      });
      setAuctionsData(initialData?.results || []);
      setNextPage(initialData?.next);
      setPrevPage(initialData?.previous);
      setLoading(false);
    };

    fetchInitialAuctions();
  }, []);

  const handleFilterApply = async () => {
    setLoading(true);
    setPage(1);

    const filterData = {
      category,
      priceRange,
      city,
      query,
      page: 1,
    };

    const filteredAuctions = await fetchAuctionsByFilter(filterData);
    setAuctionsData(filteredAuctions?.results || []);
    setNextPage(filteredAuctions?.next);
    setPrevPage(filteredAuctions?.previous);
    setLoading(false);
  };

  const handlePageChange = async (newPage) => {
    setLoading(true);
    setPage(newPage);

    const filterData = {
      category,
      priceRange,
      city,
      query,
      page: newPage,
    };

    const paginatedAuctions = await fetchAuctionsByFilter(filterData);

    setAuctionsData(paginatedAuctions?.results || []);
    setNextPage(paginatedAuctions?.next);
    setPrevPage(paginatedAuctions?.previous);
    setLoading(false);
  };

  return (
    <div className="bg-base-200 pt-40 px-2 flex gap-2 justify-center">
      <div className="w-1/4 h-full max-w-xs hidden md:block">
        <DesktopAuctionPanel
          setPriceRange={setPriceRange}
          setCity={setCity}
          setCategory={setCategory}
          setQuery={setQuery}
          query={query}
          setActiveAuctions={setActiveAuctions}
          activeAuctions={activeAuctions}
          handleFilterApply={handleFilterApply}
        />
      </div>

      <div className="max-w-screen-lg w-full p-1 min-h-screen">
        <PhoneAuctionDrawer
          setPriceRange={setPriceRange}
          setCity={setCity}
          setCategory={setCategory}
          setQuery={setQuery}
          query={query}
          setActiveAuctions={setActiveAuctions}
          activeAuctions={activeAuctions}
          handleFilterApply={handleFilterApply}
        />
        {loading ? (
          <p className="text-center font-vazir pt-10 text-base text-base-content">
            در حال بارگذاری...
          </p>
        ) : auctionsData.length === 0 ? (
          <p className="text-center font-vazir pt-10 text-base text-base-content">
            نتیجه‌ای یافت نشد.
          </p>
        ) : (
          auctionsData.map((auction, index) => (
            <AuctionItem key={index} auction={auction} />
          ))
        )}
        {/* Pagination buttons */}
        {!loading && (nextPage || prevPage) && (
          <div className="flex justify-between mt-4 mb-10">
            <button
              disabled={!prevPage}
              onClick={() => handlePageChange(page - 1)}
              className="btn border-none bg-primary text-white disabled:text-white"
            >
              صفحه قبل
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="btn border-none bg-primary text-white disabled:text-white"
              disabled={!nextPage}
            >
              صفحه بعد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalAuctions;
