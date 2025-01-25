import React from "react";

const AdFeatures = ({ features }) => {
  console.log(features)
  return (
    <>
      {Array.isArray(features) && features.length > 0 && (
        <div className="bg-white py-4 px-8 rounded-2xl text-black">
          <h1 className="text-center mb-8">مشخصات فنی</h1>
          <div className="grid grid-cols-2 gap-5 text-nowrap">
            {features[0] && (
              <div className="flex flex-col items-center justify-center">
                <span className="text-base-content font-vazir">حجم موتور</span>
                <span className="font-vazir-bold">{features[0].name}</span>
              </div>
            )}
            {features[1] && (
              <div className="flex flex-col items-center justify-center">
                <span className="text-base-content font-vazir">پیشرانه</span>
                <span className="font-vazir-bold">{features[1]?.name}</span>
              </div>
            )}
            {features[2] && (
              <div className="flex flex-col items-center justify-center">
                <span className="text-base-content font-vazir">شتاب</span>
                <span className="font-vazir-bold">{features[2]?.name}</span>
              </div>
            )}
            {features[3] && (
              <div className="flex flex-col items-center justify-center">
                <span className="text-base-content font-vazir">
                  مصرف ترکیبی
                </span>
                <span className="font-vazir-bold">{features[3]?.name}</span>
              </div>
            )}
          </div>
          {/* <Link
            href="#"
            className="font-vazir text-center text-secondary flex justify-center gap-1 items-center mt-8"
          >
            اطلاعات بیشتر
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </Link> */}
        </div>
      )}
    </>
  );
};

export default AdFeatures;
