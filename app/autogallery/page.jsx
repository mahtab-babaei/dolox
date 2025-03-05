export const dynamic = "force-dynamic";
import React from "react";
import TotalAutogalleries from "./TotalAutogalleries";
import { fetchAutosByFilter } from "@/utils/Requests";

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
