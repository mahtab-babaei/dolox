import { ImageURL } from "@/utils/URL";
import Image from "next/image";
import Link from "next/link";

const FreeAds = () => {
  return (
    <section className="mx-auto bg-base-200 px-2 pb-36">
      <div className="mx-auto max-w-screen-xl text-black relative">
        <div className="flex justify-center">
          <Image
            className="mx-auto absolute md:-top-36 -top-16 "
            src={ImageURL + "carbanner1.png"}
            width={962}
            height={434}
            alt="carbanner1"
          />
        </div>
        <h2 className=" md:text-3xl text-2xl w-full text-center md:pt-72 pt-24">
          ثبت رایگان آگهی فروش خودرو
        </h2>
        <p className='text-center max-w-4xl mx-auto font-vazir pt-4'>
          آیا قصد فروش خودروی خود را دارید؟ در دولوکس، می‌توانید به راحتی و به
          صورت کاملاً رایگان آگهی فروش خودرو خود را ثبت کنید. با ثبت آگهی در
          سایت ما، خودرو شما در معرض دید هزاران خریدار قرار می‌گیرد که به دنبال
          خودروی مناسب می‌گردند.
        </p>
        <div className="flex justify-center py-2">
          <Link
            className="btn bg-secondary shadow px-8 text-xl h-14 mt-4 border-secondary text-white border-none mx-auto"
            href="/createad"
          >
            ثبت رایگان آگهی
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreeAds;
