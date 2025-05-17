import { joinChatRoom } from "@/utils/Requests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AdTitle = ({ id, model, year, city, price, phone }) => {
  const [loading, setLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const router = useRouter();

  const handleChatClick = async () => {
    setLoading(true);
    try {
      const result = await joinChatRoom(id);
      if (result.success && result.roomName) {
        const roomName = Array.isArray(result.roomName)
          ? result.roomName[0]
          : result.roomName;
        router.push(`/dashboard/chat?room=${roomName}`);
      } else {
        toast.error(result.message || "اتصال به چت ناموفق بود.");
      }
    } catch (error) {
      console.error("Error joining chat room: ", error);
      toast.error("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl h-fit">
      <h1 className="mb-2 text-[18px] text-black">{model}</h1>
      <p className="text-base-content font-vazir-bold">{year}</p>
      <div className="flex justify-between items-center font-vazir-bold mb-2">
        <span className="text-base-content flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>
          {city}
        </span>
        {price ? (
          <div className="text-black">
            <span>تومان</span>
            <span className="text-[20px]"> {price} </span>
          </div>
        ) : (
          <span className="text-black">قیمت توافقی</span>
        )}
      </div>
      <div className="flex gap-2 justify-center items-center mb-2">
        <button
          onClick={() => setShowNumber(!showNumber)}
          className="btn px-2 sm:px-4 bg-secondary text-white border-none"
        >
          <div className="flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            تماس با فروشنده
          </div>
        </button>
        <button
          className="btn px-2 sm:px-4 border border-secondary bg-white text-secondary"
          onClick={handleChatClick}
        >
          <div className="flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                clipRule="evenodd"
              />
            </svg>
            {loading ? "در حال بارگذاری..." : "چت"}
          </div>
        </button>
        <button
          className="btn px-2 sm:px-4 border border-secondary bg-white text-secondary"
          onClick={() => {
            navigator.clipboard
              .writeText(window.location.href)
              .then(() => {
                toast.success("لینک آگهی با موفقیت کپی شد.");
              })
              .catch(() => {
                toast.error("خطا در کپی کردن لینک.");
              });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {showNumber && (
        <div className="my-4 font-vazir text-base-100 flex justify-between align-middle">
          <span className="text-base-100">{phone}</span>
          <a
            href={`tel:${phone}`}
            className="flex gap-2 text-secondary cursor-pointer"
          >
            <span>تماس</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
              />
            </svg>
          </a>
        </div>
      )}
      <div className="flex justify-between items-center text-primary text-sm font-vazir">
        <Link className="flex items-center justify-center gap-1" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
          نکات قبل از معامله
        </Link>
        <Link href="#">گزارش تخلف</Link>
      </div>
    </div>
  );
};

export default AdTitle;
