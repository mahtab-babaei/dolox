import React, { useState, useEffect } from "react";
import Image from "next/image";
import StepButtons from "../components/global/StepButtons";

const Banner = ({ step, setStep, setLogo }) => {
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleImageUpload = (files) => {
    if (files && files[0]) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedBanner(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedBanner(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    return () => {
      if (selectedBanner?.imageUrl) {
        URL.revokeObjectURL(selectedBanner.imageUrl);
      }
    };
  }, [selectedBanner]);

  if (step !== 4) return null;

  return (
    <div className="px-2 md:px-0 font-vazir">
      <div dir="rtl" className="pb-2 md:max-w-lg mx-auto px-4">
        <div className="pb-8 pt-2">
          <StepButtons
            onSubmit={() => {
              setStep(5);
              setLogo(selectedBanner);
              console.log(selectedBanner);
            }}
            step={step}
            setStep={setStep}
          />
        </div>
        <span className="text-base-content text-sm">
          آپلود کردن بنر به جذاب شدن اتوگالری شما کمک می‌کند
        </span>

        <div
          className="h-36 border-dashed flex items-center bg-base-200 border-base-content border rounded-lg justify-center mt-2"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 20H19V18H5V20ZM5 10H9V16H15V10H19L12 3L5 10Z"
                fill="#8B7676"
              />
            </svg>
            <span className="text-base-content">
              برای آپلود عکس را اینجا رها کنید
            </span>
          </label>
        </div>

        {selectedBanner && (
          <div className="grid grid-cols-1 gap-2 mt-2">
            <div className="relative rounded-[10px] shadow-gray-500 shadow-lg">
              <Image
                className="h-36 w-full object-cover rounded"
                src={selectedBanner}
                alt="Uploaded Banner"
                width={100}
                height={100}
              />
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-base-200 rounded-full flex items-center justify-center p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M4.33062 2.11919L7.93329 5.72185L11.5173 2.13785C11.5965 2.05359 11.6918 1.98618 11.7977 1.93967C11.9035 1.89316 12.0177 1.86851 12.1333 1.86719C12.3808 1.86719 12.6182 1.96552 12.7933 2.14055C12.9683 2.31559 13.0666 2.55299 13.0666 2.80052C13.0688 2.91495 13.0476 3.02862 13.0042 3.13454C12.9609 3.24047 12.8964 3.33643 12.8146 3.41652L9.18396 7.00052L12.8146 10.6312C12.9685 10.7817 13.0587 10.9855 13.0666 11.2005C13.0666 11.4481 12.9683 11.6855 12.7933 11.8605C12.6182 12.0355 12.3808 12.1339 12.1333 12.1339C12.0143 12.1388 11.8957 12.1189 11.7848 12.0756C11.6739 12.0322 11.5733 11.9662 11.4893 11.8819L7.93329 8.27919L4.33996 11.8725C4.2611 11.954 4.16688 12.019 4.06276 12.0639C3.95863 12.1087 3.84666 12.1325 3.73329 12.1339C3.48575 12.1339 3.24836 12.0355 3.07332 11.8605C2.89829 11.6855 2.79996 11.4481 2.79996 11.2005C2.79778 11.0861 2.81901 10.9724 2.86235 10.8665C2.90568 10.7606 2.9702 10.6646 3.05196 10.5845L6.68262 7.00052L3.05196 3.36985C2.89813 3.21936 2.80793 3.01557 2.79996 2.80052C2.79996 2.55299 2.89829 2.31559 3.07332 2.14055C3.24836 1.96552 3.48575 1.86719 3.73329 1.86719C3.95729 1.86999 4.17196 1.96052 4.33062 2.11919Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
