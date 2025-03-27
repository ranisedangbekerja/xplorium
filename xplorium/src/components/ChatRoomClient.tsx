"use client"
import { useState } from "react";
import { Press_Start_2P } from "next/font/google";
import { LuSend } from "react-icons/lu";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

function ChatRoomClient({ user }: { user: any }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <>
      <div className="flex flex-col h-screen p-6 bg-gray-100 relative">
        {/* Sign Out Button */}
        <SignOutButton/>

        {/* Greetings Message + Categories */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          {messages.length === 0 && (
            <>
              {/* Greetings */}
              <div className={`text-2xl font-semibold text-gray-600 ${pressStart2P.className} text-center`}>
                {/* Hi, {user?.name.split(" ")[0]}! What do you want to explore today? */}
                Hi! What do you want to explore today?
              </div>

              {/* Categories */}
              <div className="flex flex-row space-x-4">
                {["Art", "Robot", "Physics", "Biology", "Craft"].map((category) => (
                  <div key={category} className="rounded-xl">
                    <Image
                      width={1920}
                      height={1080}
                      src={`/Frame-${category}.png`}
                      alt={`Frame ${category}`}
                      className="w-full h-full object-cover hover:opacity-80 hover:cursor-pointer hover:-translate-y-4 transition-transform"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Show the user's questions in bubble chat */}
        <div className="flex flex-col space-y-4 overflow-y-auto mb-4 items-end" >
          {messages.map((msg, index) => (
            <div key={index} className="p-4 bg-white rounded-lg">
              <pre className="whitespace-pre-wrap">{msg}</pre>
            </div>
          ))}
        </div>

        {/* Question Text Box */}
        <div className="flex justify-center items-center space-x-4 ">
          <textarea
            className="flex-1 p-3 rounded-lg border w-10/12 h-full resize-none"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSendMessage();
                e.preventDefault(); // Prevents adding a new line when sending
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-2 h-full bg-gray-700 text-white rounded-lg text-center hover:bg-gray-500 active:bg-gray-500 focus:border focus:border-double"
          >
            <LuSend/>
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatRoomClient;