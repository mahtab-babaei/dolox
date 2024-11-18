import React, { useReducer } from "react";
import Link from "next/link";
import { destroyCookie } from "nookies";
import axios from "axios";
import { useRouter } from "next/navigation";

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

  const menuItems = [
    {
      href: "/dashboard/profile",
      iconPath:
        "M3.33333 2.66667C3.33333 1.95942 3.61428 1.28115 4.11438 0.781048C4.61448 0.280951 5.29276 0 6 0C6.70724 0 7.38552 0.280951 7.88562 0.781048C8.38572 1.28115 8.66667 1.95942 8.66667 2.66667C8.66667 3.37391 8.38572 4.05219 7.88562 4.55229C7.38552 5.05238 6.70724 5.33333 6 5.33333C5.29276 5.33333 4.61448 5.05238 4.11438 4.55229C3.61428 4.05219 3.33333 3.37391 3.33333 2.66667ZM3.33333 6.66667C2.44928 6.66667 1.60143 7.01786 0.976311 7.64298C0.351189 8.2681 0 9.11594 0 10C0 10.5304 0.210714 11.0391 0.585787 11.4142C0.960859 11.7893 1.46957 12 2 12H10C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10C12 9.11594 11.6488 8.2681 11.0237 7.64298C10.3986 7.01786 9.55072 6.66667 8.66667 6.66667H3.33333Z",
      label: "مشخصات کاربری",
    },
    {
      href: "/dashboard",
      iconPath:
        "M2.16667 0C1.59203 0 1.04093 0.228273 0.634602 0.634602C0.228273 1.04093 0 1.59203 0 2.16667V9.83333C0 10.408 0.228273 10.9591 0.634602 11.3654C1.04093 11.7717 1.59203 12 2.16667 12H9.83333C10.408 12 10.9591 11.7717 11.3654 11.3654C11.7717 10.9591 12 10.408 12 9.83333V2.16667C12 1.59203 11.7717 1.04093 11.3654 0.634602C10.9591 0.228273 10.408 0 9.83333 0H2.16667ZM2.16667 11C1.85725 11 1.5605 10.8771 1.34171 10.6583C1.12292 10.4395 1 10.1428 1 9.83333V3.66667H11V9.83333C11 10.1428 10.8771 10.4395 10.6583 10.6583C10.4395 10.8771 10.1428 11 9.83333 11H2.16667ZM2.5 4.66667C2.36739 4.66667 2.24021 4.71935 2.14645 4.81311C2.05268 4.90688 2 5.03406 2 5.16667V8.5C2 8.776 2.224 9 2.5 9H5.83333C5.96594 9 6.09312 8.94732 6.18689 8.85355C6.28065 8.75979 6.33333 8.63261 6.33333 8.5V5.16667C6.33333 5.03406 6.28065 4.90688 6.18689 4.81311C6.09312 4.71935 5.96594 4.66667 5.83333 4.66667H2.5ZM3 8V5.66667H5.33333V8H3Z",
      label: "اگهی های من",
    },
    {
      href: "/dashboard/auto",
      iconPath:
        "M11.8523 3.55571L10.7077 2.49232L9.69231 0.461552C9.60512 0.319758 9.48288 0.202808 9.33737 0.121971C9.19187 0.0411328 9.02799 -0.000868404 8.86154 1.36102e-05H3.13846C2.97201 -0.000868404 2.80813 0.0411328 2.66263 0.121971C2.51712 0.202808 2.39488 0.319758 2.30769 0.461552L1.29231 2.49232L0.147692 3.55571C0.101063 3.59895 0.0638743 3.65137 0.0384589 3.70966C0.0130435 3.76796 -4.9945e-05 3.83088 1.43165e-07 3.89448V7.84617C1.43165e-07 7.96858 0.0486264 8.08597 0.135182 8.17253C0.221737 8.25908 0.339131 8.30771 0.461539 8.30771H2.30769C2.49231 8.30771 2.76923 8.12309 2.76923 7.93848V7.38463H9.23077V7.84617C9.23077 8.03078 9.41538 8.30771 9.6 8.30771H11.5385C11.6609 8.30771 11.7783 8.25908 11.8648 8.17253C11.9514 8.08597 12 7.96858 12 7.84617V3.89448C12.0001 3.83088 11.987 3.76796 11.9615 3.70966C11.9361 3.65137 11.8989 3.59895 11.8523 3.55571ZM3.23077 0.923091H8.76923L9.69231 2.76924H2.30769L3.23077 0.923091ZM3.69231 5.16925C3.69231 5.35386 3.41538 5.53848 3.23077 5.53848H1.29231C1.10769 5.53848 0.923077 5.26155 0.923077 5.07694V4.06155C1.01538 3.78463 1.2 3.60001 1.47692 3.69232L3.32308 4.06155C3.50769 4.06155 3.69231 4.33848 3.69231 4.52309V5.16925ZM11.0769 5.07694C11.0769 5.26155 10.8923 5.53848 10.7077 5.53848H8.76923C8.58462 5.53848 8.30769 5.35386 8.30769 5.16925V4.52309C8.30769 4.33848 8.49231 4.06155 8.67692 4.06155L10.5231 3.69232C10.8 3.60001 10.9846 3.78463 11.0769 4.06155V5.07694Z",
      label: "اتو گالری های من",
    },
    {
      href: "/dashboard/chat",
      iconPath:
        "M5 0C7.75 0 10 1.79 10 4C10 6.21 7.75 8 5 8C4.38 8 3.785 7.91 3.235 7.75C1.775 9 0 9 0 9C1.165 7.835 1.35 7.05 1.375 6.75C0.525 6.035 0 5.065 0 4C0 1.79 2.25 0 5 0Z",
      label: "چت ها",
    },
    {
      href: "#",
      iconPath:
        "M8 5.5H6.5V6.5H8V5.5ZM9.5 9H0V4L4 0H9C9.13261 0 9.25979 0.0526784 9.35355 0.146447C9.44732 0.240215 9.5 0.367392 9.5 0.5V9ZM4.415 1L1.415 4H8.5V1H4.415Z",
      label: "خروج",
      isLogout: true,
    },
  ];

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
