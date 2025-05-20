"use client";
import {
  createContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from "react";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useRouter } from "next/navigation";

interface AppContextType {
  messages: Message[];
  sql: boolean;
  jql: boolean;
  emb: boolean;
  send: boolean;
  chats: Chat[];
  value: string;
  models: Model[];
  selectedModel: Model | undefined;
  setSql: React.Dispatch<React.SetStateAction<boolean>>;
  setJql: React.Dispatch<React.SetStateAction<boolean>>;
  setEmb: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleCreateChat: () => Promise<void>;
  sendMessage: () => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => Promise<void>;
  chat: string;
  handleChangeChat: (chatID: string) => Promise<void>;
  deleteChat: (chatID: string) => Promise<void>;
  height: number;
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
interface Chat {
  id: string;
  name: string;
  date: string;
}

interface Model {
  name: string;
  description: string;
  icon: React.ReactNode;
}
const models: Model[] = [
  {
    name: "Qwen3",
    description:
      "El políglota que domina más de 100 idiomas sin perder coherencia.",
    icon: <AutoAwesomeRoundedIcon />,
  },
  {
    name: "DeepSeek-R1",
    description:
      "El especialista en operaciones matemáticas y generación de código fiable.",
    icon: <BubbleChartRoundedIcon />,
  },
  {
    name: "Phi-4",
    description: "El experto en resolver problemas complejos con precisión.",
    icon: <ApiRoundedIcon />,
  },
];

export const Context = createContext<AppContextType>({} as AppContextType);
export function ContextProvider({ children }: ContextProviderProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<number>(0);

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const [chats, setChats] = useState<Chat[]>([]);
  const [chat, setChat] = useState<string>("auto");

  const [selModel, setSelModel] = useState<string>(models[0].name);
  const [responding, setResponding] = useState(false);
  const [send, setSend] = useState(false);

  const [sql, setSql] = useState<boolean>(false);
  const [emb, setEmb] = useState<boolean>(false);
  const [jql, setJql] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    router.push(`/${chat}`);
  }, [router]);

  const selectedModel: Model | undefined = models.find(
    (model) => model.name === selModel
  );

  const sendMessage = async () => {
    if (!prompt.trim() || responding) return;
    if (chat === "auto") {
      const newChat = await handleCreateChat();
      if (newChat) sendData(newChat);
    } else {
      sendData(chat);
    }
  };

  const getResponse = async (
    id_user: string,
    id_llm: string,
    id_chat: string
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: id_user,
        id_chat: id_chat,
        role: "user",
        content: prompt,
        date: new Date(),
      },
      {
        id: id_llm,
        id_chat: id_chat,
        role: "assistant",
        content: "",
        date: new Date(),
      },
    ]);
    const dataSendJson = {
      id_message: id_user,
      id_chat: id_chat,
      role: "user",
      prompt: prompt,
      model: selModel,
      sql,
      emb,
      jql,
    };
    const resp = await fetch("http://localhost:5000/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataSendJson),
    });
    const reader = resp.body!.getReader();
    const dec = new TextDecoder();
    let full = "";

    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) break;
      full += dec.decode(chunk);
      setMessages((prev) =>
        prev.map((m) => (m.id === id_llm ? { ...m, content: full } : m))
      );
    }
  };

  const sendData = async (id_chat: string) => {
    setSend(true);
    const id_user =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const id_llm =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    setPrompt("");
    setResponding(true);
    try {
      getResponse(id_user, id_llm, id_chat);
      setSend(!send);
    } catch (err) {
      console.error(err);
    } finally {
      setResponding(false);
      setSend(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const createNewChat = useCallback(
    async (userId: string): Promise<string | null> => {
      try {
        const res = await fetch("http://localhost:5000/api/new_chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        handleChangeChat(data.chat.id);
        return data.chat.id;
      } catch (err) {
        console.error("Error al crear chat:", err);
        return null;
      }
    },
    []
  );

  const getUserChats = useCallback(async (userId: string): Promise<Chat[]> => {
    try {
      const res = await fetch("http://localhost:5000/api/get_chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: { chats: Chat[] } = await res.json();
      return data.chats || [];
    } catch (error) {
      console.error("Error al obtener chats:", error);
      return [];
    }
  }, []);

  const handleCreateChat = useCallback(async (): Promise<string | null> => {
    try {
      const userId = "JOSAFAT";
      const newId = await createNewChat(userId);
      if (newId) {
        setChat(newId);
        const updated = await getUserChats(userId);
        setChats(updated);
        return newId;
      }
      return null;
    } catch (err) {
      console.error("Error en handleCreateChat", err);
      return null;
    }
  }, [createNewChat, getUserChats]);

  const handleGetMessages = useCallback(
    async (chatId: string): Promise<Message[]> => {
      try {
        const res = await fetch("http://localhost:5000/api/get_messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_chat: chatId }),
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: { messages: Message[] } = await res.json();
        return data.messages;
      } catch (error) {
        console.error("Error al obtener messages:", error);
        return [];
      }
    },
    []
  );

  const handleChangeChat = useCallback(
    async (chatId: string) => {
      if (chatId != chat) {
        setChat(chatId);
        router.push(`/${chatId}`);
      }
      const updated = await handleGetMessages(chatId);
      setMessages(updated);
    },
    [chat, handleGetMessages]
  );

  const deleteChat = async (chatId: string) => {
    const userId = "JOSAFAT";
    if (chat === chatId){
      setChat("auto")
      router.push("/auto")
      setMessages([]);
    };
    try {
      const res = await fetch("http://localhost:5000/api/delete_chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_chat: chatId, user_id: userId }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);

      const updatedChats = await getUserChats(userId);
      setChats(updatedChats);
    } catch (error) {
      console.error("Error al eliminar chat:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const userId = "JOSAFAT";
      const list = await getUserChats(userId);
      setChats(list);
    })();
  }, [getUserChats]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to correctly recalculate scrollHeight
      textarea.style.height = "auto";
      const lineHeight = 24;
      const maxLines = 4;
      const maxHeight = lineHeight * maxLines;
      // Calculate new height clamped by maxHeight
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
      // Update local state and log
      setHeight(newHeight);
      console.log(`Textarea height: ${newHeight}px`);
    }
  }, [prompt, textareaRef]);

  return (
    <Context.Provider
      value={
        {
          messages,
          jql,
          sql,
          emb,
          setJql,
          setSql,
          setEmb,
          sendMessage,
          send,
          handleCreateChat,
          chats: chats,
          selectedModel,
          models,
          setSelected: setSelModel,
          value: prompt,
          textareaRef,
          handleKeyDown,
          setValue: setPrompt,
          chat,
          handleChangeChat,
          deleteChat,
          height
        } as any
      }
    >
      {children}
    </Context.Provider>
  );
}
