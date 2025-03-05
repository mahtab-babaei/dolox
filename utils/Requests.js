import { parseCookies } from "nookies";
import { BackendURL } from "./URL";
import jwt from "jsonwebtoken";

export const fetchAdsByFilter = async ({
  brand = "",
  city = "همه شهر ها",
  yearRange = { min: "", max: "" },
  kmRange = { min: "", max: "" },
  priceRange = { min: "", max: "" },
  page = 1,
  order = "",
  search = "",
}) => {
  try {
    let url = "";

    if (search) {
      url = `${BackendURL}/ads/search/?q=${encodeURIComponent(
        search
      )}&page=${page}`;
    } else {
      const isInitialRequest =
        !brand &&
        city === "همه شهر ها" &&
        !yearRange.min &&
        !yearRange.max &&
        !kmRange.min &&
        !kmRange.max &&
        !priceRange.min &&
        !priceRange.max &&
        page === 1 &&
        !order;

      url = isInitialRequest
        ? `${BackendURL}/ads/?city=${city}&page=1`
        : `${BackendURL}/ads/?${new URLSearchParams({
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
          }).toString()}`;
    }

    const cookies = parseCookies();
    const token = cookies.access || null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await fetch(url, {
      method: "GET",
      headers,
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

export const addToFavorites = async (id) => {
  try {
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const response = await fetch(`${BackendURL}/ads/favorites/${id}/add/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "عملیات ناموفق" };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error adding ad to favorites:", error.message);
    return {
      success: false,
      message: "خطایی در اضافه کردن محصول به لیست علاقه مندی ها رخ داد",
    };
  }
};

export const removeFromFavorites = async (id) => {
  try {
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const response = await fetch(`${BackendURL}/ads/favorites/${id}/remove/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "عملیات ناموفق" };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error adding ad to favorites:", error.message);
    return {
      success: false,
      message: "خطایی در حذف کردن محصول از لیست علاقه مندی ها رخ داد",
    };
  }
};

export const joinChatRoom = async (id) => {
  try {
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const response = await fetch(`${BackendURL}/chat/api/join/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      console.error("Error: ", data.message);
      return data;
    }
  } catch (error) {
    console.error("Error joining chat room:", error);
    return {
      success: false,
      message: "خطایی در پیوستن به چت روم رخ داد",
    };
  }
};

export const getChatList = async () => {
  try {
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const response = await fetch(`${BackendURL}/chat/api/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data) {
      return data;
    } else {
      console.error("Error: ", data.message);
      return data.message;
    }
  } catch (error) {
    console.error("Error joining chat room:", error);
    return {
      success: false,
      message: "خطایی در پیوستن به چت روم رخ داد",
    };
  }
};

export const getNotifications = async (page = 1) => {
  try {
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const response = await fetch(
      `${BackendURL}/notif/notifications/?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    return {
      success: false,
      message: "خطایی در دریافت اعلان ها رخ داد",
    };
  }
};

export const deleteAd = async ({ brand, model, city, status }, id) => {
  try {
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const response = await fetch(`${BackendURL}/ads/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brand, model, city, status }),
    });

    if (response.status === 404) {
      return {
        success: false,
        message: "آگهی یافت نشد",
      };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "خطایی در حذف آگهی");
    }

    return { success: true, message: "آگهی با موفقیت غیرفعال شد" };
  } catch (error) {
    console.error("Error deleting ad:", error);
    return {
      success: false,
      message: error.message || "خطای غیرمنتظره‌ای رخ داد",
    };
  }
};

export const deleteAuto = async ({ contact_phone, is_deleted }, id) => {
  try {
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const response = await fetch(`${BackendURL}/ads/exhibition/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact_phone, is_deleted }),
    });

    if (response.status === 404) {
      return {
        success: false,
        message: "اتوگالری یافت نشد",
      };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "خطایی در حذف اتوگالری");
    }

    return { success: true, message: "اتوگالری با موفقیت حذف شد" };
  } catch (error) {
    console.error("Error deleting autogallery:", error);
    return {
      success: false,
      message: error.message || "خطای غیرمنتظره‌ای رخ داد",
    };
  }
};

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
  id,
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
  engineSize,
  engine,
  acceleration,
  combinedUse,
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

    const features = [];
    if (engineSize) features.push({ name: engineSize });
    if (engine) features.push({ name: engine });
    if (acceleration) features.push({ name: acceleration });
    if (combinedUse) features.push({ name: combinedUse });

    if (features.length > 0) {
      formData.append("features", JSON.stringify(features));
    }

    // Get token and add it to headers
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const response = await fetch(`${BackendURL}/ads/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "حطا در ثبت آگهی");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createAdReq:", error.message);
    throw error;
  }
};

