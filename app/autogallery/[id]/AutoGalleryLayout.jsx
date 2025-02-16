import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import LoadingComponent from "@/app/components/global/LoadingComponent";
import { BackendURL } from "@/utils/URL";
import Image from "next/image";
import Details from "./Details";
import ContactButton from "./ContactButton";
import Logo from "./Logo";
import AutogallerySocialMedia from "./AutogallerySocialMedia";

const AutoGalleryLayout = ({ children }) => {
  const { id } = useParams();
  const [autoDetails, setAutoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAutoDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BackendURL}/ads/exhibition/${id}/`);
        if (!response.ok) {
          const errorMessage =
            response.status === 404
              ? "اتوگالری مورد نظر یافت نشد."
              : response.status === 500
              ? "خطای داخلی سرور. لطفاً دوباره تلاش کنید."
              : "خطا در دریافت اطلاعات اتوگالری. لطفاً دوباره تلاش کنید.";
          throw new Error(errorMessage);
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

    if (id) fetchAutoDetails();
    else {
      setError("شناسه اتوگالری معتبر نیست.");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <LoadingComponent />;

  return (
    <div className="px-6 pt-40 bg-neutral">
      <div className="max-w-screen-xl mx-auto text-black">
        {error ? (
          <div className="text-base-content px-6 py-40 font-vazir text-center bg-neutral">
            {error}
          </div>
        ) : (
          <div className="flex flex-col gap-8 pb-8">
            <div className="bg-white rounded-3xl">
              <div className="relative">
                <Image
                  width={1280}
                  height={720}
                  alt="autogalleryBanner"
                  src="/images/autogalleybanner.png"
                />
                <div className="absolute bottom-2 left-2">
                  <AutogallerySocialMedia
                    links={autoDetails.social_media_links}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:hidden items-center justify-center gap-4">
                <h1 className="text-xl pt-4">{autoDetails.company_name}</h1>
                <Logo logo={autoDetails.logo} />
                <ContactButton />
                <Details>{autoDetails.address}</Details>
                <div className="font-vazir pb-4 px-2 text-center">
                  {autoDetails.description}
                </div>
              </div>
              <div className="hidden sm:flex items-start justify-start gap-4">
                <div className="p-4 -translate-y-32">
                  <Logo logo={autoDetails.logo} />
                  <ContactButton />
                  <Details>{autoDetails.address}</Details>
                </div>
                <div className="p-4">
                  <h1 className="text-2xl pb-4">{autoDetails.company_name}</h1>
                  <div className="font-vazir">{autoDetails.description}</div>
                </div>
              </div>
            </div>
            {/* Display specific page content */}
            {children(autoDetails)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoGalleryLayout;
