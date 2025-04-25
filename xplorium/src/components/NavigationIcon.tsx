"use client";

import * as React from "react";

interface NavigationIconProps {
  src: string;
  className?: string;
}

export const NavigationIcon: React.FC<NavigationIconProps> = ({
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
