"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TotalAds from "./TotalAds";
import Spinner from "../components/global/Spinner";
import { BackendURL } from "@/utils/URL";

const AdsPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${BackendURL}/ads/brands/`, {
          method: "GET",
          redirect: "follow",
        });
        // Check if response is ok (status in range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) return <Spinner />;

  return <TotalAds brands={brands} searchQuery={searchQuery} />;
};

export default AdsPage;
