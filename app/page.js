import FreeAds from "./components/home/FreeAds";
import Hero from "./components/home/Hero";
import LastAds from "./components/home/LastAds";
import { getAds, getAuctions, getBlogs } from "@/utils/Request";
import { getAutogalleries } from "@/utils/Request";
import LastAutoGalleries from "./components/home/LastAutoGalleries";
import FreeAutoGallery from "./components/home/FreeAutoGallery";
import LastAuctions from "./components/home/LastAuctions";
import LastBlogs from "./components/home/LastBlogs";

export default async function Home() {
  let ads = {};
  let autoGalleries = {};
  let auction = {};
  let blogs = {};

  try {
    ads = await getAds();
    autoGalleries = await getAutogalleries();
    auction = await getAuctions();
    blogs = await getBlogs();
  } catch (error) {
    console.error("Failed to fetch ads:", error);
  }

  return (
    <>
      <Hero />
      <LastAds ads={ads.results || []} />
      <FreeAds />
      <LastAutoGalleries autogalleries={autoGalleries.results || []} />
      <FreeAutoGallery />
      <LastAuctions auctions={auction.results || []} />
      <LastBlogs blogs={blogs || []}/>
    </>
  );
}
