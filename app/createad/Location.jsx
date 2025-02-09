import { cities } from "@/utils/constants";
import React, { useState, useEffect } from "react";
import ErrorMessage from "../components/global/ErrorMessage";
import StepButtons from "../components/global/StepButtons";

const Location = ({ step, setStep, setCity, city }) => {
  const [selectedCity, setSelectedCity] = useState(""); // State to track selected city
  const [error, setError] = useState(""); // State to track error message

  // Set selectedCity to the value of city if city has a value, otherwise keep it as empty string
  useEffect(() => {
    if (city) {
      setSelectedCity(city);
    } else {
      setSelectedCity("");
    }
  }, [city]); // Runs whenever city prop changes

  const handleNextStep = () => {
    if (selectedCity) {
      setCity(selectedCity);
      setStep(8);
      setError(""); // Clear any previous error
    } else {
      setError("لطفا یک شهر انتخاب کنید"); // Show error message if no city selected
    }
  };

  if (step !== 7) return null;

  return (
    <div className="px-2 md:px-0 h-72">
      <div dir="ltr" className="pb-2 pt-8 md:max-w-lg mx-auto">
        <StepButtons step={step} setStep={setStep} onSubmit={handleNextStep} />

        <label dir="rtl" className="form-control w-full font-vazir mt-8">
          <select
            id="bodyColor"
            className={`select text-base mb-1 border-none w-full bg-base-200 font-vazir ${
              selectedCity === "" ? "text-base-content" : "text-black"
            }`}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)} // Update selected city
          >
            <option value="" label="شهر خود را انتخاب کنید" />
            {cities.map((item) => (
              <option className="text-black" key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {/* Error message for not selecting a city */}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </label>
      </div>
    </div>
  );
};

export default Location;
