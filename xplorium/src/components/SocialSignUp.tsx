import React from "react";
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const SocialSignUp: React.FC = () => {
  return (
    <button className={`flex items-center justify-center px-4 py-3 mt-5 w-full text-xs border border-gray-300 
                        rounded-lg bg-white hover:bg-gray-100 transition-all duration-200 ${pressStart2P.className}`}
                  >
      <img
        src="/google-logo.png"
        className="w-6 h-6 mr-3"
        alt="Google logo"
      />
      <span>Sign Up with Google</span>
    </button>
  );
};
