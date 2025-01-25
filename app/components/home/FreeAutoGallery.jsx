import { ImageURL } from "@/utils/URL";
import Image from "next/image";
import Link from "next/link";

const FreeAutoGallery = () => {
  return (
    <section className="mx-auto bg-base-300 px-4">
      <div className="mx-auto max-w-screen-xl text-black">
        <div className="flex justify-between items-center pb-16 md:flex-row flex-col-reverse">
          <div className="flex  flex-col md:justify-items-end justify-center md:text-right text-center">
            <h2 className="text-3xl w-full">ثبت رایگان اتوگالری در دولوکس</h2>
            <p className="font-vazir pt-2 max-w-md">
              آیا صاحب یک اتوگالری هستید و می‌خواهید خودروهای خود را به هزاران
              خریدار علاقه‌مند معرفی کنید؟ در دولوکس، می‌توانید به صورت رایگان
              اتوگالری خود را ثبت کنید و از امکانات ویژه برای نمایش خودروهایتان
              بهره‌مند شوید.
            </p>

            <Link
              className="btn bg-primary shadow px-8 text-xl h-14 mt-4 border-secondary text-white border-none mx-auto"
              href="/dashboard"
            >
              ثبت رایگان اتو گالری
            </Link>
          </div>

          <Image
          priority
            className="md:w-1/2"
            src={ImageURL + "carbanner2.png"}
            width={1930}
            height={856}
            alt="hero image"
          />
        </div>
      </div>
    </section>
  );
};

export default FreeAutoGallery;
