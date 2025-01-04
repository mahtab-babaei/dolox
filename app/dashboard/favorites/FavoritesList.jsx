"use client";
import AdsItem from "@/app/components/global/AdsItem";
import { fetchAdsByFilter } from "@/utils/Requests";
import React, { useEffect, useState } from "react";

const FavoritesList = ({ list }) => {
  const [favoritesList, setFavoritesList] = useState([]);
  useEffect(() => {
    const fetchFavorites = async () => {
      const totalAds = await fetchAdsByFilter({
        brand: "",
        city: "همه شهر ها",
        yearRange: { min: "", max: "" },
        kmRange: { min: 0, max: 1000 },
        priceRange: { min: 0, max: 100000 },
        page: 1,
        order: "جدیدترین",
      });
      const favorites = totalAds.data.results.filter((ad) =>
        list.some((entry) => entry.car === ad.id)
      );
      setFavoritesList(favorites);
    };
    fetchFavorites();
  });
  return (
    <div className="h-full w-full px-4">
      <div className="bg-white w-full max-w-screen-lg h-fit rounded-[34px] p-4 base:p-8 flex flex-col">
        <h1 className="text-xl text-black mb-6">آگهی های مورد علاقه</h1>
        <div className="grid grid-cols-1 base:grid-cols-2 gap-4">
        {favoritesList.map((favorite) => (
          <AdsItem
            key={favorite.id}
            ad={favorite}
            bgColor="white"
            fillColor="black"
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;
