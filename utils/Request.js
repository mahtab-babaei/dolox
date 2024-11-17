import { BackendURL, WordPressURL } from "./URL";
import axios from "axios";

export const getAds = async () => {
  try {
    const response = await axios.get(`${BackendURL}/ads/`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getAutogalleries = async () => {
  try {
    const response = await axios.get(`${BackendURL}/ads/exhibition/`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getAuctions = async () => {
  try {
    const response = await axios.get(`${BackendURL}/auction/?page=1`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const response = await axios.get(
      `${WordPressURL}/posts?orderby=date&order=desc&per_page=3`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getBrandsByType = async (type) => {
  try {
    const response = await axios.get(
      `${BackendURL}/ads/brand_type/?type=${type}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const loginReq = async (phonenumber, password) => {
  const data = {
    phone_number: phonenumber,
    password: password,
  };

  try {
    const response = await axios.post(BackendURL + "accounts/token", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    onsole.log("Status Code:", response.status); // Log the status code
    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle server errors based on the status code
      let errorMessage = "خطایی رخ داده است"; // Default error message
      switch (error.response.status) {
        case 400:
          errorMessage = "درخواست اشتباه است. لطفا اطلاعات را بررسی کنید.";
          break;
        case 401:
          errorMessage = "رمز یا شماره تلفن اشتباه است";
          break;
        case 403:
          errorMessage = "دسترسی مجاز نیست. لطفا دوباره تلاش کنید";
          break;
        default:
          errorMessage = "خطای ناشناخته. لطفا دوباره تلاش کنید";
          break;
      }
      throw new Error(error.response.data.message || errorMessage);
    } else {
      // Handle network or other errors
      console.error("Login error:", error);
      throw new Error("رمز یا شماره اشتباه است");
    }
  }
};