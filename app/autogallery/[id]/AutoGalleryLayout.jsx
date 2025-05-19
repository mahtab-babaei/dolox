import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import LoadingComponent from "@/app/components/global/LoadingComponent";
import Image from "next/image";
import Details from "./Details";
import ContactButton from "./ContactButton";
import Logo from "./Logo";
import AutogallerySocialMedia from "./AutogallerySocialMedia";
import { fetchAutoDetails } from "@/utils/Requests";
import Link from "next/link";

const AutoGalleryLayout = ({ children, isEdit }) => {
  const { id } = useParams();
  const [autoDetails, setAutoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAutoDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAutoDetails(id);
        setAutoDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) getAutoDetails();
    else {
      setError("شناسه اتوگالری معتبر نیست.");
      setLoading(false);
    }
  }, [id]);

  if (autoDetails?.is_deleted)
    return (
      <div className="text-base-content px-6 py-60 font-vazir text-center bg-neutral">
        اتوگالری یافت نشد
      </div>
    );

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
                  src="/images/autogalleybanner1.jpg"
                />
                {isEdit && (
                  <Link
                    className="flex gap-2 items-center justify-center font-vazir absolute top-4 left-4 bg-[#FCA474] text-white border-none py-3 px-3 rounded-lg text-sm"
                    href={`/createauto?id=${autoDetails?.id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                    ویرایش
                  </Link>
                )}
                <div className="absolute bottom-2 left-2">
                  <AutogallerySocialMedia
                    links={autoDetails.social_media_links}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:hidden items-center justify-center gap-4">
                <h1 className="text-xl pt-4">{autoDetails.company_name}</h1>
                <Logo logo={autoDetails.logo} />
                <ContactButton phone={autoDetails.contact_phone} />
                <Details>{autoDetails.address}</Details>
                <div className="font-vazir pb-4 px-2 text-center">
                  {autoDetails.description}
                </div>
              </div>
              <div className="hidden sm:flex items-start justify-start gap-4">
                <div className="p-4 -translate-y-32">
                  <Logo logo={autoDetails.logo} />
                  <ContactButton phone={autoDetails.contact_phone} />
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
