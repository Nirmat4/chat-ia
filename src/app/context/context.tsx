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
import { useStyleRegistry } from "styled-jsx";

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
  selected: string;
  selectedModel: Model | undefined;
  models: Model[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  sql: boolean;
  jql: boolean;
  emb: boolean;
  setSql: React.Dispatch<React.SetStateAction<boolean>>;
  setJql: React.Dispatch<React.SetStateAction<boolean>>;
  setEmb: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: () => Promise<void>;
  send: boolean;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [responding, setResponding] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [spaceId, setSpaceId] = useState<string | null>(null);
  const [spaces, setSpaces] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>(models[0].name);
  const [sql, setSql] = useState<boolean>(false);
  const [emb, setEmb] = useState<boolean>(false);
  const [jql, setJql] = useState<boolean>(false);
  const [send, setSend] = useState(false);

  const selectedModel: Model | undefined = models.find(
    (model) => model.name === selected
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 4 * 24;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  }, [value]);

  const sendMessage = async () => {
    if (!value.trim() || responding) return;
    setSend(true)
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
    setResponding(true);

    try {
      const resp = await fetch("http://localhost:5000/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: value, model: selected, sql, emb, jql }),
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
      setSend(!send)
    } catch (err) {
      console.error(err);
    } finally {
      setResponding(false);
      setSend(false)
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  useEffect(() => {}, [response]);
  useEffect(() => {}, [messages]);

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

  useEffect(() => {
    (async () => {
      const userId = "JOSAFAT";
      const list = await getUserSpaces(userId);
      setSpaces(list);
    })();
  }, [getUserSpaces]);

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
          selected,
          selectedModel,
          models,
          setSelected,
          jql,
          sql,
          emb,
          setJql,
          setSql,
          setEmb,
          sendMessage,
          send
        } as any
      }
    >
      {children}
    </Context.Provider>
  );
}
