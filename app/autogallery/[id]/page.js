"use client";
import React from "react";
import AutoGalleryLayout from "./AutoGalleryLayout";
import Cars from "./Cars";
import Videos from "./Videos";
import { useSearchParams } from "next/navigation";

const AutoDetailsPage = () => {
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");
  const isEdit = !!edit;

  return (
    <AutoGalleryLayout isEdit={isEdit}>
      {(autoDetails) => (
        <>
          <Videos videos={autoDetails.videos} id={autoDetails.id} />
          <Cars cars={autoDetails.cars} isEdit={isEdit} />
        </>
      )}
    </AutoGalleryLayout>
  );
};

export default AutoDetailsPage;
