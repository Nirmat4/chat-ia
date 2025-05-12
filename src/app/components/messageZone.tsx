"use client";
import { useContext, useEffect, useRef } from "react";
import { Context } from "@/app/context/context";
import ReactMarkdown from "react-markdown";

export default function MessageZone() {
  const { messages} = useContext(Context);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col justify-start h-full m-4 p-4 gap-4 w-[90%] xl:w-[70%] overflow-y-auto">
      {messages.length==0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-[27px] font-bold">¿Con qué puedo ayudarte?</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${ message.role === "user" ? "justify-end" : "justify-start" } m-1 items-start`}>
              <div className={`p-2 m-2 ${message.role == "user" ? "bg-card backdrop-blur-sm rounded-xl max-w-[80%] " : "" }`} >
                {message.role=="assistant"?(
                  <div>
                    <ReactMarkdown components={{p: ({ node, ...props }) => <div className="gap-4"{...props} />}}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ):(
                  <div><p>{message.content}</p></div>
                )}
              </div>
            </div>
          ))}
          <div ref={endRef}/>
        </div>
      )}
    </div>
  );
}