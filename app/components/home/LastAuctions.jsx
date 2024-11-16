import { ImageURL } from "@/utils/URL";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LastAuctionItem from "../global/LastAuctionItem";

const LastAuctions = ({ auctions }) => {
  return (
    <section className="mx-auto bg-black mb-24">
      <div className="mx-auto max-w-screen-xl text-white relative pb-24">
        <div className="w-full h-full z-30 relative bg-transparent">
          <h2 className="text-3xl w-full text-center pt-24">آخرین مزایده ها</h2>
          <p className="text-center font-vazir pb-10">
            کامل ترین مزایدات کشور در{" "}
            <span className="text-secondary">دولوکس</span>
          </p>
          <div className="grid gap-10 py-24">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center text-center gap-6 px-4">
            <LastAuctionItem auction={auctions[0]} />
            <LastAuctionItem auction={auctions[1]} />
            <LastAuctionItem auction={auctions[2]} />
            <LastAuctionItem auction={auctions[3]} />
          </div>

          <div className="text-center">
            <Link href="/" className="text-secondary">
              مشاهده بیشتر
            </Link>
          </div>
          </div>
        </div>

        <Image
          className="absolute top-0 object-cover w-full h-full"
          src={ImageURL + "carbanner3.png"}
          fill='responsve'
          alt="hero image"
        />
      </div>
    </section>
  );
};

export default LastAuctions;
