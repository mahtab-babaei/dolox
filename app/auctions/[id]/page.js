"use client";
import React, { useEffect, useState } from "react";
import AuctionDetails from "./AuctionDetails";
import { useParams } from "next/navigation";
import LoadingComponent from "@/app/components/global/LoadingComponent";
import { fetchAuctionDetails } from "@/utils/Requests";

const AuctionDetailsPage = () => {
  const { id } = useParams();
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuctionDetails = async () => {
      setLoading(true);
      const data = await fetchAuctionDetails(id);

      if (data.message) {
        setError(data.message);
        setAuctionDetails(null);
      } else {
        setAuctionDetails(data);
        setError(null);
      }

      setLoading(false);
    };

    if (id) {
      getAuctionDetails();
    }
  }, [id]);

  if (loading) return <LoadingComponent />;

  return <AuctionDetails auction={auctionDetails} />;
};

export default AuctionDetailsPage;
