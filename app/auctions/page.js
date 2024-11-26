import React from "react";
import { getAuctions } from "@/utils/Request";
import TotalAuctions from "./TotalAuctions";
import { getToken } from "@/utils/Auth";

const AuctionsPage = async () => {
  const auctions = await getAuctions();
  const token = await getToken()
  
  return <TotalAuctions token={token} auctions={auctions.results || []} />;
};

export default AuctionsPage;
