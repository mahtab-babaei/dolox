import React, { useState } from "react";

const Features = ({
  setEngineSize,
  setEngine,
  setAcceleration,
  setCombinedUse,
}) => {
  const [toggleOpen, setToggleOpen] = useState(false);

  const fields = [
    {
      id: 1,
      label: "حجم موتور:",
      placeholder: "1.4 لیتر",
      value: (e) => setEngineSize(e.target.value),
    },
    {
      id: 2,
      label: "پیشرانه:",
      placeholder: "6 سیلندر",
      value: (e) => setEngine(e.target.value),
    },
    {
      id: 3,
      label: "شتاب:",
      placeholder: "15.1 ثانیه",
      value: (e) => setAcceleration(e.target.value),
    },
    {
      id: 4,
      label: "مصرف ترکیبی:",
      placeholder: "6.4 لیتر در 100 کیلومتر",
      value: (e) => setCombinedUse(e.target.value),
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
                onChange={field.value}
              />
            </label>
          ))}
        </div>
      )}
    </>
  );
};

export default Features;
