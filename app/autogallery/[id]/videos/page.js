"use client";
import React from "react";
import AutoGalleryLayout from "../AutoGalleryLayout";
import VideoItem from "../VideoItem";

const AutoGalleryVideosPage = () => {
  return (
    <AutoGalleryLayout>
      {(autoDetails) => (
        <>
          <div className="bg-white rounded-3xl text-xl sm:text-2xl p-4 text-center">
            تمام ویدیوهای اتوگالری
          </div>
          <div className="flex flex-col mx-auto gap-4 bg-white rounded-3xl max-w-3xl">
            {autoDetails.videos.length > 0 ? (
              autoDetails.videos.map((video) => (
                <VideoItem key={video.id} video={video} />
              ))
            ) : (
              <p className="text-center text-gray-500 p-4 font-vazir">
                ویدیویی موجود نیست.
              </p>
            )}
          </div>
        </>
      )}
    </AutoGalleryLayout>
  );
};

export default AutoGalleryVideosPage;
