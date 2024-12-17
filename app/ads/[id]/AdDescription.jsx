import React from "react";
import Badge from "./Badge";

const AdDescription = ({
  description,
  isNegotiable,
  saleOrRent,
  exhibition,
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <h1 className="mb-2 text-[18px]">توضیحات</h1>
      <p className="font-vazir mb-2">{description}</p>
      <div className="flex items-center gap-1">
        {isNegotiable && <Badge>اقساطی</Badge>}
        {exhibition && <Badge>اتوگالری</Badge>}
        {saleOrRent === "rent" ? <Badge>اجاره ای</Badge> : <Badge>فروشی</Badge>}
      </div>
    </div>
  );
};

export default AdDescription;
