import { BackendURL, WordPressURL } from "./URL";
import axios from "axios";
import { setCookie } from "nookies";

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
    const response = await axios.post(BackendURL + "/accounts/token", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Status Code:", response.status); // Log the status code
    setCookie(null, "access", response.access, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      secure: process.env.NODE_ENV === "production", // فقط در تولید امن باشد
    });
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

export const createUserReq = async (password, username, phonenumber) => {
  const data = {
    phone_number: phonenumber, // Use the provided phone number
    username: username, // Use the provided username
    password: password, // Use the provided password
  };

  try {
    const response = await axios.post(BackendURL + "/accounts/users/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 400) {
      return { message: "کابر قبلا ثبت نام کرده" }; // Custom message for status 400
    } else {
      console.log(response.status);
      throw new Error("Failed with status code: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyAccount = async (otp, phonenumber) => {
  const data = {
    otp: otp,
    phone_number: phonenumber,
  };

  try {
    const response = await axios.post(
      BackendURL + "/accounts/auth/verify-account/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during account verification:", error);

    // If the error has a response, use the error response data
    if (error.response) {
      throw error.response.data || error;
    } else {
      throw error;
    }
  }
};

export const getUser = async (token, userId) => {
  try {
    const response = await axios.get(
      `${BackendURL}/accounts/users/${userId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getProfile = async (userId, token) => {
  try {
    const response = await axios.get(
      `${BackendURL}/accounts/profile/${userId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

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
  try {
    const response = await axios.get(`${BackendURL}/ads/check-athorization`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    // throw error;
  }
};

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

export const updateUserProfile = async (
  token,
  userId,
  email,
  picture,
  city,
  first,
  last,
  gender
) => {
  // Create FormData to handle both text and file data
  const formData = new FormData();

  // Append fields to the form data
  formData.append("first_name", first);
  formData.append("gender", gender);
  formData.append("city", city);
  formData.append("last_name", last);
  formData.append("email", email);
  if (picture) {
    formData.append("picture", picture);
  }

  try {
    const response = await axios.patch(
      `${BackendURL}/accounts/profile/${userId}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create ad");
  }
};

export const forgetpwReq = async (phonenumber) => {
  try {
    const response = await axios.post(
      `${BackendURL}/accounts/auth/initiate-password-reset/`,
      { phone: phonenumber }, // Request body as JSON
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return response data
  } catch (error) {
    console.error("Error in forgetpwReq:", error);
    throw error;
  }
};

export const newpw = async (otp, password) => {
  try {
    const response = await axios.post(
      `${BackendURL}/accounts/auth/create-password/`,
      {
        otp: otp,
        new_password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create newpw");
  }
};
