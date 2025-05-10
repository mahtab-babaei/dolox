import ConfirmDialog from "@/app/components/global/ConfirmDialog";
import Package from "@/app/createad/Package";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const AdEdit = ({ adDetails }) => {
  console.log(adDetails)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteAd = () => {
    setIsDialogOpen(true);
  };

  const patchData = {
    brand: adDetails?.brand,
    model: adDetails?.model,
    city: adDetails?.city,
    status: "inactive",
  };

  return (
    <div className="grid base:flex gap-2">
      <div className="flex flex-col h-fit gap-4 items-center bg-white p-6 rounded-[34px]">
        {adDetails?.images?.length > 0 && adDetails?.images[0]?.image ? (
          <Image
            className="rounded-2xl shadow-gray-400 shadow-md"
            alt="ad image"
            width={300}
            height={150}
            src={adDetails?.images[0].image}
          />
        ) : (
          <div className="w-[300px] h-[150px] flex items-center justify-center bg-gray-200 rounded-2xl">
            <p className="text-gray-500 font-vazir">تصویری موجود نیست</p>
          </div>
        )}
        <h1 className="text-2xl text-base-100">{adDetails?.model}</h1>
        <h2 className="font-vazir font-bold text-base-100">
          {adDetails?.price ? adDetails.price : "قیمت توافقی"}
        </h2>
        <Link className="w-full" href={`/ads/${adDetails?.id}`}>
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
        <Link
          href={`/createad?id=${adDetails?.id}`}
          className="btn bg-[#fca474] text-white w-full font-vazir font-medium text-base flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
          ویرایش آگهی
        </Link>
        <button
          onClick={handleDeleteAd}
          className="btn bg-[#ff051f] text-white w-full font-vazir font-medium text-base flex items-center"
        >
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
        {isDialogOpen && (
          <ConfirmDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            data={patchData}
            id={adDetails.id}
          />
        )}
      </div>
      <div className="bg-white p-8 rounded-[34px]">
        <div className="flex items-center gap-2 pb-6">
          <div className="h-[1px] w-full bg-black opacity-40" />
          <h2 className="text-2xl text-nowrap text-base-100">ارتقا آگهی</h2>
          <div className="h-[1px] w-full bg-black opacity-40" />
        </div>
        <Package submitedAdID={adDetails.id} />
      </div>
    </div>
  );
};

export default AdEdit;
