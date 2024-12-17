import React from "react";

const CreateAutoSteps = ({ step = 0 }) => {
  const stages = [
    { id: 0, label: "تماس" },
    { id: 1, label: "مشخصات اتوگالری" },
    { id: 2, label: "آدرس" },
    { id: 3, label: "شبکه های اجتماعی" },
    { id: 4, label: "عکس ها" },
    { id: 5, label: "مدارک" },
  ];
  return (
    <div className="flex mx-auto w-full text-center justify-center md:gap-4 gap-2 pt-2 text-xs md:text-lg">
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
  );
};

export default CreateAutoSteps;
