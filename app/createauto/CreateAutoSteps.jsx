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
            } cursor-pointer`}
          >
            {stage.label}
          </span>
        ))}
      </div>

      <div className="flex sm:hidden justify-center pt-2">
        <span className=" text-secondary underline underline-offset-8">{currentStage?.label}</span>
      </div>
    </>
  );
};

export default CreateAutoSteps;
