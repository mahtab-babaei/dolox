"use client";
import React from "react";
import { useState } from "react";
import Phone from "./Phone";
import CreateAutoSteps from "./CreateAutoSteps";

const CreateAutogallery = () => {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");

  return (
    <div className="justify-start bg-base-200 w-full pt-40 pb-10 px-4">
      <div className="max-w-screen-sm mx-auto bg-white py-10 rounded-[34px]">
        <h1 className="text-center text-xl">ثبت اگهی</h1>
        {(step !== 6 || adable.success) && (
          <CreateAutoSteps step={step} setStep={setStep} />
        )}
        <Phone step={step} setStep={setStep} phone={setPhone} />
      </div>
    </div>
  );
};

export default CreateAutogallery;
