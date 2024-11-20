import React from "react";
import DashboardPanel from "./DashboardPanel";
import DashboardAd from "./DashboardAd";
import { getProfile } from "@/utils/Request";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const fetchProfileFromServer = async (token) => {
  try {
    const decoded = jwt.decode(token); // Decode JWT
    const userId = decoded?.user_id; // Extract user ID
    if (!userId) throw new Error("Invalid token");
    // Use getProfile function
    const profile = await getProfile(userId, token);
    return profile;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};


const DashboardPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access")?.value;

  // Fetch profile data using the token
  const profile = token ? await fetchProfileFromServer(token) : null;

  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10 px-4">
      <DashboardPanel />
      <DashboardAd profile={profile} />
    </div>
  );
};

export default DashboardPage;
