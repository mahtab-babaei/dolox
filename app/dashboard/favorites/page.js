import React from "react";
import DashboardPanel from "../DashboardPanel";
import FavoritesList from "./FavoritesList";
import { fetchFavoritesList } from "@/utils/Requests";

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
