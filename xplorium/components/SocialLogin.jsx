import React from "react";
import { Press_Start_2P } from 'next/font/google';
import { signIn } from "next-auth/react";

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const SocialLogin = () => {
  return (
    <button 
      className={`flex items-center justify-center px-4 py-3 mt-5 w-full text-xs border border-gray-300 cursor-pointer
                        rounded-lg bg-white hover:bg-gray-100 transition-all duration-200 ${pressStart2P.className}`}
      onClick={() => signIn("google", {redirectTo: "/chatroom"})}      
                  >
      <img
        src="/google-logo.png"
        className="w-6 h-6 mr-3"
        alt="Google logo"
      />
      <span>Login with Google</span>
    </button>
  );
};