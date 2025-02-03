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
