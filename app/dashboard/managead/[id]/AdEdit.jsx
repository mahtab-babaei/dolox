import React from "react";
import Image from "next/image";
import Link from "next/link";

const AdEdit = ({ adDetails }) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col h-fit gap-4 items-center bg-white p-6 rounded-[34px]">
        <Image
          className="rounded-2xl shadow-gray-400 shadow-md"
          alt="ad image"
          width={300}
          height={150}
          src={adDetails.images[0].image}
        />
        <h1 className="text-2xl">{adDetails.model}</h1>
        <h2 className="font-vazir font-bold">
          {adDetails.price ? adDetails.price : "قیمت توافقی"}
        </h2>
        <Link className="w-full" href={`/ads/${adDetails.id}`}>
          <button className="btn bg-[#bc1526] text-white w-full font-vazir font-medium text-base flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            مشاهده آگهی
          </button>
        </Link>
        <button className="btn bg-[#fca474] text-white w-full font-vazir font-medium text-base flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
          ویرایش آگهی
        </button>
        <button className="btn bg-[#ff051f] text-white w-full font-vazir font-medium text-base flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
          حذف آگهی
        </button>
      </div>
      <div className="bg-white p-8 rounded-[34px]">
        <div className="flex items-center gap-2 pb-6">
          <div className="h-[1px] w-full bg-black opacity-40" />
          <h2 className="text-2xl text-nowrap">ارتقا آگهی</h2>
          <div className="h-[1px] w-full bg-black opacity-40" />
        </div>
        <div
          dir="rtl"
          className="flex bg-[#FF2B41] h-28 items-center justify-between p-6 text-white rounded-2xl mt-2 cursor-pointer"
        >
          <div>
            <h2>پلکان</h2>
            <p className="font-vazir">اگهیتو بیار بالای دیگر اگهی ها !</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="43"
            viewBox="0 0 54 43"
            fill="none"
          >
            <path
              d="M17.919 42.833C13.0835 42.833 8.94209 41.1991 5.49487 37.9314C2.04764 34.6636 0.322143 30.6308 0.318365 25.833C0.314587 21.0352 2.13359 17.0591 5.77537 13.9047C9.41714 10.7502 13.721 9.05214 18.6869 8.81036L12.8644 2.93969L14.8675 0.936523L24.1892 10.2497L14.8732 19.5685L12.8672 17.5455L18.7322 11.6777C14.5464 11.9025 10.9037 13.3229 7.80403 15.939C4.70625 18.5532 3.15737 21.8512 3.15737 25.833C3.15737 29.8261 4.61181 33.1855 7.5207 35.9112C10.4258 38.6369 13.9089 39.9997 17.97 39.9997H23.75V42.833H17.919ZM32.25 19.6224V3.16636H53.5V19.6224H32.25ZM32.25 42.833V26.377H53.5V42.833H32.25ZM35.0834 39.9997H50.6667V29.2104H35.0834V39.9997Z"
              fill="white"
            />
          </svg>
        </div>
        <div
          dir="rtl"
          className="flex bg-[#E9172D] h-28 items-center justify-between p-6 text-white rounded-2xl mt-2 cursor-pointer"
        >
          <div>
            <h2>ثبت اگهی در تمام شهر ها</h2>
            <p className="font-vazir">اگهی شما در کل کشور دیده می شود !</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="64"
            viewBox="0 0 51 64"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.3438 0L39.8438 9.6V32H46.2188C46.6414 32 47.0468 32.1686 47.3457 32.4686C47.6446 32.7687 47.8125 33.1757 47.8125 33.6V60.8H49.4062C49.8289 60.8 50.2343 60.9686 50.5332 61.2686C50.8321 61.5687 51 61.9757 51 62.4C51 62.8243 50.8321 63.2313 50.5332 63.5314C50.2343 63.8314 49.8289 64 49.4062 64H1.59375C1.17106 64 0.765685 63.8314 0.466799 63.5314C0.167913 63.2313 0 62.8243 0 62.4C0 61.9757 0.167913 61.5687 0.466799 61.2686C0.765685 60.9686 1.17106 60.8 1.59375 60.8H3.1875V27.2C3.1875 26.7757 3.35541 26.3687 3.6543 26.0686C3.95318 25.7686 4.35856 25.6 4.78125 25.6H7.96875V14.4H11.1562V25.6H14.3438V0ZM17.5312 4.6176L36.6562 11.8176V32H31.875C31.4523 32 31.0469 32.1686 30.748 32.4686C30.4492 32.7687 30.2812 33.1757 30.2812 33.6V60.8H17.5312V4.6176ZM6.375 28.8V60.8H14.3438V28.8H6.375ZM44.625 60.8H41.4375V57.6H36.6562V60.8H33.4688V35.2H44.625V60.8Z"
              fill="white"
            />
          </svg>
        </div>
        <div
          dir="rtl"
          className="flex bg-[#D2172A] h-28 items-center justify-between p-6 text-white rounded-2xl mt-2 cursor-pointer specialad"
        >
          <div>
            <h2>ثبت سفارشی آگهی </h2>
            <p className="font-vazir">
              اگهی خود را از دیگر اگهی ها متمایز کنید !
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
          >
            <path
              d="M39 14C42.2728 14.0008 45.5 14.7666 48.4243 16.2362C51.3485 17.7057 53.8888 19.8384 55.8425 22.4641C57.7962 25.0898 59.1091 28.1357 59.6765 31.3589C60.244 34.5821 60.0503 37.8933 59.1108 41.0283C58.1713 44.1633 56.5121 47.0353 54.2655 49.4152C52.019 51.7951 49.2473 53.617 46.1716 54.7355C43.0959 55.854 39.8014 56.2382 36.5509 55.8573C33.3004 55.4765 30.1838 54.3412 27.45 52.542V52.5H27.387C23.6273 50.0061 20.7707 46.3676 19.2403 42.1234C17.7099 37.8792 17.587 33.255 18.8899 28.9355C20.1928 24.6161 22.8522 20.831 26.4742 18.141C30.0962 15.451 34.4883 13.999 39 14ZM18.8925 49C19.7722 50.26 20.7592 51.4267 21.8535 52.5H5.75C5.28587 52.5 4.84075 52.6844 4.51256 53.0126C4.18437 53.3408 4 53.7859 4 54.25C4 54.7141 4.18437 55.1592 4.51256 55.4874C4.84075 55.8156 5.28587 56 5.75 56H26.372C30.0894 58.2339 34.3332 59.441 38.6699 59.4979C43.0065 59.5548 47.2805 58.4596 51.0553 56.324C54.8301 54.1884 57.9703 51.0891 60.1553 47.3427C62.3402 43.5963 63.4914 39.337 63.4914 35C63.4914 30.663 62.3402 26.4037 60.1553 22.6573C57.9703 18.9109 54.8301 15.8116 51.0553 13.676C47.2805 11.5404 43.0065 10.4452 38.6699 10.5021C34.3332 10.559 30.0894 11.7661 26.372 14H9.25C8.78587 14 8.34075 14.1844 8.01256 14.5126C7.68437 14.8408 7.5 15.2859 7.5 15.75C7.5 16.2141 7.68437 16.6592 8.01256 16.9874C8.34075 17.3156 8.78587 17.5 9.25 17.5H21.8535C19.5222 19.7788 17.6705 22.5011 16.4076 25.5066C15.1447 28.5121 14.4961 31.74 14.5 35C14.5 38.759 15.347 42.315 16.859 45.5H12.75C12.2859 45.5 11.8408 45.6844 11.5126 46.0126C11.1844 46.3408 11 46.7859 11 47.25C11 47.7141 11.1844 48.1592 11.5126 48.4874C11.8408 48.8156 12.2859 49 12.75 49H18.8925ZM29.1895 27.664C27.6058 29.7819 26.75 32.3555 26.75 35C26.75 37.751 27.66 40.292 29.1895 42.336L32.9695 38.556C32.3345 37.4786 31.9997 36.2507 32 35C32 33.705 32.3535 32.487 32.9695 31.444L29.1895 27.664ZM31.664 25.1895L35.444 28.9695C36.5214 28.3345 37.7493 27.9997 39 28C40.295 28 41.513 28.3535 42.556 28.9695L46.336 25.1895C44.2181 23.6058 41.6445 22.75 39 22.75C36.249 22.75 33.708 23.66 31.664 25.1895ZM48.814 27.664L45.034 31.444C45.6689 32.5217 46.0034 33.7497 46.0028 35.0005C46.0021 36.2512 45.6664 37.479 45.0305 38.556L48.8105 42.336C50.3435 40.292 51.25 37.751 51.25 35C51.25 32.249 50.3435 29.708 48.814 27.664ZM46.3325 44.814L42.5525 41.034C41.4757 41.6672 40.2491 42.0007 39 42C37.705 42 36.487 41.6465 35.444 41.0305L31.664 44.8105C33.708 46.3435 36.249 47.25 39 47.25C41.751 47.25 44.292 46.34 46.336 44.8105M23.25 35C23.25 32.9317 23.6574 30.8836 24.4489 28.9727C25.2404 27.0619 26.4005 25.3256 27.8631 23.8631C29.3256 22.4005 31.0619 21.2404 32.9727 20.4489C34.8836 19.6574 36.9317 19.25 39 19.25C41.0683 19.25 43.1164 19.6574 45.0273 20.4489C46.9381 21.2404 48.6744 22.4005 50.1369 23.8631C51.5995 25.3256 52.7596 27.0619 53.5511 28.9727C54.3426 30.8836 54.75 32.9317 54.75 35C54.75 39.1772 53.0906 43.1832 50.1369 46.1369C47.1832 49.0906 43.1772 50.75 39 50.75C34.8228 50.75 30.8168 49.0906 27.8631 46.1369C24.9094 43.1832 23.25 39.1772 23.25 35ZM35.5 35C35.5 35.9283 35.8687 36.8185 36.5251 37.4749C37.1815 38.1313 38.0717 38.5 39 38.5C39.9283 38.5 40.8185 38.1313 41.4749 37.4749C42.1313 36.8185 42.5 35.9283 42.5 35C42.5 34.0717 42.1313 33.1815 41.4749 32.5251C40.8185 31.8687 39.9283 31.5 39 31.5C38.0717 31.5 37.1815 31.8687 36.5251 32.5251C35.8687 33.1815 35.5 34.0717 35.5 35Z"
              fill="white"
            />
          </svg>
        </div>
        <div
          dir="rtl"
          className="flex bg-[#B21828] h-28 items-center justify-between p-6 text-white rounded-2xl mt-2 cursor-pointer"
        >
          <div>
            <h2>ثبت اگهی سفارشی در تمام شهر ها </h2>
            <p className="font-vazir">
              به بهترین حالت ممکن در دولوکس دیده شوید ! !
            </p>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
            >
              <path
                d="M39 14C42.2728 14.0008 45.5 14.7666 48.4243 16.2362C51.3485 17.7057 53.8888 19.8384 55.8425 22.4641C57.7962 25.0898 59.1091 28.1357 59.6765 31.3589C60.244 34.5821 60.0503 37.8933 59.1108 41.0283C58.1713 44.1633 56.5121 47.0353 54.2655 49.4152C52.019 51.7951 49.2473 53.617 46.1716 54.7355C43.0959 55.854 39.8014 56.2382 36.5509 55.8573C33.3004 55.4765 30.1838 54.3412 27.45 52.542V52.5H27.387C23.6273 50.0061 20.7707 46.3676 19.2403 42.1234C17.7099 37.8792 17.587 33.255 18.8899 28.9355C20.1928 24.6161 22.8522 20.831 26.4742 18.141C30.0962 15.451 34.4883 13.999 39 14ZM18.8925 49C19.7722 50.26 20.7592 51.4267 21.8535 52.5H5.75C5.28587 52.5 4.84075 52.6844 4.51256 53.0126C4.18437 53.3408 4 53.7859 4 54.25C4 54.7141 4.18437 55.1592 4.51256 55.4874C4.84075 55.8156 5.28587 56 5.75 56H26.372C30.0894 58.2339 34.3332 59.441 38.6699 59.4979C43.0065 59.5548 47.2805 58.4596 51.0553 56.324C54.8301 54.1884 57.9703 51.0891 60.1553 47.3427C62.3402 43.5963 63.4914 39.337 63.4914 35C63.4914 30.663 62.3402 26.4037 60.1553 22.6573C57.9703 18.9109 54.8301 15.8116 51.0553 13.676C47.2805 11.5404 43.0065 10.4452 38.6699 10.5021C34.3332 10.559 30.0894 11.7661 26.372 14H9.25C8.78587 14 8.34075 14.1844 8.01256 14.5126C7.68437 14.8408 7.5 15.2859 7.5 15.75C7.5 16.2141 7.68437 16.6592 8.01256 16.9874C8.34075 17.3156 8.78587 17.5 9.25 17.5H21.8535C19.5222 19.7788 17.6705 22.5011 16.4076 25.5066C15.1447 28.5121 14.4961 31.74 14.5 35C14.5 38.759 15.347 42.315 16.859 45.5H12.75C12.2859 45.5 11.8408 45.6844 11.5126 46.0126C11.1844 46.3408 11 46.7859 11 47.25C11 47.7141 11.1844 48.1592 11.5126 48.4874C11.8408 48.8156 12.2859 49 12.75 49H18.8925ZM29.1895 27.664C27.6058 29.7819 26.75 32.3555 26.75 35C26.75 37.751 27.66 40.292 29.1895 42.336L32.9695 38.556C32.3345 37.4786 31.9997 36.2507 32 35C32 33.705 32.3535 32.487 32.9695 31.444L29.1895 27.664ZM31.664 25.1895L35.444 28.9695C36.5214 28.3345 37.7493 27.9997 39 28C40.295 28 41.513 28.3535 42.556 28.9695L46.336 25.1895C44.2181 23.6058 41.6445 22.75 39 22.75C36.249 22.75 33.708 23.66 31.664 25.1895ZM48.814 27.664L45.034 31.444C45.6689 32.5217 46.0034 33.7497 46.0028 35.0005C46.0021 36.2512 45.6664 37.479 45.0305 38.556L48.8105 42.336C50.3435 40.292 51.25 37.751 51.25 35C51.25 32.249 50.3435 29.708 48.814 27.664ZM46.3325 44.814L42.5525 41.034C41.4757 41.6672 40.2491 42.0007 39 42C37.705 42 36.487 41.6465 35.444 41.0305L31.664 44.8105C33.708 46.3435 36.249 47.25 39 47.25C41.751 47.25 44.292 46.34 46.336 44.8105M23.25 35C23.25 32.9317 23.6574 30.8836 24.4489 28.9727C25.2404 27.0619 26.4005 25.3256 27.8631 23.8631C29.3256 22.4005 31.0619 21.2404 32.9727 20.4489C34.8836 19.6574 36.9317 19.25 39 19.25C41.0683 19.25 43.1164 19.6574 45.0273 20.4489C46.9381 21.2404 48.6744 22.4005 50.1369 23.8631C51.5995 25.3256 52.7596 27.0619 53.5511 28.9727C54.3426 30.8836 54.75 32.9317 54.75 35C54.75 39.1772 53.0906 43.1832 50.1369 46.1369C47.1832 49.0906 43.1772 50.75 39 50.75C34.8228 50.75 30.8168 49.0906 27.8631 46.1369C24.9094 43.1832 23.25 39.1772 23.25 35ZM35.5 35C35.5 35.9283 35.8687 36.8185 36.5251 37.4749C37.1815 38.1313 38.0717 38.5 39 38.5C39.9283 38.5 40.8185 38.1313 41.4749 37.4749C42.1313 36.8185 42.5 35.9283 42.5 35C42.5 34.0717 42.1313 33.1815 41.4749 32.5251C40.8185 31.8687 39.9283 31.5 39 31.5C38.0717 31.5 37.1815 31.8687 36.5251 32.5251C35.8687 33.1815 35.5 34.0717 35.5 35Z"
                fill="white"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
            >
              <g clipPath="url(#clip0_505_811)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.3438 0L35.8438 9.6V32H42.2188C42.6414 32 43.0468 32.1686 43.3457 32.4686C43.6446 32.7687 43.8125 33.1757 43.8125 33.6V60.8H45.4062C45.8289 60.8 46.2343 60.9686 46.5332 61.2686C46.8321 61.5687 47 61.9757 47 62.4C47 62.8243 46.8321 63.2313 46.5332 63.5314C46.2343 63.8314 45.8289 64 45.4062 64H-2.40625C-2.82894 64 -3.23432 63.8314 -3.5332 63.5314C-3.83209 63.2313 -4 62.8243 -4 62.4C-4 61.9757 -3.83209 61.5687 -3.5332 61.2686C-3.23432 60.9686 -2.82894 60.8 -2.40625 60.8H-0.8125V27.2C-0.8125 26.7757 -0.644587 26.3687 -0.345701 26.0686C-0.046815 25.7686 0.358561 25.6 0.78125 25.6H3.96875V14.4H7.15625V25.6H10.3438V0ZM13.5312 4.6176L32.6562 11.8176V32H27.875C27.4523 32 27.0469 32.1686 26.748 32.4686C26.4492 32.7687 26.2812 33.1757 26.2812 33.6V60.8H13.5312V4.6176ZM2.375 28.8V60.8H10.3438V28.8H2.375ZM40.625 60.8H37.4375V57.6H32.6562V60.8H29.4688V35.2H40.625V60.8Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_505_811">
                  <rect width="70" height="70" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdEdit;
