"use client";
import React, { useEffect, useState } from "react";
import AuctionDetails from "./AuctionDetails";
import { useParams } from "next/navigation";
import LoadingComponent from "@/app/components/global/LoadingComponent";

const AuctionDetailsPage = () => {
  const { id } = useParams();
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/auctions/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
            setAuctionDetails(null);
          } else {
            setAuctionDetails(data);
            setError(null);
          }
        })
        .catch((err) => {
          console.error("Error fetching auction details:", err);
          setError("خطا در برقراری ارتباط با سرور");
          setAuctionDetails(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <LoadingComponent />;

  return <AuctionDetails auction={auctionDetails} />;
};

export default AuctionDetailsPage;
