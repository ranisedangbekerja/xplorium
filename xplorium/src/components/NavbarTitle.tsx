"use client";

import * as React from "react";

interface NavbarTitleProps {
  title: string;
}

export const NavbarTitle: React.FC<NavbarTitleProps> = ({ title }) => {
  return (
    <h1 className="grow ml-5 text-[14px] leading-9 text-white font-['Press_Start_2P'] max-md:text-[10px] max-sm:ml-2.5 max-sm:text-[9px]">
      {title}
    </h1>
  );
};
