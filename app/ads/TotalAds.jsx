"use client";
import { useEffect, useState } from "react";
import AdsItem from "../components/global/AdsItem";
import DesktopAdsPanel from "./DesktopAdsPanel";
import { fetchAdsByFilter } from "@/utils/Requests";
import PhoneAdsDrawer from "./PhoneAdsDrawer";
import InfiniteScroll from "react-infinite-scroll-component";
import PhoneSortDrawer from "./PhoneSortDrawer";
import Spinner from "../components/global/Spinner";
import { orderButtons } from "@/utils/constants";
import LoadingComponent from "../components/global/LoadingComponent";

const TotalAds = ({ brands, searchQuery }) => {
  const [adsData, setAdsData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(null);
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState("همه شهر ها");
  const [brand, setBrand] = useState("");
  const [order, setOrder] = useState("جدیدترین");
  const [yearRange, setYearRange] = useState({
    min: "",
    max: "",
  });
  const [kmRange, setKmRange] = useState({
    min: 8,
    max: 1000,
  });
  const [priceRange, setPriceRange] = useState({
    min: 10,
    max: 100000,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const adsResult = await fetchAdsByFilter({
          brand: "",
          city: "همه شهر ها",
          yearRange: { min: "", max: "" },
          kmRange: { min: "", max: "" },
          priceRange: { min: "", max: "" },
          page: 1,
          order: "",
          search: searchQuery,
        });

        setAdsData(adsResult.data.results);
        setHasMore(!!adsResult.data.next);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const fetchMoreAds = async () => {
    if (hasMore) {
      const nextPage = page + 1;
      const moreAds = await fetchAdsByFilter({
        city,
        brand,
        yearRange,
        kmRange,
        priceRange,
        page: nextPage,
        order,
      });

      if (moreAds?.data?.next) {
        setAdsData((prevAds) => [...prevAds, ...moreAds.data.results]);
        setPage(nextPage);
        setHasMore(!!moreAds.data.next);
      } else {
        setHasMore(false);
      }
    }
  };

  const handleOrderChange = async (newOrder) => {
    setOrder(newOrder);
    handleFilterApply({ order: newOrder });
  };

  const handleFilterApply = async (overrides = {}) => {
    setLoading(true);
    setPage(1);

    const filterData = {
      city,
      brand,
      yearRange,
      kmRange,
      priceRange,
      page: 1,
      order,
      ...overrides,
    };

    const filteredAds = await fetchAdsByFilter(filterData);
    setAdsData(filteredAds?.data.results || initialAdsData);
    setPage(1);
    setHasMore(filteredAds?.data.next);
    setLoading(false);
  };

  if (loading) return <LoadingComponent />;
  return (
    <div className="bg-base-200 pt-40 px-2 flex gap-2 justify-center">
      <div className="w-1/4 h-full max-w-xs hidden md:block">
        <DesktopAdsPanel
          setCity={setCity}
          setBrand={setBrand}
          setYearRange={setYearRange}
          yearRange={yearRange}
          setKmRange={setKmRange}
          setPriceRange={setPriceRange}
          handleFilterApply={handleFilterApply}
          brands={brands}
        />
      </div>

      <div className="max-w-screen-lg w-full p-1 min-h-screen">
        <div className="flex justify-between items-center">
          <PhoneSortDrawer onOrderChange={handleOrderChange} />
          <PhoneAdsDrawer
            setCity={setCity}
            setBrand={setBrand}
            setYearRange={setYearRange}
            yearRange={yearRange}
            setKmRange={setKmRange}
            setPriceRange={setPriceRange}
            handleFilterApply={handleFilterApply}
            brands={brands}
          />
        </div>
        <div className="hidden md:flex justify-center text-[15px] gap-4 p-4 mb-4 border-b border-black border-opacity-40">
          {orderButtons.map((orderButton, index) => (
            <button
              className={`${
                order === orderButton.value ? "text-secondary" : "text-black"
              }`}
              key={index}
              onClick={() => {
                handleOrderChange(orderButton.value);
              }}
            >
              {orderButton.label}
            </button>
          ))}
        </div>
        <InfiniteScroll
          dataLength={adsData?.length}
          next={fetchMoreAds}
          hasMore={hasMore}
          loader={<Spinner />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {adsData?.map((ad, index) => (
              <AdsItem key={index} bgColor="white" fillColor="black" ad={ad} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TotalAds;
