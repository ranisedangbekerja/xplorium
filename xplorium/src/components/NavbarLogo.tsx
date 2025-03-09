"use client";

import * as React from "react";

interface NavbarLogoProps {
  src: string;
  alt: string;
}

export const NavbarLogo: React.FC<NavbarLogoProps> = ({ src, alt }) => {
  return (
    <img src={src} className="object-contain h-[50px] w-[50px]" alt={alt} />
  );
};
