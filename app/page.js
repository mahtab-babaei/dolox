import { BackendURL, WordPressURL } from "@/utils/URL";
import FreeAds from "./components/home/FreeAds";
import FreeAutoGallery from "./components/home/FreeAutoGallery";
import Hero from "./components/home/Hero";
import LastAds from "./components/home/LastAds";
import LastAuctions from "./components/home/LastAuctions";
import LastAutoGalleries from "./components/home/LastAutoGalleries";
import LastBlogs from "./components/home/LastBlogs";
import WhatBrand from "./components/home/Whatbrand";

const getAds = async () => {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(BackendURL + "/ads/", requestOptions);
    if (response.status === 200) {
      return await response.json(); // Return the parsed JSON
    } else {
      console.log(response.status);
      throw new Error("Failed to fetch ads, status code: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAuctions = async () => {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      BackendURL + "/auction/?page=1",
      requestOptions
    );
    if (response.status === 200) {
      return await response.json(); // Return the parsed JSON
    } else {
      console.log(response.status);
      throw new Error("Failed to fetch ads, status code: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAutogalleries = async () => {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      BackendURL + "/ads/exhibition/",
      requestOptions
    );
    if (response.status === 200) {
      return await response.json(); // Return the parsed JSON
    } else {
      console.log(response.status);
      throw new Error("Failed to fetch ads, status code: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBlogs = async () => {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      WordPressURL + "/posts?orderby=date&order=desc&per_page=3",
      requestOptions
    );
    if (response.status === 200) {
      return await response.json(); // Return the parsed JSON
    } else {
      console.log(response.status);
      throw new Error("Failed to fetch ads, status code: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBrandsByType = async (type) => {
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BackendURL}/ads/brand_type/?type=${type}`,
      requestOptions
    );

    // Check if response is ok (status in range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    // throw error;
  }
};

export default async function Home() {
  const ads = await getAds();
  const autoGalleries = await getAutogalleries();
  const auction = await getAuctions();
  const blogs = await getBlogs();
  const brands = await getBrandsByType("سواری");

  return (
    <>
      <Hero />
      <LastAds ads={ads.results || []} />
      <FreeAds />
      <LastAutoGalleries autogalleries={autoGalleries.results || []} />
      <FreeAutoGallery />
      <LastAuctions auctions={auction.results || []} />
      <LastBlogs blogs={blogs || []} />
      <WhatBrand initBrands={brands || []} />
    </>
  );
}
