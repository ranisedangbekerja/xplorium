"use client";

import * as React from "react";
import Link from "next/link"; // Import Link dari next
import { NavigationIcon } from "./NavigationIcon.jsx";
import { signOut } from "next-auth/react";

export const NavigationSidebar = () => {
  return (
    <nav className="max-w-[78px]">
      <div className="overflow-hidden px-3.5 py-8 mb-0 w-full bg-sky-950">
        {/* Link to ChatRoomClient */}
        <Link href="/chatroom">
          <NavigationIcon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/43d8a672c98d170da460a1e53c88fd579615fcf9?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
            className="cursor-pointer hover:opacity-80 transition"
          />
        </Link>

        {/* Link to History */}
        <Link href="/history">
          <NavigationIcon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0bf79da1e2d73d49b24a15504c4256a85dcaedc?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
            className="mt-8 aspect-[0.98] cursor-pointer hover:opacity-80 transition"
          />
        </Link>

        {/* Sign Out Icon */}
        <div className="mt-[485px] cursor-pointer" onClick={() => signOut()}>
          <NavigationIcon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b7ffd589886bedc19eca9924af3cc52c39bfd76?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavigationSidebar;
