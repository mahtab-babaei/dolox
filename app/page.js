import { BackendURL, WordPressURL } from "@/utils/URL";
import FreeAds from "./components/home/FreeAds";
import FreeAutoGallery from "./components/home/FreeAutoGallery";
import Hero from "./components/home/Hero";
import LastAds from "./components/home/LastAds";
import LastAuctions from "./components/home/LastAuctions";
import LastAutoGalleries from "./components/home/LastAutoGalleries";
import LastBlogs from "./components/home/LastBlogs";
import WhatBrand from "./components/home/Whatbrand";

export const revalidate = 3600; // ISR: update every 1 hour

async function fetchData(url) {
  try {
    const response = await fetch(url, { method: "GET", cache: "no-cache" });

    const data = await response.json(); 
    if (!response.ok) {
      console.error(`Error ${response.status} while fetching ${url}:`, data);
      return { error: `HTTP ${response.status}`, data: null };
    }

    return { error: null, data };
  } catch (error) {
    console.error(`Network or parsing error for ${url}:`, error);
    return { error: error.message, data: null };
  }
}

const getAds = () => fetchData(`${BackendURL}/ads/`);
const getAutogalleries = () => fetchData(`${BackendURL}/ads/exhibition/`);
const getBlogs = () =>
  fetchData(`${WordPressURL}/posts?orderby=date&order=desc&per_page=3`);
export const getBrandsByType = (type) =>
  fetchData(`${BackendURL}/ads/brand_type/?type=${type}`);

export default async function Home() {
  const [adsRes, autoGalleriesRes, blogsRes, brandsRes] = await Promise.all([
    getAds(),
    getAutogalleries(),
    getBlogs(),
    getBrandsByType("سواری"),
  ]);

  if (
    adsRes.error ||
    autoGalleriesRes.error ||
    blogsRes.error ||
    brandsRes.error
  ) {
    console.warn("Some data failed to load", {
      adsError: adsRes.error,
      autoGalleriesError: autoGalleriesRes.error,
      blogsError: blogsRes.error,
      brandsError: brandsRes.error,
    });
  }

  return (
    <>
      <Hero />
      <LastAds ads={adsRes.data?.results || []} />
      <FreeAds />
      <LastAutoGalleries autogalleries={autoGalleriesRes.data?.results || []} />
      <FreeAutoGallery />
      <LastAuctions />
      {/* <LastBlogs blogs={blogsRes?.data || []} /> */}
      <WhatBrand initBrands={brandsRes.data || []} />
    </>
  );
}
