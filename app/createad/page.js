import React from "react";
import { BackendURL } from "@/utils/URL";
import CreateAd from "./CreateAd";

export const getModelsByBrand = async (brand) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    brands: [brand],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: raw,
  };

  try {
    const response = await fetch(
      `${BackendURL}/ads/brand-models/`,
      requestOptions
    );

    // Check if response is ok (status in range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    // throw error;
  }
};

export const getColors = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${BackendURL}/ads/colors/`, requestOptions);

    // Check if response is ok (status in range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    // throw error;
  }
};

export const checkAds = async () => {
  try {
    const response = await fetch("/api/checkads");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking ads authorization:", error);
    return { success: false, message: "خطای سرور هنگام بررسی مجوز" };
  }
};

const CreateAdPage = () => {
  return <CreateAd />;
};

export default CreateAdPage;
