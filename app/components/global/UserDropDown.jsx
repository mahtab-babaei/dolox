import React from "react";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { menuItems } from "@/utils/Constants";

const UserDropDown = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Call the API route to remove cookies server-side
    destroyCookie(null, "access");
    destroyCookie(null, "refresh");
    await fetch("/api/logout", { method: "POST" });

    // Redirect to the login page after logout
    await router.push("/login");
    router.refresh();
  };

  return (
    <ul
      dir="rtl"
      tabIndex={0}
      className="dropdown-content bg-white rounded-box z-[1] w-52 p-2 shadow"
    >
      {menuItems.map((item, index) => (
        <li key={index}>
          <Link
            className="flex gap-2 rounded-[10px] items-center h-10 pr-2 hover:bg-slate-300 duration-300"
            href={item.href}
            onClick={item.label === "خروج" && handleLogout}
          >
            <svg
              width={12}
              height={12}
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={item.iconPath}
                fill={item.label === "خروج" ? "#BC1526" : "#8B7676 "}
              />
            </svg>
            <p
              className={`font-vazir text-base-content ${
                item.label === "خروج" && `text-primary`
              }`}
            >
              {item.label}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UserDropDown;
