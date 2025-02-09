import { parseCookies } from "nookies";
import { BackendURL } from "./URL";

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
    console.log("FORMDATA", formData);
    console.log(`${BackendURL}/ads/`);
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

    // ارسال درخواست مستقیم به بک‌اند
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