export const createAutoReq = async ({
  contactPhone,
  contactName,
  companyName,
  description,
  isSellDomestic,
  isSellChinese,
  isSellForeign,
  city,
  address,
  socialMediaLinks,
  logo,
  isDeleted,
}) => {
  try {
    const formData = new FormData();
    formData.append("contact_phone", contactPhone);
    formData.append("contact_name", contactName);
    formData.append("company_name", companyName);
    formData.append("description", description);
    formData.append("sells_domestic_cars", isSellDomestic);
    formData.append("sells_chinese_cars", isSellChinese);
    formData.append("sells_foreign_cars", isSellForeign);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("is_deleted", isDeleted);

    if (socialMediaLinks !== undefined) {
      formData.append("social_media_links", socialMediaLinks);
    }
    if (logo !== undefined) {
      formData.append("logo", logo);
    }

    // Get token and add it to headers
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const response = await fetch(`${BackendURL}/ads/exhibition/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData.message || "خطا در ثبت اتوگالری");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createAutoReq:", error.message);
    throw error;
  }
};

export const autoVideos = async (autoId, videos) => {
  try {
    // Get token and add it to headers
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const results = [];

    for (const video of videos) {
      const formData = new FormData();
      formData.append("title", video.title);
      formData.append("description", video.description);
      formData.append("video_file", video.video_file);

      const response = await fetch(
        `${BackendURL}/ads/exhibitions/${autoId}/videos/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload videos");
      }

      const data = await response.json();
      results.push(data);
    }

    return results;
  } catch (error) {
    console.error("Error uploading videos:", error.message);
    throw error;
  }
};

