"use client";
import CreateAd from "./CreateAd";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAdDetails } from "@/utils/Requests";
import { getProfile } from "../dashboard/page";
import LoadingComponent from "../components/global/LoadingComponent";

const CreateAdPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEdit = !!id;

  const [adData, setAdData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!isEdit) {
          setLoading(false);
          return;
        }

        // Get ad information
        const adResponse = await fetchAdDetails(id);
        if (adResponse.error) {
          throw new Error("آگهی مورد نظر یافت نشد.");
        }

        // Get profile information
        const fetchedProfile = await getProfile();
        if (!fetchedProfile) {
          throw new Error("خطا در دریافت اطلاعات کاربر");
        }

        // Check ad ownership
        const userAds = fetchedProfile?.cars?.results || [];
        const foundAd = userAds.find((ad) => ad.id.toString() === id);

        if (!foundAd) {
          throw new Error("⛔ دسترسی غیرمجاز: این آگهی متعلق به شما نیست.");
        }

        setAdData(foundAd);
      } catch (err) {
        setError(err.message || "خطای ناشناخته‌ای رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit]);

  if (loading) return <LoadingComponent />;

  return (
    <>
      {error ? (
        <div className="text-base-content px-6 py-40 font-vazir text-center bg-neutral">
          {error}
        </div>
      ) : (
        <CreateAd isEdit={isEdit} adData={adData} id={id} />
      )}
    </>
  );
};

export default CreateAdPage;
