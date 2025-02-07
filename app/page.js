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
    if (response.ok) return await response.json();
    console.error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    return null;
  }
}

const getAds = () => fetchData(`${BackendURL}/ads/`);
const getAuctions = () => fetchData(`${BackendURL}/auction/?page=1`);
const getAutogalleries = () => fetchData(`${BackendURL}/ads/exhibition/`);
const getBlogs = () =>
  fetchData(`${WordPressURL}/posts?orderby=date&order=desc&per_page=3`);
export const getBrandsByType = (type) =>
  fetchData(`${BackendURL}/ads/brand_type/?type=${type}`);

export default async function Home() {
  const [ads, autoGalleries, auctions, blogs, brands] = await Promise.all([
    getAds(),
    getAutogalleries(),
    getAuctions(),
    getBlogs(),
    getBrandsByType("سواری"),
  ]);

  return (
    <>
      <Hero />
      <LastAds ads={ads?.results || []} />
      <FreeAds />
      <LastAutoGalleries autogalleries={autoGalleries?.results || []} />
      <FreeAutoGallery />
      <LastAuctions auctions={auctions?.results || []} />
      {/*<LastBlogs blogs={blogs || []} />*/}
      <WhatBrand initBrands={brands || []} />
    </>
  );
}
