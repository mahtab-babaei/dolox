import { BackendURL } from "./URL";
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
