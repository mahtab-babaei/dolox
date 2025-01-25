"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/images/sampleautogallery.png";

const AutoGalleryItem = ({ autoGallery }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/autogallery/${autoGallery?.id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="!rounded-[30px] shadow bg-white cursor-pointer hover:shadow-lg"
    >
      <div className="relative z-10">
        <Image
          className="aspect-video object-cover w-full object-center rounded-t-[30px]"
          src={autoGallery?.logo || logo} // Provide a fallback image
          alt="car"
          width={370}
          height={208}
        />
        <div className="absolute bottom-0 w-full h-14 flex pr-2 gap-2 items-center rounded-tr-[30px] rounded-bl-[14px] justify-between">
          <div className="flex items-center gap-2"></div>
          <div className="bg-secondary h-full px-8 gap-2 text-white text-center align-middle flex items-center relative cut-right before:border-t-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 15"
              fill="none"
            >
              <path
                d="M10.2421 1.72856C7.89912 -0.576187 4.10037 -0.576187 1.75737 1.72856C1.20109 2.27204 0.759054 2.92124 0.45726 3.63799C0.155466 4.35475 0 5.12461 0 5.90231C0 6.68002 0.155466 7.44987 0.45726 8.16663C0.759054 8.88339 1.20109 9.53259 1.75737 10.0761L5.99937 14.2498L10.2421 10.0761C10.7984 9.53259 11.2404 8.88339 11.5422 8.16663C11.844 7.44987 11.9995 6.68002 11.9995 5.90231C11.9995 5.12461 11.844 4.35475 11.5422 3.63799C11.2404 2.92124 10.7984 2.27204 10.2421 1.72856ZM5.99937 7.87481C5.49837 7.87481 5.02812 7.67981 4.67337 7.32581C4.32219 6.97388 4.12495 6.497 4.12495 5.99981C4.12495 5.50263 4.32219 5.02575 4.67337 4.67381C5.02737 4.31981 5.49837 4.12481 5.99937 4.12481C6.50037 4.12481 6.97137 4.31981 7.32537 4.67381C7.67656 5.02575 7.87379 5.50263 7.87379 5.99981C7.87379 6.497 7.67656 6.97388 7.32537 7.32581C6.97137 7.67981 6.50037 7.87481 5.99937 7.87481Z"
                fill="white"
              />
            </svg>
            <span>{autoGallery?.city}</span>
          </div>
        </div>
      </div>
      <div className="bg-white w-full text-right pt-4 px-6 rounded-b-[30px]">
        <h2>{autoGallery?.company_name}</h2>
        <p className="font-vazir h-fit overflow-hidden py-4">
          {autoGallery?.description
            ?.split(" ")
            .slice(0, 25)
            .join(" ")
            .concat(
              autoGallery?.description?.split(" ").length > 30 ? "..." : ""
            )}{" "}
        </p>

        <div className="flex gap-2 text-secondary pb-4">
          {autoGallery?.sells_domestic_cars && (
            <div className="w-1/3 font-vazir border-secondary border text-center rounded-full py-2">
              داخلی
            </div>
          )}
          {autoGallery?.sells_foreign_cars && (
            <div className="w-1/3 font-vazir border-secondary border text-center rounded-full py-2">
              خارجی
            </div>
          )}
          {autoGallery?.sells_chinese_cars && (
            <div className="w-1/3 font-vazir border-secondary border text-center rounded-full py-2">
              چینی
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoGalleryItem;
