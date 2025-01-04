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

const AdsPage = async () => {
  const brands = await getBrands();
  return <TotalAds brands={brands} />;
};

export default AdsPage;
