"use client";
import React, { useEffect, useState } from "react";
import CreateAutogallery from "./CreateAutogallery";
import { useSearchParams } from "next/navigation";
import { getProfile } from "@/utils/Requests";
import LoadingComponent from "../components/global/LoadingComponent";
import { fetchAutoDetails } from "@/utils/Requests";

const CreateAutogalleryPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEdit = !!id;

  const [autoData, setAutoData] = useState(null);
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

        // Get auto information
        const autoResponse = await fetchAutoDetails(id);
        if (autoResponse.error) {
          throw new Error("اتوگالری مورد نظر یافت نشد.");
        }

        // Get profile information
        const fetchedProfile = await getProfile();
        if (!fetchedProfile) {
          throw new Error("خطا در دریافت اطلاعات کاربر");
        }

        // Check ad ownership
        const userAuto = fetchedProfile?.exhibition || [];
        const foundAuto = userAuto.find((auto) => auto.id.toString() === id);

        if (!foundAuto) {
          throw new Error("⛔ دسترسی غیرمجاز: این اتوگالری متعلق به شما نیست.");
        }

        setAutoData(foundAuto);
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
        <CreateAutogallery isEdit={isEdit} autoData={autoData} id={id} />
      )}
    </>
  );
};

export default CreateAutogalleryPage;
