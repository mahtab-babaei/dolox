"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingComponent from "@/app/components/global/LoadingComponent";
import { BackendURL } from "@/utils/URL";
import autoBanner from "@/public/images/autogalleybanner.png";
import autoLogo from "@/public/images/sampleautogallery.png";
import Image from "next/image";

const AutoDetailsPage = () => {
  const { id } = useParams();
  const [autoDetails, setAutoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAutoDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BackendURL}/ads/exhibition/${id}/`, {
          method: "GET",
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("اتوگالری مورد نظر یافت نشد.");
          } else if (response.status === 500) {
            throw new Error("خطای داخلی سرور. لطفاً دوباره تلاش کنید.");
          } else {
            throw new Error(
              "خطا در دریافت اطلاعات اتوگالری. لطفاً دوباره تلاش کنید."
            );
          }
        }

        const data = await response.json();
        setAutoDetails(data);
      } catch (error) {
        console.error("Error fetching autogallery details:", error);
        setError(error.message || "خطای ناشناخته‌ای رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAutoDetails();
    } else {
      setError("شناسه اتوگالری معتبر نیست.");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <LoadingComponent />;

  return (
    <div className="px-6 pt-40 bg-neutral">
      <div className="max-w-screen-xl mx-auto text-black">
        {error ? (
          <div className="text-base-content px-6 pt-40 font-vazir text-center bg-neutral">
            {error}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-3xl">
              <Image
                width="auto"
                height="auto"
                alt="autogalleryBanner"
                src={autoBanner}
              />
              <div className="flex items-start justify-start gap-4">
                <div className="p-4 -translate-y-32">
                  <div className="rounded-2xl bg-gradient-red p-1.5">
                    <img
                      width={168}
                      height={168}
                      alt="autogalleryLogo"
                      src={autoDetails.logo ? autoDetails.logo : autoLogo}
                      className="aspect-square object-cover rounded-2xl"
                    />
                  </div>
                  <button className="btn border-none text-nowrap px-2 sm:px-4 my-2 bg-secondary text-white">
                    <div className="flex items-center justify-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      تماس با فروشنده
                    </div>
                  </button>
                  <div className="font-vazir text-sm">
                    {autoDetails.address}
                  </div>
                </div>
                <div className="p-4">
                  <h1 className="text-2xl pb-4">{autoDetails.company_name}</h1>
                  <div className="font-vazir">{autoDetails.description}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl text-2xl p-4 text-center">
              خودروها
            </div>
            <div className="grid grid-cold-3 "></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoDetailsPage;
