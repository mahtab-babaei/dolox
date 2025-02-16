"use client";
import React from "react";
import AutoGalleryLayout from "./AutoGalleryLayout";
import Cars from "./Cars";
import Videos from "./Videos";

const AutoDetailsPage = () => {
  return (
    <AutoGalleryLayout>
      {(autoDetails) => (
        <>
          <Videos videos={autoDetails.videos} id={autoDetails.id} />
          <Cars cars={autoDetails.cars} />
        </>
      )}
    </AutoGalleryLayout>
  );
};

export default AutoDetailsPage;
