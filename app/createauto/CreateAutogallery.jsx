"use client";
import { useEffect, useState } from "react";
import Phone from "./Phone";
import Specifications from "./Specifications";
import Address from "./Address";
import SocialMedia from "./SocialMedia";
import Banner from "./Banner";
import Videos from "./Videos";
import CreateAutoSteps from "./CreateAutoSteps";
import toast from "react-hot-toast";
import {
  autoVideos,
  deleteAutoVideos,
  editAutoVideos,
  createAutoReq,
  editAutoReq,
  getProfile,
} from "@/utils/Requests";
import Link from "next/link";

const CreateAutogallery = ({ isEdit = false, autoData = null, id }) => {
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
  const [deletedVideo, setDeletedVideo] = useState({});
  const [editedVideo, setEditedVideo] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasExhibition, setHasExhibition] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isEdit && autoData) {
      setContactPhone(autoData.contact_phone);
      setContactName(autoData.contact_name);
      setCompanyName(autoData.company_name);
      setDescription(autoData.description);
      setIsSellDomestic(autoData.sells_domestic_cars);
      setIsSellChinese(autoData.sells_chinese_cars);
      setIsSellForeign(autoData.sells_foreign_cars);
      setCity(autoData.city);
      setAddress(autoData.address);
      setSocialMediaLinks(autoData.social_media_links);
      setLogo(autoData.logo);
    }
  }, [isEdit, autoData]);

  // Check user has autogallery or not
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      setErrorMessage("");

      try {
        const profile = await getProfile();
        if (profile && profile.exhibition) {
          if (profile.exhibition.length === 0) {
            setHasExhibition(false);
          } else {
            const firstExhibition = profile.exhibition[0];
            if (firstExhibition.is_deleted === true) {
              setHasExhibition(false);
            } else if (firstExhibition.is_deleted === false) {
              setHasExhibition(true);
            } else {
              console.warn(
                "profile.exhibition[0].is_deleted is neither true nor false:",
                firstExhibition.is_deleted
              );
              setHasExhibition(true);
            }
          }
        } else {
          setHasExhibition(false);
        }
      } catch (error) {
        console.error(
          "Error fetching profile or checking exhibition status:",
          error
        );
        setHasExhibition(false);
        setErrorMessage(
          "خطا در بررسی سابقه نمایشگاه شما. لطفاً صفحه را رفرش کنید یا بعداً تلاش کنید."
        );
      } finally {
        setIsFetching(false);
      }
    };

    if (!isEdit) {
      fetchData();
    } else {
      setIsFetching(false);
      setHasExhibition(false);
      setErrorMessage("");
    }
  }, [isEdit]);

  useEffect(() => {
    const submitAuto = async () => {
      if (step === 6) {
        try {
          setLoading(true);
          console.log(logo);
          const requestData = {
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
          };

          if (!isEdit) {
            const result = await createAutoReq({
              ...requestData,
              isDeleted: false,
            });

            console.log("Response from createAutoReq:", result);
            console.log("RESULTID:", result.id);
            if (result.id) {
              console.log(video);

              const videoResult = await autoVideos(result.id, video);
              console.log("videoResult:", videoResult);
              if (videoResult) {
                setStep(7);
                toast.success("اطلاعات با موفقیت ثبت شد!");
              } else {
                setErrorMessage(
                  videoResult.message || "اتوگالری شما ساخته نشد"
                );
                setStep(8);
              }
            } else {
              setErrorMessage(result.message || "اتوگالری شما ساخته نشد");
              setStep(8);
            }
          } else {
            const result = await editAutoReq({
              id,
              ...requestData,
            });
            console.log("Response from editAutoReq:", result);
            if (result.success) {
              const newVideosResult = await autoVideos(id, video);

              const deleteVideosResults = await Promise.all(
                (deletedVideo?.ids || []).map((videoId) =>
                  deleteAutoVideos(id, videoId)
                )
              );

              const editVideosResults = await Promise.all(
                (editedVideo || []).map((videoObj) =>
                  editAutoVideos(id, videoObj)
                )
              );

              const hasNewVideos = video && video.length > 0;
              const hasDeletedVideos = deletedVideo?.ids?.length > 0;
              const hasEditedVideos = editedVideo?.length > 0;

              const allSucceeded =
                (!hasNewVideos || newVideosResult) &&
                (!hasDeletedVideos ||
                  deleteVideosResults.every((r) => r?.success)) &&
                (!hasEditedVideos ||
                  editVideosResults.every((r) => r?.success));

              if (allSucceeded) {
                setStep(7);
                toast.success("اطلاعات با موفقیت ثبت شد!");
              } else {
                setErrorMessage("خطایی در ویرایش اتوگالری رخ داد");
                setStep(8);
              }
            } else {
              setErrorMessage(result.message || "اتوگالری شما ویرایش نشد");
              setStep(8);
            }
          }
        } catch (error) {
          setErrorMessage(error.message || "درخواست شما ثبت نشد");
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
      <div className="max-w-screen-sm mx-auto bg-white py-10 rounded-[34px] text-black">
        <h1 className="text-center text-xl">
          {isEdit ? "ویرایش اتوگالری" : "ثبت اتوگالری"}
        </h1>
        {isFetching ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {!isEdit && hasExhibition ? (
              <p className="px-8 text-center font-vazir py-36 text-base-content">
                شما قبلا اتوگالری خود را ثبت کرده اید
              </p>
            ) : errorMessage ? (
              <p className="px-8 text-center font-vazir py-36 text-base-content">
                {errorMessage}
              </p>
            ) : (
              <>
                {/* steps */}
                {step !== 6 && (
                  <CreateAutoSteps step={step} setStep={setStep} />
                )}
                {step === 0 && (
                  <Phone
                    step={step}
                    setStep={setStep}
                    setContactPhone={setContactPhone}
                    contactPhone={contactPhone}
                  />
                )}
                {step === 1 && (
                  <Specifications
                    step={step}
                    setStep={setStep}
                    setContactName={setContactName}
                    contactName={contactName}
                    setCompanyName={setCompanyName}
                    companyName={companyName}
                    setDescription={setDescription}
                    description={description}
                    isSellDomestic={isSellDomestic}
                    setIsSellDomestic={setIsSellDomestic}
                    isSellChinese={isSellChinese}
                    setIsSellChinese={setIsSellChinese}
                    isSellForeign={isSellForeign}
                    setIsSellForeign={setIsSellForeign}
                  />
                )}
                {step === 2 && (
                  <Address
                    step={step}
                    setStep={setStep}
                    setCity={setCity}
                    setAddress={setAddress}
                    city={city}
                    address={address}
                  />
                )}
                {step === 3 && (
                  <SocialMedia
                    step={step}
                    setStep={setStep}
                    setSocialMediaLinks={setSocialMediaLinks}
                    socialMediaLinks={socialMediaLinks}
                  />
                )}
                {step === 4 && (
                  <Banner
                    step={step}
                    setStep={setStep}
                    setLogo={setLogo}
                    logo={logo}
                  />
                )}
                {step === 5 && (
                  <Videos
                    exhibitionId={id}
                    step={step}
                    setStep={setStep}
                    setVideo={setVideo}
                    setDeletedVideo={setDeletedVideo}
                    setEditedVideo={setEditedVideo}
                  />
                )}
                {step === 7 && !isEdit ? (
                  <p className="px-6 sm:px-28 text-center font-vazir py-36 max-full">
                    درخواست شما با موفقیت ثبت شد. جهت تایید اطلاعات تا 48 ساعت
                    کاری آینده با شما تماس گرفته خواهد شد.
                  </p>
                ) : (
                  step === 7 &&
                  isEdit && (
                    <p className="px-6 sm:px-28 text-center font-vazir py-36 max-full">
                      اتوگالری شما با موفقیت ویرایش شد
                    </p>
                  )
                )}
                {step === 8 && (
                  <div className="px-8 text-center font-vazir py-36 text-gray-500">
                    {errorMessage.includes("contact_phone") ? (
                      "برای ثبت اتوگالری شماره تلفن ثابت وارد کنید، شماره موبایل قابل قبول نیست."
                    ) : errorMessage.includes("company_name") ? (
                      "اتوگالری با نامی که انتخاب کردید قبلا به ثبت رسیده است."
                    ) : errorMessage.includes("مجوز") ? (
                      <div>
                        <p>{errorMessage}</p>
                        <Link
                          className="btn bg-secondary text-white mt-4 border-none"
                          href="/dashboard/autosubscription"
                        >
                          خرید اشتراک ثبت نمایشگاه
                        </Link>
                      </div>
                    ) : (
                      <span>خطایی در ثبت اتوگالری رخ داد</span>
                    )}
                  </div>
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateAutogallery;
