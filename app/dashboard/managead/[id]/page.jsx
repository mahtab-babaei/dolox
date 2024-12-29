"use client";
import React from "react";
import { useParams } from "next/navigation";
import DashboardPanel from "../../DashboardPanel";
import AdEdit from "./AdEdit";
import LoadingComponent from "@/app/components/global/LoadingComponent";
import { useState, useEffect } from "react";
import { BackendURL } from "@/utils/URL";

const ManageAdPage = () => {
  const { id } = useParams();
  const [adDetails, setAdDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BackendURL}/ads/${id}/`, {
          method: "GET",
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("آگهی مورد نظر یافت نشد.");
          } else if (response.status === 500) {
            throw new Error("خطای داخلی سرور. لطفاً دوباره تلاش کنید.");
          } else {
            throw new Error(
              "خطا در دریافت اطلاعات آگهی. لطفاً دوباره تلاش کنید."
            );
          }
        }

        const data = await response.json();
        setAdDetails(data);
      } catch (error) {
        console.error("Error fetching ad details:", error);
        setError(error.message || "خطای ناشناخته‌ای رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAdDetails();
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
        <div className="flex justify-start gap-6 h-fit  max-w-screen-xl mx-auto">
          <DashboardPanel />
          <AdEdit adDetails={adDetails} />
        </div>
      )}
    </div>
  );
};

export default ManageAdPage;
