import React from "react";
import DashboardPanel from "../DashboardPanel";
import { getToken } from "@/utils/Auth";
import { BackendURL } from "@/utils/URL";
import FavoritesList from "./FavoritesList";

const fetchFavoritesList = async () => {
  try {
    const token = await getToken();
    console.log("token: ", token);
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

const FavoritesPage = async () => {
  const list = await fetchFavoritesList();
  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10">
      <DashboardPanel />
      <FavoritesList list={list.data} />
    </div>
  );
};

export default FavoritesPage;
