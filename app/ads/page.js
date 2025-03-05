"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TotalAds from "./TotalAds";
import Spinner from "../components/global/Spinner";
import { fetchBrands } from "@/utils/Requests";

const AdsPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBrands = async () => {
      setLoading(true);
      const data = await fetchBrands();
      setBrands(data);
      setLoading(false);
    };

    getBrands();
  }, []);

  if (loading) return <Spinner />;

  return <TotalAds brands={brands} searchQuery={searchQuery} />;
};

export default AdsPage;
