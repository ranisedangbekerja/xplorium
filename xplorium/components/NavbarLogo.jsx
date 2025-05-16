"use client";

import * as React from "react";

export const NavbarLogo = ({ src, alt }) => {
  return (
    <img src={src} className="object-contain h-[50px] w-[50px]" alt={alt} />
  );
};