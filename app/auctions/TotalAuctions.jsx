"use client";
import React, { useEffect, useState } from "react";
import AuctionItem from "./AuctionItem";
import DesktopAuctionPanel from "./DesktopAuctionPanel";
import PhoneAuctionDrawer from "./PhoneAuctionDrawer";
import { fetchAuctionsByFilter, getProfile } from "@/utils/Requests";
import Link from "next/link";

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
  const [viewAuctions, setViewAuctions] = useState(null);
  const [expireTime, setExpireTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchInitialAuctions = async () => {
      try {
        setLoading(true);

        const permission = await getProfile();
        setViewAuctions(permission?.view_auction);
        if (permission?.view_auction_expire_time) {
          const now = new Date();
          const expireDate = new Date(permission?.view_auction_expire_time);
          const diffInMs = expireDate - now;

          if (diffInMs <= 0) {
            setExpireTime("منقضی شده");
          } else {
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            const diffInHours = Math.floor(
              (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );

            if (diffInDays > 0) {
              setExpireTime(
                `مدت زمان باقی‌مانده ${diffInDays} روز و ${diffInHours} ساعت`
              );
            } else {
              setExpireTime(`مدت زمان باقی‌مانده ${diffInHours} ساعت`);
            }
          }
        } else {
          setExpireTime(null);
        }

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
      } catch (error) {
        console.error("Error in fetching auctions:", error);
        setErrorMessage(error.message || "خطا در برقراری ارتباط با سرور");
      } finally {
        setLoading(false);
      }
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
          loading={loading}
          expireTime={expireTime}
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
          loading={loading}
          expireTime={expireTime}
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
        ) : errorMessage ? (
          <p className="text-center font-vazir pt-10 text-base text-base-content">
            {errorMessage}
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
      {(viewAuctions === false || expireTime === "منقضی شده") && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          <div className="text-white px-6 py-4 font-vazir text-lg text-center">
            <p>
              برای مشاهده مزایده
              <span className="text-secondary"> اشتراک </span>
              خریداری کنید
            </p>
            <Link
              href="/dashboard/auctionsubscription"
              className="btn bg-secondary text-white text-lg font-normal my-4 rounded-2xl"
            >
              خرید اشتراک
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalAuctions;
