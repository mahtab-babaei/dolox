import React from "react";
import AuctionItem from "../AuctionItem";
import Image from "next/image";

const AuctionDetails = ({ auction }) => {
  if (!auction) {
    return (
      <div className="text-base-content px-6 py-40 font-vazir text-center bg-neutral">
        اطلاعات مزایده در دسترس نیست
      </div>
    );
  }

  const auctionItems = [
    { label: "قیمت پایه", value: auction.base_price },
    { label: "شهر", value: auction.city },
    // { label: "برگزار کننده", value: "پوریا عبداللهی" },
    { label: "تاریخ شروع", value: auction.start_date },
    { label: "تاریخ پایان", value: auction.end_date },
    {
      label: "وضعیت",
      value: auction.status === "ACTIVE" ? "فعال" : "پایان یافته",
    },
    { label: "نوع مزایده", value: auction.auction_type },
  ];

  return (
    <div className="px-6 pt-40 py-10 bg-neutral">
      <div className="max-w-screen-xl mx-auto text-black">
        <div
          className={`${
            auction.image
              ? `flex flex-col items-center md:flex-row md:items-start justify-center gap-4 mb-4`
              : `mb-4`
          }`}
        >
          <div
            className={`bg-white h-full w-full rounded-3xl p-4 ${
              auction.image && `md:max-w-80 md:flex-[25%]`
            }`}
          >
            <h1 className="text-center py-2">{auction.title}</h1>
            {auctionItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between font-vazir text-sm py-2 border-b border-gray-300"
              >
                <p>{item.label}:</p>
                <p>{item.value}</p>
              </div>
            ))}
            <div className="py-2 font-vazir text-sm">
              <p className="pb-2">شرح مزایده:</p>
              <p>{auction.description}</p>
            </div>
          </div>

          {auction.image && (
            <div className="p-4 w-full md:flex-[75%] bg-white flex justify-center rounded-3xl">
              <Image
                width={750}
                height={750}
                className="rounded-2xl object-cover"
                alt="auctionimage"
                src={auction.image}
              />
            </div>
          )}
        </div>
        <div>
          <div className="p-5 mb-4 object-cover bg-white text-center rounded-3xl">
            مزایده های مرتبط
          </div>
          {auction.related_auctions.map((relatedAuction) => (
            <AuctionItem key={relatedAuction.id} auction={relatedAuction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
