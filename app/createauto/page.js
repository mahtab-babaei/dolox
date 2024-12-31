export const dynamic = "force-dynamic";
import React from "react";
import CreateAutogallery from "./CreateAutogallery";

export const createAutoReq = async ({
  contactPhone,
  contactName,
  companyName,
  description,
  isSellDomestic,
  isSellChinese,
  isSellForeign,
  city,
  address,
  socialMediaLinks,
  logo,
  isDeleted,
}) => {
  try {
    const formData = new FormData();
    formData.append("contact_phone", contactPhone);
    formData.append("contact_name", contactName);
    formData.append("company_name", companyName);
    formData.append("description", description);
    formData.append("sells_domestic_cars", isSellDomestic);
    formData.append("sells_chinese_cars", isSellChinese);
    formData.append("sells_foreign_cars", isSellForeign);
    formData.append("city", city);
    formData.append("address", address);
    // formData.append("logo", logo);
    // formData.append("video", video);
    formData.append("is_deleted", isDeleted);
    if (socialMediaLinks !== undefined) {
      formData.append("social_media_links", socialMediaLinks);
    }
    if (logo !== undefined) {
      formData.append("logo", logo);
    }

    // if (video !== undefined) {
    //   formData.append("video", video);
    // }

    const response = await fetch(`/api/auto/create`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create autogallery");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createAutoReq:", error.message);
    throw error;
  }
};

export const autoVideos = async (autoId, videos) => {
  try {
    const results = [];
    for (const video of videos) {
      const formData = new FormData();
      formData.append("title", video.title);
      formData.append("description", video.description);
      formData.append("video_file", video.video_file);

      const response = await fetch(`/api/auto/videos/${autoId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload videos");
      }

      const data = await response.json();
      results.push(data);
    }

    return results; // برگرداندن همه نتایج
  } catch (error) {
    console.error("Error uploading videos:", error.message);
    throw error;
  }
};

const CreateAutogalleryPage = () => {
  return <CreateAutogallery />;
};

export default CreateAutogalleryPage;
