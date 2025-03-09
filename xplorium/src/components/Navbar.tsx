"use client";

import * as React from "react";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarTitle } from "./NavbarTitle";
import { LoginButton } from "./LoginButton";

export const Navbar: React.FC = () => {
  const handleLogin = React.useCallback(() => {
    // Handle login logic here
    console.log("Login clicked");
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
      <nav className="flex relative items-center px-5 py-0 w-full bg-[#0086FE] h-[50px]">
        <NavbarLogo
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e888c612612ebf4344d843761d769e790a1579e2"
          alt="Logo"
        />
        <NavbarTitle title="Xplorium" />
        <LoginButton onClick={handleLogin} />
      </nav>
    </>
  );
};

export default Navbar;
