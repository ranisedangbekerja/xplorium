"use client";
import * as React from "react";

export function CTAButton() {
  const handleClick = () => {
    // Handle button click action
    console.log("Start creating clicked");
  };

  return (
    <button
      onClick={handleClick}
      className="self-center px-3 py-9 mt-16 max-w-full text-3xl leading-none text-black bg-white rounded-lg min-h-[95px] w-[562px] max-md:mt-10 max-md:max-w-full hover:bg-gray-100 transition-colors duration-200"
    >
      Start Creating
    </button>
  );
}
