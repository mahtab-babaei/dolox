import Image from "next/image";
import React, { useState } from "react";

const Images = ({ step, setStep, images, setImages }) => {
  // const handleImageUpload = (files) => {
  //     if (files.length + images.length > 6) {
  //         alert("You can only upload a maximum of 6 images.");
  //         return;
  //     }
  //     const newImages = Array.from(files).map(file => URL.createObjectURL(file));
  //     setImages(prevImages => [...prevImages, ...newImages]);
  // };

  const handleImageUpload = (files) => {
    if (files.length + images.length > 6) {
      alert("You can only upload a maximum of 6 images.");
      return;
    }

    const newFiles = Array.from(files);
    setImages((prevImages) => [...prevImages, ...newFiles]); // Store file objects instead of URLs
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

  const removeImage = (e, image) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    setImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const setCoverImage = (image) => {
    setImages((prevImages) => {
      const filteredImages = prevImages.filter((img) => img !== image);
      return [image, ...filteredImages]; // Move the selected image to the front
    });
  };
  if (step !== 6) return null;
  return (
    <div>
      <div className='px-2 md:px-0 font-vazir'>
        <div dir="rtl" className="py-2 md:max-w-lg mx-auto px-4">
          <div dir="ltr" className="justify-between w-full flex items-center">
            <button
              type="submit"
              className="btn btn-sm bg-secondary text-white border-none"
              disabled={images.length < 1}
              onClick={() => setStep(7)} // Use Formik submit handler
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
              >
                <path
                  d="M9.242 15.9735C8.84789 15.9746 8.45747 15.8975 8.09339 15.7466C7.7293 15.5957 7.39878 15.374 7.121 15.0945L0 7.97345L7.121 0.852453C8.254 -0.281547 10.23 -0.281547 11.363 0.852453C11.929 1.41645 12.242 2.16945 12.242 2.97145C12.242 3.71745 11.972 4.42245 11.478 4.97345H16.314C17.968 4.97345 19.314 6.31945 19.314 7.97345C19.314 9.62745 17.968 10.9735 16.314 10.9735H11.478C11.971 11.5225 12.242 12.2255 12.242 12.9715C12.2436 13.3661 12.1667 13.7571 12.0158 14.1217C11.8649 14.4864 11.643 14.8173 11.363 15.0955C11.085 15.3746 10.7544 15.5959 10.3903 15.7466C10.0263 15.8973 9.636 15.9744 9.242 15.9735ZM2.828 7.97345L8.535 13.6805C8.72537 13.8625 8.97861 13.9641 9.242 13.9641C9.50539 13.9641 9.75863 13.8625 9.949 13.6805C10.138 13.4915 10.242 13.2395 10.242 12.9725C10.242 12.7055 10.138 12.4555 9.951 12.2675L6.656 8.97345H16.314C16.5715 8.96193 16.8146 8.85155 16.9927 8.66527C17.1709 8.47899 17.2703 8.23119 17.2703 7.97345C17.2703 7.71572 17.1709 7.46791 16.9927 7.28163C16.8146 7.09536 16.5715 6.98497 16.314 6.97345H6.656L9.949 3.68045C10.0422 3.58795 10.1162 3.47793 10.1668 3.35671C10.2173 3.2355 10.2434 3.10549 10.2434 2.97416C10.2435 2.84283 10.2177 2.71279 10.1673 2.5915C10.1169 2.47022 10.0431 2.36009 9.95 2.26745C9.75971 2.08499 9.50633 1.98304 9.2427 1.98285C8.97907 1.98267 8.72554 2.08426 8.535 2.26645L2.828 7.97345Z"
                  fill="white"
                />
              </svg>
              <span className="font-vazir">ادامه</span>
            </button>

            <button
              className="btn-sm text-secondary bg-transparent shadow-none border-none"
              onClick={() => setStep(step - 1)}
            >
              <span className="font-vazir font-bold">قبلی</span>
            </button>
          </div>
          <h2 className="text-base-content">
            در آپلود عکس دقت کنید؛ تصاویر جذاب‌تر بازدید آگهی شما را افزایش
            می‌دهند.
          </h2>
          <div
            className="h-36 border-dashed flex items-center bg-base-200 border-base-content border rounded-lg justify-center mt-2"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept="image/*"
              multiple
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
              <span>برای آپلود عکس ها را اینجا رها کنید </span>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative  rounded-[10px] ${
                  index === 0
                    ? "shadow-primary shadow-lg border-primary border-4"
                    : ""
                }`}
                onClick={() => setCoverImage(image)}
              >
                <Image
                  className="h-36 w-full object-cover rounded"
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Image ${index + 1}`}
                  width={100}
                  height={100}
                />
                <button
                  onClick={(e) => removeImage(e, image)}
                  className="absolute -top-2 -right-2 bg-base-200 rounded-full flex items-center justify-center p-2"
                >
                  <svg
                    onClick={() => removeImage(image)}
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
                <button
                  className={`absolute bottom-0 w-full text-white ${
                    index === 0 ? "bg-black bg-opacity-60" : ""
                  } p-1 `}
                >
                  {index === 0 ? "کاور" : ""}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-2">
            {images.length < 1
              ? "حداقل یک تصویر انتخاب کنید."
              : images.length > 6
              ? "حداکثر 6 تصویر می‌توانید انتخاب  کنید."
              : `${images.length} تصویر انتخاب شده.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Images;
