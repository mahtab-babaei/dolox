import React from "react";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { menuItems } from "@/utils/constants";
import { useUser } from "@/context/UserContext";

const UserDropDown = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      // Remove cookies in client
      destroyCookie(null, "access");
      destroyCookie(null, "refresh");

      // Update user's state in context
      setUser(null);

      // Redirect to the login page after logout
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
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
            onClick={item.label === "خروج" ? handleLogout : undefined}
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
