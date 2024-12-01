import React from "react";
import TotalAuctions from "./TotalAuctions";

export const fetchAuctionsByFilter = async ({
  category,
  priceRange,
  city,
  query,
  page,
}) => {
  try {
    const queryParams = new URLSearchParams({
      category,
      priceRangeMax: priceRange.max,
      priceRangeMin: priceRange.min,
      city,
      query,
      page,
    });

    const response = await fetch(`/api/auction?${queryParams.toString()}`, {
      method: "GET",
    });

    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      console.error("Error fetching filtered auctions:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error in fetchAuctionsByFilter:", error);
    return [];
  }
};

const AuctionsPage = async () => {
  return <TotalAuctions />;
};
export default AuctionsPage;
