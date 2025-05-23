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
import { useRouter } from "next/navigation";
import JoinInnerOutlinedIcon from "@mui/icons-material/JoinInnerOutlined";
import TextRotationAngleupOutlinedIcon from "@mui/icons-material/TextRotationAngleupOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

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
  tasks: Task[];
  load: boolean;
  currentMessage: string;
  setDefault: () => Promise<void>;
  responding: boolean;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => Promise<void>;
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

interface Task {
  name: string;
  description: string;
  colors: string[];
  movent: string;
  icon: React.ReactNode;
}

const style = { color: "#36415395", fontSize: 20 };
const tasks: Task[] = [
  {
    name: "Busqueda SQL",
    description: "Va directo al dato, sin rodeos ni dramas.",
    colors: ["#5900E090", "#0F00E090", "#00C6E090"],
    movent: "-70 -70 250 250",
    icon: <JoinInnerOutlinedIcon style={style} />,
  },
  {
    name: "Busca Semantica",
    description: "Entiende lo que quieres, no solo lo que dices.",
    colors: ["#01E01190", "#A9E00090", "#00E0A790"],
    movent: "-100 0 200 200",
    icon: <TextRotationAngleupOutlinedIcon style={style} />,
  },
  {
    name: "Conexion Jira",
    description: "Mantiene tus tareas y tus nervios bajo control.",
    colors: ["#0300E090", "#9701E190", "#DF00E090"],
    movent: "-50 -50 300 300",
    icon: <EmojiObjectsOutlinedIcon style={style} />,
  },
  {
    name: "Validaciones",
    description: "Genera validacions, cumple la ley... en tus reportes.",
    colors: ["#E03A0090", "#E1860090", "#E0BD0090"],
    movent: "-100 -30 300 300",
    icon: <FlagCircleOutlinedIcon style={style} />,
  },
];

const movents = {
  a: ["0% 50%", "50% 0%", "100% 50%", "50% 100%", "0% 50%"],
  b: ["25% 75%", "75% 75%", "75% 25%", "25% 25%", "25% 75%"],
  c: ["0% 0%", "100% 0%", "0% 100%", "100% 100%", "0% 0%"],
};
type MoventType = keyof typeof movents;
interface Model {
  name: string;
  description: string;
  icon: React.ReactNode;
  colors: string[];
  movent: MoventType;
}
const models: Model[] = [
  {
    name: "Qwen3",
    description:
      "El políglota que domina más de 100 idiomas sin perder coherencia.",
    icon: <AutoAwesomeRoundedIcon />,
    colors: ["#8E00E0", "#A52CDB", "#322CDB"],
    movent: "a",
  },
  {
    name: "DeepSeek-R1",
    description:
      "El especialista en operaciones matemáticas y generación de código fiable.",
    icon: <BubbleChartRoundedIcon />,
    colors: ["#00DAE1", "#2B37E0", "#A700E0"],
    movent: "b",
  },
  {
    name: "Phi-4",
    description: "El experto en resolver problemas complejos con precisión.",
    icon: <ApiRoundedIcon />,
    colors: ["#00A8E0", "#00E0A2", "#E0DE01"],
    movent: "c",
  },
];

export const Context = createContext<AppContextType>({} as AppContextType);
export function ContextProvider({ children }: ContextProviderProps) {
  const [userId, setUserId] = useState<string>("");
  const [username, setUserName] = useState<string>("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<number>(0);

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const [chats, setChats] = useState<Chat[]>([]);
  const [chat, setChat] = useState<string>("model");

  const [selModel, setSelModel] = useState<string>(models[0].name);
  const [responding, setResponding] = useState(false);
  const [send, setSend] = useState(false);

  const [sql, setSql] = useState<boolean>(false);
  const [emb, setEmb] = useState<boolean>(false);
  const [jql, setJql] = useState<boolean>(false);
  const router = useRouter();

  const [search, setSearch] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const dataSetJson = {
      email: email,
      password: password,
    };
    try {
      const resp = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataSetJson),
      });
      if (!resp.ok) {
        const jsonResp = await resp.json();
        console.log(jsonResp.error)
      }
      else {
        const jsonResp = await resp.json();
        setUserId(jsonResp.id_user)
        setUserName(jsonResp.name)
        setDefault()
      }
    } catch {}
  };

  const setDefault = async () => {
    const userId = "JOSAFAT";
    setChat("model");
    router.push("/dashboard/model");
    setMessages([]);
    const updatedChats = await getUserChats(userId);
    setChats(updatedChats);
  };

  const selectedModel: Model | undefined = models.find(
    (model) => model.name === selModel
  );

  const sendMessage = async () => {
    if (!prompt.trim() || responding) return;
    if (chat === "model") {
      const newChat = await handleCreateChat();
      if (newChat) sendData(newChat);
    } else {
      sendData(chat);
    }
  };

  useEffect(() => {
    if (sql || emb || jql) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  }, [sql, jql, emb]);

  const getResponse = async (
    id_message: string,
    id_llm_message: string,
    id_chat: string
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: id_message,
        id_chat: id_chat,
        role: "user",
        content: prompt,
        date: new Date(),
      },
      {
        id: id_llm_message,
        id_chat: id_chat,
        role: "assistant",
        content: "",
        date: new Date(),
      },
    ]);
    const dataSendJson = {
      id_message: id_message,
      id_chat: id_chat,
      role: "user",
      prompt: prompt,
      model: selModel,
      sql,
      emb,
      jql,
    };
    setSend(true);
    setResponding(true);
    setCurrentMessage(id_llm_message);
    if (search) setLoad(true);
    const resp = await fetch("http://localhost:5000/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataSendJson),
    });
    setLoad(false);
    const reader = resp.body!.getReader();
    const dec = new TextDecoder();
    let full = "";

    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) break;
      full += dec.decode(chunk);
      setMessages((prev) =>
        prev.map((m) => (m.id === id_llm_message ? { ...m, content: full } : m))
      );
    }
    setSend(false);
    setResponding(false);
  };

  const sendData = async (id_chat: string) => {
    const id_message =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const id_llm_message =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    setPrompt("");
    try {
      getResponse(id_message, id_llm_message, id_chat);
    } catch (err) {
      console.error(err);
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
        router.push(`/dashboard/${chatId}`);
      }
      const updated = await handleGetMessages(chatId);
      setMessages(updated);
      console.log(userId)
    },
    [chat, handleGetMessages]
  );

  const deleteChat = async (chatId: string) => {
    const userId = "JOSAFAT";
    if (chat === chatId) {
      setChat("model");
      router.push("/dashboard/model");
      setMessages([]);
    }
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
      textarea.style.height = "model";
      const lineHeight = 24;
      const maxLines = 4;
      const maxHeight = lineHeight * maxLines;
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
      setHeight(newHeight);
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
          height,
          tasks,
          load,
          currentMessage,
          setDefault,
          responding,
          email,
          password,
          setEmail,
          setPassword,
          handleLogin,
        } as any
      }
    >
      {children}
    </Context.Provider>
  );
}
