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
    const response = await fetch("/api/ads/check");
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "خطای سرور هنگام بررسی مجوز",
      };
    }

    return data;
  } catch (error) {
    console.error("Error checking ads authorization:", error.message);
    return { success: false, message: "خطای سرور هنگام بررسی مجوز" };
  }
};

export const createAdReq = async ({
  brand,
  model,
  year,
  body,
  description,
  kilometer,
  price,
  installments,
  rentorsale,
  city,
  phone,
  category,
  wheelnumber,
  weight,
  maxweight,
  exhibition,
}) => {
  try {
    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("model", model.title);
    formData.append("year", year);
    formData.append("body_condition", body.bodyCondition);
    formData.append("front_chassis_condition", body.frontChassisCondition);
    formData.append("behind_chassis_condition", body.backChassisCondition);
    formData.append("upholstery_condition", body.seatCondition);
    formData.append("color", body.bodyColor);
    formData.append("fuel_type", body.gastype);
    formData.append("transmission", body.gearType);
    formData.append("kilometer", kilometer);
    formData.append("description", description);
    formData.append("is_negotiable", installments); // اقساط
    formData.append("sale_or_rent", rentorsale);
    formData.append("city", city);
    formData.append("body_type", model.car_type);
    formData.append("insurance", body.insurance);

    formData.append("phone_numbers", phone);

    if (price !== undefined) {
      formData.append("price", price);
    }

    if (exhibition > 0) {
      formData.append("exhibition", exhibition);
    }

    if (category === "ماشین‌آلات سنگین") {
      formData.append("wheel_number", wheelnumber);
      formData.append("weight", weight);
      formData.append("payload_capacity", maxweight);
    }

    const response = await fetch(`/api/ads/create`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create ad");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createAdReq:", error.message);
    throw error;
  }
};

export const AdImages = async (adId, images) => {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await fetch(`/api/ads/images/${adId}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to upload images");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading images:", error.message);
    throw error;
  }
};

const CreateAdPage = () => {
  return <CreateAd />;
};

export default CreateAdPage;
