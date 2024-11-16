import Link from "next/link";
import React from "react";
import AutoGalleryItem from "../global/AutoGalleryItem";

const LastAutoGalleries = ({ autogalleries }) => {
  return (
    <section className="mx-auto  pt-32 bg-base-300 px-4 pb-32">
      <div className="mx-auto max-w-screen-xl text-black">
        <div className="flex justify-between items-center md:pb-16">
          <h2 className="md:text-3xl text-2xl w-full text-center md:text-right">
            آخرین اتوگالری ها
          </h2>
          <Link href="/" className="text-black hidden md:block">
            بیشتر
          </Link>
        </div>
        <div className="grid lg:grid-cols-3  md:grid-cols-2 grid-cols-1 items-center text-center mt-6 gap-16 px-2">
          <AutoGalleryItem autoGallery={autogalleries[0]} />
          <AutoGalleryItem autoGallery={autogalleries[1]} />
          <AutoGalleryItem autoGallery={autogalleries[2]} />
        </div>

        <div className="text-center py-10">
          <Link href="/" className="text-black md:hidden ">
            بیشتر
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LastAutoGalleries;
