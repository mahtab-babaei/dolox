import { ImageURL } from "@/utils/URL";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { links } from "@/utils/Constants";

const Footer = () => {
  const userLinks = [
    { label: "ورود", href: "/login" },
    { label: "ثبت نام", href: "/register" },
    { label: "فراموشی رمز", href: "/forgetpassword" },
  ];

  return (
    <footer className="mx-auto bg-black relative z-30">
      <div className="mx-auto bg-repeat max-w-screen-xl text-white relative z-30">
        <div className="flex md:flex-row flex-col-reverse py-16 justify-between px-4">
          <div className="mx-auto md:mx-0">
            <div className="flex gap-4 md:py-0 pt-8">
              <ul>
                {links.map((link) => (
                  <li className="mt-4" key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
              <ul>
                {userLinks.map((link) => (
                  <li className="mt-4" key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4 items-center mx-auto md:mx-0">
            <div>
              <Image
                className="md:mx-2 object-contain"
                src={ImageURL + "logo.png"}
                width={156}
                height={60}
                alt="logo"
              />
              <Link
                className="btn bg-secondary border-secondary text-white border-none flex"
                href="/createad"
              >
                ثبت رایگان آگهی
              </Link>
            </div>
            <div>
              <Image
                className="    "
                src={ImageURL + "enamad.png"} // Replace with the actual image you want to render
                width={136}
                height={145}
                alt="Footer Image"
              />
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center w-full font-vazir py-4">
          تمام حقوق برای دولوکس محفوظ است
        </p>
      </div>
      <Image
        className="absolute top-0  object-cover w-full h-full "
        src={ImageURL + "footerpattern.png"} // Replace with the actual image you want to render
        width={500}
        height={300}
        alt="Footer Image"
      />
    </footer>
  );
};

export default Footer;