export const fetchAutoDetails = async (id) => {
  if (!id) {
    throw new Error("شناسه اتوگالری معتبر نیست.");
  }

  try {
    const response = await fetch(`${BackendURL}/ads/exhibition/${id}/`);
    if (!response.ok) {
      const errorMessage =
        response.status === 404
          ? "اتوگالری مورد نظر یافت نشد."
          : response.status === 500
          ? "خطای داخلی سرور. لطفاً دوباره تلاش کنید."
          : "خطا در دریافت اطلاعات اتوگالری. لطفاً دوباره تلاش کنید.";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching autogallery details:", error);
    throw new Error(error.message || "خطای ناشناخته‌ای رخ داد.");
  }
};

export const editAdReq = async ({
  id,
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
  engineSize,
  engine,
  acceleration,
  combinedUse,
  exhibition,
}) => {
  try {
    const bodyData = {
      brand,
      model: model.title,
      year,
      body_condition: body.bodyCondition,
      front_chassis_condition: body.frontChassisCondition,
      behind_chassis_condition: body.backChassisCondition,
      upholstery_condition: body.seatCondition,
      color: body.bodyColor,
      fuel_type: body.gastype,
      transmission: body.gearType,
      kilometer,
      description,
      is_negotiable: installments,
      sale_or_rent: rentorsale,
      city,
      body_type: model.car_type,
      insurance: body.insurance,
      phone_numbers: phone,
      price,
      exhibition,
    };
    // Get token and add it to headers
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }
    console.log("Body Data:", bodyData);

    const response = await fetch(`${BackendURL}/ads/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      bodyData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response data:", errorData);
      throw new Error(errorData.message || "حطا در ویرایش آگهی");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in editAdReq:", error);
    throw error;
  }
};

export const AdImages = async (adId, images) => {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    // Get token and add it to headers
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "لطفا ابتدا وارد شوید",
      };
    }

    const response = await fetch(`${BackendURL}/ads/cars/${adId}/images/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const responseText = await response.text(); // Get the raw response
    console.log("Response Text:", responseText); // Log the raw response for debugging

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

export const fetchAdDetails = async (id) => {
  try {
    const response = await fetch(`${BackendURL}/ads/${id}/`, {
      method: "GET",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { error: "آگهی مورد نظر یافت نشد" };
      } else if (response.status === 500) {
        return { error: "خطای داخلی سرور. لطفاً دوباره تلاش کنید." };
      } else {
        return {
          error: "خطا در دریافت اطلاعات آگهی. لطفاً دوباره تلاش کنید.",
        };
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ad details:", error.message);
    return {
      error: "خطای ناشناخته‌ای رخ داد.",
    };
  }
};

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

    const response = await fetch(`/api/auctions?${queryParams.toString()}`, {
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

export const fetchBrands = async () => {
  try {
    const response = await fetch(`${BackendURL}/ads/brands/`, {
      method: "GET",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export const createUserReq = async (password, username, phonenumber) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    phone_number: phonenumber, // Use the provided phone number
    username: username, // Use the provided username
    password: password, // Use the provided password
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      BackendURL + "/accounts/users/",
      requestOptions
    );

    if (response.status === 200) {
      return await response.json(); // Return the parsed JSON for status 200
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
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    otp: otp,
    phone_number: phonenumber,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      BackendURL + "/accounts/auth/verify-account/",
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginReq = async (phonenumber, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    phone_number: phonenumber,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(BackendURL + "/accounts/token", requestOptions)
    .then(async (response) => {
      console.log("Status Code:", response.status); // Log the status code

      if (!response.ok) {
        let errorMessage = "خطایی رخ داده است"; // Default error message
        switch (response.status) {
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

        return response.json().then((errorData) => {
          throw new Error(errorData.message || errorMessage);
        });
      }

      // If everything is fine, return the response data
      return response.json();
    })
    .catch((error) => {
      // Handle network or other errors
      console.error("Login error:", error);
      throw new Error("رمز یا شماره اشتباه است");
    });
};

export const forgetpwReq = async (phonenumber) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    phone: phonenumber,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      BackendURL + "/accounts/auth/initiate-password-reset/",
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const newpw = async (otp, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    otp: otp,
    new_password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      BackendURL + "/accounts/auth/create-password/",
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await fetch("/api/profile", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "خطا در دریافت اطلاعات");
    }

    return result.data;
  } catch (error) {
    console.error("Error in getProfile:", error.message);
    return null;
  }
};

export const fetchFavoritesList = async () => {
  try {
    // Get token and add it to headers
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return {
        success: false,
        message: "اطلاعات احراز هویت یافت نشد",
      };
    }

    const response = await fetch(`${BackendURL}/ads/favorites/list/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "عملیات ناموفق" };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching favorites list:", error.message);
    return {
      success: false,
      message: "خطایی در دریافت لیست علاقه مندی ها رخ داد",
    };
  }
};

export const fetchAutosByFilter = async ({
  city,
  page,
  sellsDomestic,
  sellsChinese,
  sellsForeign,
}) => {
  try {
    const queryParams = new URLSearchParams();

    if (city) {
      queryParams.append("city", city);
    }
    if (sellsChinese) {
      queryParams.append("sells_chinese_cars", sellsChinese);
    }
    if (sellsDomestic) {
      queryParams.append("sells_domestic_cars", sellsDomestic);
    }
    if (sellsForeign) {
      queryParams.append("sells_foreign_cars", sellsForeign);
    }
    queryParams.append("page", page);

    console.log(
      "BACKENDURL: ",
      `${BackendURL}/ads/exhibition/?${queryParams.toString()}`
    );
    const response = await fetch(
      `${BackendURL}/ads/exhibition/?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return {
      success: true,
      data: result || { results: [] },
    };
  } catch (error) {
    console.error("Error fetching auto galleries:", error);
    return { success: false, data: { results: [] } };
  }
};

export const getUser = async () => {
  try {
    // Get token and add it to headers
    const cookies = parseCookies();
    const token = cookies.access;
    if (!token) {
      return null;
    }
    const decoded = jwt.decode(token); // Decode JWT
    const userId = decoded?.user_id; // Extract user ID
    if (!userId) return null;

    // get user from server
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET", // Changed to GET for fetching user data
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${BackendURL}/accounts/users/${userId}/`,
      requestOptions
    );

    if (!response.ok) {
      console.warn(`Non-ok response status: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const fetchExhibitionData = async (exhibitionId) => {
  if (!exhibitionId) return null;

  try {
    const response = await fetch(`${BackendURL}/ads/exhibition/${exhibitionId}/`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error fetching exhibition data:", response.error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching exhibition data:", error);
    return null;
  }
};