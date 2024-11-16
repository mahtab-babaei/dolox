import FreeAds from "./components/home/FreeAds";
import Hero from "./components/home/Hero";
import LastAds from "./components/home/LastAds";
import { getAds } from "@/utils/Request";
import { getAutogalleries } from "@/utils/Request";
import LastAutoGalleries from "./components/home/LastAutoGalleries";

export default async function Home() {
  let ads = {};
  let autoGalleries = {};

  try {
    ads = await getAds();
    autoGalleries = await getAutogalleries();
  } catch (error) {
    console.error("Failed to fetch ads:", error);
  }

  return (
    <>
      <Hero />
      <LastAds ads={ads.results || []} />
      <FreeAds />
      <LastAutoGalleries autogalleries={autoGalleries.results || []} />
    </>
  );
}
