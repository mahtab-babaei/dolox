"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { BackendURL } from "@/utils/URL";
import LoadingComponent from "@/app/components/global/LoadingComponent";
import AdTitle from "./AdTitle";
import AdCondition from "./AdCondition";
import AdFeatures from "./AdFeatures";
import AdImages from "./AdImages";
import AdExhibition from "./AdExhibition";
import AdDescription from "./AdDescription";
import RelativeAds from "./RelativeAds";

const AdDetailsPage = () => {
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
    <div className="px-6 pt-40 py-40 bg-neutral">
      <div className="max-w-screen-xl mx-auto">
        {error ? (
          <div className="text-base-content px-6 py-40 font-vazir text-center bg-neutral">
            {error}
          </div>
        ) : (
          <div className="grid gap-8 justify-center items-center">
            <div className="hidden md:flex gap-4">
              <div className="grid gap-4">
                <AdTitle
                  model={adDetails.model}
                  year={adDetails.year}
                  city={adDetails.city}
                  price={adDetails.price}
                />
                <AdCondition
                  kilometer={adDetails.kilometer}
                  transmission={adDetails.transmission}
                  color={adDetails.color}
                  body={adDetails.body_condition}
                  frontChassis={adDetails.front_chassis_condition}
                  behindChassis={adDetails.behind_chassis_condition}
                  upholstery={adDetails.upholstery_condition}
                  fuel={adDetails.fuel_type}
                />
                <AdFeatures />
              </div>
              <div className="grid h-fit gap-4 w-[65%]">
                <AdImages images={adDetails.images} />
                <AdDescription
                  description={adDetails.description}
                  isNegotiable={adDetails.is_negotiable}
                  saleOrRent={adDetails.sale_or_rent}
                  exhibition={adDetails.exhibition}
                />
                <AdExhibition />
              </div>
            </div>
            <div className="grid gap-4 md:hidden">
              <AdImages images={adDetails.images} />
              <AdTitle
                model={adDetails.model}
                year={adDetails.year}
                city={adDetails.city}
                price={adDetails.price}
              />
              <AdCondition
                kilometer={adDetails.kilometer}
                transmission={adDetails.transmission}
                color={adDetails.color}
                body={adDetails.body_condition}
                frontChassis={adDetails.front_chassis_condition}
                behindChassis={adDetails.behind_chassis_condition}
                upholstery={adDetails.upholstery_condition}
                fuel={adDetails.fuel_type}
              />
              <AdDescription
                description={adDetails.description}
                isNegotiable={adDetails.is_negotiable}
                saleOrRent={adDetails.sale_or_rent}
                exhibition={adDetails.exhibition}
              />
              <AdFeatures />
              <AdExhibition />
            </div>
            <RelativeAds />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdDetailsPage;
