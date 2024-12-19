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

  const currentStage = stages.find((stage) => stage.id === step);
  return (
    <>
      <div className="hidden sm:flex text-center justify-center gap-4 pt-2 pb-6">
        {stages.map((stage) => (
          <span
            key={stage.id}
            className={`${
              step === stage.id
                ? "underline text-secondary underline-offset-8"
                : ""
            } cursor-pointer `}
          >
            {stage.label}
          </span>
        ))}
      </div>

      <div className="flex sm:hidden justify-center pt-2">
        <span className=" text-secondary underline underline-offset-8">
          {currentStage?.label}
        </span>
      </div>
    </>
  );
};

export default CreateAdSteps;
