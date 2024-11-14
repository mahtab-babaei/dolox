"use client";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const [drawer, setDrawer] = useState(false);
  const currentPath = usePathname();
  const isActive = (href) =>
    currentPath === href ? "text-secondary" : "text-black";

  const links = [
    { label: "صفحه اصلی", href: "/" },
    { label: "آگهی ها", href: "/ads" },
    { label: "مزایده ها", href: "/auctions" },
    { label: "اتوگالری", href: "/autogallery" },
    { label: "اخبار", href: "https://blog.dolox.ir" },
  ];

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <nav className="w-full fixed bg-white z-50">
      <div className="flex w-full py-2 px-4 max-w-screen-2xl mx-auto justify-between items-center text-sm font-normal">
        {/* drawer btn */}
        <svg
          onClick={toggleDrawer}
          className="base:hidden cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M2.5 4H13.5M2.5 8H13.5M2.5 12H13.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex items-center">
          <Image
            priority
            className="base:ml-2 object-contain"
            src={logo}
            height={60}
            alt="logo"
          />
          <ul className="gap-4 hidden base:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={isActive(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            className="btn bg-primary border-primary text-white  hidden base:flex"
            href="/"
          >
            ثبت رایگان اتو گالری
          </Link>
          <Link
            className="btn bg-secondary border-secondary text-white border-none hidden base:flex"
            href="/createad"
          >
            ثبت رایگان آگهی
          </Link>

          <Link className="flex items-center gap-2" href="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M5.66667 0C6.41811 0 7.13878 0.298511 7.67014 0.829864C8.20149 1.36122 8.5 2.08189 8.5 2.83333C8.5 3.58478 8.20149 4.30545 7.67014 4.8368C7.13878 5.36816 6.41811 5.66667 5.66667 5.66667C4.91522 5.66667 4.19455 5.36816 3.6632 4.8368C3.13184 4.30545 2.83333 3.58478 2.83333 2.83333C2.83333 2.08189 3.13184 1.36122 3.6632 0.829864C4.19455 0.298511 4.91522 0 5.66667 0ZM5.66667 7.08333C8.7975 7.08333 11.3333 8.35125 11.3333 9.91667V11.3333H0V9.91667C0 8.35125 2.53583 7.08333 5.66667 7.08333Z"
                fill="black"
              />
            </svg>
            ورود
          </Link>
        </div>
      </div>
      <SearchBox />

      {/* Drawer */}
      <div
        className={`text-sm fixed inset-y-0 right-0 z-50 w-64 h-screen bg-white p-4 grid transform ${
          drawer ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col gap-4 h-fit">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={isActive(link.href)}
                onClick={toggleDrawer}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col justify-end">
          <Link
            className="btn bg-primary border-primary text-white mb-2"
            href="/"
          >
            ثبت رایگان اتو گالری
          </Link>
          <Link
            className="btn bg-secondary border-secondary text-white"
            href="/createad"
          >
            ثبت رایگان آگهی
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {drawer && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
