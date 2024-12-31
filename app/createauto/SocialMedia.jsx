import React, { useState, useCallback } from "react";
import StepButtons from "../components/global/StepButtons";

const SocialMedia = ({ step, setStep, setSocialMediaLinks }) => {
  const [socialData, setSocialData] = useState([
    { social: "", link: "" },
    { social: "", link: "" },
    { social: "", link: "" },
    { social: "", link: "" },
  ]);

  const handleSelectChange = useCallback(
    (index, e) => {
      const updatedData = [...socialData];
      updatedData[index].social = e.target.value;
      setSocialData(updatedData);
    },
    [socialData]
  );

  const handleInputChange = useCallback(
    (index, e) => {
      const updatedData = [...socialData];
      updatedData[index].link = e.target.value;
      setSocialData(updatedData);
    },
    [socialData]
  );

  const convertToFormattedString = (data) => {
    const formatted = data
      .filter((item) => item.social && item.link) 
      .map((item) => `${item.social}: ${item.link}`) 
      .join(","); 
    return `{${formatted}}`; 
  };

  if (step !== 3) return null;

  return (
    <div className="px-2 md:px-0 font-vazir">
      <div dir="rtl" className="pt-2 md:max-w-lg mx-auto">
        <StepButtons
          step={step}
          setStep={setStep}
          onSubmit={() => {
            const socialMediaString = convertToFormattedString(socialData);
            setSocialMediaLinks(socialMediaString);
            setStep(4);
          }}
        />
        <div className="pt-8">
          <div className="text-center sm:text-start grid items-center justify-center gap-2">
            <p className="label-text text-base-content">
              شبکه های اجتماعی خود را وارد کنید
            </p>
            <p className="label-text text-base-content pb-2">
              در صورت نداشتن شبکه اجتماعی فیلد ها را خالی بگذارید
            </p>

            {/* Social media fields */}
            {socialData.map((socialItem, index) => (
              <div
                key={index}
                className="grid gap-2 sm:flex sm:gap-4 items-center justify-center pb-4"
              >
                <label className="w-full font-vazir">
                  <select
                    value={socialItem.social}
                    onChange={(e) => handleSelectChange(index, e)}
                    className={`select text-base text-black max-w-xs border-none w-full bg-neutral font-vazir appearance-none ${
                      socialItem.social === "" && "text-base-content"
                    }`}
                  >
                    <option
                      className="text-black"
                      value=""
                      label="انتخاب شبکه اجتماعی"
                    />
                    <option
                      className="text-black"
                      value="telegram"
                      label="تلگرام"
                    />
                    <option
                      className="text-black"
                      value="instagram"
                      label="اینستاگرام"
                    />
                    <option
                      className="text-black"
                      value="whatsapp"
                      label="واتساپ"
                    />
                    <option className="text-black" value="eitaa" label="ایتا" />
                  </select>
                </label>

                <label className="font-vazir input flex items-center gap-2 w-full md:max-w-screen-sm bg-neutral">
                  <input
                    type="text"
                    value={socialItem.link}
                    onChange={(e) => handleInputChange(index, e)}
                    className="text-black grow placeholder:text-base-content"
                    placeholder="لینک"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
