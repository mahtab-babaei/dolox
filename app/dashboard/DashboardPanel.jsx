"use client";
import Link from "next/link";
import React from "react";
import { menuItems } from "@/utils/constants";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";

const DashboardPanel = () => {
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Remove cookies in client
      destroyCookie(null, "access");
      destroyCookie(null, "refresh");

      // Redirect to the login page after logout
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <aside className="bg-white w-[30%] max-w-[250px] min-w-52 rounded-[34px] p-5 md:flex flex-col hidden">
      {user?.profile?.picture && (
        <img
          className="rounded-[10px] mx-auto object-cover object-center w-28 h-28 mt-8"
          src={user?.profile.picture}
          width={150}
          height={150}
          alt="profile pic"
        />
      )}
      <h2 className="w-full text-center pt-4 pb-4 text-md">
        {" "}
        {user?.profile?.first_name} خوش آمدید 👋{" "}
      </h2>
      <ul
        dir="rtl"
        tabIndex={0}
        className="dropdown-content  bg-white rounded-box z-[1]  p-2  "
      >
        {menuItems.map((item, index) => (
          <li key={index} className={item.label === "خروج" ? "hidden" : ""}>
            <Link
              className="flex gap-2 rounded-[10px] items-center h-10 pr-2 hover:bg-slate-300  duration-300"
              href={item.href}
            >
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={item.iconPath} fill="#8B7676" />
              </svg>
              <p className="font-vazir text-base-content">{item.label}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div
        className="cursor-pointer flex gap-2 rounded-[10px] items-center h-10 hover:bg-slate-300  duration-300 mt-auto w-full justify-center"
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
        >
          <path
            d="M8 5.5H6.5V6.5H8V5.5ZM9.5 9H0V4L4 0H9C9.13261 0 9.25979 0.0526784 9.35355 0.146447C9.44732 0.240215 9.5 0.367392 9.5 0.5V9ZM4.415 1L1.415 4H8.5V1H4.415Z"
            fill="#BC1526"
          />
        </svg>
        <p className="font-[vazir] text-primary">خروج</p>
      </div>
    </aside>
  );
};

export default DashboardPanel;
