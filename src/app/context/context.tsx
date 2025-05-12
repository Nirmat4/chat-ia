"use client"
import { createContext, useState, useEffect, useRef, ReactNode } from "react";

interface AppContextType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  response: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => Promise<void>;
  messages: Message[];
  responding: boolean;
}

interface ContextProviderProps {
  children: ReactNode;
}

interface Message {
  id: string;
  role: string;
  content: string;
  date: Date;
}

export const Context = createContext<AppContextType>({} as AppContextType);
export function ContextProvider({ children }: ContextProviderProps) {

  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [responding, setResponding] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 4 * 24;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  }, [value]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const id_user=Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
      const id_llm=Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
      setMessages((prev) => [...prev, { id: id_user, role: "user", content: value, date: new Date() }]);
      setMessages((prev) => [
        ...prev,
        { id: id_llm, role: "assistant", content: "", date: new Date() },
      ]);
      setValue("");

      try {
        const response = await fetch("http://localhost:5000/api/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: value }),
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";
        
        setResponding(true);
        while (reader) {
          const { done, value: chunk } = await reader.read();
          if (done) break;
          const token = decoder.decode(chunk);
          fullResponse += token;
          // update the streaming message in place
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === id_llm ? { ...msg, content: fullResponse } : msg
            )
          );
        }

        setResponding(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  useEffect(()=>{
    console.log(messages);
  }, [messages])

  return <Context.Provider value={{
    value,
    setValue,
    response,
    setResponse,
    textareaRef,
    handleKeyDown,
    messages,
    responding,
  } as any
  }>{children}</Context.Provider>;
}
