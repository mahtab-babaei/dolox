export const dynamic = "force-dynamic";
import React from "react";
import { BackendURL } from "@/utils/URL";
import TotalAds from "./TotalAds";

const getBrands = async () => {
  try {
    const response = await fetch(`${BackendURL}/ads/brands/`, {
      method: "GET",
      redirect: "follow",
    });

    // Check if response is ok (status in range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    return []; // Return empty array as fallback
  }
};

export const fetchAdsByFilter = async ({
  brand,
  city,
  yearRange,
  kmRange,
  priceRange,
  page,
  order,
}) => {
  try {
    const params = new URLSearchParams({
      brand,
      city,
      year_min: yearRange.min,
      year_max: yearRange.max,
      kilometer_min: kmRange.min,
      kilometer_max: kmRange.max,
      price_min: priceRange.min,
      price_max: priceRange.max,
      page,
      order_by: order,
    });

    const response = await fetch(`${BackendURL}/ads/?${params.toString()}`, {
      method: "GET",
      redirect: "follow",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error fetching ads:", errorText);
      console.error(`Failed to fetch ads: ${response.statusText}`);
      return { success: false, data: { results: [] } };
    }

    const result = await response.json();

    return {
      success: true,
      data: result || { results: [] },
    };
  } catch (error) {
    console.error("Error fetching ads:", error);
    return { success: false, data: { results: [] } };
  }
};

const AdsPage = async () => {
  const brands = await getBrands();
  const initialAdsData = await fetchAdsByFilter({
    brand: "",
    city: "همه شهر ها",
    yearRange: { min: "", max: "" },
    kmRange: { min: 0, max: 1000 },
    priceRange: { min: 0, max: 100000 },
    page: 1,
    order: "جدیدترین",
  });

  return (
    <TotalAds
      initialAdsData={initialAdsData.data.results}
      initialHasMore={!!initialAdsData?.data?.next}
      brands={brands}
    />
  );
};

export default AdsPage;
