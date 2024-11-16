import Hero from "./components/home/Hero";
import LastAds from "./components/home/LastAds";
import { getAds } from "@/utils/Request";

export default async function Home() {
  let ads = {};

  try {
    ads = await getAds();
  } catch (error) {
    console.error("Failed to fetch ads:", error);
  }

  return (
    <>
      <Hero />
      <LastAds ads={ads.results || []} />
    </>
  );
}
