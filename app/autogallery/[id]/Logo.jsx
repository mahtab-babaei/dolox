import React from "react";

const Logo = ({ logo }) => {
  return (
    <div className="rounded-2xl bg-gradient-red p-1.5 w-40 h-40">
      <img
        alt="autogalleryLogo"
        src={logo ? logo : "/images/sampleautogallery.png"}
        className="aspect-square object-cover rounded-2xl"
      />
    </div>
  );
};

export default Logo;
