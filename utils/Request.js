import { BackendURL } from "./URL";
import axios from "axios";

export const AdImages = async (token, adID, images, setLoading) => {
  // Set loading to true before starting the uploads
  setLoading(true);

  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await axios.post(
      `${BackendURL}/ads/cars/${adID}/images/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Handle the response
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
  } finally {
    // Ensure to stop the loading spinner or indicator
    setLoading(false);
  }
};

export const checkAds = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`); // Authorization header only
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
  };
 
  try {
      const response = await fetch(`${BackendURL}/ads/check-athorization`, requestOptions);
      return await response.json();
  } catch (error) {
      console.error(error);
      // throw error;
  }
}

export const createAdReq = async (
  token,
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
  maxweight
) => {
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
    formData.append("price", price); // null if "توافقی"
    formData.append("is_negotiable", installments); // اقساط
    formData.append("sale_or_rent", rentorsale);
    formData.append("city", city);
    formData.append("body_type", model.car_type);
    formData.append("insurance", body.insurance);

    formData.append("phone_numbers", phone);

    if (category === "ماشین‌آلات سنگین") {
      formData.append("wheel_number", wheelnumber);
      formData.append("weight", weight);
      formData.append("payload_capacity", maxweight);
    }

    const response = await axios.post(`${BackendURL}/ads/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create ad");
  }
};

export const getColors = async () => {
  try {
    const response = await axios.get(`${BackendURL}/ads/colors/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    // throw error;
  }
};

export const getModelsByBrand = async (brand) => {
  const data = {
    brands: [brand],
  };

  try {
    const response = await axios.post(`${BackendURL}/ads/brand-models/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


