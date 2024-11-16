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
