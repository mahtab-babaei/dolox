import React, { useState, useEffect, useRef } from "react";
import { getSubscriptionPlans } from "@/utils/Requests";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Package({ submitedAdID }) {
  const currentPath = usePathname();
  const [openId, setOpenId] = useState(null);
  const [plansData, setPlansData] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const contentRefs = useRef({});

  const plansMeta = [
    {
      id: 1,
      type: "is_urgent",
      title: "پلکان",
      subtitle: "آگهیتو بیار بالای دیگر آگهی ها !",
      bg: "bg-[#FF2B41]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="54"
          height="43"
          viewBox="0 0 54 43"
          fill="none"
        >
          <path
            d="M17.919 42.833C13.0835 42.833 8.94209 41.1991 5.49487 37.9314C2.04764 34.6636 0.322143 30.6308 0.318365 25.833C0.314587 21.0352 2.13359 17.0591 5.77537 13.9047C9.41714 10.7502 13.721 9.05214 18.6869 8.81036L12.8644 2.93969L14.8675 0.936523L24.1892 10.2497L14.8732 19.5685L12.8672 17.5455L18.7322 11.6777C14.5464 11.9025 10.9037 13.3229 7.80403 15.939C4.70625 18.5532 3.15737 21.8512 3.15737 25.833C3.15737 29.8261 4.61181 33.1855 7.5207 35.9112C10.4258 38.6369 13.9089 39.9997 17.97 39.9997H23.75V42.833H17.919ZM32.25 19.6224V3.16636H53.5V19.6224H32.25ZM32.25 42.833V26.377H53.5V42.833H32.25ZM35.0834 39.9997H50.6667V29.2104H35.0834V39.9997Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      id: 2,
      type: "nationwide",
      title: "ثبت آگهی در تمام شهر ها",
      subtitle: "آگهی شما در کل کشور دیده می شود !",
      bg: "bg-[#E9172D]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="51"
          height="64"
          viewBox="0 0 51 64"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.3438 0L39.8438 9.6V32H46.2188C46.6414 32 47.0468 32.1686 47.3457 32.4686C47.6446 32.7687 47.8125 33.1757 47.8125 33.6V60.8H49.4062C49.8289 60.8 50.2343 60.9686 50.5332 61.2686C50.8321 61.5687 51 61.9757 51 62.4C51 62.8243 50.8321 63.2313 50.5332 63.5314C50.2343 63.8314 49.8289 64 49.4062 64H1.59375C1.17106 64 0.765685 63.8314 0.466799 63.5314C0.167913 63.2313 0 62.8243 0 62.4C0 61.9757 0.167913 61.5687 0.466799 61.2686C0.765685 60.9686 1.17106 60.8 1.59375 60.8H3.1875V27.2C3.1875 26.7757 3.35541 26.3687 3.6543 26.0686C3.95318 25.7686 4.35856 25.6 4.78125 25.6H7.96875V14.4H11.1562V25.6H14.3438V0ZM17.5312 4.6176L36.6562 11.8176V32H31.875C31.4523 32 31.0469 32.1686 30.748 32.4686C30.4492 32.7687 30.2812 33.1757 30.2812 33.6V60.8H17.5312V4.6176ZM6.375 28.8V60.8H14.3438V28.8H6.375ZM44.625 60.8H41.4375V57.6H36.6562V60.8H33.4688V35.2H44.625V60.8Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      id: 3,
      type: "is_promoted",
      title: "ثبت سفارشی آگهی",
      subtitle: "آگهی خود را از دیگر آگهی ها متمایز کنید !",
      bg: "bg-[#D2172A]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
        >
          <path
            d="M39 14C42.2728 14.0008 45.5 14.7666 48.4243 16.2362C51.3485 17.7057 53.8888 19.8384 55.8425 22.4641C57.7962 25.0898 59.1091 28.1357 59.6765 31.3589C60.244 34.5821 60.0503 37.8933 59.1108 41.0283C58.1713 44.1633 56.5121 47.0353 54.2655 49.4152C52.019 51.7951 49.2473 53.617 46.1716 54.7355C43.0959 55.854 39.8014 56.2382 36.5509 55.8573C33.3004 55.4765 30.1838 54.3412 27.45 52.542V52.5H27.387C23.6273 50.0061 20.7707 46.3676 19.2403 42.1234C17.7099 37.8792 17.587 33.255 18.8899 28.9355C20.1928 24.6161 22.8522 20.831 26.4742 18.141C30.0962 15.451 34.4883 13.999 39 14ZM18.8925 49C19.7722 50.26 20.7592 51.4267 21.8535 52.5H5.75C5.28587 52.5 4.84075 52.6844 4.51256 53.0126C4.18437 53.3408 4 53.7859 4 54.25C4 54.7141 4.18437 55.1592 4.51256 55.4874C4.84075 55.8156 5.28587 56 5.75 56H26.372C30.0894 58.2339 34.3332 59.441 38.6699 59.4979C43.0065 59.5548 47.2805 58.4596 51.0553 56.324C54.8301 54.1884 57.9703 51.0891 60.1553 47.3427C62.3402 43.5963 63.4914 39.337 63.4914 35C63.4914 30.663 62.3402 26.4037 60.1553 22.6573C57.9703 18.9109 54.8301 15.8116 51.0553 13.676C47.2805 11.5404 43.0065 10.4452 38.6699 10.5021C34.3332 10.559 30.0894 11.7661 26.372 14H9.25C8.78587 14 8.34075 14.1844 8.01256 14.5126C7.68437 14.8408 7.5 15.2859 7.5 15.75C7.5 16.2141 7.68437 16.6592 8.01256 16.9874C8.34075 17.3156 8.78587 17.5 9.25 17.5H21.8535C19.5222 19.7788 17.6705 22.5011 16.4076 25.5066C15.1447 28.5121 14.4961 31.74 14.5 35C14.5 38.759 15.347 42.315 16.859 45.5H12.75C12.2859 45.5 11.8408 45.6844 11.5126 46.0126C11.1844 46.3408 11 46.7859 11 47.25C11 47.7141 11.1844 48.1592 11.5126 48.4874C11.8408 48.8156 12.2859 49 12.75 49H18.8925ZM29.1895 27.664C27.6058 29.7819 26.75 32.3555 26.75 35C26.75 37.751 27.66 40.292 29.1895 42.336L32.9695 38.556C32.3345 37.4786 31.9997 36.2507 32 35C32 33.705 32.3535 32.487 32.9695 31.444L29.1895 27.664ZM31.664 25.1895L35.444 28.9695C36.5214 28.3345 37.7493 27.9997 39 28C40.295 28 41.513 28.3535 42.556 28.9695L46.336 25.1895C44.2181 23.6058 41.6445 22.75 39 22.75C36.249 22.75 33.708 23.66 31.664 25.1895ZM48.814 27.664L45.034 31.444C45.6689 32.5217 46.0034 33.7497 46.0028 35.0005C46.0021 36.2512 45.6664 37.479 45.0305 38.556L48.8105 42.336C50.3435 40.292 51.25 37.751 51.25 35C51.25 32.249 50.3435 29.708 48.814 27.664ZM46.3325 44.814L42.5525 41.034C41.4757 41.6672 40.2491 42.0007 39 42C37.705 42 36.487 41.6465 35.444 41.0305L31.664 44.8105C33.708 46.3435 36.249 47.25 39 47.25C41.751 47.25 44.292 46.34 46.336 44.8105M23.25 35C23.25 32.9317 23.6574 30.8836 24.4489 28.9727C25.2404 27.0619 26.4005 25.3256 27.8631 23.8631C29.3256 22.4005 31.0619 21.2404 32.9727 20.4489C34.8836 19.6574 36.9317 19.25 39 19.25C41.0683 19.25 43.1164 19.6574 45.0273 20.4489C46.9381 21.2404 48.6744 22.4005 50.1369 23.8631C51.5995 25.3256 52.7596 27.0619 53.5511 28.9727C54.3426 30.8836 54.75 32.9317 54.75 35C54.75 39.1772 53.0906 43.1832 50.1369 46.1369C47.1832 49.0906 43.1772 50.75 39 50.75C34.8228 50.75 30.8168 49.0906 27.8631 46.1369C24.9094 43.1832 23.25 39.1772 23.25 35ZM35.5 35C35.5 35.9283 35.8687 36.8185 36.5251 37.4749C37.1815 38.1313 38.0717 38.5 39 38.5C39.9283 38.5 40.8185 38.1313 41.4749 37.4749C42.1313 36.8185 42.5 35.9283 42.5 35C42.5 34.0717 42.1313 33.1815 41.4749 32.5251C40.8185 31.8687 39.9283 31.5 39 31.5C38.0717 31.5 37.1815 31.8687 36.5251 32.5251C35.8687 33.1815 35.5 34.0717 35.5 35Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      id: 4,
      type: "renew",
      title: "تمدید آگهی",
      subtitle: "آگهی منقضی شده خود را تمدید کنید !",
      bg: "bg-[#B21828]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="recycling"
          width="64"
          height="64"
          enableBackground="new 0 0 511.992 511.992"
          viewBox="0 0 511.992 511.992"
          fill="#ffffff"
        >
          <g>
            <path d="m276.688 325.654 19.205 23.047 13.248-11.04v2.081c0 21.243-17.282 38.525-38.525 38.525v30c37.785 0 68.525-30.74 68.525-68.525v-2.08l13.247 11.039 19.205-23.047-47.452-39.543zM172.851 302.917v2.08l-13.248-11.039-19.205 23.047 47.453 39.542 47.453-39.542-19.205-23.047-13.248 11.039v-2.08c0-21.243 17.282-38.525 38.525-38.525v-30c-37.785 0-68.525 30.74-68.525 68.525z"></path>
            <path d="m511.992 62.8-21.213-21.213-70.663 70.663h-328.241l-70.662-70.663-21.213 21.213 70.663 70.663v336.941h370.667v-336.941zm-290.999 79.45h70.006v30.183h-70.006zm190.336 298.155h-310.666v-298.155h90.331v60.183h130.006v-60.183h90.33v298.155z"></path>
          </g>
        </svg>
      ),
    },
    {
      id: 5,
      type: "extra_ad",
      title: "آگهی اضافه",
      subtitle: "تعداد آگهی های خود را افزایش دهید !",
      bg: "bg-[#B21828]",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          fill="none"
          viewBox="0 0 96 96"
          id="add"
        >
          <rect
            width="63"
            height="63"
            stroke="#ffffff"
            strokeWidth="5"
            rx="9"
            transform="matrix(-1 0 0 1 86 24)"
          ></rect>
          <path
            stroke="#ffffff"
            strokeWidth="5"
            d="M72 23L72 19C72 14.0294 67.9706 10 63 10L18 10C13.0294 9.99999 9 14.0294 9 19L9 64C8.99999 68.9706 13.0294 73 18 73L23 73"
          ></path>
          <path
            stroke="#ffffff"
            strokeLinecap="round"
            strokeWidth="5"
            d="M43 55L65 55M54 44L54 67"
          ></path>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    if (openId == null) return;
    if (!plansData[openId]) {
      const meta = plansMeta.find((p) => p.id === openId);
      getSubscriptionPlans(meta.type).then((results) => {
        setPlansData((prev) => ({ ...prev, [openId]: results }));
      });
    }
  }, [openId]);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="px-2 md:px-0">
      <div
        dir="rtl"
        className={`${
          currentPath?.match(/^\/dashboard\/managead\/\d+$/) ||
          currentPath?.match("/dashboard")
            ? ""
            : "pt-8"
        } md:max-w-lg mx-auto`}
      >
        <div dir="ltr" className="justify-between w-full flex items-center ">
          <button
            className="btn btn-sm bg-secondary text-white border-none disabled:bg-secondary disabled:text-white disabled:opacity-50"
            onClick={() =>
              selectedType === "extra_ad"
                ? console.log({
                    subscription_plan: selectedPlan,
                  })
                : console.log({
                    ad: submitedAdID,
                    subscription_plan: selectedPlan,
                  })
            }
            disabled={!selectedPlan}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
            >
              <path
                d="M9.242 15.9735C8.84789 15.9746 8.45747 15.8975 8.09339 15.7466C7.7293 15.5957 7.39878 15.374 7.121 15.0945L0 7.97345L7.121 0.852453C8.254 -0.281547 10.23 -0.281547 11.363 0.852453C11.929 1.41645 12.242 2.16945 12.242 2.97145C12.242 3.71745 11.972 4.42245 11.478 4.97345H16.314C17.968 4.97345 19.314 6.31945 19.314 7.97345C19.314 9.62745 17.968 10.9735 16.314 10.9735H11.478C11.971 11.5225 12.242 12.2255 12.242 12.9715C12.2436 13.3661 12.1667 13.7571 12.0158 14.1217C11.8649 14.4864 11.643 14.8173 11.363 15.0955C11.085 15.3746 10.7544 15.5959 10.3903 15.7466C10.0263 15.8973 9.636 15.9744 9.242 15.9735ZM2.828 7.97345L8.535 13.6805C8.72537 13.8625 8.97861 13.9641 9.242 13.9641C9.50539 13.9641 9.75863 13.8625 9.949 13.6805C10.138 13.4915 10.242 13.2395 10.242 12.9725C10.242 12.7055 10.138 12.4555 9.951 12.2675L6.656 8.97345H16.314C16.5715 8.96193 16.8146 8.85155 16.9927 8.66527C17.1709 8.47899 17.2703 8.23119 17.2703 7.97345C17.2703 7.71572 17.1709 7.46791 16.9927 7.28163C16.8146 7.09536 16.5715 6.98497 16.314 6.97345H6.656L9.949 3.68045C10.0422 3.58795 10.1162 3.47793 10.1668 3.35671C10.2173 3.2355 10.2434 3.10549 10.2434 2.97416C10.2435 2.84283 10.2177 2.71279 10.1673 2.5915C10.1169 2.47022 10.0431 2.36009 9.95 2.26745C9.75971 2.08499 9.50633 1.98304 9.2427 1.98285C8.97907 1.98267 8.72554 2.08426 8.535 2.26645L2.828 7.97345Z"
                fill="white"
              />
            </svg>
            <span className="font-vazir">پرداخت</span>
          </button>

          <Link
            href="/dashboard"
            className={`btn-sm text-secondary bg-transparent shadow-none border-none 
              ${
                currentPath?.match(/^\/dashboard\/managead\/\d+$/) ||
                currentPath?.match("/dashboard")
                  ? "hidden"
                  : ""
              }
              `}
          >
            <span className="font-vazir font-bold">داشبورد</span>
          </Link>
        </div>

        <div dir="ltr" className="py-6 md:max-w-lg mx-auto">
          <div
            className={`font-vazir text-black text-center py-4 text-lg font-bold flex justify-center gap-2 ${
              currentPath?.match(/^\/dashboard\/managead\/\d+$/) ||
              currentPath?.match("/dashboard")
                ? "hidden"
                : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3"
              />
            </svg>
            <span>آگهی خود را ارتقا دهید تا نتیجه بهتری کسب کنید</span>
          </div>

          <div className="space-y-2">
            {plansMeta.map((plan) => (
              <div key={plan.id}>
                <div
                  dir="rtl"
                  className={`${
                    plan.bg
                  } flex h-28 items-center justify-between p-6 text-white rounded-2xl cursor-pointer ${
                    (plan.type === "renew" && currentPath !== "/dashboard") ||
                    (plan.type !== "renew" && currentPath === "/dashboard") ||
                    (plan.type === "extra_ad" &&
                      currentPath.startsWith("/createad")) ||
                    (plan.type !== "extra_ad" &&
                      currentPath === "/dashboard/additionalad")
                      ? "hidden"
                      : ""
                  } }`}
                  onClick={() => toggle(plan.id)}
                >
                  <div>
                    <h2>{plan.title}</h2>
                    <p className="font-vazir">{plan.subtitle}</p>
                  </div>
                  {plan.icon}
                </div>

                <div
                  ref={(el) => (contentRefs.current[plan.id] = el)}
                  className={`transition-all duration-300 bg-white ${
                    openId === plan.id ? "block" : "hidden"
                  }`}
                >
                  <ul dir="rtl" className="p-4 space-y-1 text-base-100">
                    {plansData[plan.id] ? (
                      plansData[plan.id].map((item) => (
                        <li
                          onClick={() => {
                            setSelectedPlan(item.id);
                            setSelectedType(item.type);
                          }}
                          key={item.id}
                          className={`font-vazir cursor-pointer text-sm flex items-center p-2 rounded-lg border-4 ${
                            selectedPlan === item.id
                              ? "border-primary"
                              : "border-base-100"
                          }`}
                        >
                          <div>
                            <div className="flex gap-2 mb-2 items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                                />
                              </svg>

                              <p className="font-bold text-base">{item.name}</p>
                            </div>
                            <div className="flex mb-2 gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4 text-[#bc1526]"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                />
                              </svg>
                              <p className="text-xs text-primary">
                                {item.description}
                              </p>
                            </div>

                            <span>{item.price} هزار تومان</span>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-center py-2">
                        <span className="loading loading-spinner loading-sm"></span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
