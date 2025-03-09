import React from "react";

export const SocialSignUp: React.FC = () => {
  return (
    <button className="flex flex-col justify-center items-center px-16 py-4 mt-7 w-full text-base rounded-lg border border-black border-solid bg-zinc-300 bg-opacity-0">
      <div className="flex gap-3 max-w-full w-[348px] items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/088f13f7c90f068dff9dc7f8cd2dc7fe4208f1815e5aa3864668e4a3919f362e?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
          className="object-contain shrink-0 aspect-square w-[35px]"
          alt="Google logo"
        />
        <span className="flex-auto self-start w-[295px]">
          Sign Up with Google
        </span>
      </div>
    </button>
  );
};
