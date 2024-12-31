"use client";
export const dynamic = "force-dynamic";
import React from "react";
import ProfileData from "./ProfileData";
import { useState, useEffect } from "react";
import { getProfile } from "../page";
import LoadingComponent from "@/app/components/global/LoadingComponent";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProfile = await getProfile();
        if (!fetchedProfile) {
          throw new Error("Failed to fetch profile data");
        }
        setProfile(fetchedProfile);
      } catch (err) {
        setError(err.message || "خطای ناشناخته");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return loading ? (
    <LoadingComponent />
  ) : error ? (
    <div className="text-sm text-base-content text-center font-vazir p-6">
      خطا در بارگذاری اطلاعات: {error}
    </div>
  ) : (
    <ProfileData data={profile} />
  );
};

export default ProfilePage;
