"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardPanel from "../../DashboardPanel";
import AdEdit from "./AdEdit";
import LoadingComponent from "@/app/components/global/LoadingComponent";
import { getProfile } from "@/utils/Requests";
import { fetchAdDetails } from "@/utils/Requests";

const ManageAdPage = () => {
  const { id } = useParams();
  const [adData, setAdData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get ad information
        const adDetails = await fetchAdDetails(id);

        if (adDetails?.error) {
          throw new Error(adDetails.error);
        }

        // Get profile information
        const fetchedProfile = await getProfile();
        if (!fetchedProfile) {
          throw new Error("خطا در دریافت اطلاعات کاربر");
        }

        // Check if the ad belongs to the user or not
        const userAds = fetchedProfile?.cars?.results || [];
        const foundAd = userAds.find((ad) => ad.id.toString() === id);

        if (!foundAd) {
          setError("⛔ دسترسی غیرمجاز: این آگهی متعلق به شما نیست.");
        } else {
          setAdData(foundAd);
        }
      } catch (err) {
        setError(err.message || "خطای ناشناخته");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setError("شناسه آگهی معتبر نیست.");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <LoadingComponent />;

  return (
    <div className="bg-base-200 w-full py-40 px-4">
      {error ? (
        <div className="text-base-content px-6 py-40 font-vazir text-center bg-neutral">
          {error}
        </div>
      ) : (
        <div className="flex justify-center base:justify-start gap-6 h-fit max-w-screen-xl mx-auto">
          <DashboardPanel />
          <AdEdit adDetails={adData} />
        </div>
      )}
    </div>
  );
};

export default ManageAdPage;
