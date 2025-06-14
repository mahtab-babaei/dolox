import { addToFavorites, removeFromFavorites } from "@/utils/Requests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmDialog from "./ConfirmDialog";

const AdsItem = ({ ad, bgColor, fillColor, isEdit }) => {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(ad.is_favorited);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteAd = () => {
    setIsDialogOpen(true);
  };

  const handleClick = () => {
    router.push(`/ads/${ad.id}`);
  };

  const handleFavoriteToggle = async () => {
    try {
      const result = isFavorite
        ? await removeFromFavorites(ad.id)
        : await addToFavorites(ad.id);

      if (result.success) {
        setIsFavorite(!isFavorite);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error changing favorite:", error);
      toast.error("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  };

  if (ad === undefined) return <div className="h-72"></div>;
  return (
    <div
      className={`!rounded-[30px] bg-${bgColor} ${
        ad.is_urgent
          ? "shadow-[0_0_30px_rgba(250,69,5,1)]"
          : "shadow-xl transition-shadow duration-300"
      }`}
    >
      <div className="relative cursor-pointer z-10">
        <img
          onClick={handleClick}
          className="mx-auto object-cover w-full h-52 object-center rounded-t-[30px] bg-gray-600"
          src={ad?.images[0]?.image}
          width={370}
          height={208}
          alt={ad?.model || "car"}
        />
        <div className="absolute top-0 right-0 bg-primary text-white flex py-2 px-4 gap-2 items-center rounded-tr-[30px] rounded-bl-[14px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="15"
            viewBox="0 0 12 15"
            fill="none"
          >
            <path
              d="M10.2421 1.72856C7.89912 -0.576187 4.10037 -0.576187 1.75737 1.72856C1.20109 2.27204 0.759054 2.92124 0.45726 3.63799C0.155466 4.35475 0 5.12461 0 5.90231C0 6.68002 0.155466 7.44987 0.45726 8.16663C0.759054 8.88339 1.20109 9.53259 1.75737 10.0761L5.99937 14.2498L10.2421 10.0761C10.7984 9.53259 11.2404 8.88339 11.5422 8.16663C11.844 7.44987 11.9995 6.68002 11.9995 5.90231C11.9995 5.12461 11.844 4.35475 11.5422 3.63799C11.2404 2.92124 10.7984 2.27204 10.2421 1.72856ZM5.99937 7.87481C5.49837 7.87481 5.02812 7.67981 4.67337 7.32581C4.32219 6.97388 4.12495 6.497 4.12495 5.99981C4.12495 5.50263 4.32219 5.02575 4.67337 4.67381C5.02737 4.31981 5.49837 4.12481 5.99937 4.12481C6.50037 4.12481 6.97137 4.31981 7.32537 4.67381C7.67656 5.02575 7.87379 5.50263 7.87379 5.99981C7.87379 6.497 7.67656 6.97388 7.32537 7.32581C6.97137 7.67981 6.50037 7.87481 5.99937 7.87481Z"
              fill="#ffff"
            />
          </svg>
          <span>{ad.city}</span>
        </div>
        <div className="absolute bottom-0 w-full h-14 flex pr-2 gap-2 items-center rounded-tr-[30px] rounded-bl-[14px] justify-between ">
          <div className="flex items-center gap-2">
            <div className="tooltip text-white font-vazir" data-tip="نام برند">
              <div className="px-4 py-3 text-black bg-white rounded-[54px] flex items-center">
                <span className="pt-1 text-xs ">{ad.brand}</span>
              </div>
            </div>

            {ad.city === "همه شهر ها" && (
              <div
                className="tooltip text-white font-vazir"
                data-tip="این اگهی در سرارسر کشور دیده می شود"
              >
                <div className="p-2 text-black bg-secondary rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_296_14464)">
                      <path
                        d="M11 6.5H10V7.5H11V6.5ZM12 6.5H13V7.5H12V6.5ZM15 6.5H14V7.5H15V6.5ZM10 8.5H11V9.5H10V8.5ZM13 8.5H12V9.5H13V8.5ZM14 8.5H15V9.5H14V8.5ZM11 10.5H10V11.5H11V10.5ZM12 10.5H13V11.5H12V10.5ZM15 10.5H14V11.5H15V10.5ZM10 12.5H11V13.5H10V12.5ZM13 12.5H12V13.5H13V12.5ZM10 14.5H11V15.5H10V14.5ZM13 14.5H12V15.5H13V14.5ZM10 16.5H11V17.5H10V16.5ZM13 16.5H12V17.5H13V16.5ZM10 18.5H11V19.5H10V18.5ZM13 18.5H12V19.5H13V18.5ZM15.5 15H17V14H15.5V15ZM17 17H15.5V16H17V17ZM15.5 19H17V18H15.5V19Z"
                        fill={fillColor}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.5 2L16.5 5V12H18.5C18.6326 12 18.7598 12.0527 18.8536 12.1464C18.9473 12.2402 19 12.3674 19 12.5V21H19.5C19.6326 21 19.7598 21.0527 19.8536 21.1464C19.9473 21.2402 20 21.3674 20 21.5C20 21.6326 19.9473 21.7598 19.8536 21.8536C19.7598 21.9473 19.6326 22 19.5 22H4.5C4.36739 22 4.24021 21.9473 4.14645 21.8536C4.05268 21.7598 4 21.6326 4 21.5C4 21.3674 4.05268 21.2402 4.14645 21.1464C4.24021 21.0527 4.36739 21 4.5 21H5V10.5C5 10.3674 5.05268 10.2402 5.14645 10.1464C5.24021 10.0527 5.36739 10 5.5 10H6.5V6.5H7.5V10H8.5V2ZM9.5 3.443L15.5 5.693V12H14C13.8674 12 13.7402 12.0527 13.6464 12.1464C13.5527 12.2402 13.5 12.3674 13.5 12.5V21H9.5V3.443ZM6 11V21H8.5V11H6ZM18 21H17V20H15.5V21H14.5V13H18V21Z"
                        fill={fillColor}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_296_14464">
                        <rect width="24" height="24" fill={fillColor} />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="bg-secondary h-full text-white text-center align-middle flex items-center relative cut-right before:border-t-secondary">
            {ad.price ? (
              <>
                <span className="font-vazir-bold ps-2">تومان</span>
                <span className="font-vazir-bold min-w-16 base:min-w-24">
                  {ad.price}
                </span>
              </>
            ) : (
              <span className="font-vazir-bold px-2 min-w-16 base:min-w-24">
                قیمت توافقی
              </span>
            )}
            <div className="absolute text-xs -bottom-2  left-4  flex gap-2 ">
              {ad.is_negotiable && (
                <div className="bg-primary text-white pt-1 px-2 pb-1 rounded-full font-vazir">
                  اقساطی
                </div>
              )}
              {ad.sale_or_rent === "rent" && (
                <div className="bg-primary text-white pt-1 px-2 pb-1 rounded-full font-vazir">
                  اجاره ای
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full text-right text-${fillColor} p-4 rounded-b-[30px]`}
      >
        <div className="flex justify-between">
          <Link href={`/ads/${ad.id}`}>{ad.model}</Link>
          {ad.is_promoted && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#bc1526"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>

              <p className="text-sm font-bold text-primary">پیشنهادی</p>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div>
            <div className="flex gap-2 font-vazir items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
              >
                <path
                  d="M23.8831 14.1006L18.0585 1.01447C17.8514 0.549096 17.4002 0.250977 16.9035 0.250977H12.8373L12.9394 1.19809C12.9602 1.39111 12.8056 1.55959 12.6077 1.55959H11.3927C11.1948 1.55959 11.0402 1.39111 11.061 1.19809L11.1631 0.250977H7.09686C6.59977 0.250977 6.14852 0.549096 5.94144 1.01447L0.116856 14.1006C-0.26856 14.9672 0.34644 15.9544 1.27269 15.9544H9.47436L9.90394 11.9598C9.93977 11.6269 10.2256 11.3742 10.5669 11.3742H13.4335C13.7748 11.3742 14.0606 11.6269 14.0964 11.9598L14.526 15.9544H22.7277C23.6539 15.9544 24.2689 14.9672 23.8831 14.1006ZM10.8502 3.16101C10.8588 3.08061 10.8975 3.0062 10.9588 2.95213C11.02 2.89806 11.0995 2.86817 11.1819 2.86821H12.8189C12.9894 2.86821 13.1327 2.99457 13.1506 3.16101L13.3423 4.94318C13.3735 5.23312 13.1419 5.48544 12.8452 5.48544H11.156C10.8589 5.48544 10.6277 5.23312 10.6589 4.94318L10.8502 3.16101ZM13.1519 10.0656H10.8481C10.4523 10.0656 10.1435 9.72904 10.1852 9.34259L10.3964 7.37966C10.4323 7.04678 10.7181 6.79406 11.0594 6.79406H12.9406C13.2819 6.79406 13.5677 7.04678 13.6035 7.37966L13.8148 9.34259C13.8564 9.72904 13.5477 10.0656 13.1519 10.0656Z"
                  fill={fillColor}
                />
              </svg>
              <span className="font-vazir">{ad.kilometer}</span> کیلومتر
            </div>
            <div className="flex gap-2 font-vazir items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="21"
                viewBox="0 0 23 21"
                fill="none"
              >
                <path
                  d="M6.07344 4.00313L4.90098 7.5H18.099L16.9266 4.00313C16.7244 3.40313 16.1809 3 15.5699 3H7.43008C6.81914 3 6.27559 3.40313 6.07344 4.00313ZM1.77891 7.725L3.36016 3.01406C3.9666 1.20938 5.59727 0 7.43008 0H15.5699C17.4027 0 19.0334 1.20938 19.6398 3.01406L21.2211 7.725C22.2633 8.175 23 9.24844 23 10.5V19.5C23 20.3297 22.3576 21 21.5625 21H20.125C19.3299 21 18.6875 20.3297 18.6875 19.5V17.25H4.3125V19.5C4.3125 20.3297 3.67012 21 2.875 21H1.4375C0.642383 21 0 20.3297 0 19.5V10.5C0 9.24844 0.736719 8.175 1.77891 7.725ZM5.75 12C5.75 11.6022 5.59855 11.2206 5.32897 10.9393C5.05938 10.658 4.69375 10.5 4.3125 10.5C3.93125 10.5 3.56562 10.658 3.29603 10.9393C3.02645 11.2206 2.875 11.6022 2.875 12C2.875 12.3978 3.02645 12.7794 3.29603 13.0607C3.56562 13.342 3.93125 13.5 4.3125 13.5C4.69375 13.5 5.05938 13.342 5.32897 13.0607C5.59855 12.7794 5.75 12.3978 5.75 12ZM18.6875 13.5C19.0687 13.5 19.4344 13.342 19.704 13.0607C19.9735 12.7794 20.125 12.3978 20.125 12C20.125 11.6022 19.9735 11.2206 19.704 10.9393C19.4344 10.658 19.0687 10.5 18.6875 10.5C18.3063 10.5 17.9406 10.658 17.671 10.9393C17.4015 11.2206 17.25 11.6022 17.25 12C17.25 12.3978 17.4015 12.7794 17.671 13.0607C17.9406 13.342 18.3063 13.5 18.6875 13.5Z"
                  fill={fillColor}
                />
              </svg>
              <span className="font-vazir">{ad.year}</span>
            </div>
          </div>

          <div>
            <div className="flex gap-2 font-vazir items-center mt-2 justify-end  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 6V12H4M12 6V18M4 6V18"
                  stroke={fillColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 4C22 4.53043 21.7893 5.03914 21.4142 5.41421C21.0391 5.78929 20.5304 6 20 6C19.4696 6 18.9609 5.78929 18.5858 5.41421C18.2107 5.03914 18 4.53043 18 4C18 3.46957 18.2107 2.96086 18.5858 2.58579C18.9609 2.21071 19.4696 2 20 2C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4ZM14 4C14 4.53043 13.7893 5.03914 13.4142 5.41421C13.0391 5.78929 12.5304 6 12 6C11.4696 6 10.9609 5.78929 10.5858 5.41421C10.2107 5.03914 10 4.53043 10 4C10 3.46957 10.2107 2.96086 10.5858 2.58579C10.9609 2.21071 11.4696 2 12 2C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4ZM6 4C6 4.53043 5.78929 5.03914 5.41421 5.41421C5.03914 5.78929 4.53043 6 4 6C3.46957 6 2.96086 5.78929 2.58579 5.41421C2.21071 5.03914 2 4.53043 2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2C4.53043 2 5.03914 2.21071 5.41421 2.58579C5.78929 2.96086 6 3.46957 6 4ZM14 20C14 20.5304 13.7893 21.0391 13.4142 21.4142C13.0391 21.7893 12.5304 22 12 22C11.4696 22 10.9609 21.7893 10.5858 21.4142C10.2107 21.0391 10 20.5304 10 20C10 19.4696 10.2107 18.9609 10.5858 18.5858C10.9609 18.2107 11.4696 18 12 18C12.5304 18 13.0391 18.2107 13.4142 18.5858C13.7893 18.9609 14 19.4696 14 20ZM6 20C6 20.5304 5.78929 21.0391 5.41421 21.4142C5.03914 21.7893 4.53043 22 4 22C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20C2 19.4696 2.21071 18.9609 2.58579 18.5858C2.96086 18.2107 3.46957 18 4 18C4.53043 18 5.03914 18.2107 5.41421 18.5858C5.78929 18.9609 6 19.4696 6 20ZM20 22C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20C22 19.4696 21.7893 18.9609 21.4142 18.5858C21.0391 18.2107 20.5304 18 20 18C19.4696 18 18.9609 18.2107 18.5858 18.5858C18.2107 18.9609 18 19.4696 18 20C18 20.5304 18.2107 21.0391 18.5858 21.4142C18.9609 21.7893 19.4696 22 20 22Z"
                  stroke={fillColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-vazir">{ad.transmission}</span>
            </div>

            <div
              onClick={handleFavoriteToggle}
              className="cursor-pointer flex gap-2 font-vazir items-center mt-2 justify-end"
            >
              {isFavorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#fa4505"
                  className="size-6"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fa4505"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        {isEdit && (
          <div className="flex justify-center gap-4">
            <Link
              className="flex gap-2 w-24 items-center justify-center font-vazir bg-[#FCA474] text-white border-none py-3 px-3 rounded-lg text-sm"
              href={`/createad?id=${ad?.id}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
              ویرایش
            </Link>
            <button
              onClick={handleDeleteAd}
              className="flex gap-2 w-24 items-center justify-center font-vazir bg-[#FF0004] text-white border-none py-3 px-3 rounded-lg text-sm"
              href={`/createauto`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
              حذف
            </button>
            {isDialogOpen && (
              <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                data={{
                  brand: ad?.brand,
                  model: ad?.model,
                  city: ad?.city,
                  status: "inactive",
                }}
                id={ad.id}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdsItem;
