"use client";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getBrandsByType } from "../page";
import Body from "./Body";
import Brands from "./Brands";
import CreateAdSteps from "./CreateAdSteps";
import Description from "./Description";
import Images from "./Images";
import Location from "./Location";
import Models from "./Models";
import Package from "./Package";
import Price from "./Price";
import Year from "./Year";
import { AdImages, checkAds, createAdReq, editAdReq } from "@/utils/Requests";
import { getProfile } from "@/utils/Requests";
import Submit from "./Submit";
import Link from "next/link";

const CreateAd = ({ isEdit = false, adData = null, id }) => {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("سواری");
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [year, setYear] = useState(null);
  const [body, setBody] = useState(null);
  const [bodyCondition, setBodyCondition] = useState(null);
  const [bodyColor, setBodyColor] = useState(null);
  const [gearType, setGearType] = useState(null);
  const [frontChassisCondition, setFrontChassisCondition] = useState(null);
  const [backChassisCondition, setBackChassisCondition] = useState(null);
  const [seatCondition, setSeatCondition] = useState(null);
  const [gastype, setGastype] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [kilometer, setKilometer] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null); // if was null me negotiable
  const [installments, setInstallments] = useState(false); // pay montly or something
  const [rentorsale, setRentorsale] = useState("sale");
  const [images, setImages] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [esxhibitionId, setExhibitionId] = useState(0);
  const [adable, setAdable] = useState({});
  const [brands, setBrands] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitedAdID, setSubmitedAdID] = useState(null);

  useEffect(() => {
    if (isEdit && adData) {
      setBrand(adData.brand);
      setModel(adData.model);
      setYear(adData.year);
      setBodyCondition(adData.body_condition);
      setBodyColor(adData.color);
      setGearType(adData.transmission);
      setFrontChassisCondition(adData.front_chassis_condition);
      setBackChassisCondition(adData.behind_chassis_condition);
      setSeatCondition(adData.upholstery_condition);
      setGastype(adData.fuel_type);
      setInsurance(adData.insurance);
      setDescription(adData.description);
      setPrice(adData.price);
      setInstallments(adData.is_negotiable);
      setRentorsale(adData.sale_or_rent);
      setImages(adData.images);
      setCity(adData.city);
    }
  }, [isEdit, adData]);

  // Fetching data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const [adableRes, brandsRes, profile] = await Promise.all([
          checkAds(),
          getBrandsByType("سواری"),
          getProfile(),
        ]);
        setAdable(adableRes);
        setBrands(brandsRes);
        setExhibitionId(profile.exhibition[0].id);
      } catch (error) {
        setAdable({ success: false });
        setBrands([]);
        setExhibitionId(null);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    const submitAd = async () => {
      if (step === 9) {
        try {
          setLoading(true);

          const requestData = {
            id,
            brand,
            model,
            year,
            body,
            description,
            kilometer,
            price: price,
            installments,
            rentorsale,
            city,
            phone: user.phone_number,
            category,
            exhibition: esxhibitionId,
          };
          console.log("requestData", requestData);
          if (!isEdit) {
            const result = await createAdReq(requestData);
            console.log("Response from createAdReq:", result);
            if (result.success) {
              setSubmitedAdID(result.message.id);
              console.log(images);

              const imageResult = await AdImages(result.message.id, images);

              if (imageResult.success) {
                setStep(10);
                toast.success("اطلاعات با موفقیت ثبت شد!");
              } else {
                setErrorMessage(imageResult.message || "آگهی شما ساخته نشد");
                setStep(11);
              }
            } else {
              setErrorMessage(result.message || "آگهی شما ساخته نشد");
              setStep(11);
            }
          } else {
            const result = await editAdReq(requestData);
            console.log("Response from editAdReq:", result);
            if (result && result.id) {
              setSubmitedAdID(result.id);
              setStep(10);
              toast.success("اطلاعات با موفقیت ثبت شد!");
            } else {
              setErrorMessage(result.message || "آگهی شما ویرایش نشد");
              setStep(11);
            }
          }
        } catch (error) {
          console.error("Error creating ad:", error);
          setErrorMessage(error.message || "خطا در برقراری ارتباط با سرور");
          setStep(11);
        } finally {
          setLoading(false);
        }
      }
    };

    submitAd();
  }, [step]);

  return (
    <div className="justify-start bg-base-200 w-full pt-40 pb-10 px-4">
      <div className="max-w-screen-sm mx-auto bg-white py-10 rounded-[34px]">
        <h1 className="text-center text-xl text-black">
          {isEdit ? "ویرایش آگهی" : "ثبت آگهی"}
        </h1>
        {isFetching ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {/* اگه اجازه ثبت آگهی نداشت و حالت ویرایش هم نبود فقط پیام خطا رو نشون بده */}
            {!adable.success && !isEdit ? (
              <p className="px-8 text-center font-vazir py-36 text-base-content">
                {adable.message}
              </p>
            ) : (
              <>
                {/* steps */}
                {(step !== 9 || adable.success) && (
                  <CreateAdSteps step={step} setStep={setStep} />
                )}
                <Brands
                  brands={brands}
                  setBrand={setBrand}
                  setStep={setStep}
                  step={step}
                  category={category}
                  setCategory={setCategory}
                />
                <Models
                  setStep={setStep}
                  step={step}
                  setModel={setModel}
                  brand={brand}
                />
                <Year
                  setStep={setStep}
                  step={step}
                  setYear={setYear}
                  year={year}
                />
                {!isFetching && step === 3 && (
                  <Body
                    setStep={setStep}
                    step={step}
                    setBody={setBody}
                    category={category}
                    bodyCondition={bodyCondition}
                    bodyColor={bodyColor}
                    gearType={gearType}
                    frontChassisCondition={frontChassisCondition}
                    backChassisCondition={backChassisCondition}
                    gastype={gastype}
                    insurance={insurance}
                    seatCondition={seatCondition}
                  />
                )}
                <Description
                  setStep={setStep}
                  step={step}
                  setKilometer={setKilometer}
                  setDescription={setDescription}
                  category={category}
                  kilometer={kilometer}
                  description={description}
                />
                <Price
                  isEdit={isEdit}
                  setStep={setStep}
                  step={step}
                  setInstallments={setInstallments}
                  setPrice={setPrice}
                  setRentorsale={setRentorsale}
                  price={price}
                  rentorsale={rentorsale}
                  installments={installments}
                />
                <Images
                  setStep={setStep}
                  step={step}
                  images={images}
                  setImages={setImages}
                />
                <Location
                  setStep={setStep}
                  step={step}
                  setCity={setCity}
                  city={city}
                />
                <Submit setStep={setStep} step={step} />
                {step === 10 && (
                  <div>
                    <p className="px-8 text-center font-vazir text-base-100">
                      آگهی شما با موفقیت ساخته شد 😉
                    </p>
                    <Package submitedAdID={submitedAdID} />
                  </div>
                )}
                {step === 11 && (
                  <div className="px-8 text-center py-36">
                    <p className=" font-vazir text-gray-500">
                      {errorMessage || "آگهی شما ساخته نشد"}
                    </p>
                    {errorMessage ===
                      "شما نمیتوانید بیشتر از سه اگهی ثبت کنید" && (
                      <Link
                        className="btn bg-primary text-white border-none mt-5"
                        href="/dashboard/additionalad"
                      >
                        ساخت آگهی اضافه
                      </Link>
                    )}
                  </div>
                )}
                {loading && step !== 11 && (
                  <div className="w-full mx-auto  text-center pt-8">
                    <p className="text-lg font-vazir w-full  mx-auto font-bold text-black">
                      در حال ساخت اگهی
                    </p>
                    <p className="text-sm font-vazir w-full  mx-auto  text-black">
                      لطفا صبر کنید
                    </p>
                    <span className="loading loading-ball loading-lg text-secondary"></span>
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

export default CreateAd;
