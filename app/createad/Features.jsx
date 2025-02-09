import React, { useState } from "react";

const Features = ({
  setEngineSize,
  engineSize,
  setEngine,
  engine,
  setAcceleration,
  acceleration,
  setCombinedUse,
  combinedUse,
}) => {
  const [toggleOpen, setToggleOpen] = useState(false);

  const fields = [
    {
      id: 1,
      label: "حجم موتور:",
      placeholder: "1.4 لیتر",
      value: engineSize,
      setValue: setEngineSize,
    },
    {
      id: 2,
      label: "پیشرانه:",
      placeholder: "6 سیلندر",
      value: engine,
      setValue: setEngine,
    },
    {
      id: 3,
      label: "شتاب:",
      placeholder: "15.1 ثانیه",
      value: acceleration,
      setValue: setAcceleration,
    },
    {
      id: 4,
      label: "مصرف ترکیبی:",
      placeholder: "6.4 لیتر در 100 کیلومتر",
      value: combinedUse,
      setValue: setCombinedUse,
    },
  ];

  return (
    <>
      <button
        className="mt-4 font-bold font-digirastin"
        onClick={() => setToggleOpen(!toggleOpen)}
      >
        مشخصات فنی +
      </button>
      {toggleOpen && (
        <div>
          {fields.map((field) => (
            <label
              key={field.id}
              className="mt-8 mb-1 border-none input input-bordered flex items-center gap-2 md:max-w-screen-sm mx-auto bg-neutral text-black"
            >
              {field.label}
              <input
                dir="rtl"
                type="text"
                className="grow placeholder:text-base-content"
                placeholder={field.placeholder}
                defaultValue={field.value || ""}
                onChange={(e) => field.setValue(e.target.value)}
              />
            </label>
          ))}
        </div>
      )}
    </>
  );
};

export default Features;
