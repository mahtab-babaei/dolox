import React from "react";

const VideoItem = ({ video }) => {
  return (
    <div className="flex flex-col bg-white rounded-3xl max-w-3xl">
      <video controls className="rounded-t-3xl">
        <source src={video.video_file} type="video/mp4" />
        مرورگر شما از ویدیو پشتیبانی نمی‌کند.
      </video>
      <div className="p-4">
        <p>{video.title}</p>
        <p className="font-vazir py-4">{video.description}</p>
        <p className="text-base-content font-vazir">
          تاریخ: {video.uploaded_at.split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default VideoItem;
