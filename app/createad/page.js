"use client";
import CreateAd from "./CreateAd";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAdDetails } from "@/utils/Requests";

const CreateAdPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEdit = !!id;
  console.log(isEdit, id);

  const [adData, setAdData] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const getAdData = async () => {
        try {
          const data = await fetchAdDetails(id);
          if (!data.error) {
            setAdData(data);
          } else {
            console.error("Error fetching ad details:", data.error);
          }
        } catch (error) {
          console.error("Error fetching ad data:", error);
        }
      };
      getAdData();
    }
  }, [isEdit, id]);
  console.log(adData);
  return <CreateAd isEdit={isEdit} adData={adData} id={id} />;
};

export default CreateAdPage;
