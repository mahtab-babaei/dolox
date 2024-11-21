import React from "react";
import DashboardPanel from "./DashboardPanel";
import DashboardAd from "./DashboardAd";
import { getProfile } from "@/utils/Request";
import jwt from "jsonwebtoken";
import { getToken } from "@/utils/Auth";

const fetchProfileFromServer = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token not found");
    }
    const decoded = jwt.decode(token); // Decode JWT
    const userId = decoded?.user_id; // Extract user ID
    const profile = await getProfile(userId, token);
    return profile;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const DashboardPage = async () => {
  const profile = await fetchProfileFromServer();
  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10 px-4">
      <DashboardPanel />
      <DashboardAd profile={profile} />
    </div>
  );
};

export default DashboardPage;
