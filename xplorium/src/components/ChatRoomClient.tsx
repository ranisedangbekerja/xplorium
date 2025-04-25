"use client";
import { useState } from "react";
import { Press_Start_2P } from "next/font/google";
import { LuSend } from "react-icons/lu";
import Image from "next/image";
import SignOutButton from "./SignOutButton";
import NavigationSidebar from "./NavigationSidebar";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function ChatRoomClient({ user }: { user: any }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, input]);
    setInput("");
  };

  const handleCategoryClick = (category: string) => {
    const categoryMessages: { [key: string]: string } = {
      Art: "I want to explore about art project",
      Robot: "I want to explore about robot project",
      Physics: "I want to explore about physics project",
      Biology: "I want to explore about biology project",
      Craft: "I want to explore about craft project",
    };

    if (categoryMessages[category]) {
      setInput(categoryMessages[category]);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <NavigationSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6 bg-white relative">
        
        {/* Sign Out Button */}
        <div className="absolute top-4 right-4">
          <SignOutButton />
        </div>

        {/* Greetings and Categories */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          {messages.length === 0 && (
            <>
              {/* Greeting */}
              <div className={`text-2xl text-black ${pressStart2P.className} text-center`}>
                Hi! What do you want to Xplore?
              </div>

              {/* Categories */}
              <div className="flex flex-row space-x-4">
                {["Art", "Robot", "Physics", "Biology", "Craft"].map((category) => (
                  <div
                    key={category}
                    className="rounded-xl"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <Image
                      width={1920}
                      height={1080}
                      src={`/Frame-${category}.png`}
                      alt={`Frame ${category}`}
                      className="w-[100px] h-[100px] object-cover hover:opacity-80 hover:cursor-pointer hover:-translate-y-2 transition-transform"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Chat Bubbles */}
        <div className="flex flex-col space-y-4 overflow-y-auto mb-4 items-end">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="p-4 bg-[#0180FF] rounded-lg max-w-xs text-white"
            >
              <pre className="whitespace-pre-wrap">{msg}</pre>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex items-center space-x-4 h-10">
          <textarea
            className="flex-1 p-3 rounded-lg border border-black w-10/12 h-full resize-none text-gray-400 placeholder-gray-400"
            placeholder="Enter your message here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSendMessage();
                e.preventDefault();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-500 active:bg-gray-600"
          >
            <LuSend />
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChatRoomClient;
