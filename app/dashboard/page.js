import { getToken } from "@/utils/Auth";
import { BackendURL } from "@/utils/URL";
import jwt from "jsonwebtoken";
import DashboardAd from "./DashboardAd";
import DashboardPanel from "./DashboardPanel";

export const getProfile = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token not found");
    }
    const decoded = jwt.decode(token); // Decode JWT
    const userId = decoded?.user_id; // Extract user ID
    if (!userId) throw new Error("userId not found");

    // get profile from server
    const myHeaders = new Headers();
    if (token) {
      myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const requestOptions = {
      method: "GET", // Changed to GET for fetching user data
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${BackendURL}/accounts/profile/${userId}/`,
      requestOptions
    );

    // Check if response is ok (status in range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const DashboardPage = async () => {
  const profile = await getProfile();
  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10 px-4">
      <DashboardPanel />
      <DashboardAd profile={profile} />
    </div>
  );
};

export default DashboardPage;
