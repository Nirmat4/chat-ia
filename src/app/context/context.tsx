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
import { useRouter } from 'next/navigation';

interface AppContextType {
  messages: Message[];
  sql: boolean;
  jql: boolean;
  emb: boolean;
  send: boolean;
  spaces: Space[];
  value: string;
  models: Model[];
  selectedModel: Model | undefined;
  setSql: React.Dispatch<React.SetStateAction<boolean>>;
  setJql: React.Dispatch<React.SetStateAction<boolean>>;
  setEmb: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleCreateSpace: () => Promise<void>;
  sendMessage: () => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => Promise<void>;
  chat: string;
  handleChangeChat: (chatID: string) => Promise<void>;
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
interface Space{
  id: string
  name: string
  date: string
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [selModel, setSelModel] = useState<string>(models[0].name);
  const [responding, setResponding] = useState(false);
  const [send, setSend] = useState(false);
  const [spaceId, setSpaceId] = useState<string | null>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [sql, setSql] = useState<boolean>(false);
  const [emb, setEmb] = useState<boolean>(false);
  const [jql, setJql] = useState<boolean>(false);
  const [chat, setChat] = useState<string>("e5993e40-3319-4d48-bd77-4cd8245a3342");
  const router = useRouter();

  const selectedModel: Model | undefined = models.find(
    (model) => model.name === selModel
  );

  const sendMessage = async () => {
    if (!prompt.trim() || responding) return;
    setSend(true);
    const id_user =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const id_llm =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 6);

    setMessages((prev) => [
      ...prev,
      { id: id_user, role: "user", content: prompt, date: new Date() },
      { id: id_llm, role: "assistant", content: "", date: new Date() },
    ]);
    setPrompt("");
    setResponding(true);

    try {
      const resp = await fetch("http://localhost:5000/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          model: selModel,
          sql,
          emb,
          jql,
        }),
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
        handleChangeChat(data.space.id)
        return data.space.id;
      } catch (err) {
        console.error("Error al crear espacio:", err);
        return null;
      }
    },
    []
  );

  const getUserSpaces = useCallback(
    async (userId: string): Promise<Space[]> => {
      try {
        const res = await fetch("http://localhost:5000/api/get_spaces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: { spaces: Space[] } = await res.json();
        return data.spaces || [];
      } catch (error) {
        console.error("Error al obtener spaces:", error);
        return [];
      }
    },
    []
  );

  const handleCreateSpace = useCallback(async () => {
    const userId = "JOSAFAT";
    const newId = await createNewSpace(userId);
    if (newId) {
      setSpaceId(newId);
      const updated = await getUserSpaces(userId);
      setSpaces(updated);
    }
  }, [createNewSpace, getUserSpaces]);

  const handleChangeChat= useCallback((chatId: string)=>{
    if (chatId!=chat)
      setChat(chatId)
      router.push(`/${chatId}`);
  }, [chat]);

  useEffect(() => {
    (async () => {
      const userId = "JOSAFAT";
      const list = await getUserSpaces(userId);
      setSpaces(list);
    })();
  }, [getUserSpaces]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 4 * 24;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  }, [prompt]);

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
          handleCreateSpace,
          spaces,
          selectedModel,
          models,
          setSelected: setSelModel,
          value: prompt,
          textareaRef,
          handleKeyDown,
          setValue: setPrompt,
          chat,
          handleChangeChat
        } as any
      }
    >
      {children}
    </Context.Provider>
  );
}
