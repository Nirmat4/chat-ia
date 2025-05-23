"use client";
import { MemoizedMessageBubble } from "@/utils/messageBubble";
import React, { useContext, useEffect, useRef } from "react";
import { Context } from "@/app/context/context";
import { useParams } from "next/navigation";
import DropsCard from "@/components/dropsCard";
import LavaCard from "@/components/lavaCard";

export default function MessageZone() {
  const { messages, height, models, tasks } = useContext(Context);
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 100; // px antes del fondo
    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    if (isNearBottom) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className={`
        flex flex-col
        ${
          messages.length === 0 ? "justify-center" : "justify-start"
        } items-center
        gap-4 w-full
        min-h-0
        h-full
        mb-[400px]
        overflow-y-auto scroll-smooth
        focus:outline-none
      `}
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center w-full">
          <p className="text-[27px] font-bold">¿Con qué puedo ayudarte?</p>
          <div className="flex flex-col mt-8">
            <p className="font-bold opacity-70">Examinar Modelos</p>
            <div className="flex flex-row gap-2 mt-2">
              {models.map((model, index) => (
                <LavaCard
                  key={index}
                  title={model.name}
                  content={model.description}
                  colors={model.colors}
                  movent={model.movent}
                  className="w-60 h-44"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <p className="font-bold opacity-70">Tareas</p>
            <div className="flex flex-row gap-2 mt-2">
              {tasks.map((model, index) => (
                <DropsCard
                  key={index}
                  title={model.name}
                  content={model.description}
                  colors={model.colors}
                  movent={model.movent}
                  icon={model.icon}
                  className="w-52 h-26"
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-[90%] xl:w-[60%] lg:w-[70%] 2xl:w-[45%]">
          {messages.map((message) => (
            <MemoizedMessageBubble key={message.id} message={message} />
          ))}
        </div>
      )}
      <div
        style={{
          marginTop: `calc(100px + ${height}px)`,
        }}
      ></div>
    </div>
  );
}
