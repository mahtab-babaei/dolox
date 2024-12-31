export const dynamic = "force-dynamic";
import React from "react";
import TotalAutogalleries from "./TotalAutogalleries";
import { BackendURL } from "@/utils/URL";

export const fetchAutosByFilter = async ({
  city,
  page,
  sellsDomestic,
  sellsChinese,
  sellsForeign,
}) => {
  try {
    const queryParams = new URLSearchParams();

    if (city) {
      queryParams.append("city", city);
    }
    if (sellsChinese) {
      queryParams.append("sells_chinese_cars", sellsChinese);
    }
    if (sellsDomestic) {
      queryParams.append("sells_domestic_cars", sellsDomestic);
    }
    if (sellsForeign) {
      queryParams.append("sells_foreign_cars", sellsForeign);
    }
    queryParams.append("page", page);

    console.log(
      "BACKENDURL: ",
      `${BackendURL}/ads/exhibition/?${queryParams.toString()}`
    );
    const response = await fetch(
      `${BackendURL}/ads/exhibition/?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return {
      success: true,
      data: result || { results: [] },
    };
  } catch (error) {
    console.error("Error fetching auto galleries:", error);
    return { success: false, data: { results: [] } };
  }
};

const page = async () => {
  const initialData = await fetchAutosByFilter({
    city: "",
    page: 1,
    sellsDomestic: false,
    sellsChinese: false,
    sellsForeign: false,
  });
  return <TotalAutogalleries initialData={initialData?.data.results || []} />;
};

export default page;
