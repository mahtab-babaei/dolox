import React from "react";
import ProfileData from "./ProfileData";
import { getProfile } from "../page";

const ProfilePage = async () => {
  const data = await getProfile();
  return <ProfileData data={data} />;
};

export default ProfilePage;
