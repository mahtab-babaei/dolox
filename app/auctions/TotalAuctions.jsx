"use client";
import React, { useEffect, useState } from "react";
import AuctionItem from "./AuctionItem";
import DesktopAuctionPanel from "./DesktopAuctionPanel";
import PhoneAuctionDrawer from "./PhoneAuctionDrawer";
import { getAuctionsByFilter } from "@/utils/Request";

const TotalAuctions = ({ auctions, token }) => {
  const [auctionsData, setAuctionsData] = useState(auctions);
  const [priceRange, setPriceRange] = useState({
    min: 10,
    max: 100000,
  });
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [activeAuctions, setActiveAuctions] = useState(false);

  const handleFilterApply = async () => {
    const filterData = {
      priceRange,
      city,
      category,
      query,
      activeAuctions,
    };
    console.log("فیلترهای انتخاب‌شده:", filterData);

    const filteredAuctions = await getAuctionsByFilter(
      token,
      category,
      priceRange,
      city,
      query
    );

    setAuctionsData(filteredAuctions.results);
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
        {auctionsData?.map((auction, index) => (
          <AuctionItem key={index} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default TotalAuctions;
