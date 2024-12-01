import { getToken } from "@/utils/Auth";
import React from "react";
import AuctionDetails from "./AuctionDetails";
import { BackendURL } from "@/utils/URL";

const getauctionDetails = async (auctionId) => {
  try {
    const token = await getToken(); // Use the getToken function
    if (!token) {
      throw new Error("Token not found");
    }

    // get auction details from server
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET", // Changed to GET for fetching user data
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${BackendURL}/auction/${auctionId}/`,
      requestOptions
    );

    // Check if response is ok (status in range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching auction data:", error);
    throw new Error("Failed to fetch auction details");
  }
};

const AuctionDetailsPage = async ({ params }) => {
  const { id } = params;
  const auction = await getauctionDetails(id);

  return <AuctionDetails auction={auction}/>;
};

export default AuctionDetailsPage;
