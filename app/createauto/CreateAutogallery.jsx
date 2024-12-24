"use client";
import React from "react";
import { useState, useEffect } from "react";
import Phone from "./Phone";
import CreateAutoSteps from "./CreateAutoSteps";
import Specifications from "./Specifications";
import Address from "./Address";
import SocialMedia from "./SocialMedia";
import Banner from "./Banner";
import Videos from "./Videos";
import { createAutoReq, autoVideos } from "./page";
import toast from "react-hot-toast";

const CreateAutogallery = () => {
  const [loading, setLoading] = useState(false);
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
  const [logo, setLogo] = useState(null);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const submitAuto = async () => {
      if (step === 6) {
        try {
          setLoading(true);
          console.log(logo);
          const result = await createAutoReq({
            contactPhone,
            contactName,
            companyName,
            description,
            isSellDomestic,
            isSellChinese,
            isSellForeign,
            city,
            address,
            socialMediaLinks,
            logo,
            isDeleted: false,
          });

          console.log("Response from createAutoReq:", result);
          console.log("RESULTID:", result.id);
          if (result.id) {
            console.log(video);

            const videoResult = await autoVideos(result.id, video);

            if (videoResult) {
              setStep(7);
              toast.success("اطلاعات با موفقیت ثبت شد!");
            } else {
              setStep(8);
            }
          } else {
            console.log("Error1 occured");
            setStep(8);
          }
        } catch (error) {
          console.error("Error creating auto:", error);
          setStep(8);
        } finally {
          setLoading(false);
        }
      }
    };

    submitAuto();
  }, [step]);

  return (
    <div className="justify-start bg-base-200 w-full pt-40 pb-10 px-4">
      <div className="max-w-screen-sm mx-auto bg-white py-10 rounded-[34px]">
        <h1 className="text-center text-xl">ثبت اتوگالری</h1>
        {step !== 6 && <CreateAutoSteps step={step} setStep={setStep} />}
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
        <Videos step={step} setStep={setStep} setVideo={setVideo} />
        {step === 7 && (
          <div>
            <p className="px-6 sm:px-28 text-center font-vazir py-36 max-full">
              درخواست شما با موفقیت ثبت شد. جهت تایید اطلاعات تا 48 ساعت کاری
              آینده با شما تماس گرفته خواهد شد.
            </p>
          </div>
        )}
        {step === 8 && (
          <p className="px-8 text-center font-vazir py-36">
            درخواست شما ثبت نشد
          </p>
        )}
        {loading && step !== 8 && (
          <div className="w-full mx-auto  text-center pt-8">
            <p className="text-lg font-vazir w-full  mx-auto font-bold ">
              در حال ثبت درخواست
            </p>
            <p className="text-sm font-vazir w-full  mx-auto">
              لطفا صبر کنید
            </p>
            <span className="loading loading-ball loading-lg"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAutogallery;
