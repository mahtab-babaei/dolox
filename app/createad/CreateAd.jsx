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
import { AdImages, checkAds, createAdReq, getColors } from "./page";
import { getProfile } from "../dashboard/page";

const CreateAd = () => {
  const router = useRouter();
  const user = useUser();
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("سواری");
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [year, setYear] = useState(null);
  const [body, setBody] = useState(null);
  const [kilometer, setKilometer] = useState(null);
  const [description, setDescription] = useState(null);
  const [wheelnumber, setWheelNumber] = useState("");
  const [weight, setWeight] = useState("");
  const [maxweight, setMaxweight] = useState("");
  const [price, setPrice] = useState(null); // if was null me negotiable
  const [installments, setInstallments] = useState(false); // pay montly or something
  const [rentorsale, setRentorsale] = useState("sale");
  const [images, setImages] = useState([]);
  const [city, setCity] = useState("");
  const [packagePlan, setPackagePlan] = useState("");

  const [loading, setLoading] = useState(false);
  const [esxhibitionId, setExhibitionId] = useState(0);
  const [adable, setAdable] = useState({});
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  // Fetching data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adableRes, brandsRes, colorsRes, profile] = await Promise.all([
          checkAds(),
          getBrandsByType("سواری"),
          getColors(),
          getProfile(),
        ]);

        setAdable(adableRes);
        setBrands(brandsRes);
        setColors(colorsRes.results);
        setExhibitionId(profile.exhibition[0].id);
      } catch (error) {
        setAdable({});
        setBrands([]);
        setColors([]);
        setExhibitionId(null);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    const submitAd = async () => {
      if (step === 9) {
        try {
          setLoading(true);

          const result = await createAdReq({
            brand,
            model,
            year,
            body,
            description,
            kilometer,
            price: price !== null ? price : undefined,
            installments,
            rentorsale,
            city,
            phone_number: user.phone_number,
            category,
            wheelnumber,
            weight,
            maxweight,
            exhibition: esxhibitionId,
          });
          console.log("Response from createAdReq:", result);

          if (result.success) {
            console.log(images);

            const imageResult = await AdImages(result.message.id, images);

            if (imageResult.success) {
              setStep(10);
              toast.success("اطلاعات با موفقیت ثبت شد!");
              setTimeout(() => {
                router.push("/dashboard");
              }, 200);
            } else {
              setStep(11);
            }
          } else {
            setStep(11);
          }
        } catch (error) {
          console.error("Error creating ad:", error);
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
        <h1 className="text-center text-xl">ثبت اگهی</h1>
        {/* steps */}
        {(step !== 9 || adable.success) && (
          <CreateAdSteps step={step} setStep={setStep} />
        )}
        {adable.success && (
          <Brands
            brands={brands}
            setBrand={setBrand}
            setStep={setStep}
            step={step}
            category={category}
            setCategory={setCategory}
          />
        )}
        <Models
          setStep={setStep}
          step={step}
          setModel={setModel}
          brand={brand}
        />
        <Year setStep={setStep} step={step} setYear={setYear} />
        <Body
          setStep={setStep}
          step={step}
          colors={colors}
          setBody={setBody}
          category={category}
        />
        <Description
          setStep={setStep}
          step={step}
          setKilometer={setKilometer}
          setDescription={setDescription}
          category={category}
          setWheelnumber={setWheelNumber}
          setWeight={setWeight}
          setMaxweight={setMaxweight}
        />
        <Price
          setStep={setStep}
          step={step}
          setInstallments={setInstallments}
          setPrice={setPrice}
          setRentorsale={setRentorsale}
        />
        <Images
          setStep={setStep}
          step={step}
          images={images}
          setImages={setImages}
        />
        <Location setStep={setStep} step={step} setCity={setCity} />
        <Package setStep={setStep} step={step} setPackage={setPackagePlan} />

        {step === 10 && (
          <div>
            <p className="px-8 text-center font-vazir py-36">
              اگهی شما با موفقیت ساخته شد
            </p>
          </div>
        )}
        {step === 11 && (
          <p className="px-8 text-center font-vazir py-36">
            اگهی شما ساخته نشد
          </p>
        )}
        {loading && step !== 11 && (
          <div className="w-full mx-auto  text-center pt-8">
            <p className="text-lg font-vazir w-full  mx-auto font-bold ">
              در حال ساخت اگهی
            </p>
            <p className="text-sm font-vazir w-full  mx-auto  ">
              لطفا صبر کنید
            </p>
            <span className="loading loading-ball loading-lg"></span>
          </div>
        )}

        {/* user can't submit Ad */}
        {!adable.success && (
          <p className="px-8 text-center font-vazir py-36">{adable.message}</p>
        )}
      </div>
    </div>
  );
};

export default CreateAd;
