"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import ConfirmDeleteAuto from "./ConfirmDeleteAuto";

const ProfileAuto = ({ exhibition, picture }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAutoDelete = () => {
    setIsDialogOpen(true);
  };

  const patchData = {
    contact_phone: exhibition?.contact_phone,
    is_deleted: true,
  };

  console.log(exhibition.contact_phone);
  return (
    <div
      className={`my-2 rounded-[6px] flex justify-between flex-col md:flex-row ${
        exhibition.is_deleted ? "bg-gray-500" : " bg-primary"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center w-full md:justify-start justify-center">
        <img
          className="h-24 w-24 object-cover m-2 rounded-[16px] bg-gray-200"
          src={picture}
          width={96}
          height={96}
          alt="ad"
        />
        <h2 className="px-4 text-white text-center">
          {exhibition.company_name}
        </h2>
      </div>
      <div className="md:border-r-2 flex flex-col sm:flex-row gap-2 items-center justify-center py-3 px-6 sm:min-w-[270px] rounded-l-[6px]">
        <Link
          href="/dashboard/manageauto"
          className="btn bg-white text-black border-none hover:text-white"
        >
          مدیریت اتوگالری
        </Link>
        <button
          disabled={exhibition.is_deleted}
          onClick={handleAutoDelete}
          className="btn bg-white text-black border-none hover:text-white disabled:bg-gray-50 disabled:text-gray-500"
        >
          حذف اتوگالری
        </button>
        {isDialogOpen && (
          <ConfirmDeleteAuto
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            data={patchData}
            id={exhibition?.id}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileAuto;
