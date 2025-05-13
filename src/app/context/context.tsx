"use client";
import {
  createContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from "react";

interface AppContextType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  response: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => Promise<void>;
  messages: Message[];
  responding: boolean;
  createNewSpace: (userId: string) => Promise<string | null>;
  spaceId: string | null;
  setSpaceId: React.Dispatch<React.SetStateAction<string | null>>;
  getUserSpaces: (userId: string) => Promise<string[]>;
  handleCreateSpace: () => Promise<void>;
  spaces: string[];
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
  const [spaceId, setSpaceId] = useState<string | null>(null);
  const [spaces, setSpaces] = useState<string[]>([]);

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
      const id_user =
        Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
      const id_llm =
        Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
      setMessages((prev) => [
        ...prev,
        { id: id_user, role: "user", content: value, date: new Date() },
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
    //console.log(response);
  }, [response]);

  useEffect(() => {
    //console.log(messages);
  }, [messages]);

  // Hook memorizado para crear un nuevo space
  const createNewSpace = useCallback(
    async (userId: string): Promise<string | null> => {
      try {
        const res = await fetch("http://localhost:5000/api/new_space", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        return data.space_id;
      } catch (err) {
        console.error("Error al crear espacio:", err);
        return null;
      }
    },
    []
  );

  // Función para obtener los spaces de un usuario
  const getUserSpaces = useCallback(
    async (userId: string): Promise<string[]> => {
      try {
        const res = await fetch("http://localhost:5000/api/get_spaces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        return data.spaces || [];
      } catch (error) {
        console.error("Error al obtener spaces:", error);
        return [];
      }
    },
    []
  );

  // Carga inicial de spaces al montar
  useEffect(() => {
    (async () => {
      const userId = "JOSAFAT";
      const list = await getUserSpaces(userId);
      setSpaces(list);
    })();
  }, [getUserSpaces]);

  // Al crear un nuevo space, recarga la lista\
  const handleCreateSpace = useCallback(async () => {
    const userId = "JOSAFAT";
    const newId = await createNewSpace(userId);
    if (newId) {
      setSpaceId(newId);
      const updated = await getUserSpaces(userId);
      setSpaces(updated);
    }
  }, [createNewSpace, getUserSpaces]);

  return (
    <Context.Provider
      value={
        {
          value,
          setValue,
          response,
          setResponse,
          textareaRef,
          handleKeyDown,
          messages,
          responding,
          createNewSpace,
          spaceId,
          setSpaceId,
          getUserSpaces,
          handleCreateSpace,
          spaces,
        } as any
      }
    >
      {children}
    </Context.Provider>
  );
}