"use client";
import { useState, useEffect } from "react";
import React from "react";
import AdTitle from "./AdTitle";
import AdCondition from "./AdCondition";
import AdFeatures from "./AdFeatures";
import AdImages from "./AdImages";
import AdExhibition from "./AdExhibition";
import AdDescription from "./AdDescription";
import RelativeAds from "./RelativeAds";
import LoadingComponent from "@/app/components/global/LoadingComponent";
import { BackendURL } from "@/utils/URL";

const AdTotal = ({ adDetails }) => {
  const [exhibitionData, setExhibitionData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAutoDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BackendURL}/ads/exhibition/${adDetails.exhibition}/`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          console.error("Error fetching data:", response.error);
          setExhibitionData(null);
          return;
        }

        const data = await response.json();
        setExhibitionData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setExhibitionData(null);
      } finally {
        setLoading(false);
      }
    };

    if (adDetails.exhibition) {
      fetchAutoDetails();
    }
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-center gap-4 items-center w-full">
      <div className="hidden md:flex gap-4 w-full">
        <div className="grid gap-4">
          <AdTitle
            id={adDetails.id}
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

          {exhibitionData && (
            <AdExhibition
              exhibitionId={exhibitionData.id}
              logo={exhibitionData.logo}
              autoDescription={exhibitionData.description}
              companyName={exhibitionData.company_name}
            />
          )}
        </div>
      </div>
      <div className="grid gap-4 md:hidden w-full">
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
        {exhibitionData && (
          <AdExhibition
            exhibitionId={exhibitionData.id}
            logo={exhibitionData.logo}
            autoDescription={exhibitionData.description}
            companyName={exhibitionData.company_name}
          />
        )}
      </div>
        <RelativeAds />
    </div>
  );
};

export default AdTotal;
