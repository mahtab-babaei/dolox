"use client";
export const dynamic = "force-dynamic";
import React from "react";
import DashboardPanel from "../DashboardPanel";
import DashboardAuto from "./DashboardAuto";
import { useEffect, useState } from "react";
import { getProfile } from "@/utils/Requests";
import LoadingComponent from "@/app/components/global/LoadingComponent";

const AutoPage = () => {
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
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10">
      <DashboardPanel />
      <DashboardAuto profile={profile} />
    </div>
  );
};

export default AutoPage;
