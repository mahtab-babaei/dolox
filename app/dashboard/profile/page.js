import { getToken } from "@/utils/Auth";
import { getProfile } from "@/utils/Request";
import React from "react";
import jwt from "jsonwebtoken";
import ProfileData from "./ProfileData";

const fetchProfileFromServer = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token not found");
    }
    const decoded = jwt.decode(token); // Decode JWT
    const userId = decoded?.user_id; // Extract user ID
    const profile = await getProfile(userId, token);
    return { profile, token, userId };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const ProfilePage = async () => {
  const data = await fetchProfileFromServer();
  return <ProfileData data={data} />;
};

export default ProfilePage;
