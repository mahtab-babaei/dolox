import React from "react";
import DashboardPanel from "../DashboardPanel";
import FavoritesList from "./FavoritesList";

const FavoritesPage = () => {
  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10 px-4">
      <DashboardPanel />
      <FavoritesList />
    </div>
  );
};

export default FavoritesPage;
