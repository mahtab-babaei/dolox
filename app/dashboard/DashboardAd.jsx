"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProfile } from "@/utils/Requests";
import ProfileAd from "./ProfileAd";

const DashboardAd = () => {
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

  return (
    <div className="h-full w-full px-4">
      <div className="bg-white w-full max-w-screen-lg h-fit rounded-[34px] p-8 flex flex-col">
        <div className="flex justify-between align-center mb-6">
          <h1 className="text-xl text-black">آگهی‌های من</h1>
          {profile?.cars?.results?.length !== 0 && (
            <div className="flex gap-2">
              <Link
                className="btn bg-primary text-white border-none"
                href="/dashboard/additionalad"
              >
                آگهی اضافه
              </Link>
              <Link
                className="btn bg-secondary text-white border-none"
                href="/createad"
              >
                ثبت آگهی
              </Link>
            </div>
          )}
        </div>
        {loading ? (
          <div className="text-sm text-base-content text-center font-vazir p-6">
            در حال بارگذاری...
          </div>
        ) : error ? (
          <div className="text-sm text-base-content text-center font-vazir p-6">
            خطا در بارگذاری اطلاعات: {error}
          </div>
        ) : profile?.cars?.results?.length === 0 ? (
          <div className="h-96 flex justify-center items-center flex-col">
            <h3 className="font-vazir font-bold text-lg text-black">
              شما هنوز آگهی ندارید
            </h3>
            <p className="font-vazir py-2 text-black">
              همین حالا ثبت آگهی کنید!
            </p>
            <Link
              className="btn bg-secondary border-secondary text-white border-none"
              href="/createad"
            >
              ثبت رایگان آگهی
            </Link>
          </div>
        ) : (
          profile.cars.results.map((car, index) => (
            <ProfileAd key={index} ad={car} />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardAd;
