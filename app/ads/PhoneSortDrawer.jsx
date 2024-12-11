import React from "react";
import { useState } from "react";
import { orderButtons } from "@/utils/constants";

const PhoneSortDrawer = ({ onOrderChange }) => {
  const [drawer, setdrawer] = useState(false);
  const [label, setLabel] = useState("جدید ترین");

  return (
    <div>
      <div className="flex justify-end md:hidden ">
        <button
          className="flex bg-white gap-2 text-base-content p-2 my-2 rounded-full items-center"
          onClick={() => setdrawer(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            id="funnel-simple"
            height="28"
            width="28"
          >
            <rect width="256" height="256" fill="none"></rect>
            <line
              x1="64"
              x2="192"
              y1="128"
              y2="128"
              fill="none"
              stroke="#8B7676"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="24"
              x2="232"
              y1="80"
              y2="80"
              fill="none"
              stroke="#8B7676"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="104"
              x2="152"
              y1="176"
              y2="176"
              fill="none"
              stroke="#8B7676"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
          </svg>
          <p>{label}</p>
        </button>
      </div>
      {drawer && (
        <div className="fixed rounded-t-3xl w-screen h-[50%] bottom-0 left-0 z-50 bg-white pt-6 duration-300">
          <div className="flex items-center gap-2 justify-between mb-4 px-8">
            <h2 className="text-xl">مرتب سازی بر اساس</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 15 15"
              fill="none"
              onClick={() => setdrawer(false)}
            >
              <path
                d="M3.64016 2.27L7.50016 6.13L11.3402 2.29C11.425 2.19972 11.5272 2.12749 11.6406 2.07766C11.754 2.02783 11.8763 2.00141 12.0002 2C12.2654 2 12.5197 2.10536 12.7073 2.29289C12.8948 2.48043 13.0002 2.73478 13.0002 3C13.0025 3.1226 12.9797 3.24439 12.9333 3.35788C12.8869 3.47138 12.8178 3.57419 12.7302 3.66L8.84016 7.5L12.7302 11.39C12.895 11.5512 12.9916 11.7696 13.0002 12C13.0002 12.2652 12.8948 12.5196 12.7073 12.7071C12.5197 12.8946 12.2654 13 12.0002 13C11.8727 13.0053 11.7456 12.984 11.6268 12.9375C11.508 12.8911 11.4002 12.8204 11.3102 12.73L7.50016 8.87L3.65016 12.72C3.56567 12.8073 3.46473 12.8769 3.35316 12.925C3.2416 12.9731 3.12163 12.9986 3.00016 13C2.73495 13 2.48059 12.8946 2.29306 12.7071C2.10552 12.5196 2.00016 12.2652 2.00016 12C1.99783 11.8774 2.02058 11.7556 2.06701 11.6421C2.11344 11.5286 2.18257 11.4258 2.27016 11.34L6.16016 7.5L2.27016 3.61C2.10535 3.44876 2.0087 3.23041 2.00016 3C2.00016 2.73478 2.10552 2.48043 2.29306 2.29289C2.48059 2.10536 2.73495 2 3.00016 2C3.24016 2.003 3.47016 2.1 3.64016 2.27Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="flex gap-4 flex-col px-8 items-start">
            {orderButtons.map((orderButton, index) => (
              <button
                className={`${
                  label === orderButton.label ? "text-secondary" : "text-black"
                }`}
                key={index}
                onClick={() => {
                  setLabel(orderButton.label);
                  onOrderChange(orderButton.value);
                  setdrawer(false);
                }}
              >
                {orderButton.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneSortDrawer;
