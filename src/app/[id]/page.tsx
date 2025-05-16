"use client";
import { MemoizedMessageBubble } from "@/utils/messageBubble";
import React, { useContext, useEffect, useRef } from "react";
import { Context } from "@/app/context/context";
import { useParams } from "next/navigation";

export default function MessageZone() {
  const { messages } = useContext(Context);
  const params = useParams();
  const { id } = params;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div ref={containerRef} className="flex flex-col justify-start items-center m-4 p-4 gap-4 h-[calc(100vh-260px)] w-full overflow-auto scroll-smooth" >
      {messages.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-[27px] font-bold">¿Con qué puedo ayudarte?</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-[90%] xl:w-[70%]">
          {messages.map((message) => (
            <MemoizedMessageBubble key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}
