import React from "react";
import VideoItem from "./VideoItem";
import Link from "next/link";

const Videos = ({ videos, id }) => {
  if (videos)
    return (
      <>
        <div className="bg-white rounded-3xl text-xl sm:text-2xl p-4 text-center">
          تصاویر ویدیویی
        </div>
        <div className="flex flex-col mx-auto gap-4 bg-white rounded-3xl max-w-3xl">
          <VideoItem video={videos[0]} />
          <Link
            href={`/autogallery/${id}/videos`}
            className="btn w-fit mx-auto bg-primary text-white mb-4"
          >
            ویدیوهای بیشتر
          </Link>
        </div>
      </>
    );
};

export default Videos;
