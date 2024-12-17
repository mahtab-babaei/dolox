import React from "react";

const Badge = ({ children }) => {
  return (
    <span className="font-vazir text-xs py-[2px] px-2 bg-primary md:bg-white text-white md:text-primary border rounded-full border-primary">
      {children}
    </span>
  );
};

export default Badge;
