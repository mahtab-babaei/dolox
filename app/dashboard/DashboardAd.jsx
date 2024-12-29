"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProfile } from "./page";
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
        <h1 className="text-xl">آگهی‌های من</h1>
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
            <h3 className="font-vazir font-bold text-lg">
              شما هنوز آگهی ندارید
            </h3>
            <p className="font-vazir py-2">همین حالا ثبت آگهی کنید!</p>
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
