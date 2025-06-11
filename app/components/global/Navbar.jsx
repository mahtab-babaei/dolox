"use client";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import { links } from "@/utils/constants";
import UserDropDown from "./UserDropDown";
import { userIcon } from "@/utils/constants";
import Notif from "./Notif";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const { user } = useUser();

  const isLoggedIn = !!user;
  const userName = user?.first_name || user?.username || user?.phone_number;
  const [drawer, setDrawer] = useState(false);
  const currentPath = usePathname();
  const isActive = (href) =>
    currentPath === href ? "text-secondary" : "text-black";

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <nav className="w-full fixed bg-white z-50">
      <div className="flex w-full py-2 px-4 max-w-screen-xl mx-auto justify-between items-center text-sm font-normal">
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
            href="/createauto"
          >
            ثبت رایگان اتوگالری
          </Link>
          <Link
            className="btn bg-secondary border-secondary text-white border-none hidden base:flex"
            href="/createad"
          >
            ثبت رایگان آگهی
          </Link>

          {!isLoggedIn && (
            <Link className="flex items-center gap-2" href="/login">
              {userIcon}
              <span className="text-black">ورود</span>
            </Link>
          )}
          {isLoggedIn && (
            <div className="flex gap-2 items-center">
              <Notif />
              <div
                dir="ltr"
                className="dropdown dropdown-bottom content-center"
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="m-1 flex items-center gap-1"
                >
                  <span className="font-vazir-bold font-bold text-black">
                    {userName}
                  </span>
                  {userIcon}
                  <UserDropDown />
                </div>
              </div>
            </div>
          )}
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

        <div className="flex flex-col justify-end mb-8">
          <Link
            className="btn bg-primary border-primary text-white mb-2"
            href="/createauto"
          >
            ثبت رایگان اتوگالری
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
