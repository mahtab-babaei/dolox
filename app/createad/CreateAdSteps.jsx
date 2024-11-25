import React from "react";

const CreateAdSteps = ({ step = 0 }) => {
  const stages = [
    { id: 0, label: "برند" },
    { id: 1, label: "مدل" },
    { id: 2, label: "سال" },
    { id: 3, label: "بدنه" },
    { id: 4, label: "توضیحات" },
    { id: 5, label: "قیمت" },
    { id: 6, label: "تصاویر" },
    { id: 7, label: "مکان" },
    { id: 8, label: "ثبت" },
  ];
  return (
    <div className="flex mx-auto w-full text-center justify-center md:gap-4 gap-2 pt-2 text-xs md:text-lg">
      {stages.map((stage) => (
        <span
        key={stage.id}
          className={`${
            step === stage.id ? "underline text-secondary underline-offset-8" : ""
          } cursor-pointer `}
        >
          {stage.label}
        </span>
      ))}
    </div>
  );
};

export default CreateAdSteps;
