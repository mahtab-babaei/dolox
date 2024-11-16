import { ImageURL } from "@/utils/URL";
import Image from "next/image";
import React from "react";

const Hero = () => {
  const images = [
    { label: "سواری", src: `${ImageURL}savari.png`, width: 145, height: 50 },
    {
      label: "وانت وکامیونت",
      src: `${ImageURL}vanet.png`,
      width: 122,
      height: 53,
    },
    {
      label: "موتور سیکلت",
      src: `${ImageURL}motorcycle.png`,
      width: 104,
      height: 62,
    },
    { label: "کامیون", src: `${ImageURL}kamion.png`, width: 143, height: 66 },
    {
      label: "تجهیزات",
      src: `${ImageURL}tractor.png`,
      width: 102,
      height: 66,
    },
    {
      label: "لوازم یدکی",
      src: `${ImageURL}yadaki.png`,
      width: 89,
      height: 88,
    },
  ];
  return (
    <section className="mx-auto pt-32 bg-base-100">
      <Image
        src={ImageURL + "homepagebanner.png"}
        width={1440}
        height={812}
        alt="hero image"
        className="w-full"
      />
      <div className="max-w-screen-xl mx-auto text-white">
        <h1 className="md:text-4xl text-2xl w-full text-center pt-16">
          به دنیای <span className="text-secondary">دولوکس</span> خوش آمدید
        </h1>
        <p className="text-center font-vazir text-sm  pt-2 font-bold">
          با دولوکس، ماشین دلخواهت را به آسانی بیاب
        </p>
        <div className="grid md:grid-cols-6 grid-cols-3 items-center text-center mt-16 gap-2">
          {images.map((image) => (
            <div key={image.label}>
              <Image
                priority
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.label}
                className="mx-auto"
              />
              <h2 className="text-sm sm:text-base">{image.label}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
