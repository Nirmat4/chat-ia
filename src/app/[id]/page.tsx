"use client";
import { MemoizedMessageBubble } from "@/utils/messageBubble";
import React, { useContext, useEffect, useRef } from "react";
import { Context } from "@/app/context/context";
import { useParams } from "next/navigation";

export default function MessageZone() {
  const { messages, height } = useContext(Context);
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className={`
        flex flex-col
        justify-start items-center
        mb-2 gap-4 w-full
        min-h-0
        overflow-y-auto scroll-smooth
        focus:outline-none
      `}
      style={{
        /* altura dinámica: viewport menos tu variable `height` */
        height: `calc(100vh - 160px - ${height}px)`,
      }}
    >
      {messages.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-[27px] font-bold">¿Con qué puedo ayudarte?</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-full">
          {messages.map((message) => (
            <MemoizedMessageBubble key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}
