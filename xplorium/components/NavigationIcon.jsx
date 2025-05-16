"use client";

import * as React from "react";

export const NavigationIcon = ({
  src,
  className = "",
}) => {
  return (
    <figure className={`w-[47px] ${className}`}>
      <img
        src={src}
        alt="Navigation icon"
        className="object-contain aspect-square w-full"
      />
    </figure>
  );
};
