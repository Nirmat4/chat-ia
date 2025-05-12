"use client";
import { messages_send } from "@/app/database/messages";

export default function MessageZone(){
    const messages=messages_send;
    console.log(messages);

    return (
        <div className="flex flex-col m-4 p-4 gap-4 w-[90%] md:w-[70%] lg:w-[60%] overflow-y-auto">
            {messages.length<0?(
                <div className="flex flex-col justify-center items-center">
                    <p className="text-[27px] font-bold">¿Con qué puedo ayudarte?</p>
                </div>
            ):(
                <div className="flex flex-col">
                    {messages.map((message, index)=>(
                        <div key={index} className={`flex ${message.emisor==="user"?"justify-end":"justify-start"} m-1`}>
                            <div className={`${message.emisor=="user"?"p-2 m-2 bg-card backdrop-blur-sm rounded-xl":"m-2"}`}>
                                <p>{message.mensaje}</p>
                                {message.emisor=="llm"?(
                                    <div className="my-1">
                                        <p>options</p>
                                    </div>
                                ):(<></>)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}