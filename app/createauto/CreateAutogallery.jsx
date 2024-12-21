"use client";
import React from "react";
import { useState } from "react";
import Phone from "./Phone";
import CreateAutoSteps from "./CreateAutoSteps";
import Specifications from "./Specifications";
import Address from "./Address";
import SocialMedia from "./SocialMedia";
import Banner from "./Banner";

const CreateAutogallery = () => {
  const [step, setStep] = useState(0);
  const [contactPhone, setContactPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [isSellDomestic, setIsSellDomestic] = useState(false);
  const [isSellChinese, setIsSellChinese] = useState(false);
  const [isSellForeign, setIsSellForeign] = useState(false);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [logo, setLogo] = useState(null)

  return (
    <div className="justify-start bg-base-200 w-full pt-40 pb-10 px-4">
      <div className="max-w-screen-sm mx-auto bg-white py-10 rounded-[34px]">
        <h1 className="text-center text-xl">ثبت اتوگالری</h1>
        {(step !== 6 || adable.success) && (
          <CreateAutoSteps step={step} setStep={setStep} />
        )}
        <Phone
          step={step}
          setStep={setStep}
          setContactPhone={setContactPhone}
        />
        <Specifications
          step={step}
          setStep={setStep}
          setContactName={setContactName}
          setCompanyName={setCompanyName}
          setDescription={setDescription}
          isSellDomestic={isSellDomestic}
          setIsSellDomestic={setIsSellDomestic}
          isSellChinese={isSellChinese}
          setIsSellChinese={setIsSellChinese}
          isSellForeign={isSellForeign}
          setIsSellForeign={setIsSellForeign}
        />
        <Address
          step={step}
          setStep={setStep}
          setCity={setCity}
          setAddress={setAddress}
          city={city}
        />
        <SocialMedia
          step={step}
          setStep={setStep}
          setSocialMediaLinks={setSocialMediaLinks}
        />
        <Banner step={step} setStep={setStep} setLogo={setLogo} />
      </div>
    </div>
  );
};

export default CreateAutogallery;
